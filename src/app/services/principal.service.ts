import { AngularFireAuth } from '@angular/fire/auth';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private contagem = new Subject<number>()
  nContagem: number=0
  accessToken: string=""
  autenticado: boolean = false
  photoURL: string = ""
  idUser: string =""
  

  @Output() okTokens = new EventEmitter<boolean>()


  constructor(private auth: AngularFireAuth){
  }
  
  contagem$ = this.contagem.asObservable()



  checkToken(){
    this.auth.authState.subscribe(
      state =>  {
        if(state){
          this.autenticado = true
          this.photoURL = state.photoURL
          this.photoURL = state.photoURL
          this.autenticado = true
          if(! this.accessToken){
             this.login()
          } else
          {
            this.okTokens.emit(true)
          }
        }
      }
    )

    let credencial: any = this.auth.idToken
    console.log(credencial)
  }

  logout() {
    this.auth.signOut()
  }

  login() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email")
    provider.addScope("https://www.googleapis.com/auth/classroom.courses")
    provider.addScope("https://www.googleapis.com/auth/classroom.courses.readonly")

    this.auth.signInWithPopup(provider).then(
      result => {
        if (result.credential) {
          let credencial: any = result.credential
          this.accessToken = credencial.accessToken
          this.checkToken()
        }
      }
    );
  }

}