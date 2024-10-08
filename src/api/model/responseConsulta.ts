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
 */
import { Consulta } from './consulta';
import { Status } from './status';

export interface ResponseConsulta { 
    consulta: Consulta;
    status: Status;
}