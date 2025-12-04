import { Injectable } from "@angular/core";
import { AuthService } from "ffsj-web-components";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class ConsultasExtraService {

    private idUsuario = -1;
    private asistenciasUsuario: number[] = [];

    constructor(
        private authService: AuthService,
        private cookieService: CookieService
    ) {
        this.loadPlenoFromCookies();
    }

    loadPlenoFromCookies() {
        this.idUsuario = this.authService.getIdUsuario();
    }

    getIdUsuario() {
        return this.idUsuario;
    }

    getAsistencias() {
        const asistencias = this.cookieService.get('asistencias');
        return this.asistenciasUsuario.length > 0 ? this.asistenciasUsuario : (asistencias ? JSON.parse(asistencias) : []);
    }

}