// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Dimension } from "../types.ts";

import { DimensionModel } from "../db/dimension.ts";
import { transformDimensionModel } from "../controllers/transformDimensionModel.ts";

export const getDimension = async (
  req: Request<{ id: string }>,
  res: Response<Dimension | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const dimension = await DimensionModel.findById(id).exec();
    if (!dimension) {
      res.status(404).send({ error: "Dimension not found" });
      return;
    }
    const dimensionResponse: Dimension = transformDimensionModel(dimension);
    res.status(200).json(dimensionResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
