export type Tardis = {
    id: string;
    nombre: string;
    camuflaje: string
    nreg: number
    anio: number
    dimensiones: Array<Omit<Dimension, "tardis">>;
  };
  
  export type Dimension = {
    id: string;
    nombre: string;
    planetas: Array<Omit<Planeta, "dimension">>;
  };
  
  export type Planeta = {
    id: string;
    nombre: string;
    poblacion: number;
    personas: Array<Omit<Persona, "planeta">>;
  };
  
  export type Persona = {
    id: string;
    nombre: string;
    edad: number;
  };
  