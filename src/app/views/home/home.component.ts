import { PrincipalService } from './../../services/principal.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showControles: boolean = false

  constructor(private route: Router, private principal: PrincipalService) {
    if(this.principal.tokensLoaded){
      this.showControles = this.principal.tokensLoaded
    } else {
      this.principal.okTokens.subscribe(() => this.showControles=this.principal.tokensLoaded)
    }
  }

  goMapa() {
    this.route.navigateByUrl("/aluno-dash")
  }
}
