import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PraticaAdminComponent } from './pratica-admin.component';

const routes: Routes = [{ path: '', component: PraticaAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PraticaAdminRoutingModule { }
