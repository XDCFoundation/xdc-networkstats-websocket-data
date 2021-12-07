import Primus from 'primus';
import PrimusEmit from 'primus-emit';
import Config from '../../config';
// const W3CWebSocket = require('websocket').w3cwebsocket;

let test = {};
let nodes = 0;

export default class WebSocketService {
static socketConnection(serverInstance) {
  const primus = new Primus(serverInstance, { transformer: "websockets", parser: 'JSON'})
  primus.plugin('emit', PrimusEmit);
  let Socket = primus.Socket;

  return new Socket(Config.WS_URL);
}
}


