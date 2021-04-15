import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course, CourseReport, CourseWork, CourseNumbers, StudentSubmission, SubmissaoClassroom, AgrupamentoSubmissao } from './../models/classroom.model';
import { PrincipalService } from './principal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  @Output() cursosOk = new EventEmitter<boolean>()
  @Output() salaAjustada = new EventEmitter<boolean>()

  constructor(private http: HttpClient, public principal: PrincipalService, public firestore: AngularFirestore) { }
  listaCursos: Course[] = []
  listaMyCursos: Course[] = []


  listCountWorks(idCourse: string, course: CourseReport) {
    let url = ""
    url = `https://classroom.googleapis.com/v1/courses/${idCourse}/courseWork?key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY`
    this.http.get(url,
      { headers: new HttpHeaders().set("Authorization", `Bearer ${this.principal.accessToken}`) }).subscribe(resultado => {
        let tarefas: CourseWork[] = resultado["courseWork"]
        let value: CourseNumbers = { description: "Tarefas", total: tarefas.length }
        course.values.push(value)
        tarefas.forEach(tarefa => {
          
          this.listCountSubmissions(tarefa, course)
        })
      })
  }

  listCountSubmissions(tarefa: CourseWork, course: CourseReport) {
    //GET https://classroom.googleapis.com/v1/courses/268337155112/courseWork/265182109285/studentSubmissions?key=[YOUR_API_KEY] HTTP/1.1
    let url = ""
    url = `https://classroom.googleapis.com/v1/courses/${course.id}/courseWork/${tarefa.id}/studentSubmissions?key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY`
    this.http.get(url,
      { headers: new HttpHeaders().set("Authorization", `Bearer ${this.principal.accessToken}`) }).subscribe(resultado => {
        let entregas: StudentSubmission[] = resultado["studentSubmissions"]
        entregas.forEach(entrega => {
          if (entrega.late) {
            let values: CourseNumbers[]
            let value: CourseNumbers
            if (entrega.state.toString() === "TURNED_IN") {
              values = course.values.filter(value => value.description === "Atrasada(s)")
              if (values.length > 0) {
                values[0].total++
              } else {
                value = { description: "Atrasada(s)", total: 1, cor: "background-color:orange" }
                course.values.push(value)
              }
            } else {
              values = course.values.filter(value => value.description === "Pendente(s)")
              if (values.length > 0) {
                values[0].total++
              } else {
                value = { description: "Pendente(s)", total: 1, cor: "background-color:red"  }
                course.values.push(value)
              }
            }
          }
        })
      })
  }





  listAllCourses() {
    let url = ""
    let isProfessor: boolean = this.principal.cargos.indexOf('professor') != -1
    if (isProfessor) {
      url = `https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&teacherId=${this.principal.idGoogle}&key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY`
    } else {
      url = `https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&studentId=${this.principal.idGoogle}&key=AIzaSyDO5OLn1_j0xFFF_E3ES96AHipHtFtrJUY`
    }
    this.http.get(url,
      { headers: new HttpHeaders().set("Authorization", `Bearer ${this.principal.accessToken}`) }).subscribe(resultado => {
        this.listaCursos = resultado["courses"]
        if (isProfessor) {
          this.listaMyCursos = this.listaCursos//.filter(curso => curso.ownerId == this.principal.idGoogle)
        } else {
          this.listaMyCursos = this.listaCursos
        }
        this.syncCourses()
        this.cursosOk.emit(true)
      }
      )
  }

  syncCourses(){
    this.listaMyCursos.forEach(curso => {
      let dtUpdate = new Date(curso.updateTime)
      let yearCreate = new Date(curso.creationTime).getFullYear()
      if (dtUpdate > this.principal.ultimoUpdateClassroom){
        this.firestore.collection<Course>(`escolas/${this.principal.escola}/anosLetivos/${yearCreate}/salasClassroom`).doc(curso.id)
          .set(curso).catch(erro => {
            console.log(erro)
          })
      }
    })
  }

  listResumo(idGoogle:string): Observable<SubmissaoClassroom[]> {
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/submissionsClassroom`
    return this.firestore.collection<SubmissaoClassroom>(colecao, ref => ref.where('idGoogle','==',idGoogle).orderBy('idSala').orderBy('tarefa'))
    .valueChanges()
  }

  listResumoGeral(idGoogle:string): Observable<AgrupamentoSubmissao[]> {
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/submissionsGeralAlunoClassroom`
    return this.firestore.collection<AgrupamentoSubmissao>(colecao, ref => ref.where('idGoogle','==',idGoogle))
    .valueChanges()
  }

  listResumoSala(idGoogle:string): Observable<AgrupamentoSubmissao[]> {
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/submissionsSalaAlunoClassroom`
    return this.firestore.collection<AgrupamentoSubmissao>(colecao, ref => ref.where('idGoogle','==',idGoogle))
    .valueChanges()
  }

  ajusteNomeSala(submissoes: SubmissaoClassroom[]){
    let colecao = `escolas/${this.principal.escola}/anosLetivos/${this.principal.anoLetivo}/salasClassroom`
    this.firestore.collection<Course>(colecao).valueChanges().pipe(take(1)).subscribe(cursos =>{
      submissoes.forEach(item =>{
        let cursoF = cursos.filter(c => c.id === item.idSala.toString())
        item.sala = cursoF[0].descriptionHeading + ((cursoF[0].section)? " - " + cursoF[0].section : "")
      })
      this.salaAjustada.emit(true)
    })
  }
}
