import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoAdminRoutingModule } from './avaliacao-admin-routing.module';
import { AvaliacaoAdminComponent } from './avaliacao-admin.component';


@NgModule({
  declarations: [AvaliacaoAdminComponent],
  imports: [
    CommonModule,
    AvaliacaoAdminRoutingModule
  ]
})
export class AvaliacaoAdminModule { }
