import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletimAdminComponent } from './boletim-admin.component';

const routes: Routes = [{ path: '', component: BoletimAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletimAdminRoutingModule { }
