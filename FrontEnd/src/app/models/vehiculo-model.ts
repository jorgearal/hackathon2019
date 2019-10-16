import { Persona } from './persona-model';

export class Vehiculo {

    public id: number;
    public placa: string;
    public marca: string;
    public referencia: string;
    public numPuestos: number;
    public modelo: number;
    public color: string;
    public descripcion: string;
    public imagen: string;
    public persona: Persona;
}