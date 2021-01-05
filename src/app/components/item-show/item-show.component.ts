import { Component, Input, OnInit } from '@angular/core';
import * as Editor from '../../../assets/ckeditor5/ckeditor'

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.css']
})
export class ItemShowComponent implements OnInit {
  public editor = Editor
  @Input() data: string ='<p>no automático <strong>estamos</strong> em total sintonia</p><p>vamos nos empenhas<math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>16</mn></msqrt><mo>+</mo><mfrac><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn></mrow><mn>3</mn></mfrac></math></p><p><math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mfrac><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow><mn>5</mn></mfrac></mrow></math></p>'

  constructor() { }

  ngOnInit(): void {
    this.editor.isReadOnly = true
  }
  onReady(editor: any){
    editor.isReadOnly = true
  }

}
