import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService, FfsjAlertService } from 'ffsj-web-components';
import { CookieService } from 'ngx-cookie-service';
import { AutorizacionesConsultasService, ConsultasService, OpcionRespuesta, RespuestasUsuariosService } from '../../../api';
import { ConsultasExtraService } from '../../services/consultas-extra.service';
import { NavigationService } from '../../services/navigation.service';
import { WINDOW } from '../../services/window.token';
import { ConsultaComponent } from './consulta.component';

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let autorizacionesService: jasmine.SpyObj<AutorizacionesConsultasService>;
  let router: jasmine.SpyObj<Router>;
  let consultasExtraService: ConsultasExtraService;
  let windowRef: { location: { assign: jasmine.Spy } };

  beforeEach(() => {
    autorizacionesService = jasmine.createSpyObj('AutorizacionesConsultasService', [
      'consultasIdConsultaAutorizadosGet',
      'consultasIdConsultaAutorizadosIdAsistenciaGet'
    ]);
    router = jasmine.createSpyObj('Router', ['navigateByUrl', 'getCurrentNavigation']);
    router.getCurrentNavigation.and.returnValue(null);

    windowRef = {
      location: {
        assign: jasmine.createSpy('assign')
      }
    };

    TestBed.configureTestingModule({
      imports: [ConsultaComponent],
      providers: [
        { provide: AutorizacionesConsultasService, useValue: autorizacionesService },
        { provide: ConsultasService, useValue: jasmine.createSpyObj('ConsultasService', ['consultasIdGet']) },
        { provide: RespuestasUsuariosService, useValue: jasmine.createSpyObj('RespuestasUsuariosService', ['respuestasUsuariosPost']) },
        { provide: Router, useValue: router },
        {
          provide: AuthService,
          useValue: {
            getIdUsuario: () => 44,
            getToken: () => 'header.eyJpZCI6NDR9.signature'
          }
        },
        {
          provide: FfsjAlertService,
          useValue: jasmine.createSpyObj('FfsjAlertService', ['success', 'danger', 'warning', 'info'])
        },
        { provide: CookieService, useValue: jasmine.createSpyObj('CookieService', ['get']) },
        { provide: WINDOW, useValue: windowRef },
        NavigationService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '10' }),
              queryParamMap: convertToParamMap({})
            }
          }
        }
      ]
    });

    component = TestBed.createComponent(ConsultaComponent).componentInstance;
    consultasExtraService = TestBed.inject(ConsultasExtraService);
    sessionStorage.clear();
  });

  it('redirecciona a returnUrl externo', () => {
    consultasExtraService.setReturnUrl('https://asambleas.hogueras.es/volver');

    component.redireccionar();

    expect(windowRef.location.assign).toHaveBeenCalledWith('https://asambleas.hogueras.es/volver');
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('usa fallback interno cuando no hay returnUrl', () => {
    component.redireccionar();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/consultas');
  });

  it('resuelve asistencias desde el estado almacenado', async () => {
    consultasExtraService.setAsistencias([11, 12]);
    const result = await (component as any).resolveAsistencias(9);
    expect(result).toEqual([11, 12]);
    expect(autorizacionesService.consultasIdConsultaAutorizadosGet).not.toHaveBeenCalled();
  });

  it('resuelve asistencias usando idAsociado legacy', async () => {
    autorizacionesService.consultasIdConsultaAutorizadosGet.and.returnValue(
      of({
        status: { status: 200 },
        autorizaciones: [{ idAsistencia: 7 }, { idAsistencia: 9 }]
      }) as any
    );

    const result = await (component as any).resolveAsistencias(5);
    expect(result).toEqual([7, 9]);
    expect(consultasExtraService.getAsistencias()).toEqual([7, 9]);
  });

  it('construye respuestas con idAsistencia', () => {
    component.asistenciasAutorizadas = [101];
    const respuesta: OpcionRespuesta = {
      id: 2,
      idPregunta: 3,
      respuesta: 'A',
      active: true
    };

    component.guardaRespuesta(respuesta);

    expect(component.respuestas[0].idAsistencia).toBe(101);
  });
});
