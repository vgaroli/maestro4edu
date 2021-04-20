import { AgrupamentoSubmissao, SubmissaoClassroom, EngajamentoClassroom } from './../../models/classroom.model';
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
  showNaoAvaliadas=false

  constructor(private classroom: ClassroomService, private principal: PrincipalService) { }
  submissoes: SubmissaoClassroom[]
  agrupamentosSubmissoes: AgrupamentoSubmissao[] = []


  ngOnInit(): void {
    if (this.principal.tokensLoaded || this.principal.isAnonimo) {
      this.showNaoAvaliadas = (this.principal.cargos.indexOf("professor")>-1 || this.principal.cargos.indexOf("coordenador")>-1)
      if (this.detalhe) {
        this.loadResumoSala()
        this.style = "width:350px;"
        this.styleHeader ="width:350px; color: white; font-weight: bold; background-color: #673AB7;"
      } else {
        this.styleHeader ="color: white; font-weight: bold; background-color: #673AB7;"
        this.loadResumoGeral()
      }
    } else {
      this.principal.okTokens.subscribe(() => {
        this.showNaoAvaliadas = (this.principal.cargos.indexOf("professor")>-1 || this.principal.cargos.indexOf("coordenador")>-1)
        if (this.detalhe) {
          this.loadResumoSala()
          this.style = "width:350px"
          this.styleHeader ="width:350px; font-weight: bold; color: white; background-color: #673AB7;"
        } else {
          this.styleHeader ="color: white; font-weight: bold; background-color: #673AB7;"
          this.loadResumoGeral()
        }
      })
    }
  }

  loadTarefas(){
    alert("oi")
  }

  loadResumoGeral() {
    if (this.idGoogle) {
      this.classroom.listResumoGeral(this.idGoogle).subscribe(resumo => {
        this.agrupamentosSubmissoes = resumo
        this.ajusteStyle()
      })
    }
  }

  loadResumoSala() {
    if (this.idGoogle) {
      this.classroom.listResumoSala(this.idGoogle).subscribe(resumo => {
        this.agrupamentosSubmissoes = resumo
        this.ajusteStyle()
      })
    }
  }

  ajusteStyle() {
    this.agrupamentosSubmissoes.forEach(agrupamento => {
      agrupamento.styleEngajamento = ""
      agrupamento.stylePerformanceEntregas = ""
      agrupamento.stylePerformanceGeral = ""
      if (this.detalhe) {
        agrupamento.styleEngajamento = "width:350px; "
        agrupamento.stylePerformanceEntregas = "width:350px; "
        agrupamento.stylePerformanceGeral = "width:350px; "
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
      if(agrupamento.performanceEntregas == 0 && agrupamento.engajamento != 0){
        agrupamento.stylePerformanceEntregas += "background-color: white; color: white;"
      }
      if(agrupamento.performanceGeral == 0 && agrupamento.engajamento != 0){
        agrupamento.stylePerformanceGeral += "background-color: white; color: white;"
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
