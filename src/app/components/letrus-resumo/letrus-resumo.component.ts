import { AgrupamentoLetrus } from './../../models/letrus.model';
import { LetrusService } from './../../services/letrus.service';
import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-letrus-resumo',
  templateUrl: './letrus-resumo.component.html',
  styleUrls: ['./letrus-resumo.component.css']
})
export class LetrusResumoComponent implements OnInit {

  @Input() idGoogle: string = ""
  @Input() detalhe: boolean = false
  agrupamento: AgrupamentoLetrus[]=[]
  style = ""
  styleHeader = ""

  constructor(private principal: PrincipalService, private letrus: LetrusService) { }

  ngOnInit(): void {
    if (this.principal.tokensLoaded || this.principal.isAnonimo) {
      this.loadResumo()
    }
  }

  loadResumo(){
    this.letrus.listResumoGeral(this.idGoogle).subscribe(grupo => {
      this.agrupamento = grupo
      this.ajusteStyle()
    })
  }

  ajusteStyle(){
    this.agrupamento.forEach(grupo => {
      grupo.stylePerformanceGeral = ""
      grupo.stylePerformanceEntregas = ""
      grupo.styleEngajamento = ""
      if(grupo.performanceGeral<0.7){
        grupo.stylePerformanceGeral += "background-color: yellow;"
      }
      if(grupo.performanceGeral<0.6){
        grupo.stylePerformanceGeral += "background-color: tomato;"
      }
      if(grupo.performanceEntregas<0.7){
        grupo.stylePerformanceEntregas += "background-color: yellow;"
      }
      if(grupo.performanceEntregas<0.6){
        grupo.stylePerformanceEntregas += "background-color: tomato;"
      }
      if(grupo.engajamento<0.7){
        grupo.styleEngajamento += "background-color: yellow;"
      }
      if(grupo.engajamento<0.6){
        grupo.styleEngajamento += "background-color: tomato;"
      }
      if(grupo.performanceEntregas == 0 && grupo.engajamento != 0){
        grupo.stylePerformanceEntregas += "background-color: white; color: white;"
      }
      if(grupo.performanceGeral == 0 && grupo.engajamento != 0){
        grupo.stylePerformanceGeral += "background-color: white; color: white;"
      }

    })
  }

}
