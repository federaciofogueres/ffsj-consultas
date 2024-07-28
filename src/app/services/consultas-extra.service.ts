import { Injectable } from "@angular/core";
import { AuthService } from "ffsj-web-components";

@Injectable({
    providedIn: 'root'
  })
export class ConsultasExtraService {

    private idUsuario = -1;

    constructor(
        private authService: AuthService
    ){
        this.loadPlenoFromCookies();
    }

    loadPlenoFromCookies() {
        this.idUsuario = this.authService.getIdUsuario();
    }

    getIdUsuario() {
        return this.idUsuario;
    }

}