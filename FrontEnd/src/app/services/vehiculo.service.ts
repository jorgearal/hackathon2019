import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vehiculo } from '../models/vehiculo';
import { Ruta } from '../models/ruta-model';
import { Constantes } from '../shared/constantes';

@Injectable()
export class VehiculoService {

    vehiculo: Vehiculo;
    ruta: Ruta;

    constructor(private httpClient: HttpClient) {
    }

    consultarVehiculoXIdPersona(id: number): Observable<Vehiculo[]> {
        const headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.get<Vehiculo[]>(Constantes.URL_WS_CONSULTA_VEHICULO_PERSONA + id, { headers });
    }

}
