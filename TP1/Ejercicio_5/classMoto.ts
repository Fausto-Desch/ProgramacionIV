import {Vehiculo} from './classVehiculo.ts';
import {Electrico} from './interfaceElectrico.ts';

export class Moto extends Vehiculo implements Electrico {
    private _cilindrada: number;

    constructor(patente: string, color: string, modelo: string, cantKm: number, cilindrada: number){
        super(patente, color, modelo, cantKm);
        this._cilindrada = cilindrada
    }

    avanzar(): void {
        console.log('La moto se esta moviendo hacia adelante!');
    }

    consultarKm(): void {
        console.log(`Esta moto tiene ${this._cantKm} kilometros!`);
    }

    consultarCilindrada(): number {
        return this._cilindrada
    }

    consultarBateria(): void {
        console.log("La batería de la moto está al 80%.");
    }
}