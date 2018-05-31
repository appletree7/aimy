import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {ReihenfolgeUndLosgroesssensplittingComponent} from './reihenfolge_und_losgroesssensplitting.component';

export const reihenfolge_und_losgroesssensplittingRoute: Route = {
    path: 'reihenfolge_und_losgroeßensplitting',
    component: ReihenfolgeUndLosgroesssensplittingComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.periodplanning.reihenfolge_und_losgroeßensplitting'
    },
    canActivate: [UserRouteAccessService]
};
