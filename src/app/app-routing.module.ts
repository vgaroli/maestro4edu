import { BoletimComponent } from './components/boletim/boletim.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'boletim',
    component: BoletimComponent
  },
  { path: 'item-admin', loadChildren: () => import('./views/item-admin/item-admin.module').then(m => m.ItemAdminModule) },
  { path: 'item-test', loadChildren: () => import('./views/item-test/item-test.module').then(m => m.ItemTestModule) },
  { path: 'pratica-admin', loadChildren: () => import('./views/pratica-admin/pratica-admin.module').then(m => m.PraticaAdminModule) },
  { path: 'avaliacao-admin', loadChildren: () => import('./views/avaliacao-admin/avaliacao-admin.module').then(m => m.AvaliacaoAdminModule) }]
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
