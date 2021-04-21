import { AgrupamentoAlunoChapterPerformance } from './../../models/geekie.model';
import { GeekieService } from './../../services/geekie.service';
import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit, Input } from '@angular/core';
import { G } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-geekieone-resumo',
  templateUrl: './geekieone-resumo.component.html',
  styleUrls: ['./geekieone-resumo.component.css']
})
export class GeekieoneResumoComponent implements OnInit {

  @Input() idGeekie: string = ""
  @Input() detalhe: boolean = false
  style = ""
  styleHeader = ""

  constructor(private principal: PrincipalService, private geekie: GeekieService) { }
  agrupamento: AgrupamentoAlunoChapterPerformance[]=[]

  ngOnInit(): void {
    if (this.principal.tokensLoaded || this.principal.isAnonimo) {
      if (this.detalhe) {
        this.loadResumoAlunoFrente()
      } else {
        this.loadResumoAluno()
      }
    } else {
    }
  }

  loadResumoAluno(){
    this.geekie.listResumoAluno(this.idGeekie).subscribe(grupo => {
      this.agrupamento = grupo
      this.ajusteStyle()
    })
  }

  loadResumoAlunoFrente(){
    this.geekie.listResumoAluno(this.idGeekie).subscribe(grupo => {
      this.agrupamento = grupo
      this.ajusteStyle
    })
  }

  ajusteStyle(){
    this.agrupamento.forEach(grupo => {
      grupo.stylePerformanceGeral = ""
      grupo.stylePerformanceEntregas = ""
      grupo.styleEngajamento = ""
      if(grupo.aproveitamentoGeral<0.7){
        grupo.stylePerformanceGeral += "background-color: yellow;"
      }
      if(grupo.aproveitamentoGeral<0.6){
        grupo.stylePerformanceGeral += "background-color: tomato;"
      }
      if(grupo.aproveitamentoEntregas<0.7){
        grupo.stylePerformanceEntregas += "background-color: yellow;"
      }
      if(grupo.aproveitamentoEntregas<0.6){
        grupo.stylePerformanceEntregas += "background-color: tomato;"
      }
      if(grupo.engajamento<0.7){
        grupo.styleEngajamento += "background-color: yellow;"
      }
      if(grupo.engajamento<0.6){
        grupo.styleEngajamento += "background-color: tomato;"
      }
      if(grupo.aproveitamentoEntregas == 0 && grupo.engajamento != 0){
        grupo.stylePerformanceEntregas += "background-color: white; color: white;"
      }
      if(grupo.aproveitamentoGeral == 0 && grupo.engajamento != 0){
        grupo.stylePerformanceGeral += "background-color: white; color: white;"
      }

    })
  }

}
