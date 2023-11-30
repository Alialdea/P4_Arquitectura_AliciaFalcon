// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { PersonaModel } from "../db/persona.ts";

export const deletePersona = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const persona = await PersonaModel.findByIdAndDelete(id).exec();
  if (!persona) {
    res.status(404).send({ error: "Persona not found" });
    return;
  }
  res.status(200).send("Persona deleted");
};
