// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Persona } from "../types.ts";

import { PersonaModel } from "../db/persona.ts";
import { transformPersonaModel } from "../controllers/transformPersonaModel.ts";

export const getPersona = async (
  req: Request<{ id: string }>,
  res: Response<Persona | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const persona = await PersonaModel.findById(id).exec();
    if (!persona) {
      res.status(404).send({ error: "Persona not found" });
      return;
    }
    const personaResponse: Persona = transformPersonaModel(persona);
    res.status(200).json(personaResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

