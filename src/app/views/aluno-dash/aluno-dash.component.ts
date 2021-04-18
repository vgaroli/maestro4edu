import { EscolaService } from './../../services/escola.service';
import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit } from '@angular/core';
import { AlunoSala, SalaGrade } from 'src/app/models/escola.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aluno-dash',
  templateUrl: './aluno-dash.component.html',
  styleUrls: ['./aluno-dash.component.css']
})
export class AlunoDashComponent implements OnInit {

  salas: SalaGrade[] = []
  alunos: AlunoSala[] = []
  isCoordenador: boolean = false
  isAluno: boolean = false

  constructor(private principal: PrincipalService,
    private escolaService: EscolaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.principal.isAnonimo) {
      this.loadAnonimoData()
    } else {
      if (this.principal.tokensLoaded) {
        this.ajustes()
        this.loadSalas()
      } else {
        this.ajustes()
        this.principal.okTokens.subscribe(() => this.loadSalas())
      }
    }
  }

  loadAnonimoData() {
    this.route.paramMap.subscribe(params => {
      let uuid = params.get("uuid")
      this.principal.loadAnonimoData(uuid).subscribe(dados => {
        if (dados){
          this.principal.escola = dados[0].escola
          this.principal.anoLetivo =dados[0].anoLetivo
          this.principal.idGoogle=dados[0].idGoogle
          this.isAluno =true
          this.isCoordenador=false
          this.loadSalas()
        }
      })
    })
  }

  ajustes() {
    this.isCoordenador = (this.principal.cargos.indexOf("coordenador") != -1 || this.principal.cargos.indexOf("diretor") != -1)
    this.isAluno = (this.principal.cargos.indexOf("aluno") != -1)
  }

  loadSalas() {
    if (this.isCoordenador) {
      this.escolaService.loadSalas().subscribe(salas => {
        this.salas = salas
      })
    }
    if (this.isAluno) {
      let alunoSala: AlunoSala = {
        idGoogle: this.principal.idGoogle,
        idSala: "",
        nomeAluno: "",
        nomeSala: ""
      }
      this.alunos.push(alunoSala)
    }
  }

  buscaSala(sala: string) {
    this.escolaService.loadAlunosSala(sala).subscribe(alunosSala => {
      this.alunos = alunosSala
    })
  }

}
