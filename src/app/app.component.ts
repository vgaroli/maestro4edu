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

  constructor(private principalService: PrincipalService) {
    this.principalService.checkToken()
    this.principalService.okTokens.subscribe(
      value => {
        if (value) {
          this.autenticado = this.principalService.autenticado
          this.photoURL = this.principalService.photoURL
          this.escola = this.principalService.nomeEscola
        }
      }
    )
  }

  logout() {
    this.principalService.logout()
  }

  login(){
    this.principalService.login()
  }

}
