import { PersonaModelType } from "../db/persona.ts";
import { Persona } from "../types.ts";

export const transformPersonaModel = (persona: PersonaModelType): Persona => {
  const { _id, nombre, edad } = persona;

  return {
    id: _id.toString(),
    nombre,
    edad,
  };
};
