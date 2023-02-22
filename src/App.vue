<script lang="ts" setup>
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

const picture = ref<string | null>(null);
const fps = 60;
const width = 640; //640 - 1200 (real)
const height = 480; //480 - 675 (real)
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING, 
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox
};
let detector: poseDetection.PoseDetector;
let stopDetecting:boolean = false;
let video: HTMLVideoElement;

onBeforeMount(async () => {
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    console.log(detector);
});

onMounted(async () => {
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        })
            .then(stream => {
                video = document.querySelector('.cameraFeed') as HTMLVideoElement;
                video!.srcObject = stream;
                video!.onloadedmetadata = () => {
                    video!.play();
                    drawCanvas();
                }
            })
            .catch(err => {
                console.error(err)
            })

        return { video }
    }
});

const drawCanvas = () => {
    const canvas: HTMLCanvasElement = document.querySelector('.mapping__canvas') as HTMLCanvasElement;
    const ctx:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    getPoses();

    if(video.paused || video.ended) return;
    if (!stopDetecting){
        setTimeout(() => {
            requestAnimationFrame(drawCanvas);
        }, 1000 / fps);
    }
}

const getPoses = async () => {
    if( detector ){
        const poses = await detector.estimatePoses(video!);
        if (poses.length === 0) {
            return;
        }
        const keypoints = poses[0].keypoints;
        const filteredKeypoints = keypoints.slice(0, 5);
        // const filteredKeypoints = filtered.filter((keypoint) => keypoint.score! > 0.35);
        // console.log(filteredKeypoints[0].y);

        drawKeypoints(filteredKeypoints);
    } else {
        return;
    }
}

const drawKeypoints = (keypoints: poseDetection.Keypoint[]) => {
    const canvas: HTMLCanvasElement = document.querySelector('.mapping__canvas') as HTMLCanvasElement;
    const ctx:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    keypoints.forEach((keypoint) => {
        // const x = keypoint.x * (width / 640);
        // const y = keypoint.y * (height / 480);
        const x = keypoint.x;
        const y = keypoint.y;
        ctx.beginPath();
        ctx.arc(x, y + 60, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'aqua';
        ctx.fill();
    });


    ctx.beginPath();
    
    if(keypoints.length < 5) return;
    // Left eye
    ctx.moveTo(keypoints[0].x, keypoints[0].y + 60);
    ctx.lineTo(keypoints[1].x, keypoints[1].y + 60);

    // Right eye
    ctx.moveTo(keypoints[0].x, keypoints[0].y + 60);
    ctx.lineTo(keypoints[2].x, keypoints[2].y + 60);

    // Left ear
    ctx.moveTo(keypoints[1].x, keypoints[1].y + 60);
    ctx.lineTo(keypoints[3].x, keypoints[3].y + 60);

    // Right ear
    ctx.moveTo(keypoints[2].x, keypoints[2].y + 60);
    ctx.lineTo(keypoints[4].x, keypoints[4].y + 60);
    ctx.strokeStyle = 'aqua';
    ctx.stroke();
    // ctx.restore();

}

const startDetect = () => {
    stopDetecting = false;
    drawCanvas();
}

const stopDetect = () => {
    stopDetecting = true;
}

</script>

<template>
    <canvas :width="width" :height="height" class="mapping__canvas"></canvas>
    <video autoplay="true" class="cameraFeed"></video><br>


    <button @click="startDetect()">Start detecting</button>
    <button @click="stopDetect">Stop detecting</button>
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
</style>
