// import the poseDetection library and the drawKeypoints function
import * as poseDetection from "@tensorflow-models/pose-detection";
import { drawKeypoints } from "./drawKeypoints";

// get the poses and draw them on the canvas
export const getPoses = async (detector: poseDetection.PoseDetector, video: HTMLVideoElement, width: number, height: number, clothing: boolean, clothingImage: HTMLImageElement, verticalOffset: number, leftShoulder: {x: number, y: number}, rightShoulder: {x: number, y: number}) => {
    // if the detector is not undefined, get the poses and draw them on the canvas
    if (detector) {
        // get the poses from the detector
        const poses = await detector.estimatePoses(video!);

        // if there are no poses, return
        if (poses.length === 0) {
            return;
        }

        // draw the keypoints on the canvas
        const keypoints = poses[0].keypoints;
        drawKeypoints(
            keypoints,
            width,
            height,
            leftShoulder,
            rightShoulder,
            clothing,
            clothingImage,
            verticalOffset,
        );
    } else {
        return;
    }
};