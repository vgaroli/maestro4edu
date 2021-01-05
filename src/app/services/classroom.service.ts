import { Course } from './../models/classroom.model';
import { PrincipalService } from './principal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient, public principal: PrincipalService) { }
  listaCursos: Course[] = []

  listCourses(){
    let header = new HttpHeaders()
    header.set("Authorization",`Bearer ${this.principal.accessToken}`)
    //header.append("Authorization",`Bearer ${this.principal.accessToken}`)
    //header.append("Accept","application/json")
    let options= {
      headers: header
    }
    
    this.http.get("https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY",
    { headers: new HttpHeaders().set("Authorization",`Bearer ${this.principal.accessToken}`) }).subscribe(resultado => 
      {
        console.log(resultado)
        
      }
    )
  }

}
