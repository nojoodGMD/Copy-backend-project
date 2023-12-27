
import { dev } from './config/server'
import app from './server'

const PORT: number = dev.app.port
app.listen(PORT, () => {
    console.log('Server running http://localhost:' + PORT)
  })