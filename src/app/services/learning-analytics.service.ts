import { ClassificacaoLearningAnalytics, Item, Pratica, AvaliacaoHeader } from './../models/learningAnalytics.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class LearningAnalyticsService {
  private cgCollection: AngularFirestoreCollection<ClassificacaoLearningAnalytics>
  private itemCollection: AngularFirestoreCollection<Item>
  private planoCollection: AngularFirestoreCollection<Pratica>
  private avaliacaoHeaderCollection: AngularFirestoreCollection<AvaliacaoHeader>

  @Output()  savedData = new  EventEmitter<string>()

  constructor(private firestore: AngularFirestore, private dbService: NgxIndexedDBService) {
    this.itemCollection = firestore.collection<Item>('bancoItens')
    this.planoCollection = firestore.collection<Pratica>('bancoPraticas')
    this.avaliacaoHeaderCollection = firestore.collection<AvaliacaoHeader>('avaliacoesHeader')

  }

  newID(): string{
    return this.firestore.createId()
  }

  saveDocumentLearning<T>(documento: T, colecao: string, id: string){
    this.firestore.collection<T>(colecao).doc(id).set(documento)    
  }

  addAvaliacaoHeader(avaliacaoHeader: AvaliacaoHeader): string{
    let idAvaliacaoHeader: string
    idAvaliacaoHeader = this.firestore.createId()
    avaliacaoHeader.id = idAvaliacaoHeader
    this.avaliacaoHeaderCollection.doc(idAvaliacaoHeader).set(avaliacaoHeader)
    return idAvaliacaoHeader
  }

  addItem(item: Item): string {
    let idItem: string
    idItem = this.firestore.createId()
    item.id = idItem
    this.itemCollection.doc(item.id).set(item)
    return idItem
  }

  saveItem(item:Item){
    this.itemCollection.doc(item.id).set(item)
  }

  lerItem(id: string): Observable<Item>{
    return this.itemCollection.doc(id).valueChanges()
  }

  

  listaItens(): Observable<Item[]>{
    let listaItens$: Observable<Item[]>
    listaItens$ = this.itemCollection.valueChanges()
    return listaItens$
  }

  listaAvaliacoes(): Observable<AvaliacaoHeader[]>{
    let listaAvaliacoes$: Observable<AvaliacaoHeader[]>
    listaAvaliacoes$ = this.avaliacaoHeaderCollection.valueChanges()
    return listaAvaliacoes$
  }

  listaPlanos(): Observable<Pratica[]>{
    let listaPlanos$: Observable<Pratica[]>
    listaPlanos$ = this.planoCollection.valueChanges()
    return listaPlanos$
  }


  lerClassificao(classificacao: string): Observable<ClassificacaoLearningAnalytics[]> {
    let listaClassificacoes: Observable<ClassificacaoLearningAnalytics[]> = this.readDadosIndexedDB(classificacao)
    listaClassificacoes.subscribe(lista => {
      if (lista.length === 0) {
        console.log("lendo remoto")
        this.cgCollection = this.firestore.collection(classificacao, ref => ref.orderBy('id'))
        listaClassificacoes = this.cgCollection.valueChanges()
        this.saveDadosIndexedDB(classificacao, listaClassificacoes)
      }
    })
    return listaClassificacoes;
  }

  newItem(item: Item): Observable<Item> {
    let idItem = this.firestore.createId()
    this.itemCollection.doc(idItem).set(item)
    return this.itemCollection.doc(idItem).valueChanges()
  }

  saveDadosIndexedDB(store: string, dados: Observable<ClassificacaoLearningAnalytics[]>) {
    dados.subscribe(itens => {
      itens.map(item => this.dbService.add(store, item))
      this.savedData.emit(store)
    })
  }

  readDadosIndexedDB(store: string): Observable<ClassificacaoLearningAnalytics[]> {
    let lista: any //Observable<ClassificacaoLearningAnalytics[]>
    console.log("lendo local")
    lista = this.dbService.getAll(store)
    return lista
  }
}
