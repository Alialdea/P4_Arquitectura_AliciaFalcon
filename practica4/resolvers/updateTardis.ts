import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../db/tardisS.ts";

import DimensionModel from "../db/dimensionS.ts";
import { Dimension } from "../types.ts";

const todas= async (dimensiones: Dimension[]): Promise<boolean> => {
    try {
      const promises = dimensiones.map(async (dimension) => {
        const encontrada = await DimensionModel.findById(dimension.idDimension)
        return Boolean(encontrada)
      });
      const si = (await Promise.all(promises)).every(Boolean)
  
      return si
    } catch (error) {
      console.error(error.message);
      return false
    }
};

const updateTardis= async (req: Request, res: Response) => {
    const { idTardis } = req.params;
    const {camuflaje, nRegeneracion, year, dimensiones } = req.body;
    if (!camuflaje||!nRegeneracion||!year||!dimensiones) {
      res.status(400).send("p4ra4ms are required");
      return;
    }

    try {
        if (!(await todas(dimensiones)) ){
            return res.status(400);
        }

        const updatedTardis = await TardisModel.findOneAndUpdate(
            idTardis,
            { camuflaje, nRegeneracion, year, dimensiones },
            { new: true })
      
          if (!updatedTardis) {
            res.status(404).send("dimension not found");
            return;
          }
      
          res.status(200).send(updatedTardis);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export default updateTardis;