import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiParseLinks, JhiEventManager} from 'ng-jhipster';

import {Teil, Teiltyp} from '../../entities/teil';
import {TeilService} from '../../entities/teil';
import {Principal, ResponseWrapper} from '../../shared';

@Component({
  selector: 'jhi-direktverkauf-und-normalverkauf',
  templateUrl: './direktverkauf_und_normalverkauf.component.html',
  styles: []
})
export class DirektverkaufUndNormalverkaufComponent implements OnInit, OnDestroy {
    isSaving: boolean;
    teil: Teil;
    teils: Teil[];
    // teile: Teil[];
    currentAccount: any;
    eventSubscriber: Subscription;
    links: any;
    totalItems: any;
    queryCount: any;

  constructor( private teilService: TeilService,
               private parseLinks: JhiParseLinks,
               private activatedRoute: ActivatedRoute,
               private jhiAlertService: JhiAlertService,
               private eventManager: JhiEventManager,
               private principal: Principal) {}

    loadTeile() {
        const criteria = [
            {key: 'teiltyp.equals', value: 'PRODUKT'},
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.teilService.query({
            size: 60,
            criteria
            }
        )
            .subscribe((res: ResponseWrapper) => this.onSuccessTeil(res.json, res.headers)
          , (res: ResponseWrapper) => this.onError(res.json));
    }

    ngOnInit() {
        this.loadTeile();
      this.principal.identity().then((account) => {
          this.currentAccount = account;
      });
        this.isSaving = false;
        this.registerChangeInTeils();
  }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeils() {
        this.eventSubscriber = this.eventManager.subscribe('teilListModification', () => this.loadTeile());
    }

    previousState() {
        window.history.back();
    }

    trackId(index: number, item: Teil) {
        return item.id;
    }

    save() {
        const criteria = [
            {key: 'teiltyp.equals', value: 'PRODUKT'},
            {key: 'periode.equals', value: localStorage.getItem('aktuelleperiode')}
        ];
        this.teilService.query(
            {
                size: 60,
                criteria
            }
        )
            .subscribe((res: ResponseWrapper) => {
                // this.teils = res.json;
                for (const teil1 of this.teils) {
                    this.teil = this.teils.find((teil) => teil.nummer === teil1.nummer && teil.periode === parseInt(localStorage.getItem('aktuelleperiode'), 10));
                    if (this.teil !== undefined) {
                        this.teilService.update(this.teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    } else {
                        this.teilService.create(this.teil).subscribe((respond: Teil) =>
                            console.log(respond), () => this.onSaveError());
                    }
                }

            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onSuccessTeil(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.teils = data;
        if (this.teils === undefined || this.teils.length === 0) {
            this.teil = new Teil(undefined, Teiltyp.PRODUKT, parseInt(localStorage.getItem('aktuelleperiode'), 10), 1, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                undefined, undefined);
            this.teils.push(this.teil);
            this.teil = new Teil(undefined, Teiltyp.PRODUKT, parseInt(localStorage.getItem('aktuelleperiode'), 10), 2, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                undefined, undefined);
            this.teils.push(this.teil);
            this.teil = new Teil(undefined, Teiltyp.PRODUKT, parseInt(localStorage.getItem('aktuelleperiode'), 10), 3, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                undefined, undefined);
            this.teils.push(this.teil);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
