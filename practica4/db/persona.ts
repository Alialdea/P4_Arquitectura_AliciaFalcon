import mongoose from "mongoose";
import { Persona } from "../types.ts";

const Schema = mongoose.Schema;

const personaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
  },
  { timestamps: true }
);

export type PersonaModelType = mongoose.Document & Omit<Persona, "id">;

export const PersonaModel = mongoose.model<PersonaModelType>(
  "Persona",
  personaSchema
);
