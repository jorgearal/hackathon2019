import { Edificio } from './edificio-model';

export class Ruta{
    public id:number;
    public fechaReg:string;
    public fechaSalida:string;
    public fechaRegreso:string;
    public numPersonas:number;
    public estado:string;
    public origen:Edificio;
    public destino:Edificio;
    public idaRegreso:boolean;
}