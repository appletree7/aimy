import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Modus } from './modus.model';
import { ModusService } from './modus.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-modus',
    templateUrl: './modus.component.html'
})
export class ModusComponent implements OnInit, OnDestroy {
moduses: Modus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private modusService: ModusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.modusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.moduses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInModuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Modus) {
        return item.id;
    }
    registerChangeInModuses() {
        this.eventSubscriber = this.eventManager.subscribe('modusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
