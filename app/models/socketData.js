const mongoose = require('mongoose')

const socketDataSchema = new mongoose.Schema({
    nodes: {type: Object, default: {}},
    addedOn: {type: Number}
  })
   
  socketDataSchema.method({
    saveData: async function () {
      return this.save()
    }
  })
  socketDataSchema.static({
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
    findObjectsInDescendingOrder: function(){
      return this.find({}).sort({ _id: -1 }).limit(168);
    }
  })
  export default mongoose.model('socket-data', socketDataSchema)