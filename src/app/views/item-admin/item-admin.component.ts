import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-item-admin',
  templateUrl: './item-admin.component.html',
  styleUrls: ['./item-admin.component.css']
})
export class ItemAdminComponent{
  constructor(public dialog: MatDialog) { }


}

