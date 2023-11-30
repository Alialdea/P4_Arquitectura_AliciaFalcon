// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Tardis } from "../types.ts";

import { TardisModel } from "../db/tardis.ts";
import { transformTardisModel } from "../controllers/transformTardisModel.ts";

export const getTardis = async (
  req: Request<{ id: string }>,
  res: Response<Tardis | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const tardis = await TardisModel.findById(id).exec();
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
