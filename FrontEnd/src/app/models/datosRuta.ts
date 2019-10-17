import { PuntosTrayecto } from './puntoTrayecto';
import { Vehiculo } from './vehiculo-model';

export class DatosRuta {
id: string;
fechaReg: string;
fechaSalida: string;
numPersonas: number;
estado: number;
cupo: number;
origen: PuntosTrayecto;
destino: PuntosTrayecto;
vehiculo: Vehiculo;

}

