import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vehiculo } from '../models/vehiculo';
import { Ruta } from '../models/ruta-model';
import { Constantes } from '../shared/constantes';

@Injectable()
export class RutaService {

    vehiculo: Vehiculo;
    ruta: Ruta;

    constructor(private httpClient: HttpClient) {

    }

    consultarRutaXVehiculoId(id: number): Observable<any> {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.get<any>(Constantes.URL_WS_CONSULTA_INFO_ULTIMA_RUTA + id, { headers });
    }

    cambiarEstadoRuta(idRuta: number, idEstado: number) {
        let obj: any = {};
        obj.estado = idEstado;
        obj.idRuta = idRuta;
        return this.httpClient.post<any>(Constantes.URL_WS_CAMBIAR_ESTADO_RUTA, obj);
    }

    registrarRuta(ruta: any) {
        return this.httpClient.post<any>(Constantes.URL_WS_CREAR_RUTA, ruta);
    }
}