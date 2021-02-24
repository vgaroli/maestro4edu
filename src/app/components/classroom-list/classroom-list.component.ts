import { ClassroomService } from './../../services/classroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  constructor(private classroomService: ClassroomService) { }

  ngOnInit(): void {
    this.classroomService.listCourses()
  }

}
