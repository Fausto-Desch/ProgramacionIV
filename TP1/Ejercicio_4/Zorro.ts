import { Animal } from "./Animal";

class Zorro extends Animal {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log("El zorro hace sonido");
    }
}
export { Zorro };

