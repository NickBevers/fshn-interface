<script lang="ts" setup>
// import the necessary functions and packages
import { onMounted, onBeforeMount, toRefs } from "vue";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import { drawCanvas } from "../functions/clothesMapping/drawCanvas";

//  Define the props that the component will receive
const props = defineProps<{ imgSrc: string }>();
const { imgSrc } = toRefs(props);

// Define the variables that will be used in the component
const fps = 20;
const verticalOffset = 80;
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox,
};
const img = new Image();
img.src = imgSrc.value;
let width: number; //640 - 1200 (real)
let height: number; //480 - 675 (real)
let detector: poseDetection.PoseDetector;
let stopDetecting = false;
let clothing = true;
let video: HTMLVideoElement;
const leftShoulder: { x: number; y: number } = { x: 0, y: 0 };
const rightShoulder: { x: number; y: number } = { x: 0, y: 0 };

// Get an instance of the detector before the component is mounted to reduce the loading time
onBeforeMount(async () => {
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
});

// Get the video stream and start the detection when the component is mounted
onMounted(async () => {
    if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                // audio is not needed so can be set to false
                video: true,
                audio: false,
            })
            .then((stream) => {
                // Get the video element and set the stream as its source
                video = document.querySelector(".cameraFeed") as HTMLVideoElement;
                // the exclamations are needed because the video element cannot be null
                video!.srcObject = stream;
                video!.onloadedmetadata = () => {
                    video!.play();
                    video!.width = video!.videoWidth;
                    video!.height = video!.videoHeight;
                    width = video!.width;
                    height = video!.height;
                    // start the drawing of the canvas when the video is loaded
                    drawCanvas(
                        document.querySelector(".canvas--map") as HTMLCanvasElement,
                        video,
                        fps,
                        stopDetecting,
                        width,
                        height,
                        detector,
                        clothing,
                        img,
                        verticalOffset,
                        leftShoulder,
                        rightShoulder
                    );
                };
            })
            .catch((err) => {
                console.error(err);
            });

        return { video };
    }
});

// functions that can be called from the template to start and stop the detection
const startDetect = () => {
    stopDetecting = false;
    video.play();
    drawCanvas(
        document.querySelector(".canvas--map") as HTMLCanvasElement,
        video,
        fps,
        stopDetecting,
        width,
        height,
        detector,
        clothing,
        img,
        verticalOffset,
        leftShoulder,
        rightShoulder
    );
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
    <button @click="startDetect()">Start detecting</button>
    <button @click="stopDetect">Stop detecting</button>
    <button @click="toggleShirt">Toggle tshirt</button>
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
    height: clamp(480px, 100vh, 720px);
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
