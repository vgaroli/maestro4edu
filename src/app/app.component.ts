import { PrincipalService } from './services/principal.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

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

  constructor(private auth: AngularFireAuth, private principalService: PrincipalService){
    auth.authState.subscribe(
      state =>  {
        if(state){
          principalService.autenticado = true
          principalService.photoURL = state.photoURL
          this.photoURL = state.photoURL
          this.autenticado = true
        }
      }
    )
  }

  logout() {
    this.auth.signOut()
  }
  
  login(){
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email")
    provider.addScope("https://www.googleapis.com/auth/classroom.courses")
    provider.addScope("https://www.googleapis.com/auth/classroom.courses.readonly")

    this.auth.signInWithPopup(provider).then(
      result => {
        if (result.credential){
          let credencial: any = result.credential
          //this.principal.accessToken = credencial.accessToken
          console.log(credencial)
        }
      }
    );
  }
}
