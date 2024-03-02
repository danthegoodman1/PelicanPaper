import express from "express"

export async function startCoordinator() {
  const app = express()
  app.use(express.json())
  app.disable("x-powered-by")

  app.get("/hc", (req, res) => {
    res.sendStatus(200)
  })

  const server = app.listen(process.env.SPRW_COORD_PORT, () => {
    console.log(`Coordinator listening on port ${process.env.SPRW_COORD_PORT}`)
  })

  return () => {
    server.close()
  }
}
