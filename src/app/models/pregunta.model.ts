import { Opcion } from "./opcion.model";

export interface Pregunta { 
    id?: number;
    titulo?: string;
    enunciado?: string;
    active?: boolean;
    opciones: Opcion[];
}