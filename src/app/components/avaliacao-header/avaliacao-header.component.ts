import { AvaliacaoHeader } from './../../models/learningAnalytics.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import firebase from 'firebase'

@Component({
  selector: 'app-avaliacao-header',
  templateUrl: './avaliacao-header.component.html',
  styleUrls: ['./avaliacao-header.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ]
})
export class AvaliacaoHeaderComponent implements OnInit {

  @Input() idAvaliacao: string=''
  modosEntrega: string[] = ['Prova','Tarefa','Jogo']

  constructor() { }

  @Input() avaliacaoHeaderEditando: AvaliacaoHeader = {
   id: '',
   idAplicador: '',
   titulo: '',
   idInstituicao: '',
   encerrada: false,
   liberada: false,
   visibilidade: '',
   modoEntrega: this.modosEntrega[0]
  }

  @Output() avaliacaoHeaderEditandoChange = new  EventEmitter<AvaliacaoHeader>()

  dataInicio: Date = new Date()
  dataFim: Date = new Date()

  ngOnInit(): void {
  }

  changeData(){
    this.avaliacaoHeaderEditandoChange.emit(this.avaliacaoHeaderEditando)
  }

  changeInicio(){
    let dt = new Date(this.dataInicio)
    this.avaliacaoHeaderEditando.dataInicio = firebase.firestore.Timestamp.fromDate(dt)
    this.changeData()
  }

  changeFim(){
    let dt = new Date(this.dataInicio)
    this.avaliacaoHeaderEditando.dataFim = firebase.firestore.Timestamp.fromDate(dt)
    this.changeData()
  }

}
