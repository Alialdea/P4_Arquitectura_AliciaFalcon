import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../db/planetaS.ts";

export default async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleted = await PlanetaModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};