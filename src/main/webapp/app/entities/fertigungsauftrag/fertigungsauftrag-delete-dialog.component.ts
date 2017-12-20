import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fertigungsauftrag } from './fertigungsauftrag.model';
import { FertigungsauftragPopupService } from './fertigungsauftrag-popup.service';
import { FertigungsauftragService } from './fertigungsauftrag.service';

@Component({
    selector: 'jhi-fertigungsauftrag-delete-dialog',
    templateUrl: './fertigungsauftrag-delete-dialog.component.html'
})
export class FertigungsauftragDeleteDialogComponent {

    fertigungsauftrag: Fertigungsauftrag;

    constructor(
        private fertigungsauftragService: FertigungsauftragService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fertigungsauftragService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fertigungsauftragListModification',
                content: 'Deleted an fertigungsauftrag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fertigungsauftrag-delete-popup',
    template: ''
})
export class FertigungsauftragDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fertigungsauftragPopupService: FertigungsauftragPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fertigungsauftragPopupService
                .open(FertigungsauftragDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
