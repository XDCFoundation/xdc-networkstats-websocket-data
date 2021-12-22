import Node from "../../models/nodeHistory";
import UpTime from "../../models/upTimeGraph";
import Utils from "../../utils";
import GasPrice from "../../models/gasPrice";
import Nodes from "../../models/socketData";
import _ from "lodash";

import { apiFailureMessage, httpConstants } from "../../common/constants";
import InitNodes from "../../models/initNodes";

const sortJsonArray = require("sort-json-array");
const W3CWebSocket = require("websocket").w3cwebsocket;
let test = {};
let nodes = 0;

export default class Manger {
  addNode = async (requestData) => {
    const data = new Node(requestData);
    const response = await data.saveData();
    return response;
  };

  getNode = async () => {
    const nodeData = await Node.findData();
    const data = nodeData;
    sortJsonArray(data, "addedOn", "des");
    return data.slice(0, 7);
  };

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
          console.log(nodes);
        }
      }
    };
  };

  getUpTime = async (day) => {
    if (!day)
      throw Utils.error(
        [],
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    let val = 24 * day;
    let time = [];
    let uptime = [];
    const upTimeData = await UpTime.findData();
    const data = upTimeData;
    sortJsonArray(data, "addedOn", "des");
    if (day == 1) {
      return data.slice(0, val);
    } else if (day == 7) {
      for (let i = 0; i < 168; i += 24) {
        time = data.slice(i, 24 + i);
        let sum = time.reduce(function (current, next) {
          return current + next.upTime;
        }, 0);
        let avg = sum / 24;
        uptime.push({
          uptime: avg,
        });
      }
      return uptime;
    } else if (day == 30) {
      for (let i = 0; i < 720; i += 24) {
        time = data.slice(i, 24 + i);
        let sum = time.reduce(function (current, next) {
          return current + next.upTime;
        }, 0);
        let avg = sum / 24;
        uptime.push({
          uptime: avg,
        });
      }
      return uptime;
    }
    throw Utils.error(
      [],
      apiFailureMessage.BAD_REQUEST,
      httpConstants.RESPONSE_CODES.NO_CONTENT_FOUND
    );
  };

  getGasPrice = async () => {
    const nodeData = await GasPrice.findData();
    const data = nodeData;
    sortJsonArray(data, "addedOn", "des");
    return data.slice(0, 1);
  };

  getInit = async () => {
    let arr24 = [];
    let last24Data = [];
    let arr7D = [];
    let last7Data = [];
    const nodesData = await Nodes.findData();
    const data = nodesData;
    sortJsonArray(data, "addedOn", "des");
    
    arr24 = data.slice(0, 24);
    let avgObj = {};
    for (let i = 0; i < arr24.length; i++) {
      for (let j = 0; j < arr24[i].nodes.length; j++) {
        if (`${arr24[i].nodes[j].country}` in avgObj) {
          avgObj[`${arr24[i].nodes[j].country}`] =
            avgObj[`${arr24[i].nodes[j].country}`] + arr24[i].nodes[j].count;
        } else {
          avgObj[`${arr24[i].nodes[j].country}`] = arr24[i].nodes[j].count;
        }
      }
    }
    for (const [key, value] of Object.entries(avgObj)) {
      last24Data.push({
        country: key,
        count: value,
      });
    }

    arr7D = data.slice(0, 168);
    let avgObj2 = {};
    for (let i = 0; i < arr7D.length; i++) {
      for (let j = 0; j < arr7D[i].nodes.length; j++) {
        if (`${arr7D[i].nodes[j].country}` in avgObj2) {
          avgObj2[`${arr7D[i].nodes[j].country}`] =
            avgObj2[`${arr7D[i].nodes[j].country}`] + arr7D[i].nodes[j].count;
        } else {
          avgObj2[`${arr7D[i].nodes[j].country}`] = arr7D[i].nodes[j].count;
        }
      }
    }
    for (const [key, value] of Object.entries(avgObj2)) {
      last7Data.push({
        country: key,
        count: value,
      });
    }
    let output = {
      last24: last24Data,
      last7: last7Data,
    }
    return output;
  };

  getTableNodes = async () => {
    const nodeData = await InitNodes.findLatestObject();
    console.log("nodeData =====", nodeData);
    return nodeData;
  }

}
