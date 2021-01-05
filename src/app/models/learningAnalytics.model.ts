export interface ClassificacaoLearningAnalytics{
    id: string
    tags: string
    descricao: string
}

export interface OpcaoItem{
    texto: string
    correta: boolean
}

export interface Item{
    id?: string
    descricao: string
    idioma: string
    competenciasBNCC: string[]
    habilidadesBNCC: string[]
    taxonomiasDeBloom: string[]
    multiplasInteligencias: string[]
    tipoDoItem: string
    tipologiasItemObjetivo: string[]
    tipologiasItemDiscursivo: string[]
    textoItem: string
    opcoesItem: OpcaoItem[] 
    visibilidade: string
}