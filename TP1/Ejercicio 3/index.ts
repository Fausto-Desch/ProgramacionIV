import { Empleado } from "./empleado";
import { EmpleadoMedioTiempo } from "./empleado.mediotiempo";
import { EmpleadoTiempoCompleto } from "./empleado.tiempocompleto";

const e1 = new EmpleadoMedioTiempo("Oscar", 1200000);
const e2 = new EmpleadoMedioTiempo("Ramiro", 1600000);
const e3 = new EmpleadoTiempoCompleto("Lucia", 1400000);
const e4 = new EmpleadoTiempoCompleto("Gabriel", 1000000);

const empleadosList: Empleado[] = [e1, e2, e3, e4];

for (let i = 0; i < empleadosList.length; i++) {
    const empleado = empleadosList[i];
    console.log(`El empleado/a ${empleado.getNombre()} tiene un sueldo de: ${empleado.calcularSalario()}`)
}