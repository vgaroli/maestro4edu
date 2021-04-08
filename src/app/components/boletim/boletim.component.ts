import { PrincipalService } from './../../services/principal.service';
import { DadosDisciplinaBoletim } from './../../models/boletim.model';
import { Component, AfterViewInit, Input  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cabecalho, DadoBoletim } from 'src/app/models/boletim.model';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.css']
})
export class BoletimComponent implements AfterViewInit  {
  textos:DadoBoletim[]
  notas: DadoBoletim[]
  colunasGrid=0
  customStyle:string=`grid-template-columns: repeat(${this.colunasGrid}, auto)`

  @Input() idGoogle: string = "108914885005634059304"
  @Input() idGrade: string

  constructor(private firestore: AngularFirestore, private principal: PrincipalService) { }

  ngAfterViewInit(){
    if(this.idGoogle){
      this.getBoletim(this.idGoogle)
    }
  }

  getBoletim(idGoogle: string){
    this.firestore.doc<Cabecalho>(`escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/cabecalhosBoletins/EF2`)
    .get().subscribe(cabecalho => {
      this.colunasGrid=cabecalho.data().colunas
      this.customStyle=`grid-template-columns: repeat(${this.colunasGrid}, auto)`
      this.textos = cabecalho.data().cabecalho
    })
  }
}
