import { DocumentReference } from '@angular/fire/firestore';
export interface Escola {
  id?: string
  razaoSocial: string
  fantasia?: string
  cnpj: string
  anoLetivo: number
}
