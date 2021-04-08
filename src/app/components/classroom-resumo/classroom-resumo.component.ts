import { SubmissaoClassroom } from './../../models/classroom.model';
import { PrincipalService } from './../../services/principal.service';
import { ClassroomService } from './../../services/classroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom-resumo',
  templateUrl: './classroom-resumo.component.html',
  styleUrls: ['./classroom-resumo.component.css']
})
export class ClassroomResumoComponent implements OnInit {

  constructor(private classroom: ClassroomService, private principal: PrincipalService) { }
  submissoes: SubmissaoClassroom[]


  ngOnInit(): void {
    if(this.principal.tokensLoaded){
      this.loadSubmissions()
    } else {
      this.principal.okTokens.subscribe(() => this.loadSubmissions())
    }
  }

  loadSubmissions(){
    this.classroom.listResumo("115367050490893463816").subscribe(submissoes => {
      this.submissoes= submissoes
    })  
  }

}
