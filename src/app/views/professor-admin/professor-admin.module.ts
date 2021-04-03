import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorAdminRoutingModule } from './professor-admin-routing.module';
import { ProfessorAdminComponent } from './professor-admin.component';
import { ProfessorSalaComponent } from '../../components/professor-sala/professor-sala.component';


@NgModule({
  declarations: [ProfessorAdminComponent, ProfessorSalaComponent],
  imports: [
    CommonModule,
    ProfessorAdminRoutingModule
  ]
})
export class ProfessorAdminModule { }
