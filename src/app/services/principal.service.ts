import { map } from 'rxjs/operators';
import { Escola, AnoLetivo, Docente, Sala } from './../models/escola.model';
import { AnonimoData, Conta } from './../models/basic.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private contagem = new Subject<number>()
  tokensLoaded=false
  nomePessoa=""
  isAnonimo=false
  naoAnonimo=true
  nContagem: number = 0
  accessToken: string = ""
  escola: string=""
  nomeEscola: string=""
  cargos: string[]=[]
  autenticado: boolean = false
  photoURL: string = ""
  idUser: string = ""
  idCurso: string = ""
  idGoogle: string = ""
  idGeekie: string=""
  conta: string = ""
  anoLetivo: number
  anosLetivos: AnoLetivo[]
  ultimoUpdateClassroom: Date
  showBoletim: boolean = false
  salas: Sala[]

  @Output() okTokens = new EventEmitter<boolean>()


  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
  }

  contagem$ = this.contagem.asObservable()

  loadAnonimoData(uuid):Observable<AnonimoData[]>{
    return this.firestore.collection<AnonimoData>('uuids', ref => ref.where('uuid', "==", uuid)).valueChanges()
  }

  getShowBoletimForAnonimo(escola: string): Observable<Escola>{
    return this.firestore.collection<Escola>('escolas').doc(escola).valueChanges()
  }

  updateConta(conta: Conta){
    this.firestore.collection<Conta>('contas', ref => ref.where('conta', '==', conta.conta))
    .snapshotChanges().pipe(first()).subscribe(snaps => {
      this.firestore.collection<Conta>('contas').doc(snaps[0].payload.doc.id).update(conta)
    }
  )
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
//          this.conta = 'eduardo.ferrao@alunosp.colegiomaterdei.net'
          if (!this.accessToken) {
            this.login()
          } else {
            let docConta = this.firestore.collection<Conta>('contas', ref => ref.where('conta', '==', this.conta))
            docConta
              .valueChanges().pipe(first()).subscribe(contas => {
                let conta = contas[0]
                if (conta) {
                  this.idGoogle = conta.idGoogle
                  if (conta.idGeekie){
                    this.idGeekie = conta.idGeekie
                  }
                  this.escola = conta.escola
                  this.cargos = conta.cargos
                  if (conta.ultimoUpdateClassroom){
                    this.ultimoUpdateClassroom = conta.ultimoUpdateClassroom.toDate()
                  } else {
                    this.ultimoUpdateClassroom = new Date(1900,1,1)
                    conta.ultimoUpdateClassroom = firebase.firestore.Timestamp.fromDate(this.ultimoUpdateClassroom)
                    this.updateConta(conta)
                  }
                  this.firestore.collection<Escola>('escolas').doc(this.escola).valueChanges()
                    .subscribe(escola => {
                      this.anoLetivo = escola.anoLetivo
                      if (escola.showBoletim){
                        this.showBoletim = escola.showBoletim
                      }
                      this.nomeEscola = escola.fantasia
                      this.firestore.collection<AnoLetivo>(`escolas/${this.escola}/anosLetivos`)
                        .valueChanges().subscribe(anos => {
                            this.anosLetivos = anos
                            if(this.cargos.indexOf('aluno')==-1){
                              this.firestore.collection<Docente>(`escolas/${this.escola}/anosLetivos/${this.anoLetivo}/docentes`)
                              .doc(this.idGoogle).valueChanges().subscribe(docente => {
                                this.salas = docente.salas
                                this.tokensLoaded = true
                                this.okTokens.emit(true)
                              })
                            } else {
                              this.tokensLoaded = true
                              this.okTokens.emit(true)
                            }
                          })
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
    provider.addScope("https://www.googleapis.com/auth/classroom.coursework.students")

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