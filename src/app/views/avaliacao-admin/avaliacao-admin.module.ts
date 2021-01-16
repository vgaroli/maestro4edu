import { AvaliacaoBuscaComponent } from './../../components/avaliacao-busca/avaliacao-busca.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoAdminRoutingModule } from './avaliacao-admin-routing.module';
import { AvaliacaoAdminComponent } from './avaliacao-admin.component';
import { ItemHeaderComponent } from '../../components/item-header/item-header.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AvaliacaoHeaderComponent } from '../../components/avaliacao-header/avaliacao-header.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ItemBuscaComponent } from 'src/app/components/item-busca/item-busca.component';
import { ItemEditComponent } from '../../components/item-edit/item-edit.component';


import {MatNativeDateModule} from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

//CKEditor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OpcaoItemComponent } from 'src/app/components/opcao-item/opcao-item.component';

import { DialogContentExampleDialog } from './avaliacao-admin.component';


@NgModule({
  declarations: [AvaliacaoAdminComponent, ItemHeaderComponent, ItemEditComponent, ItemBuscaComponent, AvaliacaoBuscaComponent, AvaliacaoHeaderComponent, OpcaoItemComponent, DialogContentExampleDialog ],
  imports: [
    CommonModule,
    AvaliacaoAdminRoutingModule,
    CKEditorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
  ]
})
export class AvaliacaoAdminModule { }

