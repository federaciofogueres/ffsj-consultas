import * as i0 from '@angular/core';
import { Component, Injectable, EventEmitter, Input, Output } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import * as i2 from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as i1$1 from '@angular/router';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';
import * as i4 from 'ngx-cookie-service';
import * as i1$2 from '@angular/common';
import { CommonModule } from '@angular/common';

class FfsjWebComponentsComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjWebComponentsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.11", type: FfsjWebComponentsComponent, isStandalone: true, selector: "lib-ffsj-web-components", ngImport: i0, template: `
    <p>
      ffsj-web-components works!
    </p>
  `, isInline: true, styles: [""] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjWebComponentsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ffsj-web-components', standalone: true, imports: [], template: `
    <p>
      ffsj-web-components works!
    </p>
  ` }]
        }] });

class FfsjWebComponentsService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjWebComponentsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjWebComponentsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjWebComponentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class Configuration {
    constructor(configurationParameters = {}) {
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length == 0) {
            return undefined;
        }
        let type = contentTypes.find(x => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length == 0) {
            return undefined;
        }
        let type = accepts.find(x => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
}

class CensoService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.basePath = 'https://censo-api.hogueras.es/emjf1/Censo-Hogueras/1.0.0';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
    }
    asociacionesGet(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        return this.httpClient.request('get', `${this.basePath}/asociaciones`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    doLogin(body, observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        let httpHeaderAccepts = ['application/json'];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.request('post', `${this.basePath}/login`, {
            body: body,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: CensoService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: CensoService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: CensoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class EncoderService {
    constructor() {
        this.key = 'eFfFsJ2023*';
        this.iv = CryptoJS.enc.Utf8.parse('1234567890123456');
        this.key = 'eFfFsJ2023*';
        this.iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    }
    encryptPassword(data) {
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let encodedPassword = bcrypt.hashSync(data, salt);
        return encodedPassword;
    }
    checkPassword(password, encrypted) {
        return bcrypt.compareSync(password, encrypted);
    }
    // Método para encriptar datos de entrada
    encrypt(password) {
        const encrypted = CryptoJS.AES.encrypt(password, this.key, { iv: this.iv });
        return encrypted.toString();
    }
    // Método para desencriptar datos de entrada
    decrypt(passwordToDecrypt) {
        const decrypted = CryptoJS.AES.decrypt(passwordToDecrypt, this.key, { iv: this.iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: EncoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: EncoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: EncoderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class AuthService {
    constructor(router, censoService, encoderService, cookieService) {
        this.router = router;
        this.censoService = censoService;
        this.encoderService = encoderService;
        this.cookieService = cookieService;
    }
    checkToken() {
        return !this.checkExpireDateToken(this.encoderService.decrypt(this.cookieService.get('token')));
    }
    checkExpireDateToken(token) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    saveToken(token) {
        this.cookieService.set('token', this.encoderService.encrypt(token));
    }
    async login(user, password) {
        let usuario = {
            user,
            password: this.encoderService.encrypt(password)
        };
        return new Promise(async (resolve, reject) => {
            this.censoService.doLogin(usuario).subscribe({
                next: (res) => {
                    console.log(res);
                    this.saveToken(res.token);
                    resolve(true);
                },
                error: error => {
                    console.log(error);
                    reject(error);
                }
            });
        });
    }
    getToken() {
        let token = '';
        if (this.cookieService.get('token')) {
            token = this.encoderService.decrypt(this.cookieService.get('token'));
        }
        return token;
    }
    logout() {
        this.cookieService.delete('token');
        this.router.navigateByUrl('login');
    }
    isLoggedIn() {
        const token = this.cookieService.get('token');
        return token !== null && token !== '' ? this.checkToken() : false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: AuthService, deps: [{ token: i1$1.Router }, { token: CensoService }, { token: EncoderService }, { token: i4.CookieService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: AuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1$1.Router }, { type: CensoService }, { type: EncoderService }, { type: i4.CookieService }] });

class FfsjLoginComponent {
    constructor(authService) {
        this.authService = authService;
        this.title = 'Iniciar Sesión';
        this.subtitle = 'Acceso a administración';
        this.logStatus = new EventEmitter();
        this.username = new FormControl('');
        this.password = new FormControl('');
        this.loading = false;
    }
    // ngOnInit() {
    //   if (this.authService.isLoggedIn()) {
    //     this.route.navigateByUrl('home');
    //   }
    // }
    async login() {
        console.log('Doing Login -> ', this.username.value, this.password.value);
        this.loading = true;
        if (this.username.valid && this.password.valid) {
            this.authService.login(this.username.value, this.password.value)
                .then((res) => {
                this.loading = false;
                console.log(res);
                console.log('Login success');
                this.logStatus.emit(true);
            })
                .catch(() => {
                this.loading = false;
                console.log('Login failed');
                this.logStatus.emit(false);
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjLoginComponent, deps: [{ token: AuthService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.11", type: FfsjLoginComponent, isStandalone: true, selector: "lib-ffsj-login", inputs: { title: "title", subtitle: "subtitle" }, outputs: { logStatus: "logStatus" }, ngImport: i0, template: "<div>\r\n    <div class=\"container mt-4 login-container\">\r\n    \r\n        <div class=\"row banner\">\r\n        <h1>\r\n            <img src=\"https://intranet.hogueras.es/wp-content/uploads/2016/12/logofede.png\" class=\"img-fluid\" alt=\"\">\r\n            <span style=\"color: #dd5a43 !important\">{{title}}</span>\r\n        </h1>\r\n        <h4 style=\"color: #478fca !important; text-align: center;\">\u00A9 Federaci\u00F3 de Les Fogueres de Sant Joan</h4>\r\n        </div>\r\n    \r\n        <div class=\"row\">\r\n        <h4 class=\"titulo-consultas\" style=\"color: #478fca !important;\">\r\n            {{subtitle}}\r\n        </h4>\r\n        </div>\r\n        <div class=\"row my-3\">\r\n        <label for=\"username\">Usuario</label>\r\n        <input type=\"text\" id=\"username\" class=\"form-control\" [formControl]=\"username\" value=\"\">\r\n        </div>\r\n        <div class=\"row mb-3\">\r\n        <label for=\"username\">Contrase\u00F1a</label>\r\n        <input type=\"password\" id=\"password\" class=\"form-control\" [formControl]=\"password\" value=\"\">\r\n        </div>\r\n        <div class=\"row submit-button mt-2\">\r\n        <button (click)=\"login()\">Iniciar sesi\u00F3n</button>\r\n        </div>\r\n    \r\n    </div>\r\n</div>", styles: [".login-container{max-width:350px}.login-container .row.banner{text-align:center}.login-container .row.banner img{max-height:75px}.submit-button button{margin:auto;color:#fff;background-color:#0033a0;border:1px solid #0033A0;font-weight:700;padding:10px 20px;border-radius:25px;width:auto;max-width:80%}.row.banner{text-align:center}.row.banner img{max-height:75px}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: HttpClientModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjLoginComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ffsj-login', standalone: true, imports: [
                        ReactiveFormsModule,
                        HttpClientModule
                    ], template: "<div>\r\n    <div class=\"container mt-4 login-container\">\r\n    \r\n        <div class=\"row banner\">\r\n        <h1>\r\n            <img src=\"https://intranet.hogueras.es/wp-content/uploads/2016/12/logofede.png\" class=\"img-fluid\" alt=\"\">\r\n            <span style=\"color: #dd5a43 !important\">{{title}}</span>\r\n        </h1>\r\n        <h4 style=\"color: #478fca !important; text-align: center;\">\u00A9 Federaci\u00F3 de Les Fogueres de Sant Joan</h4>\r\n        </div>\r\n    \r\n        <div class=\"row\">\r\n        <h4 class=\"titulo-consultas\" style=\"color: #478fca !important;\">\r\n            {{subtitle}}\r\n        </h4>\r\n        </div>\r\n        <div class=\"row my-3\">\r\n        <label for=\"username\">Usuario</label>\r\n        <input type=\"text\" id=\"username\" class=\"form-control\" [formControl]=\"username\" value=\"\">\r\n        </div>\r\n        <div class=\"row mb-3\">\r\n        <label for=\"username\">Contrase\u00F1a</label>\r\n        <input type=\"password\" id=\"password\" class=\"form-control\" [formControl]=\"password\" value=\"\">\r\n        </div>\r\n        <div class=\"row submit-button mt-2\">\r\n        <button (click)=\"login()\">Iniciar sesi\u00F3n</button>\r\n        </div>\r\n    \r\n    </div>\r\n</div>", styles: [".login-container{max-width:350px}.login-container .row.banner{text-align:center}.login-container .row.banner img{max-height:75px}.submit-button button{margin:auto;color:#fff;background-color:#0033a0;border:1px solid #0033A0;font-weight:700;padding:10px 20px;border-radius:25px;width:auto;max-width:80%}.row.banner{text-align:center}.row.banner img{max-height:75px}\n"] }]
        }], ctorParameters: () => [{ type: AuthService }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], logStatus: [{
                type: Output
            }] } });

class AuthGuard {
    constructor(authService, router, censoService) {
        this.authService = authService;
        this.router = router;
        this.censoService = censoService;
    }
    canActivate() {
        if (this.authService.isLoggedIn()) {
            let token = this.authService.getToken();
            this.censoService.configuration.accessToken = token;
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: AuthGuard, deps: [{ token: AuthService }, { token: i1$1.Router }, { token: CensoService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: AuthGuard, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: AuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: AuthService }, { type: i1$1.Router }, { type: CensoService }] });

class FfsjSpinnerComponent {
    constructor() {
        this.fullscreen = false;
        this.imagePath = '../../../assets/img/fede.png';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.11", type: FfsjSpinnerComponent, isStandalone: true, selector: "lib-ffsj-spinner", inputs: { fullscreen: "fullscreen" }, ngImport: i0, template: "<div class=\"bg-dark preloader\" [ngClass]=\"fullscreen ? ['full-size'] : ['component']\">\r\n    <div class=\"spinner-container\">\r\n        <img [src]=\"imagePath\">\r\n    </div>\r\n    <div class=\"loader\">\r\n        <span></span>\r\n    </div>\r\n</div>", styles: [".full-size{position:fixed}.component{position:relative}.preloader{top:0;left:0;margin:0 auto;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:997}.preloader .spinner-container{width:200px;height:200px;display:flex;justify-content:center;align-items:center}.preloader .spinner-container img{width:130px;height:130px;z-index:999;position:relative}.preloader .loader{position:absolute;width:200px;height:200px;border:4px solid transparent;overflow:hidden;border-radius:50%}.preloader .loader:before{content:\"\";position:absolute;inset:10px;z-index:998;background:#fff;border-radius:50%;border:2px solid transparent}.preloader .loader>span{position:absolute;width:100%;height:100%;border-radius:50%;background-image:linear-gradient(-225deg,#0245ff,#00e1ff,#5edfff);filter:blur(20px);animation:animate .5s linear infinite}@keyframes animate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.11", ngImport: i0, type: FfsjSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ffsj-spinner', standalone: true, imports: [CommonModule], template: "<div class=\"bg-dark preloader\" [ngClass]=\"fullscreen ? ['full-size'] : ['component']\">\r\n    <div class=\"spinner-container\">\r\n        <img [src]=\"imagePath\">\r\n    </div>\r\n    <div class=\"loader\">\r\n        <span></span>\r\n    </div>\r\n</div>", styles: [".full-size{position:fixed}.component{position:relative}.preloader{top:0;left:0;margin:0 auto;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:997}.preloader .spinner-container{width:200px;height:200px;display:flex;justify-content:center;align-items:center}.preloader .spinner-container img{width:130px;height:130px;z-index:999;position:relative}.preloader .loader{position:absolute;width:200px;height:200px;border:4px solid transparent;overflow:hidden;border-radius:50%}.preloader .loader:before{content:\"\";position:absolute;inset:10px;z-index:998;background:#fff;border-radius:50%;border:2px solid transparent}.preloader .loader>span{position:absolute;width:100%;height:100%;border-radius:50%;background-image:linear-gradient(-225deg,#0245ff,#00e1ff,#5edfff);filter:blur(20px);animation:animate .5s linear infinite}@keyframes animate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { fullscreen: [{
                type: Input
            }] } });

/*
 * Public API Surface of ffsj-web-components
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthGuard, AuthService, FfsjLoginComponent, FfsjSpinnerComponent, FfsjWebComponentsComponent, FfsjWebComponentsService };
//# sourceMappingURL=ffsj-web-components.mjs.map
