import { Request, Response }  from "npm:express@4.18.2";
import PlanetaModel from "../db/planetaS.ts";

export default async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const planeta = await PlanetaModel.findById(id);
    if (!planeta) {
      return res.status(404).send();
    }

    res.send(await planeta.populate("personas"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};