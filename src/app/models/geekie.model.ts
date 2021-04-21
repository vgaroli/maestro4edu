import { MatTableDataSource } from '@angular/material/table';


export interface ChapterPerformace{
    idGeekie: string
    nomeAluno: string
    nomeCapitulo: string
    recebidas: number
    quantidadeEntregas: number
    disciplina: string
    desempenho: number
    engajamento?:string
    grade: string
}

export interface ChapterPerformaceSummary{
    idGeekie: string
    nomeAluno: string
    grade?: string
    recebidas: number
    quantidadeEntregas: number
    engajamento?:string
    detalhe?: ChapterPerformace[] | MatTableDataSource<ChapterPerformace>
}

export interface AgrupamentoAlunoChapterPerformance{
    idGeekie: string
    disciplina: string
    tarefas: number
    tarefasEntregues: number
    engajamento: number
    aproveitamentoEntregas: number
    aproveitamentoGeral: number  
    stylePerformanceGeral?:string
    stylePerformanceEntregas?:string
    styleEngajamento?:string
}