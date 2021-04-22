import { BoletimService } from './../../services/boletim.service';
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
  cabecalho: DadoBoletim[]
  colunasGrid=0
  customStyle:string=`grid-template-columns: repeat(${this.colunasGrid}, auto)`

  @Input() idGoogle: string = "108914885005634059304"
  @Input() idGrade: string
  @Input() curso: string = "EF2"

  constructor(private firestore: AngularFirestore, 
    private principal: PrincipalService,
    private boletimService: BoletimService) { }

  ngAfterViewInit(){
    if (this.principal.tokensLoaded){
      this.processar()
    } else {
      this.principal.okTokens.subscribe(() =>[
        this.processar()
      ])
    }   
  }

  processar(){
    if(this.idGoogle){
      this.getBoletim(this.idGoogle)
    }
  }

  getBoletim(idGoogle: string){
    this.firestore.doc<Cabecalho>(`escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/cabecalhosBoletins/${this.curso}`)
    .get().subscribe(cabecalho => {
      this.colunasGrid=cabecalho.data().colunas
      this.customStyle=`grid-template-columns: repeat(${this.colunasGrid}, auto)`
      this.cabecalho = cabecalho.data().cabecalho
      this.boletimService.loadDadosBoletim(idGoogle).subscribe(dados => {
        this.textos = this.cabecalho
        dados.forEach(dado => {
          this.textos = this.textos.concat(dado.linhaBoletim)
        })
        this.textos.forEach(texto => {
          if(texto.formato){
            let psP = texto.formato.indexOf('%')
            if (psP != -1){
              let ps = texto.formato.indexOf('.')
              let zeros = psP - ps - 1
              let valor: number = Number(texto.texto)
              if (!isNaN(valor)){
                texto.texto = valor.toLocaleString("pt-BR", {style: "percent", maximumFractionDigits: zeros, minimumFractionDigits: zeros })
              }
            }
          }
        })
      })
    })
  }
}
