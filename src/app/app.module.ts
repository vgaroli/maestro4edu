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


//CKEditor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

//Próprios
import { BoletimComponent } from './components/boletim/boletim.component';

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
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    BoletimComponent,
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
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatAutocompleteModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
