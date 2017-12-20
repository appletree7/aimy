import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BestellungComponent } from './bestellung.component';
import { BestellungDetailComponent } from './bestellung-detail.component';
import { BestellungPopupComponent } from './bestellung-dialog.component';
import { BestellungDeletePopupComponent } from './bestellung-delete-dialog.component';

export const bestellungRoute: Routes = [
    {
        path: 'bestellung',
        component: BestellungComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.bestellung.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bestellung/:id',
        component: BestellungDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.bestellung.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bestellungPopupRoute: Routes = [
    {
        path: 'bestellung-new',
        component: BestellungPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.bestellung.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bestellung/:id/edit',
        component: BestellungPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.bestellung.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bestellung/:id/delete',
        component: BestellungDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.bestellung.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
