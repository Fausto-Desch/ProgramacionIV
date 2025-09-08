abstract class Animal {
    protected nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    abstract hacerSonido(): void;
}

interface Volador {
    volar(): void;
}

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
