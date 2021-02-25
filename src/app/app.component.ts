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

  constructor(private principalService: PrincipalService) {
    this.principalService.checkToken()
    this.principalService.okTokens.subscribe(
      value => {
        if (value) {
          this.autenticado = this.principalService.autenticado
          this.photoURL = this.principalService.photoURL
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
