const mongoose = require('mongoose')

const nodeHistorySchema = new mongoose.Schema({
    day: { type: String },
    nodeLength: {type: Number}
  })
  
  nodeHistorySchema.method({
    saveData: async function () {
      return this.save()
    }
  })
  nodeHistorySchema.static({
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
    }
  })
  export default mongoose.model('Node History', nodeHistorySchema)