import { Course, CourseReport } from './../../models/classroom.model';
import { PrincipalService } from './../../services/principal.service';
import { ClassroomService } from './../../services/classroom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent {

  listCourses: Course[]
  courses: CourseReport[] = []

  constructor(private classroomService: ClassroomService, private principalService: PrincipalService) {
    this.principalService.okTokens.subscribe(
      value => {
        if (value) {
          this.classroomService.listAllCourses()
        }
      }
    )
    this.classroomService.cursosOk.subscribe(value => {
      if (value) {
        this.classroomService.listaMyCursos.forEach(course => {
          let courseReport = {
            id: course.id,
            name: course.name,
            section: course.section,
            values: []
          }
          this.courses.push(courseReport)
          this.processarTarefas(courseReport)
        })
      }
    })
  }

  processarTarefas(course: CourseReport) {
    this.classroomService.listCountWorks(course.id, course)
  }

}
