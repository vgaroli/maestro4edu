import { map } from 'rxjs/operators';
import { PrincipalService } from './principal.service';
import { ChapterPerformace, ChapterPerformaceSummary, AgrupamentoAlunoChapterPerformance } from './../models/geekie.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeekieService {

  constructor(private firestore: AngularFirestore, private principal: PrincipalService) { }
  
  listAllChapterPerformace(): Observable<ChapterPerformace[]>{
    //console.log(`escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/engageCapituloGeekie`)
    return this.firestore.collection<ChapterPerformace>(`escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/engageCapituloGeekie`
          , ref => ref.orderBy("grade").orderBy("nomeAluno")).valueChanges().pipe(map(snaps => {return {... snaps}} ))

  }

  listResumoAluno(idGeekie: string): Observable<AgrupamentoAlunoChapterPerformance[]>{
    let colect = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/engageCapituloAlunoGeralGeekie`
    return this.firestore.collection<AgrupamentoAlunoChapterPerformance>(colect, ref => ref.where('idGeekie', '==', idGeekie)).valueChanges()
  }
}
