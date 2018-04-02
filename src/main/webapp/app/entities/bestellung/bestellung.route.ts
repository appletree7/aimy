import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BestellungComponent } from './bestellung.component';
import { BestellungDetailComponent } from './bestellung-detail.component';
import { BestellungPopupComponent } from './bestellung-dialog.component';
import { BestellungDeletePopupComponent } from './bestellung-delete-dialog.component';

@Injectable()
export class BestellungResolvePagingParams implements Resolve<any> {

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

export const bestellungRoute: Routes = [
    {
        path: 'bestellung',
        component: BestellungComponent,
        resolve: {
            'pagingParams': BestellungResolvePagingParams
        },
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
