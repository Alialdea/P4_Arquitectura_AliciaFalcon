import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/personaS.ts";

const deletePersona = async (req: Request, res: Response) => {
  try {
    const { idPersona } = req.params;
    const persona = await PersonaModel.findOneAndDelete({ idPersona }).exec();
    if (!persona) {
      res.status(404).send("Person4 not found");
      return;
    }
    res.status(200).send("Person4 deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePersona;