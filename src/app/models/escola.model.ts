import { DadosDisciplinaBoletim } from './boletim.model';
import { DocumentReference } from '@angular/fire/firestore';
 
export interface Escola {
  id?: string
  razaoSocial: string
  fantasia?: string
  cnpj: string
  anoLetivo: number
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