import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Los } from './los.model';
import { LosService } from './los.service';

@Component({
    selector: 'jhi-los-detail',
    templateUrl: './los-detail.component.html'
})
export class LosDetailComponent implements OnInit, OnDestroy {

    los: Los;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private losService: LosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLos();
    }

    load(id) {
        this.losService.find(id).subscribe((los) => {
            this.los = los;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'losListModification',
            (response) => this.load(this.los.id)
        );
    }
}
