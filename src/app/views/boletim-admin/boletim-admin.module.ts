import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoletimAdminRoutingModule } from './boletim-admin-routing.module';
import { BoletimAdminComponent } from './boletim-admin.component';


@NgModule({
  declarations: [BoletimAdminComponent],
  imports: [
    CommonModule,
    BoletimAdminRoutingModule
  ]
})
export class BoletimAdminModule { }
