import { DimensionModelType } from "../db/dimension.ts";
import { Dimension } from "../types.ts";
import { transformPlanetaModel } from "./tranformPlanetaModel.ts";

export const transformDimensionModel = (dimension: DimensionModelType): Dimension => {
  const { _id, nombre, planetas } = dimension.toObject();

  return {
    id: _id.toString(),
    nombre,
    planetas: planetas.map(transformPlanetaModel),
  };
};

