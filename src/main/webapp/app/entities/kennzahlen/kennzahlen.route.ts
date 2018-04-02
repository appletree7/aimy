import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { KennzahlenComponent } from './kennzahlen.component';
import { KennzahlenDetailComponent } from './kennzahlen-detail.component';
import { KennzahlenPopupComponent } from './kennzahlen-dialog.component';
import { KennzahlenDeletePopupComponent } from './kennzahlen-delete-dialog.component';

@Injectable()
export class KennzahlenResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const kennzahlenRoute: Routes = [
    {
        path: 'kennzahlen',
        component: KennzahlenComponent,
        resolve: {
            'pagingParams': KennzahlenResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.kennzahlen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'kennzahlen/:id',
        component: KennzahlenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.kennzahlen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const kennzahlenPopupRoute: Routes = [
    {
        path: 'kennzahlen-new',
        component: KennzahlenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.kennzahlen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'kennzahlen/:id/edit',
        component: KennzahlenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.kennzahlen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'kennzahlen/:id/delete',
        component: KennzahlenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.kennzahlen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
