import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as Editor from '../../../assets/ckeditor5/ckeditor'


@Component({
  selector: 'app-opcao-item',
  templateUrl: './opcao-item.component.html',
  styleUrls: ['./opcao-item.component.css']
})
export class OpcaoItemComponent implements OnInit {
  public config = {
    width: 400,
    height: 200,
    toolbar: ['mathtype','chemtype','specialCharacters' , 'imageInsert'  ]
  }
  
  public editor = Editor
  @Input() data: string ="<p>Pergunta</p>"
  @Output() dataChange = new EventEmitter<string>()
  dadoEdicao: string = ''

  constructor() { }

  ngOnInit(): void {
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
