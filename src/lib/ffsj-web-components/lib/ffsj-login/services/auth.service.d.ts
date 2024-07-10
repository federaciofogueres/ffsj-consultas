import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CensoService } from './censo.service';
import { EncoderService } from './encoder.service';
import * as i0 from "@angular/core";
export declare class AuthService {
    private router;
    private censoService;
    private encoderService;
    private cookieService;
    constructor(router: Router, censoService: CensoService, encoderService: EncoderService, cookieService: CookieService);
    checkToken(): boolean;
    checkExpireDateToken(token: string): boolean;
    saveToken(token: string): void;
    login(user: string, password: string): Promise<unknown>;
    getToken(): string;
    logout(): void;
    isLoggedIn(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
