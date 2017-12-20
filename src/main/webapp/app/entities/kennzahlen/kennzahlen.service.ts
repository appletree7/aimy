import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Kennzahlen } from './kennzahlen.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class KennzahlenService {

    private resourceUrl = SERVER_API_URL + 'api/kennzahlens';

    constructor(private http: Http) { }

    create(kennzahlen: Kennzahlen): Observable<Kennzahlen> {
        const copy = this.convert(kennzahlen);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(kennzahlen: Kennzahlen): Observable<Kennzahlen> {
        const copy = this.convert(kennzahlen);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Kennzahlen> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Kennzahlen.
     */
    private convertItemFromServer(json: any): Kennzahlen {
        const entity: Kennzahlen = Object.assign(new Kennzahlen(), json);
        return entity;
    }

    /**
     * Convert a Kennzahlen to a JSON which can be sent to the server.
     */
    private convert(kennzahlen: Kennzahlen): Kennzahlen {
        const copy: Kennzahlen = Object.assign({}, kennzahlen);
        return copy;
    }
}
