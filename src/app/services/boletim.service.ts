import { Disciplina } from './../models/boletim.model';
import { Observable } from 'rxjs';
import { Docente } from './../models/escola.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { PrincipalService } from './principal.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoletimService {

  constructor(private principal: PrincipalService, private firestore: AngularFirestore) { }

  loadSala(): Observable<Docente>  {
    let colecao: string = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/docentes`
    return this.firestore.collection<Docente>(colecao).doc(this.principal.idGoogle).valueChanges()
  }

  loadDisciplinas(): Observable<Disciplina[]>{
    let colecao: string = `escolas/${this.principal.escola}/disciplinas`
    return this.firestore.collection<Disciplina>(colecao).valueChanges()
  }
}
