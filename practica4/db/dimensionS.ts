import mongoose from "npm:mongoose@7.6.3";
import { Dimension } from "../types.ts";

const Schema = mongoose.Schema;
  
const dimensionSchema = new Schema( {
  nombre: { type: String, required: true },
  arrPlanetas: [{type: mongoose.Schema.Types.ObjectId,
                  ref: "Planeta",
                  required: true,
                }],
},
    { timestamps: true }//realizar un seguimiento de la actividad de los documentos
  );
  
export type DimensionModelType = mongoose.Document & Omit<Dimension, "idDimension">;
export default mongoose.model<DimensionModelType>("Dimension", dimensionSchema);