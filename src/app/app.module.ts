import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angularfire
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


//Material

import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule }  from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
//echart
import { NgxEchartsModule } from 'ngx-echarts';

//CKEditor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

//Próprios
import { TempoGeekieChartComponent } from './components/tempo-geekie-chart/tempo-geekie-chart.component';
import { ClassroomListComponent } from './components/classroom-list/classroom-list.component';
import { HomeComponent } from './views/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { DashTarefasComponent } from './views/dash-tarefas/dash-tarefas.component';
import { GeekieClassPerfComponent } from './components/geekie-class-perf/geekie-class-perf.component';
import { LetrusDataComponent } from './components/letrus-data/letrus-data.component';

//print
import {NgxPrintModule} from 'ngx-print';
import { Boletim2020Component } from './components/boletim2020/boletim2020.component';

const dbConfig: DBConfig  = {
  name: 'maestro4edu',
  version: 1,
  objectStoresMeta: [
    {
      store: 'competenciasBNCC',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'habilidadesBNCC',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'taxinomiaBloom',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'multiplasInteligencias',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'tipologiaItensObjetivo',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'tipologiaItensDiscursivo',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'eixosEstruturantes',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
    {
      store: 'componentesCurriculares',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
        { name: 'descricao', keypath: 'descricao', options: { unique: false } },
      ],
    },
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    TempoGeekieChartComponent,
    ClassroomListComponent,
    HomeComponent,
    DashTarefasComponent,
    GeekieClassPerfComponent,
    LetrusDataComponent,
    Boletim2020Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,    
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    NgxPrintModule,
    MatButtonModule,
    CKEditorModule,
    MatButtonToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatAutocompleteModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
