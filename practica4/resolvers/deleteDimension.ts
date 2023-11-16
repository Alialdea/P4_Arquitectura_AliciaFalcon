import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimensionS.ts";

export default async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deleted = await DimensionModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};