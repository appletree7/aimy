import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Teil } from '../../entities/teil/teil.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InHouseProductionService {

    constructor(private http: Http) {}



    //save(newPassword: string): Observable<any> {
        //return this.http.post(SERVER_API_URL + 'api/account/change-password', newPassword);
    //}
}



/*
    private resourceUrl = SERVER_API_URL + 'api/teils';

    constructor(private http: Http) { }

    create(teil: Teil): Observable<Teil> {
        const copy = this.convert(teil);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(teil: Teil): Observable<Teil> {
        const copy = this.convert(teil);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Teil> {
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
     * Convert a returned JSON object to Teil.
     */
  /*
    private convertItemFromServer(json: any): Teil {
        const entity: Teil = Object.assign(new Teil(), json);
        return entity;
    }

    /**
     * Convert a Teil to a JSON which can be sent to the server.
     */
     
     /*
    private convert(teil: Teil): Teil {
        const copy: Teil = Object.assign({}, teil);
        return copy;
    }
    
    
}
*/