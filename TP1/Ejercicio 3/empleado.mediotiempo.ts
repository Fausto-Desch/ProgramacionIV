import { Empleado } from "./empleado";

export class EmpleadoMedioTiempo extends Empleado{
    constructor(nombre: string, salarioBase: number) {
        super(nombre, salarioBase);
    }

    calcularSalario(): number {
        return this.salarioBase / 2;
    }
}
