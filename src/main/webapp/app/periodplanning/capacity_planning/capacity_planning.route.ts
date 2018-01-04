import { Route } from '@angular/router'; 
 
import { UserRouteAccessService } from '../../shared'; 
import { CapacityPlanningComponent } from './capacity_planning.component'; 
 
export const capacity_planningRoute: Route = { 
    path: 'capacity_planning', 
    component: CapacityPlanningComponent, 
    data: { 
        authorities: ['ROLE_USER','ROLE_ADMIN'], 
        pageTitle: 'global.menu.periodplanning.capacity_planning' 
    }, 
    canActivate: [UserRouteAccessService] 
};

