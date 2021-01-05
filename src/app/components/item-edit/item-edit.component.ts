import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as Editor from '../../../assets/ckeditor5/ckeditor'

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  public config = {
    width: 1000,
    height: 400,
    toolbar: [ 'heading',
    '|', 'underline', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'alignment',
    '|','mathtype','chemtype','specialCharacters' , 'imageInsert', 'insertTable',
    '|', 'fontSize','fontFamily', 'fontColor' ,'fontBackgroundColor',  ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    }
  }
  
  public editor = Editor
  @Input() data: string ="<p>Pergunta</p>"
  @Output() dataChange = new EventEmitter<string>()
  dadoEdicao: string = ''
  constructor() { }
  
  ngOnInit(): void {
    //this.editor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );
    this.dadoEdicao = this.data
  }

  changeData(event: any){
    this.dataChange.emit(event.editor.getData())
  }

  onReady(editor: any){
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement())
  }


}
