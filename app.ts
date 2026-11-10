import { convolution, buildFilter, relu, normalization, maxPoolingCoolered, flattenColor } from "./main.js";
import { loadImage } from "./loadImage.js";
import * as filters from "./filters.js";

const applyFilters = (image: number[][][], filterList: number[][], depth: number) => {

    const maps: number[][][] = [];

    for (let f = 0; f < filterList.length; f++) {
        maps.push(convolution(image, buildFilter(filterList[f], depth)));
    }

    const stacked: number[][][] = [];

    for (let i = 0; i < maps[0].length; i++) {

        const row: number[][] = [];

        for (let j = 0; j < maps[0][0].length; j++) {

            const pixel: number[] = [];

            for (let f = 0; f < maps.length; f++) {
                pixel.push(maps[f][i][j]);
            }

            row.push(pixel);

        }

        stacked.push(row);

    }

    return stacked;

}

const scaleChannels = (data: number[][][]) => {

    const channels = data[0][0].length;
    const maxValues: number[] = new Array(channels).fill(0);

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            for (let c = 0; c < channels; c++) {
                if (data[i][j][c] > maxValues[c]) {
                    maxValues[c] = data[i][j][c];
                }
            }
        }
    }

    const result: number[][][] = [];

    for (let i = 0; i < data.length; i++) {

        const row: number[][] = [];

        for (let j = 0; j < data[i].length; j++) {

            const pixel: number[] = [];

            for (let c = 0; c < channels; c++) {
                pixel.push(maxValues[c] === 0 ? 0 : data[i][j][c] / maxValues[c]);
            }

            row.push(pixel);

        }

        result.push(row);

    }

    return result;

}

const groupOne = [
    filters.verticalGray,
    filters.horizontalGray,
    filters.edgeDetection,
    filters.sideLineVertical,
    filters.goalLineHorizontalTop,
    filters.ballRing
];

const groupTwo = [
    filters.penaltyBoxCornerTL,
    filters.penaltyBoxCornerTR,
    filters.penaltyBoxCornerBL,
    filters.penaltyBoxCornerBR,
    filters.crossJunction,
    filters.penaltySpot,
    filters.arcTopLeft,
    filters.goalPostVertical
];

const extractFeatures = async (path: string) => {

    const rgb = await loadImage(path, 128);
    const normalized = normalization(rgb);

    const layerOne = relu(applyFilters(normalized, groupOne, 3));
    const pooledOne = maxPoolingCoolered(layerOne, 2, 2);

    const layerTwo = relu(applyFilters(pooledOne, groupTwo, groupOne.length));
    const pooledTwo = maxPoolingCoolered(layerTwo, 2, 2);

    const scaled = scaleChannels(pooledTwo);

    return flattenColor(scaled);

}

const vector = await extractFeatures("./files/1.webp");

console.log("Feature Vector:", vector);
console.log(vector.length);