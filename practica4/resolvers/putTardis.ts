// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Tardis } from "../types.ts";
import { TardisModel, TardisModelType } from "../db/tardis.ts";
import { transformTardisModel } from "../controllers/transformTardisModel.ts";

export const putTardis = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}, TardisModelType>,
  res: Response<Tardis | { error: unknown }>
) => {
  const id = req.params.id;
  const { nombre,camuflaje, nreg, anio, dimensiones } = req.body.toObject();
  try {
    const tardis = await TardisModel.findByIdAndUpdate(
      id,
      { nombre, camuflaje, nreg, anio, dimensiones },
      { new: true, runValidators: true }
    );

    if (!tardis) {
      res.status(404).send({ error: "Tardis not found" });
      return;
    }
    const tardisResponse: Tardis = transformTardisModel(tardis);
    res.status(200).json(tardisResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
