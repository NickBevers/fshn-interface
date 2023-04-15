// import the poseDetection library and the showTshirt function
import * as poseDetection from "@tensorflow-models/pose-detection";
import { showTshirt } from "./showTshirt";

// draw the keypoints on the canvas and call the showTshirt function if clothing is true
export const drawKeypoints = (keypoints: poseDetection.Keypoint[], width: number, height: number, leftShoulder: { x: number, y: number }, rightShoulder: { x: number, y: number }, showClothing: boolean, clothingImage: HTMLImageElement, verticalOffset: number) => {
    const canvas = document.querySelector(".canvas--clothes") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = width;
    canvas.height = height;
    
    //  filter out the keypoints with a score lower than 0.35 (the higher the score, the more confident the model is)
    const newKeypoints = keypoints.filter((keypoint) => keypoint.score! > 0.35);
    let shoulderDistance = 0;

    newKeypoints.forEach((keypoint) => {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
        if (keypoint.name === "right_shoulder") {
            rightShoulder = { x: keypoint.x, y: keypoint.y };
        } else if (keypoint.name === "left_shoulder") {
            leftShoulder = { x: keypoint.x, y: keypoint.y };
            shoulderDistance = Math.sqrt(
                Math.pow(keypoint.x - rightShoulder.x, 2) +
                    Math.pow(keypoint.y - rightShoulder.y, 2)
            );
        }
    });

    if (showClothing) {
        showTshirt(
            shoulderDistance,
            canvas,
            clothingImage,
            leftShoulder,
            rightShoulder,
            verticalOffset
        );
    }
};