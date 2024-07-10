import { Routes } from '@angular/router';
import { AuthGuard } from 'ffsj-web-components';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] },
    { path: 'consultas/:id', component: ConsultaComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ConsultasComponent, canActivate: [AuthGuard] },
];
