import APP from 'express'
import DBConnection from './config/dbConnection'
import Utils from './app/utils'
import Config from './config'
import routes from './routes'
import { httpConstants } from './app/common/constants'

const app = new APP()
require('./config/express')(app)
global.lhtWebLog = Utils.lhtLog
class Server {
  
  static listen () {
    
    Promise.all
    (
      [DBConnection.connect()]
      ).then(() => {

      app.listen(Config.PORT)
      Utils.lhtLog('listen', `Server Started on port ${Config.PORT}`)
      routes(app)
      require('./config/jobInitializer')
    }).catch(error =>
       {Utils.lhtLog('listen', 'failed to connect', { err: error })
       console.log("error", error)
      }

       )

  }
}

Server.listen()
