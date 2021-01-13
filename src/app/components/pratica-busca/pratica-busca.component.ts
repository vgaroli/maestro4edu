import { LearningAnalyticsService } from './../../services/learning-analytics.service';
import { Observable } from 'rxjs';
import { Pratica } from './../../models/learningAnalytics.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pratica-busca',
  templateUrl: './pratica-busca.component.html',
  styleUrls: ['./pratica-busca.component.css']
})
export class PraticaBuscaComponent implements OnInit {

  listaPraticas$: Observable<Pratica[]>
  displayedColumns =
  ['descricao','tipoFerramenta','competencias', 'star'];

  constructor(private learningAnalyticsService: LearningAnalyticsService) { 
    this.listaPraticas$ = this.learningAnalyticsService.listaPlanos()
  }

  @Output() edit: EventEmitter<string> = new EventEmitter()
  @Output() copy: EventEmitter<string> = new EventEmitter()
  @Output() sendTask: EventEmitter<string> = new EventEmitter()


  ngOnInit(): void {
  }

  editar(id:string){
    this.edit.emit(id)
  }

  copiar(id:string){
    this.copy.emit(id)
  }

  enviarTarefa(id:string){
    this.sendTask.emit(id)
  }


}
