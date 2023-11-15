import mongoose from "npm:mongoose@7.6.3";
import { Persona } from "../types.ts";

const Schema = mongoose.Schema;

const personaSchema = new Schema( {
    nombre: { type: String, required: true },
},
  { timestamps: true }//realizar un seguimiento de la actividad de los documentos
);

export type PersonaModelType = mongoose.Document & Omit<Persona, "idPersona">;
export default mongoose.model<PersonaModelType>("Persona", personaSchema);
//console.log(mongoose.model<PersonaModelType>("Persona", personaSchema));
//console.log(typeof(mongoose.model<PersonaModelType>("Persona", personaSchema)));
