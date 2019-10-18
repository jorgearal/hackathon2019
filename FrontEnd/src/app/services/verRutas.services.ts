import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';
import { Constantes } from '../shared/constantes';

@Injectable()
export class VerRutasServices {

    public url: string;
    public url2: string;

constructor(private httpClient: HttpClient) {

   }

    /*verRutasPorPersona(idPersona: string): Observable<any> {
        const urlCompleta = this.url  + idPersona;
        return this.httpClient.request('GET', urlCompleta)
        .pipe(
            timeout(5000),
            map((result: HttpResponse<any>) => {
                return result;
            }), );
            }*/

            verRutasPorPersona(idPersona: string): Observable<any> {
                const headers = new HttpHeaders(
                    {
                        'Referrer-Policy': 'origin-when-cross-origin'
                    }
                );
                return this.httpClient.get<any>(Constantes.URL_WS_MIS_RUTAS + idPersona, { headers });
            }

            verRutaPorId(idViaje: string): Observable<any> {
                const headers = new HttpHeaders(
                    {
                        'Referrer-Policy': 'origin-when-cross-origin'
                    }
                );
                return this.httpClient.get<any>(Constantes.URL_WS_RUTA_POR_ID_VIAJE + idViaje, { headers });
            }

            /*
            verRutaPorId(idViaje: string): Observable<any> {
                const urlCompleta = this.url2  + idViaje;
                return this.httpClient.request('GET', urlCompleta)
                .pipe(
                    timeout(5000),
                    map((result: HttpResponse<any>) => {
                        return result;
                    }), );
                    }*/
        }
