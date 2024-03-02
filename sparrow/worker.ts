import express from "express"

export function startWorker(port: number) {
  const app = express()
  app.use(express.json())
  app.disable("x-powered-by")

  app.get("/hc", (req, res) => {
    res.sendStatus(200)
  })

  const server = app.listen(port, () => {
    console.log(`Worker listening on port ${port}`)
  })

  return () => {
    server.close()
  }
}
