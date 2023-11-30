// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TardisModel } from "../db/tardis.ts";

export const deleteTardis = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const tardis = await TardisModel.findByIdAndDelete(id).exec();
  if (!tardis) {
    res.status(404).send({ error: "Tardis not found" });
    return;
  }
  res.status(200).send("Tardis deleted");
};
