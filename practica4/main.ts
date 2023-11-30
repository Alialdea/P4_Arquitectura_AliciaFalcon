// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";
//import {}
import { deleteDimension } from "./resolvers/deleteDimension.ts";
import { deletePersona } from "./resolvers/deletePersona.ts";
import { deletePlaneta } from "./resolvers/deletePlaneta.ts";
import { deleteTardis } from "./resolvers/deleteTardis.ts";
import { getAllTardis } from "./resolvers/getAllTardis.ts";
import { getDimension } from "./resolvers/getDimension.ts";
import { getPersona } from "./resolvers/getPersona.ts";
import { getPlaneta } from "./resolvers/getPlaneta.ts";
import { getTardis } from "./resolvers/getTardis.ts";
import { postDimension } from "./resolvers/postDimension.ts";
import { postPersona } from "./resolvers/postPersona.ts";
import { postPlaneta } from "./resolvers/postPlaneta.ts";
import { postTardis } from "./resolvers/postTardis.ts";
import { putDimension } from "./resolvers/putDimension.ts";
import { putPersona } from "./resolvers/putPersona.ts";
import { putPlaneta } from "./resolvers/putPlaneta.ts";
import { putTardis } from "./resolvers/putTardis.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/alltardis", getAllTardis)
  .get("/dimension/:id", getDimension)
  .get("/persona/:id", getPersona)
  .get("/planeta/:id", getPlaneta)
  .get("/tardis/:id", getTardis)

  .post("/dimension/:nombre/:planetas", postDimension)
  .post("/persona/:nombre/:edad", postPersona)
  .post("/planeta/:nombre/:poblacion/:personas", postPlaneta)
  .post("/tardis/:nombre/:camuflaje/:nreg/:anio/:dimensiones", postTardis)
  
  .put("/dimension/:id", putDimension)
  .put("/persona/:id", putPersona)
  .put("/planeta/:id", putPlaneta)
  .put("/tardis/:id", putTardis)
  
  .delete("/dimension/:id", deleteDimension)
  .delete("/persona/:id", deletePersona)
  .delete("/planeta/:id", deletePlaneta)
  .delete("/tardis/:id", deleteTardis)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});