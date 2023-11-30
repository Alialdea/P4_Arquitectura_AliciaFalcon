// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Planeta } from "../types.ts";

import { PlanetaModel } from "../db/planeta.ts";
import { transformPlanetaModel } from "../controllers/tranformPlanetaModel.ts";

export const getPlaneta = async (
  req: Request<{ id: string }>,
  res: Response<Planeta | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const planeta = await PlanetaModel.findById(id).exec();
    if (!planeta) {
      res.status(404).send({ error: "Planeta not found" });
      return;
    }
    const planetaResponse: Planeta = transformPlanetaModel(planeta);
    res.status(200).json(planetaResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
