import { AvaliacaoBuscaComponent } from './../../components/avaliacao-busca/avaliacao-busca.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoAdminRoutingModule } from './avaliacao-admin-routing.module';
import { AvaliacaoAdminComponent } from './avaliacao-admin.component';


import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemEditComponent } from '../../components/item-edit/item-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { AvaliacaoHeaderComponent } from '../../components/avaliacao-header/avaliacao-header.component';



@NgModule({
  declarations: [AvaliacaoAdminComponent, AvaliacaoBuscaComponent, AvaliacaoHeaderComponent],
  imports: [
    CommonModule,
    AvaliacaoAdminRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,

  ]
})
export class AvaliacaoAdminModule { }
