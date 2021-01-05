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

  @Input() idGoogle: string = "100549381171868802195"
  @Input() idGrade: string

  constructor(private firestore: AngularFirestore) { }

  ngAfterViewInit(){
    if(this.idGoogle){
      console.log(this.idGoogle)
      this.getBoletim()
    }
  }

  getBoletim(){
    this.firestore.doc<Cabecalho>("escolas/YPyLAYTFN6rkQa0Iyguj/anosLetivos/2020/cabecalhosBoletins/EF2")
    .get().subscribe(cabecalho => {
      this.colunasGrid=cabecalho.data().colunas
      this.customStyle=`grid-template-columns: repeat(${this.colunasGrid}, auto)`
      this.textos = cabecalho.data().cabecalho
      console.log(this.textos)
    })
  }
}
