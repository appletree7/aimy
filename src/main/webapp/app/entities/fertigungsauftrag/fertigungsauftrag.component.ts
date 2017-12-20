import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Fertigungsauftrag } from './fertigungsauftrag.model';
import { FertigungsauftragService } from './fertigungsauftrag.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-fertigungsauftrag',
    templateUrl: './fertigungsauftrag.component.html'
})
export class FertigungsauftragComponent implements OnInit, OnDestroy {
fertigungsauftrags: Fertigungsauftrag[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fertigungsauftragService: FertigungsauftragService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fertigungsauftragService.query().subscribe(
            (res: ResponseWrapper) => {
                this.fertigungsauftrags = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFertigungsauftrags();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Fertigungsauftrag) {
        return item.id;
    }
    registerChangeInFertigungsauftrags() {
        this.eventSubscriber = this.eventManager.subscribe('fertigungsauftragListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
