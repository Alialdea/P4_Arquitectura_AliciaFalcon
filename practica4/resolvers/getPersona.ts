import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/personaS.ts";

const getPersona = async (req: Request, res: Response) => {
  try {
    const { idPersona } = req.params;
    const persona = await PersonaModel.findById({ idPersona }).exec();
    if (!persona) {
      res.status(404).send("Person4 not found");
      return;
    }
    res.status(200).send({
        id: persona._id.toString(),
        nombre: persona.nombre
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPersona;