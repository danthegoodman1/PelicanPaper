import * as dotenv from "dotenv"
import { startCoordinator } from "./coordinator"
import { sleep } from "../utils"
import { startWorker } from "./worker"
dotenv.config()

declare global {
  namespace Express {
    interface Request {}
  }

  namespace NodeJS {
    interface ProcessEnv {
      SPRW_COORD_PORT: string
      SPRW_WORKER_FIRST_PORT: string
    }
  }
}

const coordStop = await startCoordinator()

const workerStartPort = Number(process.env.SPRW_WORKER_FIRST_PORT)
const workersStops = Array(5)
  .fill(null)
  .map((_, index) => {
    return startWorker(workerStartPort + index)
  })

await sleep(1_000)
console.log("shutting down test")

coordStop()
workersStops.forEach((stop) => {
  stop()
})
