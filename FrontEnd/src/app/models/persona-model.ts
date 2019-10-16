import { Edificio } from './edificio-model';

export class Persona{
    public id:number;
    public cedula:number;
    public nombre: string;
    public email:string;
    public celular:string;
    public edificio: Edificio;
    public apto:string;
    public puntaje:number;
    public foto:string;
}