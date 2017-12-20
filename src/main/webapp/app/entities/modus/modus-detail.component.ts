import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Modus } from './modus.model';
import { ModusService } from './modus.service';

@Component({
    selector: 'jhi-modus-detail',
    templateUrl: './modus-detail.component.html'
})
export class ModusDetailComponent implements OnInit, OnDestroy {

    modus: Modus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private modusService: ModusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModuses();
    }

    load(id) {
        this.modusService.find(id).subscribe((modus) => {
            this.modus = modus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modusListModification',
            (response) => this.load(this.modus.id)
        );
    }
}
