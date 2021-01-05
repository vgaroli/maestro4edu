import { Observable } from 'rxjs';
import { Item } from './../../models/learningAnalytics.model';
import { Component, OnInit } from '@angular/core';
import { OpcaoItem } from 'src/app/models/learningAnalytics.model';

@Component({
  selector: 'app-item-admin',
  templateUrl: './item-admin.component.html',
  styleUrls: ['./item-admin.component.css']
})
export class ItemAdminComponent implements OnInit {
  idiomas: string[] = ['Português','Inglês','Espanhol','Francês','Italiano']
  tiposItem: string[] = ['Objetivo','Discursivo']
  dados:string = "no automático"
  idiomaSelecionado: string 
  tipoItemSelecionado: string 
  visibilidades: string[] = ['Privado','Instituição','Público']
  visibilidadeSelecionada: string
  opcoesItem: OpcaoItem[] = [
    {
      correta: true,
      texto: "Op 1"
    },
    {
      correta: false,
      texto: "Op 2"
    },
  ]
  itemEditando: Item ={
    id: '',
    descricao: '',
    idioma: this.idiomas[0],
    competenciasBNCC: [],
    habilidadesBNCC: [],
    taxonomiasDeBloom: [],
    multiplasInteligencias: [],
    tipoDoItem: this.tiposItem[0],
    tipologiasItemObjetivo: [],
    tipologiasItemDiscursivo: [],
    textoItem: '',
    opcoesItem: this.opcoesItem, 
    visibilidade: this.visibilidades[0]
  }

  itemObs: Observable<Item>

  constructor() { }

  salvar(){
    console.log(this.itemEditando)
  }

  addOpcao(){
    let opcao: OpcaoItem = {correta: false, texto:"opção nova"}
    this.opcoesItem.push(opcao)
  }

  ngOnInit(): void {
    this.idiomaSelecionado = this.idiomas[0]
    this.tipoItemSelecionado = this.tiposItem[0]
    this.visibilidadeSelecionada = this.visibilidades[0]
  }


}
