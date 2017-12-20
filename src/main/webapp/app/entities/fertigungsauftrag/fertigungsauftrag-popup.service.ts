import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Fertigungsauftrag } from './fertigungsauftrag.model';
import { FertigungsauftragService } from './fertigungsauftrag.service';

@Injectable()
export class FertigungsauftragPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private fertigungsauftragService: FertigungsauftragService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.fertigungsauftragService.find(id).subscribe((fertigungsauftrag) => {
                    this.ngbModalRef = this.fertigungsauftragModalRef(component, fertigungsauftrag);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fertigungsauftragModalRef(component, new Fertigungsauftrag());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fertigungsauftragModalRef(component: Component, fertigungsauftrag: Fertigungsauftrag): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fertigungsauftrag = fertigungsauftrag;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
