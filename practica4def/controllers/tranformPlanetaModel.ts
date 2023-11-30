import { PlanetaModelType } from "../db/planeta.ts";
import { Planeta } from "../types.ts";
import { transformPersonaModel } from "./transformPersonaModel.ts";

export const transformPlanetaModel = (planeta: PlanetaModelType): Planeta => {
  const { _id, nombre, poblacion, personas } = planeta.toObject();;

  return {
    id: _id.toString(),
    nombre,
    poblacion,
    personas: personas.map(transformPersonaModel),
  };
};
