export abstract class Vehiculo {

    protected _patente: string;  
    protected _color: string;
    protected _modelo: string;
    protected _cantKm: number;

    constructor(patente: string, color: string, modelo: string, cantKm: number){
        this._patente = patente;
        this._color = color;
        this._modelo = modelo;
        this._cantKm = cantKm; 
    }

    abstract avanzar(): void;
    abstract consultarKm(): void;
}
