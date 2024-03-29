import { AnoLetivo } from './models/escola.model';
import { PrincipalService } from './services/principal.service';
import { Component } from '@angular/core';
import { Menu } from './models/basic.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menus: Menu[] = []
  title = 'maestro4edu';
  photoURL: string = null
  autenticado: boolean = false
  escola: string = ""
  anos: AnoLetivo[]
  anoLetivo: number
  showNavegacao:boolean= false
  showNomeAluno:boolean=false
  nomeAluno = this.principalService.nomePessoa
  isCoordenador: boolean=false

  constructor(private principalService: PrincipalService) {
    let url = window.location.href
    if (url.indexOf("UUID") === -1){
      this.principalService.isAnonimo=false
      this.principalService.naoAnonimo=true
      this.showNavegacao=true
      this.loadCredential()
    } else {
      this.principalService.isAnonimo=true
      this.principalService.naoAnonimo=false
      this.showNomeAluno=true
    }
  }

  loadCredential() {
    this.principalService.checkToken()
    this.principalService.okTokens.subscribe(
      value => {
        if (value) {
          this.autenticado = this.principalService.autenticado
          this.photoURL = this.principalService.photoURL
          this.escola = this.principalService.nomeEscola
          this.anos = this.principalService.anosLetivos
          this.anoLetivo = this.principalService.anoLetivo
          this.isCoordenador=this.principalService.cargos.indexOf["coordenador"]
          this.loadMenu()
        }
      }
    )
  }

  loadMenu(){
    
  }

  logout() {
    this.principalService.logout()
  }

  login() {
    this.principalService.login()
  }

}
