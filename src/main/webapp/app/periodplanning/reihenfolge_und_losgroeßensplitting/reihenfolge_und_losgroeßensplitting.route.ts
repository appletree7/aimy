import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {ReihenfolgeUndLosgroeßensplittingComponent} from './reihenfolge_und_losgroeßensplitting.component';

export const reihenfolge_und_losgroeßensplittingRoute: Route = {
    path: 'reihenfolge_und_losgroeßensplitting',
    component: ReihenfolgeUndLosgroeßensplittingComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.periodplanning.reihenfolge_und_losgroeßensplitting'
    },
    canActivate: [UserRouteAccessService]
};
