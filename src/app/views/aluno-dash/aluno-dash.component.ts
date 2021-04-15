import { EscolaService } from './../../services/escola.service';
import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit } from '@angular/core';
import { AlunoSala, Sala, SalaGrade } from 'src/app/models/escola.model';

@Component({
  selector: 'app-aluno-dash',
  templateUrl: './aluno-dash.component.html',
  styleUrls: ['./aluno-dash.component.css']
})
export class AlunoDashComponent implements OnInit {

  salas: SalaGrade[]=[]
  alunos: AlunoSala[]=[]

  constructor(private principal: PrincipalService, private escolaService: EscolaService) { }

  ngOnInit(): void {
    if (this.principal.tokensLoaded){
      this.loadSalas()
    } else {
      this.principal.okTokens.subscribe(() => this.loadSalas())
    }
  }

  loadSalas(){
    this.escolaService.loadSalas().subscribe(salas =>  {
      this.salas = salas
    })
  }

  buscaSala(sala: string){
    this.escolaService.loadAlunosSala(sala).subscribe(alunosSala =>{
      this.alunos=alunosSala
    })
  }

}
