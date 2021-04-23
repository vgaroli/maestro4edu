import { EscolaService } from './../../services/escola.service';
import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit } from '@angular/core';
import { AlunoSala, SalaGrade } from 'src/app/models/escola.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

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
  showDetalheClassroom: boolean = false
  showDetalheGeekie: boolean = false
  showDetalheLetrus: boolean = false
  showBoletim: boolean=false
  showBoletimAnonimo: boolean=false
  panelOpenState = false;

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
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      let uuid = params.get("uuid")
      this.principal.loadAnonimoData(uuid).pipe(take(1)).subscribe(dados => {
        if (dados) {
          this.principal.getShowBoletimForAnonimo(dados[0].escola).subscribe(dado => {
            this.showBoletim = dado.showBoletim
            this.showBoletimAnonimo = true
          })
          this.principal.escola = dados[0].escola
          this.principal.anoLetivo = dados[0].anoLetivo
          this.principal.idGoogle = dados[0].idGoogle
          this.principal.nomePessoa = dados[0].nomeAluno
          if (dados[0].idGeekie) {
            this.principal.idGeekie = dados[0].idGeekie
          }
          this.isAluno = true
          this.isCoordenador = false
          this.loadSalas()
        }
      })
    })
  }

  ajustes() {
    this.isCoordenador = (this.principal.cargos.indexOf("coordenador") != -1 || this.principal.cargos.indexOf("diretor") != -1)
    this.isAluno = (this.principal.cargos.indexOf("aluno") != -1)
    this.showBoletimAnonimo = true // (this.showBoletim || this.isCoordenador)
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
        idGeekie: this.principal.idGeekie,
        idSala: "",
        nomeAluno: this.principal.nomePessoa,
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


  detalheClassroom() {
    this.showDetalheClassroom = (!this.showDetalheClassroom)
    if(this.showDetalheClassroom){
      this.showDetalheGeekie=false
      this.showDetalheLetrus=false
    }
  }

  detalheGeekie() {
    this.showDetalheGeekie = (!this.showDetalheGeekie)
    if(this.showDetalheGeekie){
      this.showDetalheClassroom=false
      this.showDetalheLetrus=false
    }
  }

  detalheLetrus() {
    this.showDetalheLetrus = (!this.showDetalheLetrus)
    if(this.showDetalheLetrus){
      this.showDetalheClassroom=false
      this.showDetalheGeekie=false
    }
  }
}
