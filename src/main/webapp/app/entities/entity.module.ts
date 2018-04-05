import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AimyModusModule } from './modus/modus.module';
import { AimyTeilModule } from './teil/teil.module';
import { AimyBestellungModule } from './bestellung/bestellung.module';
import { AimyFertigungsauftragModule } from './fertigungsauftrag/fertigungsauftrag.module';
import { AimyArbeitsplatzModule } from './arbeitsplatz/arbeitsplatz.module';
import { AimyKennzahlenModule } from './kennzahlen/kennzahlen.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AimyModusModule,
        AimyTeilModule,
        AimyBestellungModule,
        AimyFertigungsauftragModule,
        AimyArbeitsplatzModule,
        AimyKennzahlenModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AimyEntityModule {}
