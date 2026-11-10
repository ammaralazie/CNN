type Pixel = [number, number, number];
type Image = any | Pixel[][];


export const normalization = (data: Image) => {

    if (Array.isArray(data) && data.length > 0) {

        for (let i = 0; i < data.length; i++) {

            // هذا يعمني انه مصفوفة ملونه 
            if (Array.isArray(data[i]) && data[i].length > 0) {

                for (let j = 0; j < data[i].length; j++) {

                    // /this is coolerd Image
                    if (Array.isArray(data[i][j]) && data[i][j].length > 0) {
                        // here we divided by 255 to normalize the color values to the range [0, 1]
                        for (let k = 0; k < data[i][j].length; k++) {
                            data[i][j][k] = data[i][j][k] / 255;
                        }// /if

                    } else {
                        data[i][j] = data[i][j] / 255;
                    }// /if

                }// /for

            }// /if

        }// /for

    }// /if

    return data;

}// /normalization

export const padding = (data: Image, numberOfRows: number, numberOfColumns: number, type = "coolred") => {

    if (Array.isArray(data) && data.length > 0 && (numberOfRows > 0 || numberOfColumns > 0)) {

        if (type === "coolred") {

            if (numberOfColumns > 0) {


                for (let i = 0; i < data.length; i++) {

                    for (let j = 0; j < numberOfColumns; j++) {
                        data[i].push([0, 0, 0]);
                        data[i].unshift([0, 0, 0]);
                    }// /for

                }// /if

            }// /if

            if (numberOfRows > 0) {

                const rowLength = data[0].length;

                for (let i = 0; i < numberOfRows; i++) {

                    const topRow: Pixel[] = [];
                    const bottomRow: Pixel[] = [];

                    for (let j = 0; j < rowLength; j++) {
                        topRow.push([0, 0, 0]);
                        bottomRow.push([0, 0, 0]);
                    }// /for

                    data.unshift(topRow);
                    data.push(bottomRow);
                }// /for

            }// /if

        } else if (type === "grayscale") {

            if (numberOfColumns > 0) {

                for (let i = 0; i < data.length; i++) {

                    for (let j = 0; j < numberOfColumns; j++) {
                        data[i].push(0);
                        data[i].unshift(0);
                    }// /for

                }// /for

            }// /if

            if (numberOfRows > 0) {

                const rowLength = data[0].length;

                for (let i = 0; i < numberOfRows; i++) {

                    const topRow = [];
                    const bottomRow = [];

                    for (let j = 0; j < rowLength; j++) {
                        topRow.push(0);
                        bottomRow.push(0);
                    }// /for

                    data.unshift(topRow);
                    data.push(bottomRow);

                }// /for

            }// /if

        }// /if

    }// /if

    return data;

}// /padd

export const maxPoolingCoolered = (data: number[][][], poolSize = 2, stride = 2) => {

    const height = data.length;
    const width = data[0].length;
    const channels = data[0][0].length;

    const outHeight = Math.floor((height - poolSize) / stride) + 1;
    const outWidth = Math.floor((width - poolSize) / stride) + 1;

    const result: number[][][] = [];

    for (let i = 0; i < outHeight; i++) {

        const row: number[][] = [];

        for (let j = 0; j < outWidth; j++) {

            const pixel: number[] = [];

            for (let c = 0; c < channels; c++) {

                let max = -Infinity;

                for (let m = 0; m < poolSize; m++) {
                    for (let n = 0; n < poolSize; n++) {
                        const value = data[i * stride + m][j * stride + n][c];
                        if (value > max) {
                            max = value;
                        }// /if
                    }// /for
                }// /for

                pixel.push(max);

            }// /for

            row.push(pixel);

        }// /for

        result.push(row);

    }// /for

    return result;

}// /maxPooling

export const maxPoolingGray = (data: number[][], poolSize = 2, stride = 2) => {

    const height = data.length;
    const width = data[0].length;

    const outHeight = Math.ceil((height - poolSize) / stride) + 1;
    const outWidth = Math.ceil((width - poolSize) / stride) + 1;

    const result: number[][] = [];

    for (let i = 0; i < outHeight; i++) {

        const row: number[] = [];

        for (let j = 0; j < outWidth; j++) {

            let max = -Infinity;

            for (let m = 0; m < poolSize; m++) {
                for (let n = 0; n < poolSize; n++) {

                    const r = i * stride + m;
                    const c = j * stride + n;

                    if (r >= height || c >= width) {
                        continue;
                    }// /if

                    const value = data[r][c];
                    if (value > max) {
                        max = value;
                    }// /if

                }// /for
            }// /for

            row.push(max);

        }// /for

        result.push(row);

    }// /for

    return result;

}// /maxPoolingGray

export const maxPooling = (data: Image, poolSize = 2, stride = 2, type = "coolred") => {

    if (type === "coolred") {

        return maxPoolingCoolered(data, poolSize, stride);

    } else if (type === "grayscale") {

        return maxPoolingGray(data, poolSize, stride);

    } else {
        console.log("type is not coolred or grayscale");
    }// /if

    return data;

}// /maxPoolingAll

export const flattenColor = (data: number[][][]) => {

    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            for (let c = 0; c < data[i][j].length; c++) {
                result.push(data[i][j][c]);
            }// /for
        }// /for
    }// /for

    return result;

}// /flattenColor

export const flattenGray = (data: number[][]) => {

    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {

        for (let j = 0; j < data[i].length; j++) {

            result.push(data[i][j]);

        }// /for

    }// /for

    return result;

}// /flattenGray

export const flatten = (data: Image, type = "coolred") => {

    if (type === "coolred") {

        return flattenColor(data);

    } else if (type === "grayscale") {

        return flattenGray(data);

    }// /if

    return data;

}// /flatten

export const buildFilter = (flat: number[], channels: number): number[][][] => {

    const k = Math.sqrt(flat.length);

    const filter: number[][][] = [];

    for (let m = 0; m < k; m++) {

        const row: number[][] = [];

        for (let n = 0; n < k; n++) {

            const depth: number[] = [];

            for (let c = 0; c < channels; c++) {
                depth.push(flat[m * k + n]);
            }// /for

            row.push(depth);

        }// /for

        filter.push(row);

    }// /for

    return filter;

}// /buildFilter

export const buildColorFilter = (weights: number[]): number[][][] => {

    const depth: number[] = [];

    for (let c = 0; c < weights.length; c++) {
        depth.push(weights[c]);
    }// /for

    return [[depth]];

}// /buildColorFilter

export const printGray = (data: number[][]) => {

    let maxLength = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const length = String(data[i][j]).length;
            if (length > maxLength) {
                maxLength = length;
            }// /if
        }// /for
    }// /for

    let output = "";

    for (let i = 0; i < data.length; i++) {

        let line = "";

        for (let j = 0; j < data[i].length; j++) {
            line += String(data[i][j]).padStart(maxLength, " ") + " ";
        }// /for

        output += line.trimEnd() + "\n";

    }// /for

    console.log(output);

}// /printGray

export const printColor = (data: number[][][]) => {

    let output = "";

    for (let i = 0; i < data.length; i++) {

        let line = "";

        for (let j = 0; j < data[i].length; j++) {
            const pixel = data[i][j].map(v => String(v).padStart(3, " ")).join(",");
            line += "(" + pixel + ") ";
        }// /for

        output += line.trimEnd() + "\n";

    }// /for

    console.log(output);

}// /printColor

export const relu = (data: number[][][]) => {

    const result: number[][][] = [];

    for (let i = 0; i < data.length; i++) {

        const row: number[][] = [];

        for (let j = 0; j < data[i].length; j++) {

            const pixel: number[] = [];

            for (let c = 0; c < data[i][j].length; c++) {
                pixel.push(Math.max(0, data[i][j][c]));
            }// /for

            row.push(pixel);

        }// /for

        result.push(row);

    }// /for

    return result;

}// /relu

export const convolution = (data: Image, filter: number[][][], type = "coolred", stepRow: number = 1, stepCol: number = 1) => {

    if (type !== "coolred" && type !== "grayscale") {
        console.log("type is not coolred or grayscale");
        return data;
    }// /if

    const isColor = type === "coolred";
    const channels = isColor ? data[0][0].length : 1;

    const filterRows = filter.length;
    const filterCols = filter[0].length;

    const totalRows = data.length;
    const totalCols = data[0].length;

    let extraRows = 0;
    let extraCols = 0;

    if (totalRows < filterRows) {
        extraRows = filterRows - totalRows;
    } else {
        extraRows = (stepRow - ((totalRows - filterRows) % stepRow)) % stepRow;
    }// /if

    if (totalCols < filterCols) {
        extraCols = filterCols - totalCols;
    } else {
        extraCols = (stepCol - ((totalCols - filterCols) % stepCol)) % stepCol;
    }// /if

    const padded: any[][] = [];

    for (let i = 0; i < totalRows; i++) {

        const row: any[] = [...data[i]];

        for (let j = 0; j < extraCols; j++) {

            if (isColor) {

                const zeroPixel: number[] = [];

                for (let c = 0; c < channels; c++) {
                    zeroPixel.push(0);
                }// /for

                row.push(zeroPixel);

            } else {
                row.push(0);
            }// /if

        }// /for

        padded.push(row);

    }// /for

    for (let i = 0; i < extraRows; i++) {

        const zeroRow: any[] = [];

        for (let j = 0; j < totalCols + extraCols; j++) {

            if (isColor) {

                const zeroPixel: number[] = [];

                for (let c = 0; c < channels; c++) {
                    zeroPixel.push(0);
                }// /for

                zeroRow.push(zeroPixel);

            } else {
                zeroRow.push(0);
            }// /if

        }// /for

        padded.push(zeroRow);

    }// /for

    const result: number[][] = [];

    let lastEndRow = 0;
    let lastEndCol = 0;

    let startRow = 0;

    while (startRow + filterRows <= padded.length) {

        const resultRow: number[] = [];

        let startCol = 0;

        while (startCol + filterCols <= padded[0].length) {

            let sum = 0;

            for (let m = 0; m < filterRows; m++) {
                for (let n = 0; n < filterCols; n++) {

                    const cell = padded[startRow + m][startCol + n];

                    if (isColor) {
                        for (let c = 0; c < channels; c++) {
                            sum += cell[c] * filter[m][n][c];
                        }// /for
                    } else {
                        sum += cell * filter[m][n][0];
                    }// /if

                }// /for
            }// /for

            resultRow.push(sum);

            lastEndCol = startCol + filterCols - 1;
            startCol = lastEndCol - filterCols + 1 + stepCol;

        }// /while

        result.push(resultRow);

        lastEndRow = startRow + filterRows - 1;
        startRow = lastEndRow - filterRows + 1 + stepRow;

    }// /while

    return result;

}// /convolution