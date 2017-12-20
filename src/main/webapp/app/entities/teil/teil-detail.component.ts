import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Teil } from './teil.model';
import { TeilService } from './teil.service';

@Component({
    selector: 'jhi-teil-detail',
    templateUrl: './teil-detail.component.html'
})
export class TeilDetailComponent implements OnInit, OnDestroy {

    teil: Teil;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teilService: TeilService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeils();
    }

    load(id) {
        this.teilService.find(id).subscribe((teil) => {
            this.teil = teil;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeils() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teilListModification',
            (response) => this.load(this.teil.id)
        );
    }
}
