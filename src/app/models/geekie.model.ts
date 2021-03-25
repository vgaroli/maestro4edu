import { MatTableDataSource } from '@angular/material/table';


export interface ChapterPerformace{
    idGeekie: string
    nomeAluno: string
    nomeCapitulo: string
    recebidas: number
    quantidadeEntregas: number
    disciplina: string
    desempenho: number
    grade: string
}

export interface ChapterPerformaceSummary{
    idGeekie: string
    nomeAluno: string
    recebidas: number
    quantidadeEntregas: number
    detalhe?: ChapterPerformace[] | MatTableDataSource<ChapterPerformace>
}