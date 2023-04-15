export const showTshirt = (distance: number, canvas: HTMLCanvasElement, clothingImage: HTMLImageElement, leftShoulder: { x: number; y: number }, rightShoulder: { x: number; y: number }, verticalOffset: number) => {
    // const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    // const scale = (distance / clothingImage.width);
    // const angle =
    //     Math.atan2(
    //         rightShoulder.y - leftShoulder.y,
    //         rightShoulder.x - leftShoulder.x
    //     ) + Math.PI;
    // ctx.translate(leftShoulder.x, leftShoulder.y);
    // ctx.rotate(angle);
    // const newWidth = clothingImage.width * scale;
    // const newHeight = clothingImage.height * scale;
    // ctx.drawImage(
    //     clothingImage,
    //     -(canvas.width * scale) - 40,
    //     // -(leftShoulder.x - rightShoulder.x),
    //     -1 * verticalOffset,
    //     newWidth,
    //     newHeight
    // );
    // ctx.rotate(-angle);
    // ctx.translate(-leftShoulder.x, -leftShoulder.y);

    const canvas2: HTMLCanvasElement = document.querySelector(
        ".canvas--clothes"
    ) as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas2.getContext(
        "2d"
    ) as CanvasRenderingContext2D;
    // console.log(distance);
    // console.log(clothingImage.width);
    const scale = (distance / clothingImage.width);
    console.log(scale);
    // rotate the image around top center point based on the angle between the shoulders and the horizontal
    const angle =
        Math.atan2(
            rightShoulder.y - leftShoulder.y,
            rightShoulder.x - leftShoulder.x
        ) + Math.PI;
    ctx.translate(leftShoulder.x, leftShoulder.y);
    ctx.rotate(angle);
    const newWidth = clothingImage.width * scale;
    const newHeight = clothingImage.height * scale;
    // console.log(leftShoulder.x - rightShoulder.x);
    ctx.drawImage(
        clothingImage,
        -(canvas.width * scale) - 40,
        // -(leftShoulder.x - rightShoulder.x),
        -verticalOffset,
        newWidth,
        newHeight
    );
    ctx.rotate(-angle);
    ctx.translate(-leftShoulder.x, -leftShoulder.y);
    // ctx.scale(1 / scale, 1 / scale);
};
