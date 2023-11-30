// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { PlanetaModel } from "../db/planeta.ts";

export const deletePlaneta = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const planeta = await PlanetaModel.findByIdAndDelete(id).exec();
  if (!planeta) {
    res.status(404).send({ error: "Planeta not found" });
    return;
  }
  res.status(200).send("Planeta deleted");
};
