import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {AbschlussComponent} from './abschluss.component';

export const abschlussRoute: Route = {
    path: 'abschluss',
    component: AbschlussComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.periodplanning.abschluss'
    },
    canActivate: [UserRouteAccessService]
};
