import { Animal } from "./Animal";
import { Volador } from "./Interface.Volador";

class Pajaro extends Animal implements Volador {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log("El pajaro hace sonido");
    }

    volar(): void {
        console.log("El pajaro vuela");
    }
}
export { Pajaro };
