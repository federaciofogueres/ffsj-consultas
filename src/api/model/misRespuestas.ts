import { MisRespuestaPregunta } from './misRespuestaPregunta';

export interface MisRespuestas {
    hasPrevias: boolean;
    respuestas: Array<MisRespuestaPregunta>;
}
