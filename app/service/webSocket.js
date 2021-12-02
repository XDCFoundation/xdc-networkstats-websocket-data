
const W3CWebSocket = require('websocket').w3cwebsocket;

let test = {};
let nodes = 0;

class Socket {
async socketConnection() {
  const client = new W3CWebSocket(
    "wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0"
  );

    client.onmessage = async (event) => {
      let msg = JSON.parse(event.data);
      if (msg.action === "stats") {
        if (msg.data.id in test) {
          return;
        } else {
          test[msg.data.id] = msg.data.stats.active;
          nodes = Object.keys(test).length;
          return Promise.resolve(nodes);
        }
      }
    };
} 
}

module.exports = Socket

