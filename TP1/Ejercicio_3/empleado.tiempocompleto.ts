import { Empleado } from "./empleado";

export class EmpleadoTiempoCompleto extends Empleado{
    private static readonly BONO_FIJO = 20000;
    constructor(nombre: string, salarioBase: number) {
        super(nombre, salarioBase);
    }

    calcularSalario(): number {
        return this.salarioBase + EmpleadoTiempoCompleto.BONO_FIJO;
    }
}
