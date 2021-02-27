import { Escola } from './../models/escola.model';
import { Conta } from './../models/basic.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
  anoLetivo: number
  ultimoUpdateClassroom: Date

  @Output() okTokens = new EventEmitter<boolean>()


  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
  }

  contagem$ = this.contagem.asObservable()


  updateConta(conta: Conta){

  }

  checkToken() {
    this.auth.authState.subscribe(
      state => {
        if (state) {
          this.autenticado = true
          this.photoURL = state.photoURL
          this.photoURL = state.photoURL
          this.idUser = state.uid
          this.autenticado = true
          this.conta = state.email
          if (!this.accessToken) {
            this.login()
          } else {
            let docConta = this.firestore.collection<Conta>('contas', ref => ref.where('conta', '==', this.conta)).doc('0CUrtK5pUzuExjRD7v6x')
            docConta
              .valueChanges().subscribe(conta => {
                if (conta) {
                  this.idGoogle = conta.idGoogle
                  this.escola = conta.escola
                  this.cargos = conta.cargos
                  if (conta.ultimoUpdateClassroom){
                    this.ultimoUpdateClassroom = conta.ultimoUpdateClassroom.toDate()
                  } else {
                    this.ultimoUpdateClassroom = new Date
                    conta.ultimoUpdateClassroom = firebase.firestore.Timestamp.fromDate(this.ultimoUpdateClassroom)
                    docConta.update(conta)
                  }
                  this.firestore.collection<Escola>('escolas').doc(this.escola).valueChanges()
                    .subscribe(escola => {
                      this.anoLetivo = escola.anoLetivo
                      this.okTokens.emit(true)
                    })
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