import mongoose from "mongoose";
import { Dimension } from "../types.ts";
import { PlanetaModel } from "./planeta.ts";

const Schema = mongoose.Schema;

const dimensionSchema = new Schema(
  {
    nombre: { type: String, required: true },
    planetas: [
      { type: Schema.Types.ObjectId, required: true, ref: "Planeta" },
    ],
  },
  { timestamps: true }
);

// Validar planetas
dimensionSchema.path("planetas").validate(async function (planetas: mongoose.Types.ObjectId[]) {
  try {
    if (planetas.some((id) => !mongoose.isValidObjectId(id))) return false;

    const planetasModel = await PlanetaModel.find({ _id: { $in: planetas } });
    return planetasModel.length === planetas.length;
  } catch (_e) {
    return false;
  }
});

export type DimensionModelType = mongoose.Document & Omit<Dimension, "id" | "planetas">;

export const DimensionModel = mongoose.model<DimensionModelType>(
  "Dimension",
  dimensionSchema
);
