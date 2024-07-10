import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../external-api/configuration';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class CensoService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Vuc28uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Zmc2otd2ViLWNvbXBvbmVudHMvc3JjL2xpYi9mZnNqLWxvZ2luL3NlcnZpY2VzL2NlbnNvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF5QixXQUFXLEVBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQVE5RCxNQUFNLE9BQU8sWUFBWTtJQU12QixZQUNVLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFMdEIsYUFBUSxHQUFHLDBEQUEwRCxDQUFDO1FBQ3pFLG1CQUFjLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFNM0MsQ0FBQztJQVdNLGVBQWUsQ0FBQyxVQUFlLE1BQU0sRUFBRSxpQkFBMEIsS0FBSztRQUUzRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBRWxDLHVDQUF1QztRQUN2QyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsTUFBTSxXQUFXLEdBQUcsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsS0FBSyxVQUFVO2dCQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUNyQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDRCxpQ0FBaUM7UUFDakMsSUFBSSxpQkFBaUIsR0FBYTtZQUM5QixrQkFBa0I7U0FDckIsQ0FBQztRQUNGLE1BQU0sd0JBQXdCLEdBQXVCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5RyxJQUFJLHdCQUF3QixJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ3hDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCx1Q0FBdUM7UUFFdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBdUIsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsZUFBZSxFQUN0RjtZQUNJLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWU7WUFDbkQsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsY0FBYyxFQUFFLGNBQWM7U0FDakMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQVlNLE9BQU8sQ0FBQyxJQUFhLEVBQUUsVUFBZSxNQUFNLEVBQUUsaUJBQTBCLEtBQUs7UUFFbEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUVsQyxJQUFJLGlCQUFpQixHQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxNQUFNLHdCQUF3QixHQUF1QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUcsSUFBSSx3QkFBd0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUN4QyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsdUNBQXVDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFhO1lBQ3ZCLGtCQUFrQjtTQUNyQixDQUFDO1FBQ0YsTUFBTSx1QkFBdUIsR0FBdUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RyxJQUFJLHVCQUF1QixJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFnQixNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxRQUFRLEVBQzNFO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlO1lBQ25ELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGNBQWMsRUFBRSxjQUFjO1NBQ2pDLENBQ0YsQ0FBQztJQUNKLENBQUM7K0dBMUZVLFlBQVk7bUhBQVosWUFBWSxjQUZYLE1BQU07OzRGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEV2ZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2V4dGVybmFsLWFwaS9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHsgUmVzcG9uc2VBc29jaWFjaW9uZXMgfSBmcm9tICcuLi9leHRlcm5hbC1hcGkvcmVzcG9uc2VBc29jaWFjaW9uZXMnO1xyXG5pbXBvcnQgeyBSZXNwb25zZVRva2VuIH0gZnJvbSAnLi4vZXh0ZXJuYWwtYXBpL3Jlc3BvbnNlVG9rZW4nO1xyXG5pbXBvcnQgeyBVc3VhcmlvIH0gZnJvbSAnLi4vZXh0ZXJuYWwtYXBpL3VzdWFyaW8nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Vuc29TZXJ2aWNlIHtcclxuXHJcbiAgcHJvdGVjdGVkIGJhc2VQYXRoID0gJ2h0dHBzOi8vY2Vuc28tYXBpLmhvZ3VlcmFzLmVzL2VtamYxL0NlbnNvLUhvZ3VlcmFzLzEuMC4wJztcclxuICBwdWJsaWMgZGVmYXVsdEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICBwdWJsaWMgY29uZmlndXJhdGlvbiA9IG5ldyBDb25maWd1cmF0aW9uKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50XHJcbiAgKSB7IFxyXG4gICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaXN0YXIgdG9kYXMgbGFzIGFzb2NpYWNpb25lc1xyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBvYnNlcnZlIHNldCB3aGV0aGVyIG9yIG5vdCB0byByZXR1cm4gdGhlIGRhdGEgT2JzZXJ2YWJsZSBhcyB0aGUgYm9keSwgcmVzcG9uc2Ugb3IgZXZlbnRzLiBkZWZhdWx0cyB0byByZXR1cm5pbmcgdGhlIGJvZHkuXHJcbiAgICogQHBhcmFtIHJlcG9ydFByb2dyZXNzIGZsYWcgdG8gcmVwb3J0IHJlcXVlc3QgYW5kIHJlc3BvbnNlIHByb2dyZXNzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc29jaWFjaW9uZXNHZXQob2JzZXJ2ZT86ICdib2R5JywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxSZXNwb25zZUFzb2NpYWNpb25lcz47XHJcbiAgcHVibGljIGFzb2NpYWNpb25lc0dldChvYnNlcnZlPzogJ3Jlc3BvbnNlJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8UmVzcG9uc2VBc29jaWFjaW9uZXM+PjtcclxuICBwdWJsaWMgYXNvY2lhY2lvbmVzR2V0KG9ic2VydmU/OiAnZXZlbnRzJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8UmVzcG9uc2VBc29jaWFjaW9uZXM+PjtcclxuICBwdWJsaWMgYXNvY2lhY2lvbmVzR2V0KG9ic2VydmU6IGFueSA9ICdib2R5JywgcmVwb3J0UHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZSApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgIGxldCBoZWFkZXJzID0gdGhpcy5kZWZhdWx0SGVhZGVycztcclxuXHJcbiAgICAvLyBhdXRoZW50aWNhdGlvbiAoQmVhcmVyQXV0aCkgcmVxdWlyZWRcclxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHR5cGVvZiB0aGlzLmNvbmZpZ3VyYXRpb24uYWNjZXNzVG9rZW4gPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgPyB0aGlzLmNvbmZpZ3VyYXRpb24uYWNjZXNzVG9rZW4oKVxyXG4gICAgICAgICAgICA6IHRoaXMuY29uZmlndXJhdGlvbi5hY2Nlc3NUb2tlbjtcclxuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyBhY2Nlc3NUb2tlbik7XHJcbiAgICB9XHJcbiAgICAvLyB0byBkZXRlcm1pbmUgdGhlIEFjY2VwdCBoZWFkZXJcclxuICAgIGxldCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICBdO1xyXG4gICAgY29uc3QgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uc2VsZWN0SGVhZGVyQWNjZXB0KGh0dHBIZWFkZXJBY2NlcHRzKTtcclxuICAgIGlmIChodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBY2NlcHQnLCBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRvIGRldGVybWluZSB0aGUgQ29udGVudC1UeXBlIGhlYWRlclxyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucmVxdWVzdDxSZXNwb25zZUFzb2NpYWNpb25lcz4oJ2dldCcsYCR7dGhpcy5iYXNlUGF0aH0vYXNvY2lhY2lvbmVzYCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5jb25maWd1cmF0aW9uLndpdGhDcmVkZW50aWFscyxcclxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcclxuICAgICAgICAgICAgb2JzZXJ2ZTogb2JzZXJ2ZSxcclxuICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHJlcG9ydFByb2dyZXNzXHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlYWxpemFyIGxhIGF1dGVudGlmaWNhY2nDs24gZGVsIHVzdWFyaW9cclxuICAgKiBcclxuICAgKiBAcGFyYW0gYm9keSBcclxuICAgKiBAcGFyYW0gb2JzZXJ2ZSBzZXQgd2hldGhlciBvciBub3QgdG8gcmV0dXJuIHRoZSBkYXRhIE9ic2VydmFibGUgYXMgdGhlIGJvZHksIHJlc3BvbnNlIG9yIGV2ZW50cy4gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIHRoZSBib2R5LlxyXG4gICAqIEBwYXJhbSByZXBvcnRQcm9ncmVzcyBmbGFnIHRvIHJlcG9ydCByZXF1ZXN0IGFuZCByZXNwb25zZSBwcm9ncmVzcy5cclxuICAgKi9cclxuICBwdWJsaWMgZG9Mb2dpbihib2R5OiBVc3VhcmlvLCBvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlVG9rZW4+O1xyXG4gIHB1YmxpYyBkb0xvZ2luKGJvZHk6IFVzdWFyaW8sIG9ic2VydmU/OiAncmVzcG9uc2UnLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxSZXNwb25zZVRva2VuPj47XHJcbiAgcHVibGljIGRvTG9naW4oYm9keTogVXN1YXJpbywgb2JzZXJ2ZT86ICdldmVudHMnLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxSZXNwb25zZVRva2VuPj47XHJcbiAgcHVibGljIGRvTG9naW4oYm9keTogVXN1YXJpbywgb2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlICk6IE9ic2VydmFibGU8YW55PiB7XHJcblxyXG4gICAgbGV0IGhlYWRlcnMgPSB0aGlzLmRlZmF1bHRIZWFkZXJzO1xyXG5cclxuICAgIGxldCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbJ2FwcGxpY2F0aW9uL2pzb24nXTtcclxuICAgIGNvbnN0IGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5jb25maWd1cmF0aW9uLnNlbGVjdEhlYWRlckFjY2VwdChodHRwSGVhZGVyQWNjZXB0cyk7XHJcbiAgICBpZiAoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQWNjZXB0JywgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0byBkZXRlcm1pbmUgdGhlIENvbnRlbnQtVHlwZSBoZWFkZXJcclxuICAgIGNvbnN0IGNvbnN1bWVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYXBwbGljYXRpb24vanNvbidcclxuICAgIF07XHJcbiAgICBjb25zdCBodHRwQ29udGVudFR5cGVTZWxlY3RlZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5jb25maWd1cmF0aW9uLnNlbGVjdEhlYWRlckNvbnRlbnRUeXBlKGNvbnN1bWVzKTtcclxuICAgIGlmIChodHRwQ29udGVudFR5cGVTZWxlY3RlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIGh0dHBDb250ZW50VHlwZVNlbGVjdGVkKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucmVxdWVzdDxSZXNwb25zZVRva2VuPigncG9zdCcsYCR7dGhpcy5iYXNlUGF0aH0vbG9naW5gLFxyXG4gICAgICB7XHJcbiAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLmNvbmZpZ3VyYXRpb24ud2l0aENyZWRlbnRpYWxzLFxyXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcclxuICAgICAgICAgIG9ic2VydmU6IG9ic2VydmUsXHJcbiAgICAgICAgICByZXBvcnRQcm9ncmVzczogcmVwb3J0UHJvZ3Jlc3NcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgICBcclxufVxyXG4iXX0=