// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Planeta } from "../types.ts";
import { PlanetaModel, PlanetaModelType } from "../db/planeta.ts";
import { transformPlanetaModel } from "../controllers/tranformPlanetaModel.ts";

export const putPlaneta = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}, PlanetaModelType>,
  res: Response<Planeta | { error: unknown }>
) => {
  const id = req.params.id;
  const { nombre, poblacion, personas } = req.body.toObject();
  try {
    const planeta = await PlanetaModel.findByIdAndUpdate(
      id,
      { nombre, poblacion, personas },
      { new: true, runValidators: true }
    );

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
