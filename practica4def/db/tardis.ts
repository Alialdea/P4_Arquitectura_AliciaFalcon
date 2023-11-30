import mongoose from "mongoose";
import { Tardis } from "../types.ts";
import { DimensionModel } from "./dimension.ts";

const Schema = mongoose.Schema;

const tardisSchema = new Schema(
  {
    nombre: { type: String, required: true },
    camuflaje:{ type: String, required: true },
    nreg:{ type: Number, required: true },
    anio:{ type: Number, required: true },
    dimensiones: [
      { type: Schema.Types.ObjectId, required: true, ref: "Dimension" },
    ],
  },
  { timestamps: true }
);

// Validar dimensiones
tardisSchema.path("dimensiones").validate(async function (dimensiones: mongoose.Types.ObjectId[]) {
  try {
    if (dimensiones.some((id) => !mongoose.isValidObjectId(id))) return false;

    const dimensionesModel = await DimensionModel.find({ _id: { $in: dimensiones } });
    return dimensionesModel.length === dimensiones.length;
  } catch (_e) {
    return false;
  }
});

export type TardisModelType = mongoose.Document & Omit<Tardis, "id" | "dimensiones">;

export const TardisModel = mongoose.model<TardisModelType>(
  "Tardis",
  tardisSchema
);
