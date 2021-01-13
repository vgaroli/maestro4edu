import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoAdminComponent } from './avaliacao-admin.component';

const routes: Routes = [{ path: '', component: AvaliacaoAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoAdminRoutingModule { }
