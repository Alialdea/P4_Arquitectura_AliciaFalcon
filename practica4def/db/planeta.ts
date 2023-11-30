import mongoose from "mongoose";
import { Planeta } from "../types.ts";
import { PersonaModel } from "./persona.ts";

const Schema = mongoose.Schema;

const planetaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    poblacion: { type: Number, required: true },
    personas: [
      { type: Schema.Types.ObjectId, required: true, ref: "Persona" },
    ],
  },
  { timestamps: true }
);

// Validar personas
planetaSchema.path("personas").validate(async function (personas: mongoose.Types.ObjectId[]) {
  try {
    if (personas.some((id) => !mongoose.isValidObjectId(id))) return false;

    const personasModel = await PersonaModel.find({ _id: { $in: personas } });
    return personasModel.length === personas.length;
  } catch (_e) {
    return false;
  }
});

export type PlanetaModelType = mongoose.Document & Omit<Planeta, "id" | "personas">;

export const PlanetaModel = mongoose.model<PlanetaModelType>(
  "Planeta",
  planetaSchema
);
