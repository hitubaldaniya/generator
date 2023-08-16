interface Coords {
    x: number;
    y: number;
}

interface Types {
    matrix: Matrix;
    code: string;
}

interface Size {
    width: number;
    height: number;
}

class Matrix {
    width: number;
    height: number;
    data: Array<string>;

    getChar(coords: Coords){
        return this.data[coords.y * this.width + coords.x]
    }
}

export { Matrix, Types, Coords, Size }