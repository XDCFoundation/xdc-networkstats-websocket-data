import APP from 'express'
import DBConnection from './config/dbConnection'
import Utils from './app/utils'
import Config from './config'
import routes from './routes'
const socket = require("socket.io");
import WebSocketService from './app/service/webSocket';
import NetworkStatsController from "./app/modules/networkStatsNodes";

const app = new APP()
require('./config/express')(app)
global.lhtWebLog = Utils.lhtLog
class Server {
  
  static listen () {
    
    Promise.all
    (
      [DBConnection.connect()]
      ).then(async () => {

      let serverInstance = app.listen(Config.PORT)
        console.log(Config.BASE_URL+Config.PORT);

        const socketIo = socket(serverInstance, { path: '/stats-data'}, {cors: {
                origin: Config.BASE_URL, //'http://localhost:3005',
                methods: ["GET", "POST"],
                allowedHeaders: ["*"],
                credentials: true
        }});

        socketIo.on("connection", function (socket) {
            socketIo.emit('open');
            console.log("Made socket connection");

            socket.on("ready", function () {
                socketIo.emit("networkStatsNodes", {});
                socketIo.emit("network-stats-data", {});
                console.log('READY RECEIVED!!!!!');
            });
        });

        global.client = await WebSocketService.socketConnection(serverInstance);

        NetworkStatsController.listenNodes(socketIo);

        setInterval(()=>{
          if(global.primusDataNode){
            socketIo.emit("network-stats-data", primusDataNode);
          }
        },1000)




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
