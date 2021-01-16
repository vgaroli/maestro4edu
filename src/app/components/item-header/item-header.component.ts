import { LearningAnalyticsService } from './../../services/learning-analytics.service';
import { ClassificacaoLearningAnalytics } from './../../models/learningAnalytics.model';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.css']
})
export class ItemHeaderComponent implements AfterViewInit {
  listaClassificacao$: Observable<ClassificacaoLearningAnalytics[]>
  filterdClassificacao: ClassificacaoLearningAnalytics[]
  todasClassificacoes: ClassificacaoLearningAnalytics[]
  filtroClassificacao: string=''
  
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  myControl = new FormControl();
  
  @ViewChild('classificacaoInput') classificacaoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() etiqueta: string = "Teste etiqueta"
  @Input() classificacao: string =""
  @Input() classificacoes: string[] = []
  @Output()  classificacoesChange = new  EventEmitter<string[]>()

  constructor(private lAnalytics: LearningAnalyticsService) {
    this.lAnalytics.savedData.subscribe(valor =>{
      if (valor == this.classificacao){
        this.loadData()
      }
    })
  }


   selected(event: MatAutocompleteSelectedEvent): void {
    this.classificacoes.push(event.option.viewValue.substr(0, event.option.viewValue.indexOf('|')));
    this.classificacaoInput.nativeElement.value = '';
  }

   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.substr(0, event.value.indexOf('|'));

 
    if ((value || '').trim()) {
      this.classificacoes.push(value.trim());
      this.classificacoesChange.emit(this.classificacoes)
    }

    // Reset the input value
    if (input) {
      input.value = '';
      this.runFilter('')
    }
  }

   remove(tags: string){
    this.classificacoes.splice(this.classificacoes.indexOf(tags),1)
    this.classificacoesChange.emit(this.classificacoes)
    this.classificacaoInput.nativeElement.value = ''
   }

  loadData(){
    this.listaClassificacao$ = this.lAnalytics.lerClassificao(this.classificacao)
    this.listaClassificacao$.subscribe(itens => { 
      this.todasClassificacoes = itens 
      this.filterdClassificacao = itens 
    })
  }

  runFilter(value: string){
    this.filterdClassificacao = 
    this.todasClassificacoes.filter(item => 
      ((item.tags.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 ||
      item.descricao.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)&&
        this.classificacoes.indexOf(item.tags)===-1)
      )
  }

  ngAfterViewInit(): void {
    this.loadData()
    this.myControl.valueChanges.pipe(
      map(value => {
          this.runFilter(value)
        }
      )
    ).subscribe()
  }

}
