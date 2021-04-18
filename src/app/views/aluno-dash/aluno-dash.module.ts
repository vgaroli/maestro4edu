import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoDashRoutingModule } from './aluno-dash-routing.module';
import { AlunoDashComponent } from './aluno-dash.component';
import { ClassroomResumoComponent } from '../../components/classroom-resumo/classroom-resumo.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AlunoDashComponent, ClassroomResumoComponent],
  imports: [
    CommonModule,
    AlunoDashRoutingModule,
    MatIconModule
  ]
})
export class AlunoDashModule { }
