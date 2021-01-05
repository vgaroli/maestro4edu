import { ClassificacaoLearningAnalytics, Item } from './../models/learningAnalytics.model';
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

  constructor(private firestore: AngularFirestore, private dbService: NgxIndexedDBService) { 
    this.itemCollection = firestore.collection<Item>('bancoItens')
    
  }

  lerClassificao(classificacao: string):Observable<ClassificacaoLearningAnalytics[]>{
    let listaClassificacoes: Observable<ClassificacaoLearningAnalytics[]> = this.readDadosIndexedDB(classificacao)
    listaClassificacoes.subscribe(lista => {
      if (lista.length===0){
        console.log("lendo remoto")
        this.cgCollection =  this.firestore.collection(classificacao, ref => ref.orderBy('id'))
        listaClassificacoes = this.cgCollection.valueChanges()
        this.saveDadosIndexedDB(classificacao, listaClassificacoes)
      }
    })
    return listaClassificacoes;
  }

  newItem(item:Item):Observable<Item>{
    let idItem = this.firestore.createId()
    this.itemCollection.doc(idItem).set(item)
    return this.itemCollection.doc(idItem).valueChanges()
  }

  saveDadosIndexedDB(store: string, dados: Observable<ClassificacaoLearningAnalytics[]>){
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
      itens.map(item => this.dbService.add(store,item))
    })
  }

  readDadosIndexedDB(store: string):Observable<ClassificacaoLearningAnalytics[]>{
    let lista: any //Observable<ClassificacaoLearningAnalytics[]>
    console.log("lendo local")
    lista = this.dbService.getAll(store)
    lista.subscribe(dados => {
      console.log(dados)
    })
    return lista
  }
}
