import Node from "../../models/nodeHistory";
import UpTime from "../../models/upTimeGraph";
import HttpService from "../../service/http-service";
import Config from "../../../config/index";
import GasPrice from "../../models/gasPrice";
import Country from "../../models/socketData"
import _ from "lodash";

let test = {};
let nodes = 0;
let obj = {};
let upTime = 0;
let upObj = {};

export default class BLManager {
  static async updateDailyActiveNodes() {
    // const client = new W3CWebSocket(
    //   "wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0"
    // );

    client.open();

    client.on('data', function message(data) {
      // console.log('Data has been received');
      // socketIo.emit("network-stats-data", data);
      let msg = data;
      if (msg.action === "stats") {
        if (msg.data.id in test) {
          return;
        } else {
          test[msg.data.id] = msg.data.stats.active;
          nodes = Object.keys(test).length;
        }
      }
    });
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
      
    let roleList = await HttpService.executeHTTPRequest("GET", "https://pro-api.coinmarketcap.com", `/v1/cryptocurrency/quotes/latest?symbol=ETH&CMC_PRO_API_KEY=cb190bb3-b61a-4d83-8559-374edbfb27b3`, {});
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

catch(error){
  console.log("error", error);
} }

static async updateCountry () {
    try {
      setInterval(()=>{
        client.open();
        client.on('init', function message(data) {
        let country = [];
        if(!_.isEmpty(data.nodes) && !_.isUndefined(data.nodes)){
          _.forEach(data.nodes, function (node, index) {
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
        })
      }, 50000)

      
    } catch (error) {
      console.log("error----------", error);
    }
}

}
