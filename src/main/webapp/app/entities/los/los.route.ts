import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LosComponent } from './los.component';
import { LosDetailComponent } from './los-detail.component';
import { LosPopupComponent } from './los-dialog.component';
import { LosDeletePopupComponent } from './los-delete-dialog.component';

export const losRoute: Routes = [
    {
        path: 'los',
        component: LosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.los.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'los/:id',
        component: LosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.los.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const losPopupRoute: Routes = [
    {
        path: 'los-new',
        component: LosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.los.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'los/:id/edit',
        component: LosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.los.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'los/:id/delete',
        component: LosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.los.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
