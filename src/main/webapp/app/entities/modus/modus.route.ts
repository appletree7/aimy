import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModusComponent } from './modus.component';
import { ModusDetailComponent } from './modus-detail.component';
import { ModusPopupComponent } from './modus-dialog.component';
import { ModusDeletePopupComponent } from './modus-delete-dialog.component';

export const modusRoute: Routes = [
    {
        path: 'modus',
        component: ModusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.modus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modus/:id',
        component: ModusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.modus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modusPopupRoute: Routes = [
    {
        path: 'modus-new',
        component: ModusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.modus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modus/:id/edit',
        component: ModusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.modus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modus/:id/delete',
        component: ModusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.modus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
