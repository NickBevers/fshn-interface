<script lang="ts">
import { defineComponent, ref } from "vue";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox,
};
const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
);
// let video = ref<HTMLVideoElement>();
let video: HTMLVideoElement | undefined = undefined;
let trackingStarted: boolean = false;

while (trackingStarted) {
    const poses = await detector.estimatePoses(video!);
    console.log(poses);
}

export default defineComponent({
    name: "Webcam",
    setup() {
        const constraints = {
            video: true,
            audio: false,
        };

        trackingStarted = false;

        if (
            "mediaDevices" in navigator &&
            navigator.mediaDevices.getUserMedia
        ) {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    video = document.querySelector(
                        ".cameraFeed"
                    ) as HTMLVideoElement;
                    video!.srcObject = stream;
                    video!.onloadedmetadata = () => {
                        video!.play();
                    };
                })
                .catch((err) => {
                    console.error(err);
                });
            return {
                video,
            };
        }
    },

    methods: {
        async startDetectPose() {
            trackingStarted = true;

            // console.log('detecting pose');
            // const poses = await detector.estimatePoses(video!);
            // console.log(poses);
            // return poses;
        },
        async stopDetectPose() {
            trackingStarted = false;

            // console.log('detecting pose');
            // const poses = await detector.estimatePoses(video!);
            // console.log(poses);
            // return poses;
        },
        drawPoints() {},
    },
});
</script>

<template>
    <div>
        <video autoplay="true" class="cameraFeed"></video>
    </div>
</template>

<style scoped>
video {
    width: 100%;
    height: 100%;
}
</style>
