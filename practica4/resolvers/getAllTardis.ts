// @deno-types="npm:@types/express@4"
import { Request, Response, request } from "express";
import { Tardis } from "../types.ts";
import { TardisModel } from "../db/tardis.ts";
import { transformTardisModel } from "../controllers/transformTardisModel.ts";

export const getAllTardis = async (
  // deno-lint-ignore no-unused-vars
  req: Request,
  res: Response<Tardis[] | { error: unknown }>
) => {
  try {
    const tardises = await TardisModel.find({}).exec();
    const tardisesResponse: Tardis[] = tardises.map(transformTardisModel);
    res.status(200).json(tardisesResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};