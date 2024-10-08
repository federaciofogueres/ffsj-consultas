/**
 * Consultas API
 * API para gestionar consultas de usuarios.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import {
    HttpClient,
    HttpEvent,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';

import { OpcionRespuesta } from '../model/opcionRespuesta';
import { ResponseOpcionRespuesta } from '../model/responseOpcionRespuesta';
import { ResponseOpcionesRespuestas } from '../model/responseOpcionesRespuestas';
import { ResponseStatus } from '../model/responseStatus';

import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';


@Injectable({providedIn: 'root'})
export class OpcionesRespuestasService {

    protected basePath = 'https://virtserver.swaggerhub.com/FFSJ/APP-Plenos/1.0.0';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Obtener todas las opciones de respuesta
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public opcionesRespuestasGet(observe?: 'body', reportProgress?: boolean): Observable<ResponseOpcionesRespuestas>;
    public opcionesRespuestasGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseOpcionesRespuestas>>;
    public opcionesRespuestasGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseOpcionesRespuestas>>;
    public opcionesRespuestasGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ResponseOpcionesRespuestas>('get',`${this.basePath}/opcionesRespuestas`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Eliminar una opción de respuesta por ID
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public opcionesRespuestasIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
    public opcionesRespuestasIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
    public opcionesRespuestasIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
    public opcionesRespuestasIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling opcionesRespuestasIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ResponseStatus>('delete',`${this.basePath}/opcionesRespuestas/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Obtener una opción de respuesta por ID
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public opcionesRespuestasIdGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseOpcionRespuesta>;
    public opcionesRespuestasIdGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseOpcionRespuesta>>;
    public opcionesRespuestasIdGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseOpcionRespuesta>>;
    public opcionesRespuestasIdGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling opcionesRespuestasIdGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ResponseOpcionRespuesta>('get',`${this.basePath}/opcionesRespuestas/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Actualizar una opción de respuesta por ID
     * 
     * @param body 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public opcionesRespuestasIdPut(body: OpcionRespuesta, id: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
    public opcionesRespuestasIdPut(body: OpcionRespuesta, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
    public opcionesRespuestasIdPut(body: OpcionRespuesta, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
    public opcionesRespuestasIdPut(body: OpcionRespuesta, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling opcionesRespuestasIdPut.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling opcionesRespuestasIdPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<ResponseStatus>('put',`${this.basePath}/opcionesRespuestas/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Crear una nueva opción de respuesta
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public opcionesRespuestasPost(body: OpcionRespuesta, observe?: 'body', reportProgress?: boolean): Observable<ResponseStatus>;
    public opcionesRespuestasPost(body: OpcionRespuesta, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseStatus>>;
    public opcionesRespuestasPost(body: OpcionRespuesta, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseStatus>>;
    public opcionesRespuestasPost(body: OpcionRespuesta, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling opcionesRespuestasPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<ResponseStatus>('post',`${this.basePath}/opcionesRespuestas`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
