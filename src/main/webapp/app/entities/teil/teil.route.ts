import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TeilComponent } from './teil.component';
import { TeilDetailComponent } from './teil-detail.component';
import { TeilPopupComponent } from './teil-dialog.component';
import { TeilDeletePopupComponent } from './teil-delete-dialog.component';

@Injectable()
export class TeilResolvePagingParams implements Resolve<any> {

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

export const teilRoute: Routes = [
    {
        path: 'teil',
        component: TeilComponent,
        resolve: {
            'pagingParams': TeilResolvePagingParams
        },
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
