import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Fertigungsauftrag } from './fertigungsauftrag.model';
import { FertigungsauftragService } from './fertigungsauftrag.service';

@Component({
    selector: 'jhi-fertigungsauftrag-detail',
    templateUrl: './fertigungsauftrag-detail.component.html'
})
export class FertigungsauftragDetailComponent implements OnInit, OnDestroy {

    fertigungsauftrag: Fertigungsauftrag;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fertigungsauftragService: FertigungsauftragService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFertigungsauftrags();
    }

    load(id) {
        this.fertigungsauftragService.find(id).subscribe((fertigungsauftrag) => {
            this.fertigungsauftrag = fertigungsauftrag;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFertigungsauftrags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fertigungsauftragListModification',
            (response) => this.load(this.fertigungsauftrag.id)
        );
    }
}
