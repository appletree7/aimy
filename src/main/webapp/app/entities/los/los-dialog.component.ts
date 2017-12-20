import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Los } from './los.model';
import { LosPopupService } from './los-popup.service';
import { LosService } from './los.service';

@Component({
    selector: 'jhi-los-dialog',
    templateUrl: './los-dialog.component.html'
})
export class LosDialogComponent implements OnInit {

    los: Los;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private losService: LosService,
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
        if (this.los.id !== undefined) {
            this.subscribeToSaveResponse(
                this.losService.update(this.los));
        } else {
            this.subscribeToSaveResponse(
                this.losService.create(this.los));
        }
    }

    private subscribeToSaveResponse(result: Observable<Los>) {
        result.subscribe((res: Los) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Los) {
        this.eventManager.broadcast({ name: 'losListModification', content: 'OK'});
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
    selector: 'jhi-los-popup',
    template: ''
})
export class LosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private losPopupService: LosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.losPopupService
                    .open(LosDialogComponent as Component, params['id']);
            } else {
                this.losPopupService
                    .open(LosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
