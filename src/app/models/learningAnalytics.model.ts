import firebase from 'firebase';

export interface ClassificacaoLearningAnalytics{
    id: string
    tags: string
    descricao: string
}

export interface OpcaoItem{
    texto: string
    correta: boolean
}

export interface Pratica{
    id?: string
    tipoFerramenta: string
    ferramentas: string[]
    titulo: string
    palavrasChaves: string[]
    componentesCurriculares: string[]
    publicosAlvos: string[]
    competenciasBNCC: string[]
    taxonomiasDeBloom: string[]
    descricao: string
    aplicacao: string
    requisitos: string
    praticaDocumentada: string
    referencias: string
}

export interface AvaliacaoHeader{
    id?: string
    idInstituicao?: string
    idAplicador: string
    titulo: string
    pontuacaoMaxima?: number
    notaMaxima?: number
    modoEntrega?: string
    dataInicio?: firebase.firestore.Timestamp
    dataFim?: firebase.firestore.Timestamp
    mediaAproveitamento?: number
    encerrada: boolean
    visibilidade: string
    liberada: boolean
}

export interface AvaliacaoItens{
    id?: string
    idAtividade: string
    pontuacao: number
    tempo: number
    item: Item
}

export interface AvaliacaoParticipantes{
    id?: string
    idAtividade: string
    idParticipante: string
    nomeParticipante: string
    emailParticipante: string
    dataInicio: firebase.firestore.Timestamp
    dataFim: firebase.firestore.Timestamp
    pontuacao: number
    nota: number
    aproveitamento: number
    encerrada: boolean
}

export interface Item{
    id?: string
    conteudo: string
    idProprietario: string
    idioma: string
    segmento: string
    componentesCurriculares: string[]
    competenciasBNCC: string[]
    grauDificuldade: string
    habilidadesBNCC: string[]
    taxonomiasDeBloom: string[]
    multiplasInteligencias: string[]
    tipoDoItem: string
    tipologiasItemObjetivo: string[]
    tipologiasItemDiscursivo: string[]
    eixosEstruturantes: string[]
    textoItem: string
    opcoesItem: OpcaoItem[] 
    visibilidade: string
    tempo: number
}