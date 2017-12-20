import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Bestellung } from './bestellung.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BestellungService {

    private resourceUrl = SERVER_API_URL + 'api/bestellungs';

    constructor(private http: Http) { }

    create(bestellung: Bestellung): Observable<Bestellung> {
        const copy = this.convert(bestellung);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bestellung: Bestellung): Observable<Bestellung> {
        const copy = this.convert(bestellung);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Bestellung> {
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
     * Convert a returned JSON object to Bestellung.
     */
    private convertItemFromServer(json: any): Bestellung {
        const entity: Bestellung = Object.assign(new Bestellung(), json);
        return entity;
    }

    /**
     * Convert a Bestellung to a JSON which can be sent to the server.
     */
    private convert(bestellung: Bestellung): Bestellung {
        const copy: Bestellung = Object.assign({}, bestellung);
        return copy;
    }
}
