import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addDimension from "./resolvers/addDimension.ts";
import addPersona from "./resolvers/addPersona.ts"; 
import addPlaneta from "./resolvers/addPlaneta.ts";
import addTardis from "./resolvers/addTardis.ts";
import deletePersona from "./resolvers/delatePersona.ts"; 
import deleteDimension from "./resolvers/deleteDimension.ts";
import deletePlaneta from "./resolvers/deletePlaneta.ts";
import deleteTardis from "./resolvers/deletetardis.ts";
import getDimension from "./resolvers/getDimension.ts";
import getPersona from "./resolvers/getPersona.ts";
import getPlaneta from "./resolvers/getPlaneta.ts";
import getTardis from "./resolvers/getTardis.ts";
import updateDimension from "./resolvers/updateDimension.ts";
import updatePlaneta from "./resolvers/updatePlaneta.ts";
import updateTardis from "./resolvers/updateTardis.ts";
import updatePersona from "./resolvers/updatePersona.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  //Deno.exit();
}

await mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app

.post("/api/personas", addPersona)
.get("/api/personas/:id", getPersona)
.delete("/api/personas/:id", deletePersona)
.put("/api/personas/:id", updatePersona)

.post("/api/planetas", addPlaneta)
.get("/api/planetas/:id", getPlaneta)
.put("/api/planetas/:id", updatePlaneta)
.delete("/api/planetas/:id", deletePlaneta)

.post("/api/dimensiones", addDimension)
.get("/api/dimensiones/:id", getDimension)
.delete("/api/dimensiones/:id", deleteDimension)
.put("/api/dimensiones/:id", updateDimension)

.get("/api/tardis/:id", getTardis)
.post("/api/tardis", addTardis)
.delete("/api/tardis/:id", deleteTardis)
.put("/api/tardis/:id", updateTardis);

app.listen(3001, () => {
  console.log("Server listening on port 3000");
});
