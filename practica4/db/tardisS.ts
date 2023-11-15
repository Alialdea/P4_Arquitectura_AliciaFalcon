import mongoose from "npm:mongoose@7.6.3";
import { Tardis } from "../types.ts";

const Schema = mongoose.Schema;
 
const tardisSchema = new Schema( {
  camuflaje: { type: String, required: true },
  nRegeneracion: { type: Number, required: true },
  year: { type: Number, required: true },
  arrDimensiones: [{type: mongoose.Schema.Types.ObjectId,
                    ref: "Dimension",
                    required: true,
                  }],
},
  { timestamps: true }//realizar un seguimiento de la actividad de los documentos
);

export type TardisModelType = mongoose.Document & Omit<Tardis, "idTardis">;
export default mongoose.model<TardisModelType>("Tardis", tardisSchema);
   