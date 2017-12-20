/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FertigungsauftragDetailComponent } from '../../../../../../main/webapp/app/entities/fertigungsauftrag/fertigungsauftrag-detail.component';
import { FertigungsauftragService } from '../../../../../../main/webapp/app/entities/fertigungsauftrag/fertigungsauftrag.service';
import { Fertigungsauftrag } from '../../../../../../main/webapp/app/entities/fertigungsauftrag/fertigungsauftrag.model';

describe('Component Tests', () => {

    describe('Fertigungsauftrag Management Detail Component', () => {
        let comp: FertigungsauftragDetailComponent;
        let fixture: ComponentFixture<FertigungsauftragDetailComponent>;
        let service: FertigungsauftragService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [FertigungsauftragDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FertigungsauftragService,
                    JhiEventManager
                ]
            }).overrideTemplate(FertigungsauftragDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FertigungsauftragDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FertigungsauftragService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Fertigungsauftrag(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.fertigungsauftrag).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
