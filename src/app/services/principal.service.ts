import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private contagem = new Subject<number>()
  nContagem: number=0
  accessToken: string=""
  autenticado: boolean = false
  photoURL: string = ""
  

  constructor(private auth: AngularFireAuth){}
  contagem$ = this.contagem.asObservable()



  checkToken(){
    
    let credencial: any = this.auth.idToken
    console.log(credencial)
  }

}