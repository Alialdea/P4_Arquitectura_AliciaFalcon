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


const addTardis = async (req: Request, res: Response) => {
  const { nombre, dimensiones } = req.body;
  if (!nombre || !dimensiones) {
    return res.status(400).send();
  }

  try {
    if (await todas(dimensiones)) {
      return res.status(400);
    }

    const newTardis = new TardisModel({ nombre, arrDimensiones: dimensiones });
    const saveTardis = await newTardis.save();

    res.status(201).send(saveTardis);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addTardis;