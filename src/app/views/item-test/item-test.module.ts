import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemTestRoutingModule } from './item-test-routing.module';
import { ItemTestComponent } from './item-test.component';
import { ItemShowComponent } from '../../components/item-show/item-show.component';
//CKEditor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [ItemTestComponent, ItemShowComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    ItemTestRoutingModule
  ]
})
export class ItemTestModule { }
