import { TardisModelType } from "../db/tardis.ts";
import { Tardis } from "../types.ts";
import { transformDimensionModel } from "./transformDimensionModel.ts";

export const transformTardisModel = (tardis: TardisModelType): Tardis => {
  const { _id, nombre, camuflaje, nreg, anio, dimensiones } = tardis.toObject();

  return {
    id: _id.toString(),
    nombre,
    camuflaje,
    nreg,
    anio,
    dimensiones: dimensiones.map(transformDimensionModel),
  };
};
