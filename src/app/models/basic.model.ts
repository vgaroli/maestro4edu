import { DocumentReference } from '@angular/fire/firestore';
import firebase from 'firebase';

export interface DateData{
  year: number,
  month: number,
  day: number
}

export interface TimeOfDay{
  hours: number,
  minutes: number,
  seconds: number,
  nanos: number
}


export interface UserProfile{
  id: string,
  name: Name,
  emailAddress: string,
  photoUrl: string,
  permissions: GlobalPermission[],
  verifiedTeacher: boolean
}

export interface Name{
  givenName: string,
  familyName: string,
  fullName: string
}

export interface GlobalPermission{
  permission: Permission
}

export enum Permission{
  PERMISSION_UNSPECIFIED,
  CREATE_COURSE
}

export interface FilhoData{
  nome: string,
  pai: DocumentReference
}

export interface Filho{
  nome: string,
  pai: string
}

export interface Pai{
  nome: string
}

export interface Conta{
  id?: string
  idGoogle: string
  idGeekie?: string
  conta: string
  escola: string
  pessoa: string
  cargos: string[]
  suspenso: boolean
  raTotvs: string
  foto?: string
  ultimoUpdateClassroom?: firebase.firestore.Timestamp
}

