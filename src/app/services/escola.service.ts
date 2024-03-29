import { Observable } from 'rxjs';
import { PrincipalService } from './principal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AlunoSala, Sala, SalaGrade } from '../models/escola.model';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  constructor(private firestore: AngularFirestore, private principal: PrincipalService) { }


  loadSalas(): Observable<SalaGrade[]>{
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/salasGrade`
    return this.firestore.collection<SalaGrade>(colecao, ref => ref.orderBy("curso").orderBy("sala")).valueChanges()
  }

  loadAlunosSala(nomeSala: string):Observable<AlunoSala[]> {
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/alunosSala`
    return this.firestore.collection<AlunoSala>(colecao, ref => ref.where("nomeSala", "==", nomeSala).orderBy("nomeAluno")).valueChanges()
  }
}
