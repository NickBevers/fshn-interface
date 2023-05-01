<script lang="ts" setup>
// import the necessary functions and packages
import { onMounted, onBeforeMount, toRefs } from "vue";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

//  Define the props that the component will receive
const props = defineProps<{ imgSrc: string, place: string, verticalOffset: number, horizontalOffset: number }>();
const { imgSrc, place, verticalOffset, horizontalOffset } = toRefs(props);

// Define the variables that will be used in the component
const fps = 20;
const cameraOffset = 80;
const detectorConfig = {
    // modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox,
};
const img = new Image();
img.src = imgSrc.value
const width: { min: number; ideal: number; max: number } = { min: 360, ideal: 720, max: 1080 }; //640 - 1200 (real)
const height: { min: number; ideal: number; max: number } = { min: 640, ideal: 1280, max: 1920 }; //480 - 675 (real)
let detector: poseDetection.PoseDetector;
let stopDetecting = false;
let clothing = true;
let video: HTMLVideoElement;
let leftShoulder: { x: number; y: number } = { x: 0, y: 0 };
let rightShoulder: { x: number; y: number } = { x: 0, y: 0 };
let leftHip: { x: number; y: number } = { x: 0, y: 0 };
let rightHip: { x: number; y: number } = { x: 0, y: 0 };

// Get an instance of the detector before the component is mounted to reduce the loading time
onBeforeMount(async () => {
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
});

// Get the video stream and start the detection when the component is mounted
onMounted(async () => {
    if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: "user",
                    width: width,
                    height: height,
                },
                audio: false,
            })
            .then((stream) => {
                // Get the video element and set the stream as its source
                video = document.querySelector(".cameraFeed") as HTMLVideoElement;
                // the exclamations are needed because the video element cannot be null
                video!.srcObject = stream;
                video!.onloadedmetadata = () => {
                    video!.play();

                    // set the width and height of the video
                    video!.width = width.ideal;
                    video!.height = height.ideal;

                    // start the drawing of the canvas when the video is loaded
                    drawCanvas();
                };
            })
            .catch((err) => {
                console.error(err);
            });

        return { video };
    }
});

// draw the canvas and get the poses each frame
const drawCanvas = () => {
    // get the canvas and set its width and height (also get the context)
    const canvasContainer = document.querySelector(".canvasContainer") as HTMLDivElement;
    canvasContainer.style.width = `${width}px`;
    canvasContainer.style.height = `${height}px`;
    const canvas: HTMLCanvasElement = document.querySelector(".canvas--map") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = width.ideal;
    canvas.height = height.ideal;

    // draw the video on the canvas, but only if the video is not paused or ended
    // console.log(video);
    ctx.drawImage(video, -canvas.width / 2, 0, canvas.width * 2, canvas.height);
    if (video.paused || video.ended) return;

    // get the poses and draw them on the canvas
    getPoses();

    // use requestAnimationFrame to draw the canvas again (1000 / fps => fps times per second)
    if (!stopDetecting) {
        setTimeout(() => {
            requestAnimationFrame(drawCanvas);
        }, 1000 / fps);
    }
};

// get the poses and draw them on the canvas
const getPoses = async () => {
    // if the detector is not undefined, get the poses and draw them on the canvas
    if (detector) {
        // get the poses from the detector
        const poses = await detector.estimatePoses(video!);

        // if there are no poses, return
        if (poses.length === 0) {
            return;
        }

        // get the keypoints from the first pose and draw them on the canvas
        const keypoints = poses[0].keypoints;
        drawKeypoints(keypoints);
    } else {
        return;
    }
};

// draw the keypoints on the canvas and call the showTshirt function if clothing is true
const drawKeypoints = (keypoints: poseDetection.Keypoint[]) => {
    const canvas: HTMLCanvasElement = document.querySelector(".canvas--clothes") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = width.ideal;
    canvas.height = height.ideal;

    //  filter out the keypoints with a score lower than 0.35 (the higher the score, the more confident the model is)
    const newKeypoints = keypoints.filter((keypoint) => keypoint.score! > 0.35);
    let distance = 0;
    // console.log(keypoints);

    // loop through the keypoints set the distance
    newKeypoints.forEach((keypoint) => {
        ctx.beginPath();
        keypoint.y = keypoint.y * 2 - cameraOffset;
        keypoint.x = keypoint.x * 2 - canvas.width / 2;
        ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
        if (keypoint.name === "right_shoulder") {
            ctx.fillStyle = "red";
            rightShoulder = { x: keypoint.x, y: keypoint.y };
        } else if (keypoint.name === "left_shoulder") {
            ctx.fillStyle = "blue";
            // set the left shoulder to the x and y of the keypoint
            leftShoulder = { x: keypoint.x, y: keypoint.y };
        } else if (keypoint.name === "left_hip"){
            ctx.fillStyle = "yellow";
            leftHip = { x: keypoint.x, y: keypoint.y };
        } else if (keypoint.name === "right_hip"){
            ctx.fillStyle = "orange";
            rightHip = { x: keypoint.x, y: keypoint.y };
        } else {
            ctx.fillStyle = "green";
        }

        // calcuilate the distance between the shoulders or the hips depending on the clothing type
        if (place.value === "top") {
            distance = Math.sqrt(
                Math.pow(leftShoulder.x - rightShoulder.x, 2) + Math.pow(leftShoulder.y - rightShoulder.y, 2)
            );
        } else if (place.value === "bottom") {
            distance = Math.sqrt(
                Math.pow(rightHip.x - leftHip.x, 2) + Math.pow(rightHip.y - leftHip.y, 2)
            );
        }

        ctx.fill();
    });

    // if clothing is true, call the showTshirt function
    if (clothing && distance !== 0) {
        if (distance < 0) {
            distance = distance * -1;
        }
        showClothes(distance * 2);
    }
};

// draw the tshirt on the canvas
const showClothes = (distance: number) => {
    // get the canvas and context and calculate the scale and angle
    const canvas: HTMLCanvasElement = document.querySelector(".canvas--clothes") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = width.ideal;
    canvas.height = height.ideal;
    let angle;
    let translation: {x: number, y: number};

    if (place.value === "top") {
        angle = Math.atan2(rightShoulder.y - leftShoulder.y, rightShoulder.x - leftShoulder.x) + Math.PI;
        translation = {x: leftShoulder.x, y: leftShoulder.y};

    } else if (place.value === "bottom") {
        angle = Math.atan2(rightHip.y - leftHip.y, rightHip.x - leftHip.x) + Math.PI;
        translation = {x: leftHip.x, y: leftHip.y};
    }

    // calculate the scale and angle
    let scale = distance / img.width;
    scale = scale * 0.95;


    // if the angle is upside down, rotate it 180 degrees
    if (angle! > Math.PI / 2 && angle! < (Math.PI * 3) / 2) {
        angle! += Math.PI;
    }

    // draw the clothng piece on the canvas (tshirt) and rotate it to the correct angle
    ctx.translate(translation!.x, translation!.y);
    ctx.rotate(angle!);

    // calculate the new width and height and draw the image on the canvas
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    if (img.width > canvas.width) {
        ctx.drawImage(
            img,
            (-canvas.width * scale) - horizontalOffset.value * scale,
            -verticalOffset.value,
            newWidth,
            newHeight
        );
    } else {
        ctx.drawImage(
            img,
            -(canvas.width * scale - img.width * scale) / 2 - (horizontalOffset.value * 2) * scale ,
            -verticalOffset.value,
            newWidth,
            newHeight
        );
    }

    // ctx.drawImage(
    //     img,
    //     // (-canvas.width * scale) - horizontalOffset.value * scale,
    //     -(canvas.width * scale - img.width * scale) / 2 - (horizontalOffset.value * 2) * scale ,
    //     -verticalOffset.value,
    //     newWidth,
    //     newHeight
    // );

    // reset the canvas to its original state
    ctx.rotate(-angle!);
    ctx.translate(-leftShoulder.x, -leftShoulder.y);
};

// functions that can be called from the template to start and stop the detection (development only)
const startDetect = () => {
    stopDetecting = false;
    video.play();
    drawCanvas();
};
const stopDetect = () => {
    stopDetecting = true;
    video.pause();
};
const toggleShirt = () => {
    clothing = !clothing;
};
</script>

<template>
    <div class="canvasContainer">
        <canvas class="canvas--map"></canvas>
        <canvas class="canvas--clothes"></canvas>
    </div>
    <video autoplay="true" class="cameraFeed"></video><br />

    <!-- Buttons below are not needed, but can be usefull in development -->
    <div class="button__container">
        <button @click="startDetect()">Start detecting</button>
        <button @click="stopDetect">Stop detecting</button>
        <button @click="toggleShirt">Toggle tshirt</button>
    </div>
</template>

<style scoped>
button {
    margin: 0 1rem;
}

.cameraFeed {
    display: none;
}

.canvasContainer {
    position: relative;
    width: 100%;
    height: clamp(640px, 100vh, 1280px);
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.canvas--map,
.canvas--clothes {
    position: absolute;
    top: 20px;
}

.canvas--map {
    z-index: 1;
}

.canvas--clothes {
    z-index: 2;
}

.button__container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}
</style>
