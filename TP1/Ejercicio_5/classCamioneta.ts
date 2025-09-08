import {Vehiculo} from './classVehiculo.ts';

export class Camioneta extends Vehiculo {
    private _tieneEnganche: boolean;
    private _numeroPuertas: number;

    constructor(patente: string, color: string, modelo: string, cantKm: number, tieneEnganche: boolean, numeroPuertas: number) {
        super(patente, color, modelo, cantKm);
        this._tieneEnganche = tieneEnganche;
        this._numeroPuertas = numeroPuertas;
    }

    consultarNumeroDePuertas(): number {
        return this._numeroPuertas;
    }

    avanzar(): void {
        console.log('La camioneta se esta moviendo hacia adelante!');
    }

    consultarKm(): void {
        console.log(`Esta camioneta tiene ${this._cantKm} kilometros!`);
    }
}
