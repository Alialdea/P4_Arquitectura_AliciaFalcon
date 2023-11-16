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

const updateDimension= async (req: Request, res: Response) => {
    const { idDimension } = req.params;
    const {nombre, planetas } = req.body;
    if (!nombre||!planetas) {
      res.status(400).send("pl4n3tas and n0mbr3 are required");
      return;
    }

    try {
        if (!(await todas(planetas)) ){
            return res.status(400);
        }

        const updatedDimension = await DimensionModel.findOneAndUpdate(
            idDimension,
            { nombre, planetas },
            { new: true })
      
          if (!updatedDimension) {
            res.status(404).send("dimension not found");
            return;
          }
      
          res.status(200).send(updatedDimension);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export default updateDimension;