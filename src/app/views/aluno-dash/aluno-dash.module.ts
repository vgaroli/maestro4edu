import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoDashRoutingModule } from './aluno-dash-routing.module';
import { AlunoDashComponent } from './aluno-dash.component';


@NgModule({
  declarations: [AlunoDashComponent],
  imports: [
    CommonModule,
    AlunoDashRoutingModule
  ]
})
export class AlunoDashModule { }
