import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimensionS.ts";

import PlanetaModel from "../db/planetaS.ts";
import { Planeta } from "../types.ts";


const todas= async (planetas: Planeta[]): Promise<boolean> => {
  try {
    const promises = planetas.map(async (planeta) => {
      const encontrada = await PlanetaModel.findById(planeta.idPlaneta)
      return Boolean(encontrada)
    });
    const si = (await Promise.all(promises)).every(Boolean)

    return si
  } catch (error) {
    console.error(error.message);
    return false
  }
};


const addDimension = async (req: Request, res: Response) => {
  const { nombre, planetas } = req.body;
  if (!nombre || !planetas) {
    return res.status(400).send();
  }

  try {
    if (await todas(planetas)) {
      return res.status(400);
    }

    const newDimension = new DimensionModel({ nombre, arrPlanetas: planetas });
    const saveDimension = await newDimension.save();

    res.status(201).send(saveDimension);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addDimension;