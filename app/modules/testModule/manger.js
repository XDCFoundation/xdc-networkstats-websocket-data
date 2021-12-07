import Node from "../../models/nodeHistory";

const sortJsonArray = require('sort-json-array');
const W3CWebSocket = require('websocket').w3cwebsocket;
let test = {};
let nodes = 0;

export default class Manger {
    addNode = async (requestData) => {
            const data = new Node(requestData);
            const response = await data.saveData();
            return response;
            }
        
    getNode = async () => {
        const nodeData = await Node.findData();
        const data = nodeData;
        sortJsonArray(data, 'addedOn','des');
        return (data.slice(0,7));
    }

    testSocket = async () => {
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
                  console.log(nodes)
                }
              }
            }; 
    }
}
