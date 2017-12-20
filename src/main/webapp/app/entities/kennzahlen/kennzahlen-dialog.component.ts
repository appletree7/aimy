import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Kennzahlen } from './kennzahlen.model';
import { KennzahlenPopupService } from './kennzahlen-popup.service';
import { KennzahlenService } from './kennzahlen.service';

@Component({
    selector: 'jhi-kennzahlen-dialog',
    templateUrl: './kennzahlen-dialog.component.html'
})
export class KennzahlenDialogComponent implements OnInit {

    kennzahlen: Kennzahlen;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private kennzahlenService: KennzahlenService,
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
        if (this.kennzahlen.id !== undefined) {
            this.subscribeToSaveResponse(
                this.kennzahlenService.update(this.kennzahlen));
        } else {
            this.subscribeToSaveResponse(
                this.kennzahlenService.create(this.kennzahlen));
        }
    }

    private subscribeToSaveResponse(result: Observable<Kennzahlen>) {
        result.subscribe((res: Kennzahlen) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Kennzahlen) {
        this.eventManager.broadcast({ name: 'kennzahlenListModification', content: 'OK'});
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
    selector: 'jhi-kennzahlen-popup',
    template: ''
})
export class KennzahlenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private kennzahlenPopupService: KennzahlenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.kennzahlenPopupService
                    .open(KennzahlenDialogComponent as Component, params['id']);
            } else {
                this.kennzahlenPopupService
                    .open(KennzahlenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
