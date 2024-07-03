import { Opcion } from "./opcion.model";
import { Pregunta } from "./pregunta.model";

export interface Respuesta { 
    pregunta: Pregunta;
    respuesta: Opcion;
}