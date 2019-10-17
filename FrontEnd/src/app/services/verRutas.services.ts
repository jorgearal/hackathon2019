import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';

@Injectable()
export class VerRutasServices {

    public url: string;

constructor(private httpClient: HttpClient) {
    this.url = 'http://ec2-3-90-224-58.compute-1.amazonaws.com:8080/api/v1/mobility/misRutas/';
    }

    verRutasPorPersona(idPersona: string): Observable<any> {
        const urlCompleta = this.url  + idPersona;
        return this.httpClient.request('GET', urlCompleta)
        .pipe(
            timeout(5000),
            map((result: HttpResponse<any>) => {
                return result;
            }), );
            }
}
