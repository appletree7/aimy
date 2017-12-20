import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TeilComponent } from './teil.component';
import { TeilDetailComponent } from './teil-detail.component';
import { TeilPopupComponent } from './teil-dialog.component';
import { TeilDeletePopupComponent } from './teil-delete-dialog.component';

export const teilRoute: Routes = [
    {
        path: 'teil',
        component: TeilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.teil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'teil/:id',
        component: TeilDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.teil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teilPopupRoute: Routes = [
    {
        path: 'teil-new',
        component: TeilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.teil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teil/:id/edit',
        component: TeilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.teil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'teil/:id/delete',
        component: TeilDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.teil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
