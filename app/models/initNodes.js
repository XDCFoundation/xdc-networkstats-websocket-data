const mongoose = require('mongoose')

const initNodesSchema = new mongoose.Schema({
    nodesId: {type: String, default: ''},
    nodes: [
        {type: Object, default: {}}
    ],
    isDeleted: {type: Boolean, default: false},
    isInActive: {type: Boolean, default: false},
    addedOn: {type: Number, default: new Date().getTime()},
    modifiedOn: {type: Number, default: new Date().getTime()}
})

initNodesSchema.method({
    saveData: async function () {
        return this.save()
    }
})
initNodesSchema.static({
    findData: function (findObj) {
        return this.find(findObj)
    },
    findOneData: function (findObj) {
        return this.findOne(findObj)
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    },
    findDataWithAggregate: function (findObj) {
        return this.aggregate(findObj)
    },
    findLatestObject: function(){
        return this.find().sort({ _id: -1 }).limit(1);
    }
})
export default mongoose.model('init-nodes', initNodesSchema)