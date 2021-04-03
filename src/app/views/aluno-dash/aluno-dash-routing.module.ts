import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoDashComponent } from './aluno-dash.component';

const routes: Routes = [{ path: '', component: AlunoDashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoDashRoutingModule { }
