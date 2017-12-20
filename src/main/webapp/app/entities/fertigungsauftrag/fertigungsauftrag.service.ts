import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Fertigungsauftrag } from './fertigungsauftrag.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FertigungsauftragService {

    private resourceUrl = SERVER_API_URL + 'api/fertigungsauftrags';

    constructor(private http: Http) { }

    create(fertigungsauftrag: Fertigungsauftrag): Observable<Fertigungsauftrag> {
        const copy = this.convert(fertigungsauftrag);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fertigungsauftrag: Fertigungsauftrag): Observable<Fertigungsauftrag> {
        const copy = this.convert(fertigungsauftrag);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Fertigungsauftrag> {
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
     * Convert a returned JSON object to Fertigungsauftrag.
     */
    private convertItemFromServer(json: any): Fertigungsauftrag {
        const entity: Fertigungsauftrag = Object.assign(new Fertigungsauftrag(), json);
        return entity;
    }

    /**
     * Convert a Fertigungsauftrag to a JSON which can be sent to the server.
     */
    private convert(fertigungsauftrag: Fertigungsauftrag): Fertigungsauftrag {
        const copy: Fertigungsauftrag = Object.assign({}, fertigungsauftrag);
        return copy;
    }
}
