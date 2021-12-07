import NetworkStatsManager from './manager';
export default class NetworkStatsController{
    static async listenNodes(socketIo){
        await NetworkStatsManager.listenNodes(socketIo);
    }
}