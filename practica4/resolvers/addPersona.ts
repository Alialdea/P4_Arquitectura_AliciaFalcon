import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/personaS.ts";

const addPersona = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      res.status(400).send("n0mb3 is required");
      return;
    }

    const newPersona = new PersonaModel({ nombre });
    await newPersona.save();

    res.status(200).send({
      nombre: newPersona.nombre,
      idPersona: newPersona._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPersona;