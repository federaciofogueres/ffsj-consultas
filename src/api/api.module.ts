import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AutorizacionesConsultasService } from './api/autorizacionesConsultas.service';
import { ConsultasService } from './api/consultas.service';
import { OpcionesRespuestasService } from './api/opcionesRespuestas.service';
import { PreguntasService } from './api/preguntas.service';
import { RespuestasUsuariosService } from './api/respuestasUsuarios.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AutorizacionesConsultasService,
    ConsultasService,
    OpcionesRespuestasService,
    PreguntasService,
    RespuestasUsuariosService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
