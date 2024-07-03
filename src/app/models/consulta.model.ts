import { Pregunta } from "./pregunta.model";
import { Respuesta } from "./respuesta.model";

export interface Consulta {
    id: number;
    preguntas: Pregunta[];
    respuestas: Respuesta[];
}