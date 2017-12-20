import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Kennzahlen } from './kennzahlen.model';
import { KennzahlenService } from './kennzahlen.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-kennzahlen',
    templateUrl: './kennzahlen.component.html'
})
export class KennzahlenComponent implements OnInit, OnDestroy {
kennzahlens: Kennzahlen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private kennzahlenService: KennzahlenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.kennzahlenService.query().subscribe(
            (res: ResponseWrapper) => {
                this.kennzahlens = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInKennzahlens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Kennzahlen) {
        return item.id;
    }
    registerChangeInKennzahlens() {
        this.eventSubscriber = this.eventManager.subscribe('kennzahlenListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
