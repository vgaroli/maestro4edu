import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAdminRoutingModule } from './users-admin-routing.module';
import { UsersAdminComponent } from './users-admin.component';
import { GoogleUsersComponent } from '../../components/google-users/google-users.component';


@NgModule({
  declarations: [UsersAdminComponent, GoogleUsersComponent],
  imports: [
    CommonModule,
    UsersAdminRoutingModule
  ]
})
export class UsersAdminModule { }
