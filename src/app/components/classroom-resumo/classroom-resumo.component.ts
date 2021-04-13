import { AgrupamentoSubmissao, SubmissaoClassroom } from './../../models/classroom.model';
import { PrincipalService } from './../../services/principal.service';
import { ClassroomService } from './../../services/classroom.service';
import { Component, OnInit, Input, enableProdMode } from '@angular/core';



@Component({
  selector: 'app-classroom-resumo',
  templateUrl: './classroom-resumo.component.html',
  styleUrls: ['./classroom-resumo.component.css']
})
export class ClassroomResumoComponent implements OnInit {

  @Input() idGoogle: string = ""

  constructor(private classroom: ClassroomService, private principal: PrincipalService) { }
  submissoes: SubmissaoClassroom[]
  agrupamentosSubmissoes: AgrupamentoSubmissao[]=[]


  ngOnInit(): void {
    if (this.principal.tokensLoaded) {
      this.loadResumoGeral()
    } else {
      this.principal.okTokens.subscribe(() => this.loadResumoGeral())
    }
  }

  loadResumoGeral(){
    if (this.idGoogle){
      this.classroom.listResumoSala(this.idGoogle).subscribe(resumo => {
        this.agrupamentosSubmissoes = resumo
      })
    }
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
