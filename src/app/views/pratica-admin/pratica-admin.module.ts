import { PraticaBuscaComponent } from './../../components/pratica-busca/pratica-busca.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PraticaAdminRoutingModule } from './pratica-admin-routing.module';
import { PraticaAdminComponent } from './pratica-admin.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [PraticaAdminComponent, PraticaBuscaComponent],
  imports: [
    CommonModule,
    PraticaAdminRoutingModule,
    MatFormFieldModule,
    CKEditorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
  ]
})
export class PraticaAdminModule { }
