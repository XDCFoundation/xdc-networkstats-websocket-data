import Node from "../../models/nodeHistory";
import UpTime from "../../models/upTimeGraph";
import HttpService from "../../service/http-service";
import Config from "../../../config/index";
import GasPrice from "../../models/gasPrice";
import EthPrice from "../../models/ethPrice";
import Country from "../../models/socketData"
import _ from "lodash";

let test = {};
let nodes = 0;
let obj = {};
let upTime = 0;
let upObj = {};

export default class BLManager {
  static async updateDailyActiveNodes() {
      if(global.initData){
      let value = initData;
      if(!_.isEmpty(value.nodes) && !_.isUndefined(value.nodes)){
      nodes = _.filter(value.nodes, function (node) {
        return node.stats.active === true;
      }).length;
    }
  }
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

  static async updateUpTime () {
    client.open();
    client.on('data', function message(data) {
      let msg = data;
      if (msg.action === "stats") {
        if (msg.data.id in test) {
          return;
        } else {
          upTime = msg.data.stats.uptime;
        }
      }
    });
    setTimeout(() => {
      upObj = {
        upTime: upTime,
        addedOn: Date.now(),
      }
      async function addUptime() {
        const data = new UpTime(upObj);
        const response = await data.saveData()
        console.log("UpTime Added");
      }
      addUptime();
      console.log("up", upObj);
    },10000);
    return true;
  }

  static async getGasPrice () {
    try{
    const headers = {"content-type": "application/json"};
    let roleList = await HttpService.executeHTTPRequest("GET", "http://pro-api.coinmarketcap.com", `/v1/cryptocurrency/quotes/latest?symbol=XDC&CMC_PRO_API_KEY=cb190bb3-b61a-4d83-8559-374edbfb27b3`, {}, headers);
    if( typeof roleList!== 'string') {
    let obj = {
      gasPrice: roleList,
      addedOn: Date.now(),
    }
    async function addPrice() {
      const data = new GasPrice(obj);
      const response = await data.saveData()
    }
    addPrice();
  }
  }

catch(error){
  console.log("error", error);
} }

static async updateCountry () {
    try {
        if(global.initData){
        let country = [];
        if(!_.isEmpty(initData.nodes) && !_.isUndefined(initData.nodes)){
          _.forEach(initData.nodes, function (node, index) {
            if(node.geo!==null && typeof node.geo!=='undefined'){
            country.push({
              loc: node.geo.country,
            }) }
          }); }
          let hs = {};
          let countryArray = [];
          for (let i = 0; i < country.length; i++) {
            if (hs.hasOwnProperty(country[i].loc)) {
              hs[country[i].loc] = hs[country[i].loc] + 1;
            } else {
              hs[country[i].loc] = 1;
            }
          }
          for (const [key, value] of Object.entries(hs)) {
            countryArray.push({
              country: key,
              count: value,
            });
          }
          let obj = {
          nodes: countryArray,
          addedOn: Date.now(),
          }
          async function addNodes() {
            const data = new Country(obj);
            const response = await data.saveData()
          }
          addNodes();
        }
    } catch (error) {
      console.log("error----------", error);
    }
}


static async getEthPrice () {
  try{
  const headers = {"content-type": "application/json"};
  let roleList = await HttpService.executeHTTPRequest("GET", "http://ethgas.watch", `/api/gas`, {}, headers);
  if( typeof roleList!== 'string') {
  let obj = {
    ethPrice: roleList,
    addedOn: Date.now(),
  }

  console.log("ethhhh", obj);
  async function addPrice() {
    const data = new EthPrice(obj);
    const response = await data.saveData()
  }
  addPrice();
}
}

catch(error){
console.log("error", error);
} }


}
