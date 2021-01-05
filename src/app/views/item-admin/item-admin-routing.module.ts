import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemAdminComponent } from './item-admin.component';

const routes: Routes = [{ path: '', component: ItemAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemAdminRoutingModule { }
