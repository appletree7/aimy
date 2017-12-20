import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FertigungsauftragComponent } from './fertigungsauftrag.component';
import { FertigungsauftragDetailComponent } from './fertigungsauftrag-detail.component';
import { FertigungsauftragPopupComponent } from './fertigungsauftrag-dialog.component';
import { FertigungsauftragDeletePopupComponent } from './fertigungsauftrag-delete-dialog.component';

export const fertigungsauftragRoute: Routes = [
    {
        path: 'fertigungsauftrag',
        component: FertigungsauftragComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fertigungsauftrag/:id',
        component: FertigungsauftragDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fertigungsauftragPopupRoute: Routes = [
    {
        path: 'fertigungsauftrag-new',
        component: FertigungsauftragPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fertigungsauftrag/:id/edit',
        component: FertigungsauftragPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fertigungsauftrag/:id/delete',
        component: FertigungsauftragDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
