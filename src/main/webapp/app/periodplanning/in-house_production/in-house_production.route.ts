import { Route } from '@angular/router'; 
 
import { UserRouteAccessService } from '../../shared'; 
import { InHouseProductionComponent } from './in-house_production.component'; 
 
export const inhouse_productionRoute: Route = { 
    path: 'in-house_production', 
    component: InHouseProductionComponent, 
    data: { 
        authorities: ['ROLE_USER','ROLE_ADMIN'], 
        pageTitle: 'global.menu.periodplanning.in-house_production' 
    }, 
    canActivate: [UserRouteAccessService] 
};
