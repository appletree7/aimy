import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PurchasedPartComponent} from './purchased_part.component';

export const purchased_partRoute: Route = {
    path: 'purchased_part',
    component: PurchasedPartComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.periodplanning.purchased_part'
    },
    canActivate: [UserRouteAccessService]
};
