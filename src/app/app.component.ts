import { AnoLetivo } from './models/escola.model';
import { PrincipalService } from './services/principal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menus = []
  title = 'maestro4edu';
  photoURL: string = null
  autenticado: boolean = false
  escola: string = ""
  anos: AnoLetivo[]
  anoLetivo: number

  constructor(private principalService: PrincipalService) {
    this.principalService.checkToken()
    this.principalService.okTokens.subscribe(
      value => {
        if (value) {
          this.autenticado = this.principalService.autenticado
          this.photoURL = this.principalService.photoURL
          this.escola = this.principalService.nomeEscola
          this.anos = this.principalService.anosLetivos
          this.anoLetivo = this.principalService.anoLetivo
        }
      }
    )
  }

  logout() {
    this.principalService.logout()
  }

  login() {
    this.principalService.login()
  }

}
