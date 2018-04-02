import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModusComponent } from './modus.component';
import { ModusDetailComponent } from './modus-detail.component';
import { ModusPopupComponent } from './modus-dialog.component';
import { ModusDeletePopupComponent } from './modus-delete-dialog.component';

@Injectable()
export class ModusResolvePagingParams implements Resolve<any> {

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

export const modusRoute: Routes = [
    {
        path: 'modus',
        component: ModusComponent,
        resolve: {
            'pagingParams': ModusResolvePagingParams
        },
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
