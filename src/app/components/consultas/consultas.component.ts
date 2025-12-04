import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FfsjSpinnerComponent } from "ffsj-web-components";
import { firstValueFrom } from "rxjs";
import { AutorizacionesConsultasService, Consulta, ConsultasService } from "../../../api";
import { ConsultasExtraService } from "../../services/consultas-extra.service";

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [
    FfsjSpinnerComponent
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent {

  consultas: Consulta[] = [];
  loading: boolean = false;
  idAsociado: number = -1;
  idAsistencias: number[] = [];

  constructor(
    private consultasService: ConsultasService,
    private autorizacionesConsultasService: AutorizacionesConsultasService,
    private router: Router,
    private consultasExtraService: ConsultasExtraService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.idAsistencias = this.consultasExtraService.getAsistencias();
    this.idAsociado = this.consultasExtraService.getIdUsuario();
    this.loadConsultas();
  }

  async isUserAuthorized(idConsulta: number) {
    try {
      const response: any = await firstValueFrom(
        this.autorizacionesConsultasService.consultasIdConsultaAutorizadosIdAsistenciaGet(idConsulta, this.idAsistencias[0])
      );
      console.log(response);
      return response.status.status === 200 && response.autorizaciones !== 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async loadConsultas() {
    try {
      const response = await firstValueFrom(this.consultasService.consultasGet());
      console.log(response);
      if (response.status.status === 200) {
        const autorizaciones = await Promise.all(
          response.consultas.map(async consulta => ({
            consulta,
            autorizado: await this.isUserAuthorized(consulta.id)
          }))
        );
        this.consultas = autorizaciones
          .filter(({ autorizado }) => autorizado)
          .map(({ consulta }) => consulta);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  loadConsulta(consulta: Consulta) {
    this.router.navigate(['/consultas', consulta.id]);
  }

}