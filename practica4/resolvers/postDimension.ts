// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Dimension } from "../types.ts";
import { DimensionModel, DimensionModelType } from "../db/dimension.ts";
import { transformDimensionModel } from "../controllers/transformDimensionModel.ts";

export const postDimension = async (
  // deno-lint-ignore ban-types
  req: Request<{}, {}, DimensionModelType>,
  res: Response<Dimension | { error: unknown }>
) => {
  try {
    const { nombre, planetas } = req.body.toObject(); 
    const dimension = new DimensionModel({
      nombre,
      planetas,
    });
    await dimension.save();

    const dimensionResponse: Dimension = transformDimensionModel(dimension);

    res.status(201).json(dimensionResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

