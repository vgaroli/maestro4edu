import { style } from '@angular/animations';
import { DateData, TimeOfDay, UserProfile } from './basic.model';
import { DriveFolder, DriveFile, Form, SharedDriveFile } from './drive.model'
import { YouTubeVideo }  from './youtube.model'
import { Link } from './link.model'
import firebase from 'firebase';


export interface CourseReport{
  id: string,
  name: string,
  section: string,
  values: CourseNumbers[]
}

export interface CourseNumbers{
  total: number,
  description: string,
  cor?: string
}

export interface Course{
  id: string,
  name: string,
  section?: string,
  descriptionHeading: string,
  description?: string,
  room?: string,
  ownerId: string,
  creationTime: string,
  updateTime: string,
  enrollmentCode: string,
  courseState: CourseState,
  alternateLink: string,
  teacherGroupEmail: string,
  courseGroupEmail: string,
  teacherFolder: DriveFolder,
  courseMaterialSets?: CourseMaterialSet[],
  guardiansEnabled: boolean,
  calendarId: string
}

export interface ListCourse {
  courses : Course[]  
}

export interface CourseMaterialSet
{
  title: string,
  materials: CourseMaterial[]
}

export interface EntregasClassroom{
  idGoogle: string,
  semana: number,
  data: firebase.firestore.Timestamp,
  criadas: number,
  paraEntrega: number,
  entregasAtrasadas: number,
  entregasEmDia: number,
  atribuidas: number,
  entregasLivres: number,
  pendentesAcumulado: number
}

export interface SubmissaoClassroom{
  aproveitamento: number
  dataCriacao: firebase.firestore.Timestamp
  dataEntrega: firebase.firestore.Timestamp
  dataUpdate: firebase.firestore.Timestamp
  idGoogle: string
  idSala: number
  sala?: string
  idSubmission: string
  nota: number
  notaMaxima: number
  pendente: boolean
  prazoEntrega: firebase.firestore.Timestamp
  status: string
  tarefa: string
}

export interface AgrupamentoSubmissao{
  idGoogle: string
  sala: string
  tarefas: number
  entregues: number
  naoEntregues: number
  naoAvaliada: number
  entreguesAtraso: number
  pendentes: number
  engajamento: number
  performanceEntregas: number
  performanceGeral: number
  stylePerformanceGeral?:string
  stylePerformanceEntregas?:string
  styleEngajamento?:string
  salaGrade: string
  nomeSala: string
}

export interface EngajamentoClassroom{
  idGoogle: string,
  semana: number,
  data: firebase.firestore.Timestamp,
  soma: number,
  qtde: number,
  engajamento: number
}

export interface CourseMaterial{
  driveFile?: DriveFile,
  youTubeVideo?: YouTubeVideo
  link?: Link,
  form?: Form
}

export enum CourseState{
  COURSE_STATE_UNSPECIFIED,
  ACTIVE,
  ARCHIVED,
  PROVISIONED,
  DECLINED,
  SUSPENDED
}

export interface Material{
   // Union field material can be only one of the following:
  driveFile: SharedDriveFile,
  youtubeVideo: YouTubeVideo,
  link: Link,
  form: Form
  // End of list of possible types for union field material.
}

export enum CourseWorkType{
  COURSE_WORK_TYPE_UNSPECIFIED,
  ASSIGNMENT,
  SHORT_ANSWER_QUESTION,
  MULTIPLE_CHOICE_QUESTION
}

export enum AssigneeMode{
  ASSIGNEE_MODE_UNSPECIFIED,
  ALL_STUDENTS,
  INDIVIDUAL_STUDENTS
}

export interface IndividualStudentsOptions{
  studentIds: string[]
}

export enum SubmissionModificationMode{
  SUBMISSION_MODIFICATION_MODE_UNSPECIFIED,
  MODIFIABLE_UNTIL_TURNED_IN,
  MODIFIABLE
}

export interface Assignment{
  studentWorkFolder: DriveFolder
}

export interface CourseWork{
  courseId: string,
  id: string,
  title: string,
  description: string,
  materials: Material[],
  state: CourseWorkState,
  alternateLink: string,
  creationTime: string,
  updateTime: string,
  dueDate: DateData,
  dueTime: TimeOfDay,
  scheduledTime: string,
  maxPoints: number,
  workType: CourseWorkType,
  associatedWithDeveloper: boolean,
  assigneeMode: AssigneeMode,
  individualStudentsOptions: IndividualStudentsOptions,
  submissionModificationMode: SubmissionModificationMode,
  creatorUserId: string,
  topicId: string,

  // Union field details can be only one of the following:
  assignment: Assignment,
  multipleChoiceQuestion: MultipleChoiceQuestion
  // End of list of possible types for union field details.
}

export interface MultipleChoiceQuestion{
  choices: string[]
}

export enum CourseWorkState{
  COURSE_WORK_STATE_UNSPECIFIED,
  PUBLISHED,
  DRAFT,
  DELETED
}

export interface Student{
  courseId: string,
  userId: string,
  profile: UserProfile,
  studentWorkFolder: DriveFolder
}


export interface StudentSubmission{
  courseId: string,
  courseWorkId: string,
  id: string,
  userId: string,
  creationTime: string,
  updateTime: string,
  state: SubmissionState,
  late: boolean,
  draftGrade: number,
  assignedGrade: number,
  alternateLink: string,
  courseWorkType: CourseWorkType,
  associatedWithDeveloper: boolean,
  submissionHistory: SubmissionHistory[],

  // Union field content can be only one of the following:
  assignmentSubmission: AssignmentSubmission,
  shortAnswerSubmission: ShortAnswerSubmission,
  multipleChoiceSubmission: MultipleChoiceSubmission
}

export enum SubmissionState{
  SUBMISSION_STATE_UNSPECIFIED,
  NEW,
  CREATED,
  TURNED_IN,
  RETURNED,
  RECLAIMED_BY_STUDENT
}


export interface SubmissionHistory{
  stateHistory: StateHistory,
  gradeHistory: GradeHistory

}

export interface StateHistory{
  state: State,
  stateTimestamp: string,
  actorUserId: string
}

export enum State{
  STATE_UNSPECIFIED,
  CREATED,
  TURNED_IN,
  RETURNED,
  RECLAIMED_BY_STUDENT,
  STUDENT_EDITED_AFTER_TURN_IN
}

export interface GradeHistory{
  pointsEarned: number,
  maxPoints: number,
  gradeTimestamp: string,
  actorUserId: string,
  gradeChangeType: GradeChangeType
}

export enum GradeChangeType{
  UNKNOWN_GRADE_CHANGE_TYPE,
  DRAFT_GRADE_POINTS_EARNED_CHANGE,
  ASSIGNED_GRADE_POINTS_EARNED_CHANGE,
  MAX_POINTS_CHANGE
}

export interface AssignmentSubmission{
  attachments: Attachment
}

export interface Attachment{
  driveFile: DriveFile,
  YouTubeVideo: YouTubeVideo,
  link: Link,
  form: Form
}

export interface ShortAnswerSubmission{
  answer: string
}

export interface MultipleChoiceSubmission {
  answer: string
}

