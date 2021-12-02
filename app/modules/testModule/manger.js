import Node from "../../models/nodeHistory";
export default class Manger {
    addNode = async (requestData) => {
            const data = new Node(requestData);
            const response = await data.saveData();
            return response;
            }
        
    getNode = async () => {
        const nodeData = await Node.findData();
        return nodeData;
    }
}

