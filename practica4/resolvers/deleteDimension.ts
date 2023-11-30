// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { DimensionModel } from "../db/dimension.ts";

export const deleteDimension = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const dimension = await DimensionModel.findByIdAndDelete(id).exec();
  if (!dimension) {
    res.status(404).send({ error: "Dimension not found" });
    return;
  }
  res.status(200).send("Dimension deleted");
};
