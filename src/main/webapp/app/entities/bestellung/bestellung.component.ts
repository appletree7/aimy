import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Bestellung } from './bestellung.model';
import { BestellungService } from './bestellung.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bestellung',
    templateUrl: './bestellung.component.html'
})
export class BestellungComponent implements OnInit, OnDestroy {
bestellungs: Bestellung[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bestellungService: BestellungService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bestellungService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bestellungs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBestellungs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bestellung) {
        return item.id;
    }
    registerChangeInBestellungs() {
        this.eventSubscriber = this.eventManager.subscribe('bestellungListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
