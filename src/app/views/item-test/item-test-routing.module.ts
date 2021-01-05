import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemTestComponent } from './item-test.component';

const routes: Routes = [{ path: '', component: ItemTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemTestRoutingModule { }
