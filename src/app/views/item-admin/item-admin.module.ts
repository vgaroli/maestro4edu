import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemAdminRoutingModule } from './item-admin-routing.module';
import { ItemAdminComponent } from './item-admin.component';
import { ItemHeaderComponent } from '../../components/item-header/item-header.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemEditComponent } from '../../components/item-edit/item-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

//CKEditor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OpcaoItemComponent } from 'src/app/components/opcao-item/opcao-item.component';

@NgModule({
  declarations: [ItemAdminComponent, ItemHeaderComponent, ItemEditComponent, OpcaoItemComponent  ],
  imports: [
    CommonModule,
    ItemAdminRoutingModule,
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
  ]})
export class ItemAdminModule { }
