import mongoose from "npm:mongoose@7.6.3"

export type Persona={
    nombre: string,
    idPersona: mongoose.Types.ObjectId
}

export type Planeta={
    nombre: string,
    idPlaneta: mongoose.Types.ObjectId,
    personas : Persona[]
}

export type Dimension={
    nombre: string,
    idDimension: mongoose.Types.ObjectId,
    planetas : Planeta[]
}

export type Tardis={
    camuflaje:string,
    nRegeneracion:number,
    year: number,
    dimensiones : Dimension[],
    
    idTardis: mongoose.Types.ObjectId
}
