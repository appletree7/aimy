import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Fertigungsauftrag } from './fertigungsauftrag.model';
import { FertigungsauftragPopupService } from './fertigungsauftrag-popup.service';
import { FertigungsauftragService } from './fertigungsauftrag.service';
import { Teil, TeilService } from '../teil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-fertigungsauftrag-dialog',
    templateUrl: './fertigungsauftrag-dialog.component.html'
})
export class FertigungsauftragDialogComponent implements OnInit {

    fertigungsauftrag: Fertigungsauftrag;
    isSaving: boolean;

    teils: Teil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fertigungsauftragService: FertigungsauftragService,
        private teilService: TeilService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teilService.query()
            .subscribe((res: ResponseWrapper) => { this.teils = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fertigungsauftrag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fertigungsauftragService.update(this.fertigungsauftrag));
        } else {
            this.subscribeToSaveResponse(
                this.fertigungsauftragService.create(this.fertigungsauftrag));
        }
    }

    private subscribeToSaveResponse(result: Observable<Fertigungsauftrag>) {
        result.subscribe((res: Fertigungsauftrag) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Fertigungsauftrag) {
        this.eventManager.broadcast({ name: 'fertigungsauftragListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeilById(index: number, item: Teil) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-fertigungsauftrag-popup',
    template: ''
})
export class FertigungsauftragPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fertigungsauftragPopupService: FertigungsauftragPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fertigungsauftragPopupService
                    .open(FertigungsauftragDialogComponent as Component, params['id']);
            } else {
                this.fertigungsauftragPopupService
                    .open(FertigungsauftragDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
