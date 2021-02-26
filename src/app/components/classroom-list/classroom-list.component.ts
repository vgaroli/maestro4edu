import { PrincipalService } from './../../services/principal.service';
import { ClassroomService } from './../../services/classroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent {

  constructor(private classroomService: ClassroomService, private principalService: PrincipalService) {
    this.principalService.okTokens.subscribe(
      value => {
        if(value){
          this.classroomService.listAllCourses()
        }
      }
    )
   }

}
