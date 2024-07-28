import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "ffsj-web-components";
import { AutorizacionesConsultasService, ConsultasService, OpcionesRespuestasService, PreguntasService, RespuestasUsuariosService } from "../../api";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private consultasService: ConsultasService,
    private opcionesRespuestasService: OpcionesRespuestasService,
    private preguntasService: PreguntasService,
    private respuestasUsuariosService: RespuestasUsuariosService,
    private autorizacionesConsultasService: AutorizacionesConsultasService   
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()){
      let token = this.authService.getToken();
      this.consultasService.configuration.accessToken = token;
      this.consultasService.configuration.accessToken = token;
      this.opcionesRespuestasService.configuration.accessToken = token;
      this.preguntasService.configuration.accessToken = token;
      this.respuestasUsuariosService.configuration.accessToken = token;
      this.autorizacionesConsultasService.configuration.accessToken = token;
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
