import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PeriodStartComponent} from './period_start.component';

export const period_startRoute: Route = {
    path: 'period_start',
    component: PeriodStartComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.periodplanning.period_start'
    },
    canActivate: [UserRouteAccessService]
};
