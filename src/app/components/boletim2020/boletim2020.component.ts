import { PrincipalService } from './../../services/principal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Input, AfterViewInit } from '@angular/core';
import { Boletim2020, BoletimAluno, DadosDisciplinaBoletim } from './../../models/boletim.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-boletim2020',
  templateUrl: './boletim2020.component.html',
  styleUrls: ['./boletim2020.component.css']
})
export class Boletim2020Component implements AfterViewInit {
  @Input() idgoogle: string = null
  coordenacao: boolean = false
  lastGrade: string = ""


  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  listaBoletinsAlunos: BoletimAluno[]

  listaBoletim$: Observable<Boletim2020[]>


  constructor(private principal: PrincipalService, private firestore: AngularFirestore) { }

  ngAfterViewInit(){
    if (this.principal.tokensLoaded || this.principal.isAnonimo){
      this.coordenacao = (this.principal.cargos.indexOf('coordenador') > -1)
      console.log("1")
    } else {
      this.principal.okTokens.subscribe(() =>[
        this.coordenacao = (this.principal.cargos.indexOf('coordenador') > -1)
      ])
      console.log("2")
    }   
  }


  changeGrade(event) {
    console.log("3")
    console.log(event.value)
    this.lastGrade = event.value
    this.reloadBoletins(null, event.value)
  }

  getAluno(): void {
    console.log(this.idgoogle)
    this.reloadBoletins(this.idgoogle)
    this.reloadFoto(this.idgoogle)
  }

  reloadFoto(idGoogle: string) {

  }

  reloadBoletins(idGoogle: string,grade: string="") {
    this.listaBoletinsAlunos = []
    if (this.coordenacao) {
      if (idGoogle) {
        this.listaBoletim$ = this.firestore.collection<Boletim2020>('escolas/YPyLAYTFN6rkQa0Iyguj/anosLetivos/2020/boletins',
        ref => ref.orderBy("grade").orderBy("aluno").where("idGoogle","==",idGoogle)).valueChanges()
      } else {
        console.log("completo")
        console.log(grade)
        this.listaBoletim$ =this.firestore.collection<Boletim2020>('escolas/YPyLAYTFN6rkQa0Iyguj/anosLetivos/2020/boletins',
        ref => ref.orderBy("aluno").where("grade","==",grade)).valueChanges()
      }
    } 
    this.listaBoletim$.subscribe(boletim => {
      console.log("assinatura")
      console.log(boletim)
      let idGoogle = ""
      let n = 0
      let alunoAtual = ""
      let gradeAtual = ""
      let notasAlunoAtual: DadosDisciplinaBoletim[] = []
      while (n < boletim.length) {
        if (idGoogle != boletim[n].idGoogle) {
          if (idGoogle !== "") {
            let boletimAluno: BoletimAluno = {
              aluno: "",
              grade: "",
              notas: []
            }
            boletimAluno.aluno = alunoAtual
            boletimAluno.grade = gradeAtual
            boletimAluno.notas = notasAlunoAtual
            boletimAluno.idGoogle = idGoogle
            this.listaBoletinsAlunos.push(boletimAluno)
          }
          alunoAtual = boletim[n].aluno
          idGoogle = boletim[n].idGoogle
          gradeAtual = boletim[n].grade
          notasAlunoAtual = []
        }
        let dadosDisciplina: DadosDisciplinaBoletim = {
          disciplina: "",
          idDiario: null,
          idPaginaFinal: null,
          nota1: null,
          media1: null,
          faltas1: null,
          nota2: null,
          media2: null,
          faltas2: null,
          nota3: null,
          media3: null,
          faltas3: null,
          totalFaltas: null,
          percFreq: null,
          pontos: null,
          mediaAnual: null,
          recuperacao: null,
          mediaFinal1: null,
          segundaProva: null,
          mediaFinal2: null,
          resultado: ""
        }
        dadosDisciplina.disciplina = boletim[n].nome
        dadosDisciplina.idDiario = boletim[n].idDiario
        dadosDisciplina.idPaginaFinal = boletim[n].idPaginaFinal
        dadosDisciplina.nota1 = boletim[n].notas[0].nota
        dadosDisciplina.nota2 = boletim[n].notas[1].nota
        dadosDisciplina.nota3 = boletim[n].notas[2].nota
        dadosDisciplina.media1 = boletim[n].notas[0].media
        dadosDisciplina.media2 = boletim[n].notas[1].media
        dadosDisciplina.media3 = boletim[n].notas[2].media
        dadosDisciplina.faltas1 = boletim[n].notas[0].faltas
        dadosDisciplina.faltas2 = boletim[n].notas[1].faltas
        dadosDisciplina.faltas3 = boletim[n].notas[2].faltas
        dadosDisciplina.mediaAnual = boletim[n].mediaAnual
        dadosDisciplina.mediaFinal1 = boletim[n].mediaFinal1
        dadosDisciplina.mediaFinal2 = boletim[n].mediaFinal2
        dadosDisciplina.percFreq = boletim[n].percentualFrequencia
        dadosDisciplina.pontos = boletim[n].totalPontos
        dadosDisciplina.recuperacao = boletim[n].recuperacao
        dadosDisciplina.resultado = boletim[n].resultado
        dadosDisciplina.segundaProva = boletim[n].segundaProva
        dadosDisciplina.totalFaltas = boletim[n].totalFaltas
        notasAlunoAtual.push(dadosDisciplina)
        n++
      }
    });
  }
}
