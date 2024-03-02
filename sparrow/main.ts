import * as dotenv from "dotenv"
import { startCoordinator } from "./coordinator"
import { sleep } from "../utils"
dotenv.config()

const coordStop = await startCoordinator()

await sleep(1_000)
console.log("shutting down test")
coordStop()
