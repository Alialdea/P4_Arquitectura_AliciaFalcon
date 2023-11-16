import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimensionS.ts";

export default async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const dimension = await DimensionModel.findById(id);
    if (!dimension) {
      return res.status(404).send();
    }
    res.send(
      await dimension.populate({ path: "planetas", populate: "personas" }),
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};