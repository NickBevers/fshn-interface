// import the needed function and the poseDetection library
import * as poseDetection from "@tensorflow-models/pose-detection";
import { getPoses } from "./getPoses";

// draw the canvas and get the poses each frame
export const drawCanvas = (canvas: HTMLCanvasElement, video: HTMLVideoElement, fps: number, stopDetecting: boolean, width: number, height: number, detector: poseDetection.PoseDetector, clothing: boolean, clothingImage: HTMLImageElement, verticalOffset: number, leftShoulder: {x: number, y: number}, rightShoulder: {x: number, y: number}) => {
    if (stopDetecting) return;
    // console.log(width, height);
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = width;
    canvas.height = height;
    // console.log("Canvas", canvas.width, canvas.height)

    // draw the video on the canvas, but only if the video is not paused or ended
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (video.paused || video.ended) return;

    // get the poses and draw them on the canvas
    getPoses(detector, video, width, height, clothing, clothingImage, verticalOffset, leftShoulder, rightShoulder);
    
    // use requestAnimationFrame to draw the canvas again (1000 / fps => fps times per second) 
    setTimeout(() => {
        requestAnimationFrame(() => { drawCanvas(canvas, video, fps, stopDetecting, width, height, detector, clothing, clothingImage, verticalOffset, leftShoulder, rightShoulder) });
    }, 1000 / fps);
};