import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Arbeitsplatz } from './arbeitsplatz.model';
import { ArbeitsplatzPopupService } from './arbeitsplatz-popup.service';
import { ArbeitsplatzService } from './arbeitsplatz.service';

@Component({
    selector: 'jhi-arbeitsplatz-dialog',
    templateUrl: './arbeitsplatz-dialog.component.html'
})
export class ArbeitsplatzDialogComponent implements OnInit {

    arbeitsplatz: Arbeitsplatz;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private arbeitsplatzService: ArbeitsplatzService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.arbeitsplatz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.arbeitsplatzService.update(this.arbeitsplatz));
        } else {
            this.subscribeToSaveResponse(
                this.arbeitsplatzService.create(this.arbeitsplatz));
        }
    }

    private subscribeToSaveResponse(result: Observable<Arbeitsplatz>) {
        result.subscribe((res: Arbeitsplatz) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Arbeitsplatz) {
        this.eventManager.broadcast({ name: 'arbeitsplatzListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-arbeitsplatz-popup',
    template: ''
})
export class ArbeitsplatzPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private arbeitsplatzPopupService: ArbeitsplatzPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.arbeitsplatzPopupService
                    .open(ArbeitsplatzDialogComponent as Component, params['id']);
            } else {
                this.arbeitsplatzPopupService
                    .open(ArbeitsplatzDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
