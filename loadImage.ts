import sharp from "sharp";

export const loadImage = async (path: string, size = 128) => {

    const { data, info } = await sharp(path)
        .removeAlpha()
        .resize(size, size, { fit: "fill" })
        .raw()
        .toBuffer({ resolveWithObject: true });

    const image: number[][][] = [];

    for (let i = 0; i < info.height; i++) {

        const row: number[][] = [];

        for (let j = 0; j < info.width; j++) {

            const pixel: number[] = [];

            for (let c = 0; c < info.channels; c++) {
                pixel.push(data[(i * info.width + j) * info.channels + c]);
            }

            row.push(pixel);

        }

        image.push(row);

    }

    return image;

}