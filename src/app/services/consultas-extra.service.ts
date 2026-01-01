import { Injectable } from "@angular/core";
import { AuthService } from "ffsj-web-components";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class ConsultasExtraService {

    private idUsuario = -1;
    private asistenciasUsuario: number[] = [];
    private readonly returnUrlKey = 'consultasReturnUrl';

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

    setAsistencias(asistencias: number[]) {
        const filtered = asistencias.filter(value => Number.isFinite(value) && value > 0);
        this.asistenciasUsuario = Array.from(new Set(filtered));
    }

    getAsistencias() {
        if (this.asistenciasUsuario.length > 0) {
            return this.asistenciasUsuario;
        }

        const asistencias = this.cookieService.get('asistencias');
        if (!asistencias) {
            return [];
        }

        try {
            const parsed = JSON.parse(asistencias);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    applyAsistenciasFromParam(rawValue: string | null) {
        if (!rawValue) {
            return;
        }

        const parsed = this.parseAsistencias(rawValue);
        if (parsed.length > 0) {
            this.setAsistencias(parsed);
        }
    }

    parseAsistencias(rawValue: string): number[] {
        try {
            const parsed = JSON.parse(rawValue);
            if (Array.isArray(parsed)) {
                return parsed.map(value => Number(value)).filter(value => Number.isFinite(value) && value > 0);
            }
        } catch {
            // Fall back to comma-separated parsing.
        }

        return rawValue
            .split(',')
            .map(value => Number(value.trim()))
            .filter(value => Number.isFinite(value) && value > 0);
    }

    setReturnUrl(rawReturnUrl: string | null) {
        const returnUrl = this.normalizeReturnUrl(rawReturnUrl);
        if (!returnUrl) {
            return;
        }

        const storage = this.getStorage();
        if (!storage) {
            return;
        }
        storage.setItem(this.returnUrlKey, returnUrl);
    }

    getReturnUrl() {
        const storage = this.getStorage();
        return storage ? storage.getItem(this.returnUrlKey) : null;
    }

    clearReturnUrl() {
        const storage = this.getStorage();
        if (!storage) {
            return;
        }
        storage.removeItem(this.returnUrlKey);
    }

    getReturnUrlOrFallback(fallbackUrl: string) {
        return this.getReturnUrl() || fallbackUrl;
    }

    isExternalUrl(url: string) {
        return /^https?:\/\//i.test(url);
    }

    private normalizeReturnUrl(rawValue: string | null) {
        if (!rawValue) {
            return null;
        }

        const trimmed = rawValue.trim();
        if (!trimmed) {
            return null;
        }

        if (trimmed.toLowerCase().includes('plenos')) {
            return null;
        }

        return trimmed;
    }

    private getStorage() {
        return typeof sessionStorage === 'undefined' ? null : sessionStorage;
    }

}
