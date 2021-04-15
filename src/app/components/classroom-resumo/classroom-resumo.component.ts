import { AgrupamentoSubmissao, SubmissaoClassroom } from './../../models/classroom.model';
import { PrincipalService } from './../../services/principal.service';
import { ClassroomService } from './../../services/classroom.service';
import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-classroom-resumo',
  templateUrl: './classroom-resumo.component.html',
  styleUrls: ['./classroom-resumo.component.css']
})
export class ClassroomResumoComponent implements OnInit {

  @Input() idGoogle: string = ""
  @Input() detalhe: boolean = false
  style = ""
  styleHeader = ""

  constructor(private classroom: ClassroomService, private principal: PrincipalService) { }
  submissoes: SubmissaoClassroom[]
  agrupamentosSubmissoes: AgrupamentoSubmissao[] = []


  ngOnInit(): void {
    if (this.principal.tokensLoaded) {
      if (this.detalhe) {
        this.loadResumoSala()
        this.style = "width:300px"
      } else {
        this.loadResumoGeral()
      }
    } else {
      this.principal.okTokens.subscribe(() => {
        if (this.detalhe) {
          this.loadResumoSala()
          this.style = "width:300px"
        } else {
          this.loadResumoGeral()
        }
      })
    }
  }

  loadResumoGeral() {
    if (this.idGoogle) {
      this.classroom.listResumoGeral(this.idGoogle).subscribe(resumo => {
        this.agrupamentosSubmissoes = resumo
      })
    }
  }

  loadResumoSala() {
    if (this.idGoogle) {
      this.classroom.listResumoSala(this.idGoogle).subscribe(resumo => {
        this.agrupamentosSubmissoes = resumo
      })
    }
  }

  ajusteStyle() {
    this.agrupamentosSubmissoes.forEach(agrupamento => {
      agrupamento.styleEngajamento = ""
      agrupamento.stylePerformanceEntregas = ""
      agrupamento.stylePerformanceGeral = ""
      if (this.detalhe) {
        agrupamento.styleEngajamento = "width:300px "
        agrupamento.stylePerformanceEntregas = "width:300px "
        agrupamento.stylePerformanceGeral = "width:300px "
      }
      if(agrupamento.engajamento < 0.7){
        agrupamento.styleEngajamento += "background-color: yellow;"
      }
      if(agrupamento.performanceEntregas < 0.7){
        agrupamento.stylePerformanceEntregas += "background-color: yellow;"
      }
      if(agrupamento.performanceGeral < 0.7){
        agrupamento.stylePerformanceGeral += "background-color: yellow;"
      }
      if(agrupamento.engajamento < 0.6){
        agrupamento.styleEngajamento += "background-color: tomato;"
      }
      if(agrupamento.performanceEntregas < 0.6){
        agrupamento.stylePerformanceEntregas += "background-color: tomato;"
      }
      if(agrupamento.performanceGeral < 0.6){
        agrupamento.stylePerformanceGeral += "background-color: tomato;"
      }
    })
    let x = 10
  }

  loadSubmissions() {
    if (this.idGoogle) {
      this.classroom.listResumo(this.idGoogle).subscribe(submissoes => {
        this.submissoes = submissoes
        this.classroom.ajusteNomeSala(this.submissoes)
      })
    }
  }

}
