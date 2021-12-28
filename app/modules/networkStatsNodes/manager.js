import InitNodes from "../../models/initNodes";
export default class NetworkStatsManager{
    static async listenNodes(socketIo){
        client.open();

        client.on('open', function message() {
            client.emit('ready');
            console.log('The connection has been opened.');
        });

        client.on('end', function end() {
            console.log('Socket connection ended.')
        })

        client.on('error', function message(err) {
            console.log('Error ====1=1=1=1=1=1=1=1=1=1=1= ', err);
        });

        client.on('reconnecting', function reconnecting(opts) {
            console.log('We are scheduling a reconnect operation', opts);
        })

        client.on('data', function message(data) {
            // console.log('Data has been received', data);
             socketIo.emit("network-stats-data", data);
        });

        client.on('init', async function message(data) {
            let initNodeData = new InitNodes(data);
            initNodeData.nodesId = initNodeData._id;
            await initNodeData.saveData();
            socketIo.emit("network-stats-nodes", data);
            console.log('INIT INIT INIT INIT INIT INIT INIT INIT INIT =1=1=1=1=1=1=1=1=1', new Date());
        });

        client.on('client-latency', function(data)
        {
            console.log("Client-latency event");
        })
    }
}