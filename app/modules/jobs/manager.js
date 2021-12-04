import Node from "../../models/nodeHistory";

const W3CWebSocket = require("websocket").w3cwebsocket;
let test = {};
let nodes = 0;
let obj = {};

export default class BLManager {
  static async updateDailyActiveNodes() {
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
        }
      }
    };
    setTimeout(() => {
      obj = {
        nodes: nodes,
        addedOn: Date.now(),
      };
      console.log(obj);
      async function add() {
        const data = new Node(obj);
        const response = await data.saveData()
        console.log("Node Data Added");
      }
      add();
    }, 20000);
    return true;
  }
}
