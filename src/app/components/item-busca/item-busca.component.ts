import { LearningAnalyticsService } from './../../services/learning-analytics.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/learningAnalytics.model';

@Component({
  selector: 'app-item-busca',
  templateUrl: './item-busca.component.html',
  styleUrls: ['./item-busca.component.css']
})
export class ItemBuscaComponent implements OnInit {

  listaItens$: Observable<Item[]>
  displayedColumns =
  ['conteudo','competencias','habilidades', 'star'];

  constructor(private learningAnalyticsService: LearningAnalyticsService) {
     this.listaItens$ = this.learningAnalyticsService.listaItens()
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
