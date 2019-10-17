import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constantes } from '../shared/constantes';

@Injectable()
export class PersonaService {

    api: string;

    constructor(private httpClient: HttpClient) {
        this.api = environment.endpint;
    }


    servicioPrueba(): string {
        return "hola";
    }


    consultarInfoVehiculo(idPersona: number): Observable<any> {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.get<any>(this.api + Constantes.URL_WS_INFO_VEHICULO + "?idPersona=" + idPersona, { headers });
    }
}