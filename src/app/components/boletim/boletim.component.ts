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
  isCoordenador: boolean
  isAluno:boolean

  @Input() idGoogle: string = ""
  @Input() idGrade: string
  @Input() idCurso: string = "EF2"

  constructor(private firestore: AngularFirestore, 
    private principal: PrincipalService,
    private boletimService: BoletimService) { }

  ngAfterViewInit(){
    if (this.principal.tokensLoaded || this.principal.isAnonimo){
      this.processar()
    } else {
      this.principal.okTokens.subscribe(() =>[
        this.processar()
      ])
    }   
  }

  processar(){
    if(this.idGoogle){
      this.isCoordenador = (this.principal.cargos.indexOf('coordenador') > -1)
      this.isAluno = (this.principal.cargos.indexOf('aluno') > -1)
      this.getBoletim(this.idGoogle)
    }
  }

  getBoletim(idGoogle: string){
    this.firestore.doc<Cabecalho>(`escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/cabecalhosBoletins/${this.idCurso}`)
    .get().subscribe(cabecalho => {
      this.colunasGrid=cabecalho.data().colunas
      this.customStyle=`grid-template-columns: repeat(${this.colunasGrid}, auto)`
      this.cabecalho = cabecalho.data().cabecalho
      this.boletimService.loadDadosBoletim(idGoogle).subscribe(dados => {
        this.textos = this.cabecalho
        dados.forEach(dado => {
          this.textos = this.textos.concat(dado.linhaBoletim)
        })
        this.textos.forEach((texto,i) => {
          if (texto.formato === "url" && (this.isCoordenador || (this.isAluno && this.principal.tokensLoaded))){
            let url = `https://docs.google.com/spreadsheets/d/${texto.idPlanilha}/edit#gid=${texto.idPaginaFinal}`
            texto.texto = `<a target="_blank" href=${url}>${texto.texto}</a>`
          }
          if(texto.formato){
            if (texto.formato === "0.0" && texto.texto !== ""){
              let valor: number = Number(texto.texto)
              if (!isNaN(valor)){
                texto.texto = valor.toLocaleString("pt-BR", {maximumFractionDigits: 1, minimumFractionDigits: 1 })
              }
            }
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
