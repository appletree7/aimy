import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Teil } from './teil.model';
import { TeilPopupService } from './teil-popup.service';
import { TeilService } from './teil.service';

@Component({
    selector: 'jhi-teil-delete-dialog',
    templateUrl: './teil-delete-dialog.component.html'
})
export class TeilDeleteDialogComponent {

    teil: Teil;

    constructor(
        private teilService: TeilService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teilService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teilListModification',
                content: 'Deleted an teil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teil-delete-popup',
    template: ''
})
export class TeilDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teilPopupService: TeilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.teilPopupService
                .open(TeilDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
