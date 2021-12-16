const mongoose = require('mongoose')

const upTimeSchema = new mongoose.Schema({
    addedOn: {type: Number}, 
    upTime: {type: Number} 
  })
   
  upTimeSchema.method({
    saveData: async function () {
      return this.save()
    }
  })
  upTimeSchema.static({
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
  export default mongoose.model('upTime', upTimeSchema)