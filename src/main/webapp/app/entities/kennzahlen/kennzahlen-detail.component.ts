import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Kennzahlen } from './kennzahlen.model';
import { KennzahlenService } from './kennzahlen.service';

@Component({
    selector: 'jhi-kennzahlen-detail',
    templateUrl: './kennzahlen-detail.component.html'
})
export class KennzahlenDetailComponent implements OnInit, OnDestroy {

    kennzahlen: Kennzahlen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private kennzahlenService: KennzahlenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKennzahlens();
    }

    load(id) {
        this.kennzahlenService.find(id).subscribe((kennzahlen) => {
            this.kennzahlen = kennzahlen;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKennzahlens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'kennzahlenListModification',
            (response) => this.load(this.kennzahlen.id)
        );
    }
}
