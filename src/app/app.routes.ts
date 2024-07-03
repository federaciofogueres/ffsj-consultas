import { Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/consulta.component';

export const routes: Routes = [
    { path: 'consulta', component: ConsultaComponent },
    { path: '**', component: ConsultaComponent },
];
