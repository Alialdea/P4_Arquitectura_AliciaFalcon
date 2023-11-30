// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Persona } from "../types.ts";
import { PersonaModel, PersonaModelType } from "../db/persona.ts";
import { transformPersonaModel } from "../controllers/transformPersonaModel.ts";

export const putPersona = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}, PersonaModelType>,
  res: Response<Persona | { error: unknown }>
) => {
  const id = req.params.id;
  const { nombre, edad } = req.body;
  try {
    const persona = await PersonaModel.findByIdAndUpdate(
      id,
      { nombre, edad },
      { new: true, runValidators: true }
    );

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
