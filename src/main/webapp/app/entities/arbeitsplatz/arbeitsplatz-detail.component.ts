import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Arbeitsplatz } from './arbeitsplatz.model';
import { ArbeitsplatzService } from './arbeitsplatz.service';

@Component({
    selector: 'jhi-arbeitsplatz-detail',
    templateUrl: './arbeitsplatz-detail.component.html'
})
export class ArbeitsplatzDetailComponent implements OnInit, OnDestroy {

    arbeitsplatz: Arbeitsplatz;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private arbeitsplatzService: ArbeitsplatzService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArbeitsplatzs();
    }

    load(id) {
        this.arbeitsplatzService.find(id).subscribe((arbeitsplatz) => {
            this.arbeitsplatz = arbeitsplatz;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArbeitsplatzs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'arbeitsplatzListModification',
            (response) => this.load(this.arbeitsplatz.id)
        );
    }
}
