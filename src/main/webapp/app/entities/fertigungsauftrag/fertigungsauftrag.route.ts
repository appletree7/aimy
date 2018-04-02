import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FertigungsauftragComponent } from './fertigungsauftrag.component';
import { FertigungsauftragDetailComponent } from './fertigungsauftrag-detail.component';
import { FertigungsauftragPopupComponent } from './fertigungsauftrag-dialog.component';
import { FertigungsauftragDeletePopupComponent } from './fertigungsauftrag-delete-dialog.component';

@Injectable()
export class FertigungsauftragResolvePagingParams implements Resolve<any> {

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

export const fertigungsauftragRoute: Routes = [
    {
        path: 'fertigungsauftrag',
        component: FertigungsauftragComponent,
        resolve: {
            'pagingParams': FertigungsauftragResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fertigungsauftrag/:id',
        component: FertigungsauftragDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fertigungsauftragPopupRoute: Routes = [
    {
        path: 'fertigungsauftrag-new',
        component: FertigungsauftragPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fertigungsauftrag/:id/edit',
        component: FertigungsauftragPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fertigungsauftrag/:id/delete',
        component: FertigungsauftragDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aimyApp.fertigungsauftrag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
