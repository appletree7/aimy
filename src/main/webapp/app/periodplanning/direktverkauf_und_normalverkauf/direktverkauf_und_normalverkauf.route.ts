import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {DirektverkaufUndNormalverkaufComponent} from './direktverkauf_und_normalverkauf.component';

export const direktverkauf_und_normalverkaufRoute: Route = {
    path: 'direktverkauf_und_normalverkauf',
    component: DirektverkaufUndNormalverkaufComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.periodplanning.direktverkauf_und_normalverkauf'
    },
    canActivate: [UserRouteAccessService]
};
