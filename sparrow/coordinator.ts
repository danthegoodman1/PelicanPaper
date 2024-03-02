import express from "express"

declare global {
  namespace Express {
    interface Request {}
  }

  namespace NodeJS {
    interface ProcessEnv {
      SPRW_COORD_PORT: string
    }
  }
}

export async function startCoordinator() {
  const app = express()
  app.use(express.json())
  app.disable("x-powered-by")

  app.get("/hc", (req, res) => {
    res.sendStatus(200)
  })

  const server = app.listen(process.env.SPRW_COORD_PORT, () => {
    console.log(`API listening on port ${process.env.SPRW_COORD_PORT}`)
  })

  const signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
  }

  let stopping = false
  Object.keys(signals).forEach((signal) => {
    process.on(signal, async () => {
      if (stopping) {
        return
      }
      stopping = true
      console.log(`Received signal ${signal}, shutting down...`)
      server.close()
      process.exit(0)
    })
  })

  return () => {
    server.close()
  }
}
