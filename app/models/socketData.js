const mongoose = require('mongoose')

const socketDataSchema = new mongoose.Schema({
    data: {type: Object, default: {}},
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
    }
  })
  export default mongoose.model('socket-data', socketDataSchema)