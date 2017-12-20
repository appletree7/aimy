import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bestellung } from './bestellung.model';
import { BestellungPopupService } from './bestellung-popup.service';
import { BestellungService } from './bestellung.service';

@Component({
    selector: 'jhi-bestellung-delete-dialog',
    templateUrl: './bestellung-delete-dialog.component.html'
})
export class BestellungDeleteDialogComponent {

    bestellung: Bestellung;

    constructor(
        private bestellungService: BestellungService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bestellungService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bestellungListModification',
                content: 'Deleted an bestellung'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bestellung-delete-popup',
    template: ''
})
export class BestellungDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bestellungPopupService: BestellungPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bestellungPopupService
                .open(BestellungDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
