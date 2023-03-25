<script lang="ts" setup>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

const fps = 60;
let width: number; //640 - 1200 (real)
let height: number; //480 - 675 (real)
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox,
};
let detector: poseDetection.PoseDetector;
let stopDetecting: boolean = false;
let clothing: boolean = false;
let video: HTMLVideoElement;
const img = new Image();
img.src = "/src/assets/tshirt-body.png";
img.onload = () => {
    console.log("image loaded");
};
let leftShoulder: { x: number; y: number } = { x: 0, y: 0 };
let rightShoulder: { x: number; y: number } = { x: 0, y: 0 };

onBeforeMount(async () => {
    detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
    );
    console.log(detector);
});

onMounted(async () => {
    if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: false,
            })
            .then((stream) => {
                video = document.querySelector(
                    ".cameraFeed"
                ) as HTMLVideoElement;
                video!.srcObject = stream;
                video!.onloadedmetadata = () => {
                    video!.play();
                    console.log("video playing");
                    width = video!.videoWidth;
                    height = video!.videoHeight;
                    drawCanvas();
                };
            })
            .catch((err) => {
                console.error(err);
            });

        return { video };
    }
});

const drawCanvas = () => {
    const canvas: HTMLCanvasElement = document.querySelector(
        ".canvas--map"
    ) as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    getPoses();
    if (video.paused || video.ended) return;
    if (!stopDetecting) {
        setTimeout(() => {
            requestAnimationFrame(drawCanvas);
        }, 1000 / fps);
    }
};

const getPoses = async () => {
    if (detector) {
        const poses = await detector.estimatePoses(video!);
        if (poses.length === 0) {
            return;
        }
        const keypoints = poses[0].keypoints;
        // const filteredKeypoints = keypoints.slice(0, 5);
        // const filteredKeypoints = keypoints.filter((keypoint) => keypoint.score! > 0.35);
        drawKeypoints(keypoints);
    } else {
        return;
    }
};

const drawKeypoints = (keypoints: poseDetection.Keypoint[]) => {
    const canvas: HTMLCanvasElement = document.querySelector(
        ".canvas--clothes"
    ) as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;
    canvas.width = width;
    canvas.height = height;
    let newKeypoints = keypoints.filter((keypoint) => keypoint.score! > 0.35);
    let shoulderDistance: number = 0;

    newKeypoints.forEach((keypoint) => {
        const x = keypoint.x;
        const y = keypoint.y;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        if (keypoint.name === "right_shoulder") {
            rightShoulder = { x: keypoint.x, y: keypoint.y };
            ctx.fillStyle = "red";
        } else if (keypoint.name === "left_shoulder") {
            leftShoulder = { x: keypoint.x, y: keypoint.y };
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "aqua";
        }
        ctx.fill();

        if (keypoint.name === "left_shoulder") {
            shoulderDistance = Math.sqrt(
                Math.pow(keypoint.x - rightShoulder.x, 2) +
                    Math.pow(keypoint.y - rightShoulder.y, 2)
            );
        }
    });

    if (clothing) {
        // console.log(shoulderDistance);
        showTshirt(shoulderDistance);
    }
};

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

//draw circle on shoulder
const drawCircle = (x: number, y: number) => {
    const canvas: HTMLCanvasElement = document.querySelector(
        ".canvas--clothes"
    ) as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
};

const showTshirt = (distance: number) => {
    const canvas: HTMLCanvasElement = document.querySelector(
        ".canvas--clothes"
    ) as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
        "2d"
    ) as CanvasRenderingContext2D;
    var factor = distance / img.width;
    if (factor > 0) {
        // console.log(factor);
        // img.width = distance;
        // img.height = img.height * factor;
        ctx.scale(factor, 1);
        ctx.drawImage(img, leftShoulder.x, leftShoulder.y);
        ctx.scale(1 / factor, 1 / factor);
        // console.log(leftShoulder.x, leftShoulder.y);

        // drawCircle(leftShoulder.x, leftShoulder.y);
    }
};
</script>

<template>
    <div class="canvasContainer">
        <canvas class="canvas--map"></canvas>
        <canvas class="canvas--clothes"></canvas>
    </div>
    <video autoplay="true" class="cameraFeed"></video><br />

    <button @click="startDetect()">Start detecting</button>
    <button @click="stopDetect">Stop detecting</button>
    <button @click="toggleShirt">Toggle tshirt</button>
</template>

<style scoped>
button {
    margin: 0 1rem;
}

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.cameraFeed {
    display: none;
}

.canvasContainer {
    position: relative;
    width: 100%;
    height: clamp(360px, 100vh, 480px);
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
</style>
