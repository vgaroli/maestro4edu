import { Conta } from './../models/basic.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private contagem = new Subject<number>()
  nContagem: number = 0
  accessToken: string = ""
  escola: string=""
  cargos: string[]=[]
  autenticado: boolean = false
  photoURL: string = ""
  idUser: string = ""
  idGoogle: string = ""
  conta: string = ""

  @Output() okTokens = new EventEmitter<boolean>()


  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
  }

  contagem$ = this.contagem.asObservable()



  checkToken() {
    this.auth.authState.subscribe(
      state => {
        if (state) {
          this.autenticado = true
          this.photoURL = state.photoURL
          this.photoURL = state.photoURL
          this.autenticado = true
          this.conta = state.email
          if (!this.accessToken) {
            this.login()
          } else {
            this.firestore.collection<Conta>('contas', ref => ref.where('conta', '==', this.conta))
              .valueChanges().subscribe(contas => {
                if (contas) {
                  let conta = contas[0]
                  this.idGoogle = conta.idGoogle
                  this.escola = conta.escola
                  this.cargos = conta.cargos
                  this.okTokens.emit(true)
                }
              })
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