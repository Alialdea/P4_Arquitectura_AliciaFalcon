// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Tardis } from "../types.ts";
import { TardisModel, TardisModelType } from "../db/tardis.ts";
import { transformTardisModel } from "../controllers/transformTardisModel.ts";

export const postTardis = async (
  // deno-lint-ignore ban-types
  req: Request<{}, {}, TardisModelType>,
  res: Response<Tardis | { error: unknown }>
) => {
  try {
    const { nombre, camuflaje, nreg, anio,dimensiones } = req.body.toObject(); 
    const tardis = new TardisModel({
      nombre,
      camuflaje,
      nreg,
      anio,
      dimensiones,
    });
    await tardis.save();

    const tardisResponse: Tardis = transformTardisModel(tardis);

    res.status(201).json(tardisResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
