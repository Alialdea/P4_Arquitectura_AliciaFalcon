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



const addPlaneta = async (req: Request, res: Response) => {
  const { nombre, personas } = req.body;
  if (!nombre || !personas) {
    return res.status(400).send();
  }

  try {
    if (await todas(personas)) {
      return res.status(400);
    }

    const newPlaneta = new PlanetaModel({ nombre, arrPersonas: personas });
    const savePlaneta = await newPlaneta.save();

    res.status(201).send(savePlaneta);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addPlaneta;
