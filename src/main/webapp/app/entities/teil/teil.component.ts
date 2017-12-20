import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Teil } from './teil.model';
import { TeilService } from './teil.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-teil',
    templateUrl: './teil.component.html'
})
export class TeilComponent implements OnInit, OnDestroy {
teils: Teil[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private teilService: TeilService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.teilService.query().subscribe(
            (res: ResponseWrapper) => {
                this.teils = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTeils();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Teil) {
        return item.id;
    }
    registerChangeInTeils() {
        this.eventSubscriber = this.eventManager.subscribe('teilListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
