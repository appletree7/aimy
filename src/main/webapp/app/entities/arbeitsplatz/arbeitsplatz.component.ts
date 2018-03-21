import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Arbeitsplatz } from './arbeitsplatz.model';
import { ArbeitsplatzService } from './arbeitsplatz.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-arbeitsplatz',
    templateUrl: './arbeitsplatz.component.html'
})
export class ArbeitsplatzComponent implements OnInit, OnDestroy {
arbeitsplatzs: Arbeitsplatz[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private arbeitsplatzService: ArbeitsplatzService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.arbeitsplatzService.query().subscribe(
            (res: ResponseWrapper) => {
                this.arbeitsplatzs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInArbeitsplatzs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Arbeitsplatz) {
        return item.id;
    }
    registerChangeInArbeitsplatzs() {
        this.eventSubscriber = this.eventManager.subscribe('arbeitsplatzListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
