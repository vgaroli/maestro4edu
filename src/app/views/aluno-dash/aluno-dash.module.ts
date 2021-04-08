import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoDashRoutingModule } from './aluno-dash-routing.module';
import { AlunoDashComponent } from './aluno-dash.component';
import { ClassroomResumoComponent } from '../../components/classroom-resumo/classroom-resumo.component';


@NgModule({
  declarations: [AlunoDashComponent, ClassroomResumoComponent],
  imports: [
    CommonModule,
    AlunoDashRoutingModule
  ]
})
export class AlunoDashModule { }
