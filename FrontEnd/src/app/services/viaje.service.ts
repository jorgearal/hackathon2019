import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constantes } from '../shared/constantes';

@Injectable()
export class ViajeService {

    constructor(private httpClient: HttpClient) {

    }

    suscribirARuta(data:any): Observable<any> {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.post<any>(Constantes.URL_WS_REGUPDATE_RUTA ,data);
    }

    consultarRutaPasajero(idUser: number): Observable<any> {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.get<any>(Constantes.URL_WS_VALIDAR_RUTA_PASAJERO + idUser, { headers });
    }

    actualizarEstadoRutaPasajero(idUser: number, idRuta:number, estado: number): Observable<any> {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return null;// this.httpClient.get<any>(Constantes.URL_WS_REGUPDATE_RUTA + id, { headers });
    }



}