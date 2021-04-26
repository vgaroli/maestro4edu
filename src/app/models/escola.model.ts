import { DriveFile } from './drive.model';
import { DadosDisciplinaBoletim } from './boletim.model';
import { DocumentReference } from '@angular/fire/firestore';
 
export interface Escola {
  id?: string
  razaoSocial: string
  fantasia?: string
  cnpj: string
  anoLetivo: number
  showBoletim?: boolean
}

export interface AnoLetivo{
  id?: string
  ano: number
}

export interface Docente{
  ano: number
  cargos: string[]
  conta: DocumentReference,
  grades: string[]
  nome: string
  salas: Sala[]
}

export interface Sala{
  diario: string
  disciplina: string
  sala: string
}

export interface SalaGrade{
  curso: string
  divisao: string
  grades: string[]
  id?: string
  sala: string
}

export interface AlunoSala{
  idGoogle: string
  idGeekie?:string
  idCurso?: string
  idSala: string
  nomeAluno: string
  nomeSala: string
}
