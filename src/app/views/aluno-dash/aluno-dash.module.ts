import { BoletimComponent } from './../../components/boletim/boletim.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoDashRoutingModule } from './aluno-dash-routing.module';
import { AlunoDashComponent } from './aluno-dash.component';
import { ClassroomResumoComponent } from '../../components/classroom-resumo/classroom-resumo.component';
import { MatIconModule } from '@angular/material/icon';
import { GeekieoneResumoComponent } from '../../components/geekieone-resumo/geekieone-resumo.component';
import { LetrusResumoComponent } from '../../components/letrus-resumo/letrus-resumo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AlunoDashComponent, ClassroomResumoComponent, GeekieoneResumoComponent, LetrusResumoComponent, BoletimComponent],
  imports: [
    CommonModule,
    AlunoDashRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class AlunoDashModule { }
