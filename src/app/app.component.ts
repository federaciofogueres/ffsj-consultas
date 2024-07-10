import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'ffsj-web-components';
import { ConsultasService, OpcionesRespuestasService, PreguntasService, RespuestasUsuariosService } from '../api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ffsj-consultas';

  constructor(
    private consultasService: ConsultasService,
    private authService: AuthService,
    private opcionesRespuestasService: OpcionesRespuestasService,
    private preguntasService: PreguntasService,
    private respuestasUsuariosService: RespuestasUsuariosService
  ){}

  ngOnInit(){
    console.log('AppComponent ngOnInit');
    let token = this.authService.getToken();
    if (token && token !== '') {
      this.consultasService.configuration.accessToken = token;
      this.opcionesRespuestasService.configuration.accessToken = token;
      this.preguntasService.configuration.accessToken = token;
      this.respuestasUsuariosService.configuration.accessToken = token;
      this.consultasService.configuration.selectHeaderContentType(['application/json']);
    }
    this.consultasService.consultasGet().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
