import { TestBed } from '@angular/core/testing';
import { AuthService } from 'ffsj-web-components';
import { CookieService } from 'ngx-cookie-service';
import { ConsultasExtraService } from './consultas-extra.service';

describe('ConsultasExtraService', () => {
  let service: ConsultasExtraService;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ConsultasExtraService,
        {
          provide: AuthService,
          useValue: {
            getIdUsuario: () => 42
          }
        },
        { provide: CookieService, useValue: cookieService }
      ]
    });

    sessionStorage.clear();
    service = TestBed.inject(ConsultasExtraService);
  });

  it('devuelve asistencias del estado interno', () => {
    service.setAsistencias([5, 7]);
    expect(service.getAsistencias()).toEqual([5, 7]);
  });

  it('parsea asistencias desde cookie', () => {
    cookieService.get.and.returnValue('[1,2,3]');
    expect(service.getAsistencias()).toEqual([1, 2, 3]);
  });

  it('parsea asistencias desde parametros', () => {
    expect(service.parseAsistencias('4, 8')).toEqual([4, 8]);
    expect(service.parseAsistencias('[9,10]')).toEqual([9, 10]);
  });

  it('guarda returnUrl valido y evita enlaces legacy', () => {
    service.setReturnUrl('https://asambleas.hogueras.es/volver');
    expect(service.getReturnUrl()).toBe('https://asambleas.hogueras.es/volver');

    service.clearReturnUrl();
    service.setReturnUrl('https://plenos.hogueras.es/volver');
    expect(service.getReturnUrl()).toBeNull();
  });

  it('detecta urls externas', () => {
    expect(service.isExternalUrl('https://asambleas.hogueras.es')).toBeTrue();
    expect(service.isExternalUrl('/consultas')).toBeFalse();
  });
});
