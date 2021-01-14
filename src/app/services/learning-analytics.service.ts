import { ClassificacaoLearningAnalytics, Item, Pratica, AvaliacaoHeader } from './../models/learningAnalytics.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
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

  constructor(private firestore: AngularFirestore, private dbService: NgxIndexedDBService) {
    this.itemCollection = firestore.collection<Item>('bancoItens')
    this.planoCollection = firestore.collection<Pratica>('bancoPraticas')
    this.avaliacaoHeaderCollection = firestore.collection<AvaliacaoHeader>('avaliacoesHeader')

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
    // const storeSchema: ObjectStoreMeta = {
    //   store: store,
    //   storeConfig: { keyPath: 'id', autoIncrement: false },
    //   storeSchema: [
    //     { name: 'id', keypath: 'id', options: { unique: true } },
    //     { name: 'tags', keypath: 'tags', options: { unique: false } },
    //     { name: 'descricao', keypath: 'descricao', options: { unique: false } },
    //   ],
    // }
    //this.dbService.createObjectStore(storeSchema)
    dados.subscribe(itens => {
      itens.map(item => this.dbService.add(store, item))
    })
  }

  readDadosIndexedDB(store: string): Observable<ClassificacaoLearningAnalytics[]> {
    let lista: any //Observable<ClassificacaoLearningAnalytics[]>
    console.log("lendo local")
    lista = this.dbService.getAll(store)
    return lista
  }
}
