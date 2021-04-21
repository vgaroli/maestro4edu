export interface Letrus{
    idGoogle: string
    atividade: string
    reescrita: boolean
    titulo: string
    nota: string
}

export interface AgrupamentoLetrus{
    idGoogle: string
    atividades: number
    atividadesEntregues: number
    engajamento: number
    performanceEntregas: number
    performanceGeral: number
    reescritas: number
    reescritasEntregues: number
    stylePerformanceGeral?:string
    stylePerformanceEntregas?:string
    styleEngajamento?:string
}