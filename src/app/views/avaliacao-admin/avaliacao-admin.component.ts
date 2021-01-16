import { PrincipalService } from './../../services/principal.service';
import { LearningAnalyticsService } from './../../services/learning-analytics.service';
import { Observable } from 'rxjs';
import { Item, OpcaoItem, AvaliacaoHeader } from './../../models/learningAnalytics.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-avaliacao-admin',
  templateUrl: './avaliacao-admin.component.html',
  styleUrls: ['./avaliacao-admin.component.css']
})
export class AvaliacaoAdminComponent implements OnInit {
  showDetalhe: boolean=false
  idAvaliacaoEditando: string=''
  constructor(public dialog: MatDialog, private learningAnalyticsService: LearningAnalyticsService, private principal: PrincipalService) { }


  avaliacaoHeaderEditando: AvaliacaoHeader = {
    idAplicador: this.principal.idUser,
    encerrada: false,
    liberada: false,
    dataFim: null,
    dataInicio: null,
    titulo: '',
    visibilidade: 'instituicao' 
  }

  ngOnInit(): void {
  }

  criarAvaliacao(){
    this.showDetalhe = true
    this.idAvaliacaoEditando=''
  }

  salvarAvaliacao(){
    alert(this.avaliacaoHeaderEditando.dataInicio)
    if(!this.avaliacaoHeaderEditando.id){
      this.avaliacaoHeaderEditando.id = this.learningAnalyticsService.newID()
    }
    this.learningAnalyticsService.saveDocumentLearning<AvaliacaoHeader>(this.avaliacaoHeaderEditando,'avaliacaoHeader',this.avaliacaoHeaderEditando.id)
  }

  idItem: string=""

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, { 
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: this.idItem
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  editarItem($event){
    this.idItem = $event
    this.openDialog()
  }

  criarItem(){
    this.idItem = ''
    this.openDialog()
  }

}


@Component({
  selector: 'dialog-item-dialog',
  templateUrl: 'dialog-item.html',
  styleUrls: ['./dialog-item.css']
})
export class DialogContentExampleDialog  {


  constructor(private learningAnalyticsService: LearningAnalyticsService,
    @Inject(MAT_DIALOG_DATA) public idItem: string){
      if(this.idItem != ''){
        this.editarItem()
      }
    }
    dadoEditor= "via uma variável"

  editarItem(){
    this.learningAnalyticsService.lerItem(this.idItem).subscribe(item => {
      this.itemEditando = item
    })
  }

  novoItem(){
    let newItem: OpcaoItem = {correta: false, texto:''}
    this.opcoesItem.push(newItem)
  }
  
  idiomas: string[] = ['Português','Inglês','Espanhol','Francês','Italiano']
  tiposItem: string[] = ['Objetivo','Discursivo']
  dados:string = "no automático"
  visibilidades: string[] = ['Privado','Instituição','Público']
  grausDificuldades: string[] = ['Fácil','Médio','Difícil']
  opcoesItem: OpcaoItem[] = [
    {
      correta: true,
      texto: ""
    },
    {
      correta: false,
      texto: ""
    },
  ]
  itemEditando: Item ={
    id: '',
    conteudo: '',
    idProprietario: '',
    segmento: '',
    componentesCurriculares: [],
    idioma: this.idiomas[0],
    grauDificuldade: '',
    competenciasBNCC: [],
    habilidadesBNCC: [],
    taxonomiasDeBloom: [],
    multiplasInteligencias: [],
    tipoDoItem: this.tiposItem[0],
    tipologiasItemObjetivo: [],
    tipologiasItemDiscursivo: [],
    eixosEstruturantes: [],
    textoItem: '',
    opcoesItem: this.opcoesItem, 
    visibilidade: this.visibilidades[0],
    tempo: 0
  }

  itemObs: Observable<Item>
  tempo: number=10

  tempos: number[] = [10,20,30,40,50,60,90,120,150,180]

  salvar(){
    if (!this.itemEditando.id){
      this.itemEditando.id = this.learningAnalyticsService.newID()
    }
    this.learningAnalyticsService.saveDocumentLearning<Item>(this.itemEditando, 'bancoItens', this.itemEditando.id)
    // if (this.itemEditando.id){
    //   this.learningAnalyticsService.saveItem(this.itemEditando)
    // } else {
    //   this.itemEditando.id = this.learningAnalyticsService.addItem(this.itemEditando)
    // }
  }

  addOpcao(){
    let opcao: OpcaoItem = {correta: false, texto:"opção nova"}
    this.opcoesItem.push(opcao)
  }
}
