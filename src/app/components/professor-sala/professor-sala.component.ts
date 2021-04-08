import { Disciplina } from './../../models/boletim.model';
import { BoletimService } from './../../services/boletim.service';
import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit } from '@angular/core';
import { Docente, Sala } from 'src/app/models/escola.model';

interface SalaDisplay {
  diario: string
  nomeDisciplina: string
  sala: string
}

@Component({
  selector: 'app-professor-sala',
  templateUrl: './professor-sala.component.html',
  styleUrls: ['./professor-sala.component.css']
})
export class ProfessorSalaComponent implements OnInit {




  docente: Docente
  salas: SalaDisplay[]=[]
  disciplinas: Disciplina[]
  isCoordenador: boolean=false
  isProfessor: boolean=false

  constructor(private principal: PrincipalService, private boletim: BoletimService) { }

  ngOnInit(): void {
    if (this.principal.tokensLoaded){
      this.loadDisciplinas()
    } else {
      this.principal.okTokens.subscribe(() => this.loadDisciplinas())
    }
  }

  loadDisciplinas(){
    this.boletim.loadDisciplinas().subscribe(disciplinas =>{
      this.disciplinas = disciplinas
      this.loadSalas()
    })
  }

  formatSala(sala: Sala) : SalaDisplay{
    
    let fDisciplina = this.disciplinas.find(disciplina => (disciplina.id === sala.disciplina))
    let display: SalaDisplay = {diario: sala.diario, sala: sala.sala, nomeDisciplina: fDisciplina.nome}
    return display
  }

  loadSalas(){
    this.boletim.loadSala().subscribe(docente => {
      this.salas = []
      this.docente=docente
      this.salas = docente.salas.map(sala => this.formatSala(sala))
      this.isCoordenador = (docente.cargos.indexOf("coordenador")!=-1)
      this.isProfessor = (docente.cargos.indexOf("professor")!=-1)
    })
  }

}
