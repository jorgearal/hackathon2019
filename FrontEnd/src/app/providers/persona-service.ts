import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constantes } from '../shared/constantes';
import { Persona } from '../models/persona-model';

@Injectable()
export class PersonaService {

    api: string;

    constructor(private httpClient: HttpClient) {
        this.api = environment.endpint;
    }


    servicioPrueba(): string {
        return "hola";
    }

    login(usuario: string, password: string) {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.post<any>(
            this.api + Constantes.URL_WS_AUTENTICAR,
            {
                'email': usuario,
                'password': password
            }, {
                headers 
            });
    }

    consultarInfoVehiculo(idPersona: number): Observable<any> {
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.get<any>(this.api + Constantes.URL_WS_INFO_VEHICULO + "?idPersona=" + idPersona, { headers });
    }

    consultarInfoPersonaXId(idPersona:number):Observable<Persona>{
        let headers = new HttpHeaders(
            {
                'Referrer-Policy': 'origin-when-cross-origin'
            }
        );
        return this.httpClient.get<Persona>(Constantes.URL_WS_CONSULTA_PERSONA + idPersona, { headers });
    }
}