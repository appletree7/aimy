import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArbeitsplatzComponent } from './arbeitsplatz.component';
import { ArbeitsplatzDetailComponent } from './arbeitsplatz-detail.component';
import { ArbeitsplatzPopupComponent } from './arbeitsplatz-dialog.component';
import { ArbeitsplatzDeletePopupComponent } from './arbeitsplatz-delete-dialog.component';

@Injectable()
export class ArbeitsplatzResolvePagingParams implements Resolve<any> {

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

export const arbeitsplatzRoute: Routes = [
    {
        path: 'arbeitsplatz',
        component: ArbeitsplatzComponent,
        resolve: {
            'pagingParams': ArbeitsplatzResolvePagingParams
        },
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
