import { PrincipalService } from './principal.service';
import { Observable } from 'rxjs';
import { AgrupamentoLetrus } from './../models/letrus.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetrusService {

  constructor(private firestore: AngularFirestore, private principal: PrincipalService) { }

  listResumoGeral(idGoogle:string): Observable<AgrupamentoLetrus[]> {
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/resumoGeralLetrus`
    return this.firestore.collection<AgrupamentoLetrus>(colecao, ref => ref.where('idGoogle','==',idGoogle))
    .valueChanges()
  }

}
