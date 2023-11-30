// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Planeta } from "../types.ts";
import { PlanetaModel, PlanetaModelType } from "../db/planeta.ts";
import { transformPlanetaModel } from "../controllers/tranformPlanetaModel.ts";

export const postPlaneta = async (
  // deno-lint-ignore ban-types
  req: Request<{}, {}, PlanetaModelType>,
  res: Response<Planeta | { error: unknown }>
) => {
  try {
    const { nombre, poblacion, personas } = req.body.toObject(); //para tener un objeto plano IMPORTANTE
    const planeta = new PlanetaModel({
      nombre,
      poblacion,
      personas,
    });
    await planeta.save();

    const planetaResponse: Planeta = transformPlanetaModel(planeta);

    res.status(201).json(planetaResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

