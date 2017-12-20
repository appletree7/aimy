import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Arbeitsplatz } from './arbeitsplatz.model';
import { ArbeitsplatzService } from './arbeitsplatz.service';

@Injectable()
export class ArbeitsplatzPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private arbeitsplatzService: ArbeitsplatzService

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
                this.arbeitsplatzService.find(id).subscribe((arbeitsplatz) => {
                    this.ngbModalRef = this.arbeitsplatzModalRef(component, arbeitsplatz);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.arbeitsplatzModalRef(component, new Arbeitsplatz());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    arbeitsplatzModalRef(component: Component, arbeitsplatz: Arbeitsplatz): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.arbeitsplatz = arbeitsplatz;
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
