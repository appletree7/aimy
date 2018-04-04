import { Route } from '@angular/router'; 
 
import { UserRouteAccessService } from '../../shared'; 
import { PurchasedPartComponent } from './purchased_part.component'; 
import { CapacityPlanningComponent } from '../capacity_planning/capacity_planning.component'; 
 
export const purchased_partRoute: Route = 
    { 
    path: 'purchased_part', 
    component: PurchasedPartComponent, 
    data: { 
        authorities: ['ROLE_USER','ROLE_ADMIN'], 
        pageTitle: 'global.menu.periodplanning.purchased_part' 
    }, 
    canActivate: [UserRouteAccessService] 
    }
    /*
    {
        path: 'capacity_planning',
        component: CapacityPlanningComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'capacity_planning.title'
        },
        canActivate: [UserRouteAccessService],
    }
    */

;