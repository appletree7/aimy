/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AimyTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LosDetailComponent } from '../../../../../../main/webapp/app/entities/los/los-detail.component';
import { LosService } from '../../../../../../main/webapp/app/entities/los/los.service';
import { Los } from '../../../../../../main/webapp/app/entities/los/los.model';

describe('Component Tests', () => {

    describe('Los Management Detail Component', () => {
        let comp: LosDetailComponent;
        let fixture: ComponentFixture<LosDetailComponent>;
        let service: LosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AimyTestModule],
                declarations: [LosDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LosService,
                    JhiEventManager
                ]
            }).overrideTemplate(LosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Los(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.los).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
