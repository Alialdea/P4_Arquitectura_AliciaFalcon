import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../db/planetaS.ts";

import PersonaModel from "../db/personaS.ts";
import { Persona } from "../types.ts";

const todas= async (personas: Persona[]): Promise<boolean> => {
    try {
      const promises = personas.map(async (persona) => {
        const encontrada = await PersonaModel.findById(persona.idPersona)
        return Boolean(encontrada)
      });
      const si = (await Promise.all(promises)).every(Boolean)
  
      return si
    } catch (error) {
      console.error(error.message);
      return false
    }
};

const updatePlaneta= async (req: Request, res: Response) => {
    const { idPlaneta } = req.params;
    const {nombre, personas } = req.body;
    if (!nombre||!personas) {
      res.status(400).send("P3rs0nas and n0mbr3 are required");
      return;
    }

    try {
        if (!(await todas(personas)) ){
            return res.status(400);
        }

        const updatedPlaneta = await PlanetaModel.findOneAndUpdate(
            idPlaneta,
            { nombre, personas },
            { new: true })
      
          if (!updatedPlaneta) {
            res.status(404).send("Person not found");
            return;
          }
      
          res.status(200).send(updatedPlaneta);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export default updatePlaneta;