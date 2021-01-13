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

export enum ModoEntregaAtividade{
    avaliacao,
    tarefa,
    jogo
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

export interface AtividadeHeader{
    id?: string
    idInstituicao?: string
    idAplicador: string
    descricao: string
    pontuacaoMaxima: number
    notaMaxima: number
    modoEntrega: ModoEntregaAtividade
    dataInicio: firebase.firestore.Timestamp
    dataFim: firebase.firestore.Timestamp
    mediaAproveitamento: number
    encerrada: boolean
}

export interface AtividadeItens{
    id?: string
    idAtividade: string
    pontuacao: number
    tempo: number
    item: Item
}

export interface AtividadeParticipantes{
    id?: string
    idAtividade: string
    idParticipante: string
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