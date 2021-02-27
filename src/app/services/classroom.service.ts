import { Course } from './../models/classroom.model';
import { PrincipalService } from './principal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  @Output() cursosOk = new EventEmitter<boolean>()

  constructor(private http: HttpClient, public principal: PrincipalService) { }
  listaCursos: Course[] = []
  listaMyCursos: Course[] = []

  
  listWorks(idCourse: string){
    
  }

  

  listAllCourses(){
    let header = new HttpHeaders()
    header.set("Authorization",`Bearer ${this.principal.accessToken}`)
    //header.append("Authorization",`Bearer ${this.principal.accessToken}`)
    //header.append("Accept","application/json")
    let options= {
      headers: header
    }
    let url = ""
    let isProfessor: boolean = this.principal.cargos.indexOf('professor') != -1 
    if (isProfessor){
      url = `https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&teacherId=${this.principal.idGoogle}&key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY`
    } else {
      url = `https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&studentId=${this.principal.idGoogle}&key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY`
    }
    this.http.get(url,
    { headers: new HttpHeaders().set("Authorization",`Bearer ${this.principal.accessToken}`) }).subscribe(resultado => 
      {
        this.listaCursos = resultado["courses"]
        if (isProfessor){
          this.listaMyCursos = this.listaCursos.filter(curso => curso.ownerId == this.principal.idGoogle)
        } else {
          this.listaMyCursos = this.listaCursos
        }
        this.cursosOk.emit(true)
      }
    )
  }
}
