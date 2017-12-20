import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArbeitsplatzComponent } from './arbeitsplatz.component';
import { ArbeitsplatzDetailComponent } from './arbeitsplatz-detail.component';
import { ArbeitsplatzPopupComponent } from './arbeitsplatz-dialog.component';
import { ArbeitsplatzDeletePopupComponent } from './arbeitsplatz-delete-dialog.component';

export const arbeitsplatzRoute: Routes = [
    {
        path: 'arbeitsplatz',
        component: ArbeitsplatzComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.arbeitsplatz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'arbeitsplatz/:id',
        component: ArbeitsplatzDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.arbeitsplatz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const arbeitsplatzPopupRoute: Routes = [
    {
        path: 'arbeitsplatz-new',
        component: ArbeitsplatzPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.arbeitsplatz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'arbeitsplatz/:id/edit',
        component: ArbeitsplatzPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.arbeitsplatz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'arbeitsplatz/:id/delete',
        component: ArbeitsplatzDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.arbeitsplatz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
