import { Routes } from '@angular/router';
import { purchased_partRoute } from './purchased_part/purchased_part.route';
import { inhouse_productionRoute } from './in-house_production/in-house_production.route';
import { capacity_planningRoute } from './capacity_planning/capacity_planning.route';
import { period_startRoute } from './period_start/period_start.route';
import { direktverkauf_und_normalverkaufRoute } from './direktverkauf_und_normalverkauf/direktverkauf_und_normalverkauf.route';
import {abschlussRoute} from './abschluss/abschluss.route';

const PERIODPLANNING_ROUTES = [
    purchased_partRoute,
    inhouse_productionRoute,
    capacity_planningRoute,
    period_startRoute,
    direktverkauf_und_normalverkaufRoute,
    abschlussRoute
];

 /* export const kaufteildispositionState: Routes = [{
    path: '',
    data: {},
    children: KAUFTEILEDISPOSITION_ROUTES
 }];
 */
/* export const kaufteildispositionState: Routes = [
  { path: '', data: {}},
  { path: 'kaufteile', component: KaufteileComponent }
];
*/
export const periodplanningState: Routes = [{
    path: '',
    children: PERIODPLANNING_ROUTES
}];
