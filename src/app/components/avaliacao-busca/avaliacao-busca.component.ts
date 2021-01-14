import { LearningAnalyticsService } from './../../services/learning-analytics.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AvaliacaoHeader } from 'src/app/models/learningAnalytics.model';

@Component({
  selector: 'app-avaliacao-busca',
  templateUrl: './avaliacao-busca.component.html',
  styleUrls: ['./avaliacao-busca.component.css']
})
export class AvaliacaoBuscaComponent implements OnInit {

  listaAvaliacoes$: Observable<AvaliacaoHeader[]>
  displayedColumns =
  ['descricao', 'star'];

  constructor(private learningAnalyticsService: LearningAnalyticsService) {
    this.listaAvaliacoes$ = this.learningAnalyticsService.listaAvaliacoes()
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
