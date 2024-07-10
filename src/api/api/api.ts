export * from './consultas.service';
import { ConsultasService } from './consultas.service';
export * from './opcionesRespuestas.service';
import { OpcionesRespuestasService } from './opcionesRespuestas.service';
export * from './preguntas.service';
import { PreguntasService } from './preguntas.service';
export * from './respuestasUsuarios.service';
import { RespuestasUsuariosService } from './respuestasUsuarios.service';
export const APIS = [ConsultasService, OpcionesRespuestasService, PreguntasService, RespuestasUsuariosService];
