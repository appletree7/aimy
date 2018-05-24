import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Teil } from './teil.model';
import { TeilPopupService } from './teil-popup.service';
import { TeilService } from './teil.service';

@Component({
    selector: 'jhi-teil-dialog',
    templateUrl: './teil-dialog.component.html'
})
export class TeilDialogComponent implements OnInit {

    teil: Teil;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teilService: TeilService,
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
        if (this.teil.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teilService.update(this.teil));
        } else {
            this.subscribeToSaveResponse(
                this.teilService.create(this.teil));
        }
    }

    private subscribeToSaveResponse(result: Observable<Teil>) {
        result.subscribe((res: Teil) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Teil) {
        this.eventManager.broadcast({ name: 'teilListModification', content: 'OK'});
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
    selector: 'jhi-teil-popup',
    template: ''
})
export class TeilPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teilPopupService: TeilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teilPopupService
                    .open(TeilDialogComponent as Component, params['id']);
            } else {
                this.teilPopupService
                    .open(TeilDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
