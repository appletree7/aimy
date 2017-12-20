import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Bestellung } from './bestellung.model';
import { BestellungService } from './bestellung.service';

@Component({
    selector: 'jhi-bestellung-detail',
    templateUrl: './bestellung-detail.component.html'
})
export class BestellungDetailComponent implements OnInit, OnDestroy {

    bestellung: Bestellung;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bestellungService: BestellungService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBestellungs();
    }

    load(id) {
        this.bestellungService.find(id).subscribe((bestellung) => {
            this.bestellung = bestellung;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBestellungs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bestellungListModification',
            (response) => this.load(this.bestellung.id)
        );
    }
}
