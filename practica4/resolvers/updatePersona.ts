import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/personaS.ts";

const updatePersona = async (req: Request, res: Response) => {
    try {
        const { idPersona } = req.params
        const { nombre } = req.body
        if (!nombre) {             
            res.status(400).send("n0mbr3 is required")
            return
        }
    
        const updatedPersona = await PersonaModel.findByIdAndUpdate( 
        idPersona , 
        { nombre }, 
        { new: true } 
        ).exec(); 

        if (!updatedPersona) { 
            res.status(404).send("Persona not found"); 
            return; 
        }
    
        res.status(200).send({
            id: updatedPersona._id.toString(),
            nombre: updatedPersona.nombre 
        });
    
        } catch (error) {
    
            res.status(500).send(error.message); 
            return; 
        }
    };
    
export default updatePersona; 