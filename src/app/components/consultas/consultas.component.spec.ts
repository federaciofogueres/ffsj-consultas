import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService, FfsjAlertService } from 'ffsj-web-components';
import { CookieService } from 'ngx-cookie-service';
import { AutorizacionesConsultasService, ConsultasService } from '../../../api';
import { ConsultasExtraService } from '../../services/consultas-extra.service';
import { ConsultasComponent } from './consultas.component';

describe('ConsultasComponent', () => {
  let component: ConsultasComponent;
  let autorizacionesService: jasmine.SpyObj<AutorizacionesConsultasService>;
  let router: jasmine.SpyObj<Router>;
  let consultasExtraService: ConsultasExtraService;

  beforeEach(() => {
    autorizacionesService = jasmine.createSpyObj('AutorizacionesConsultasService', [
      'consultasIdConsultaAutorizadosGet',
      'consultasIdConsultaAutorizadosIdAsistenciaGet'
    ]);
    router = jasmine.createSpyObj('Router', ['navigate', 'getCurrentNavigation']);
    router.getCurrentNavigation.and.returnValue({
      extras: { state: { returnUrl: 'https://asambleas.hogueras.es/volver' } }
    } as any);

    TestBed.configureTestingModule({
      imports: [ConsultasComponent],
      providers: [
        { provide: AutorizacionesConsultasService, useValue: autorizacionesService },
        {
          provide: ConsultasService,
          useValue: jasmine.createSpyObj('ConsultasService', ['consultasAutorizadasGet'])
        },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({ asistencias: '1,2' })
            }
          }
        },
        {
          provide: AuthService,
          useValue: { getIdUsuario: () => 30 }
        },
        {
          provide: FfsjAlertService,
          useValue: jasmine.createSpyObj('FfsjAlertService', ['warning'])
        },
        { provide: CookieService, useValue: jasmine.createSpyObj('CookieService', ['get']) }
      ]
    });

    const consultasService = TestBed.inject(ConsultasService) as jasmine.SpyObj<ConsultasService>;
    consultasService.consultasAutorizadasGet.and.returnValue(of({ status: { status: 200 }, consultas: [] }) as any);

    component = TestBed.createComponent(ConsultasComponent).componentInstance;
    consultasExtraService = TestBed.inject(ConsultasExtraService);
    sessionStorage.clear();
  });

  it('captura returnUrl y asistencias en ngOnInit', () => {
    component.ngOnInit();
    expect(consultasExtraService.getReturnUrl()).toBe('https://asambleas.hogueras.es/volver');
    expect(consultasExtraService.getAsistencias()).toEqual([1, 2]);
  });

  it('resuelve asistencias desde el estado almacenado', async () => {
    component.idAsistencias = [7];
    component.idAsociado = 0;
    const result = await (component as any).resolveAsistenciasForConsulta(3);
    expect(result).toEqual([7]);
    expect(autorizacionesService.consultasIdConsultaAutorizadosGet).not.toHaveBeenCalled();
  });

  it('resuelve asistencias usando idAsociado legacy', async () => {
    component.idAsistencias = [];
    component.idAsociado = 33;
    autorizacionesService.consultasIdConsultaAutorizadosGet.and.returnValue(
      of({ status: { status: 200 }, autorizaciones: [{ idAsistencia: 4 }] }) as any
    );
    const result = await (component as any).resolveAsistenciasForConsulta(8);
    expect(result).toEqual([4]);
  });

  it('valida autorizacion con idAsistencia', async () => {
    component.idAsistencias = [1, 2];
    component.idAsociado = 0;
    autorizacionesService.consultasIdConsultaAutorizadosIdAsistenciaGet.and.callFake((_, asistencia: number) => {
      if (asistencia === 1) {
        return of({ status: { status: 200 }, autorizaciones: 0 }) as any;
      }
      return of({ status: { status: 200 }, autorizaciones: [{ idAsistencia: asistencia }] }) as any;
    });

    const result = await component.isUserAuthorized(12);
    expect(result).toBeTrue();
  });

  it('evita cargar consultas si no hay identificadores', async () => {
    const consultasService = TestBed.inject(ConsultasService) as jasmine.SpyObj<ConsultasService>;
    component.idAsistencias = [];
    component.idAsociado = 0;

    await component.loadConsultas();

    expect(consultasService.consultasAutorizadasGet).not.toHaveBeenCalled();
  });

  it('muestra estado ha votado cuando la consulta lo indica', () => {
    const fixture = TestBed.createComponent(ConsultasComponent);
    fixture.componentInstance.ngOnInit = () => {};
    fixture.detectChanges();

    fixture.componentInstance.consultas = [
      {
        id: 3,
        fecha: '2025-01-01',
        titulo: 'Consulta',
        votosTotales: 4,
        hasVoted: true,
        preguntas: []
      }
    ];
    fixture.componentInstance.loading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.consulta-card__badge--voted');
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain('Ha votado');
  });
});
