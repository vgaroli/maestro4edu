import { DashTarefasComponent } from './views/dash-tarefas/dash-tarefas.component';
import { HomeComponent } from './views/home/home.component';
import { BoletimComponent } from './components/boletim/boletim.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'boletim',
    component: BoletimComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dash-tarefas',
    component: DashTarefasComponent
  },
  { path: 'item-admin', loadChildren: () => import('./views/item-admin/item-admin.module').then(m => m.ItemAdminModule) },
  { path: 'item-test', loadChildren: () => import('./views/item-test/item-test.module').then(m => m.ItemTestModule) },
  { path: 'pratica-admin', loadChildren: () => import('./views/pratica-admin/pratica-admin.module').then(m => m.PraticaAdminModule) },
  { path: 'avaliacao-admin', loadChildren: () => import('./views/avaliacao-admin/avaliacao-admin.module').then(m => m.AvaliacaoAdminModule) },
  { path: 'users-admin', loadChildren: () => import('./views/users-admin/users-admin.module').then(m => m.UsersAdminModule) }]
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
