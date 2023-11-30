// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Dimension } from "../types.ts";
import { DimensionModel, DimensionModelType } from "../db/dimension.ts";
import { transformDimensionModel } from "../controllers/transformDimensionModel.ts";

export const putDimension = async (
  // deno-lint-ignore ban-types
  req: Request<{ id: string }, {}, DimensionModelType>,
  res: Response<Dimension | { error: unknown }>
) => {
  const id = req.params.id;
  const { nombre, planetas } = req.body.toObject();
  try {
    const dimension = await DimensionModel.findByIdAndUpdate(
      id,
      { nombre, planetas },
      { new: true, runValidators: true }
    );

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
