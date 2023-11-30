// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Persona } from "../types.ts";
import { PersonaModel, PersonaModelType } from "../db/persona.ts";
import { transformPersonaModel } from "../controllers/transformPersonaModel.ts";

export const postPersona = async (
  // deno-lint-ignore ban-types
  req: Request<{}, {}, PersonaModelType>,
  res: Response<Persona | { error: unknown }>
) => {
  try {
    const { nombre, edad } = req.body;
    const persona = new PersonaModel({
      nombre,
      edad,
    });
    await persona.save();

    const personaResponse: Persona = transformPersonaModel(persona);

    res.status(201).json(personaResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

