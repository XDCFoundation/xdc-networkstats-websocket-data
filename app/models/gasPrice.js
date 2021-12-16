const mongoose = require('mongoose')

const gasPriceSchema = new mongoose.Schema({
    gasPrice: {type: Object, default: {}},
    addedOn: {type: Number}
  })
   
  gasPriceSchema.method({
    saveData: async function () {
      return this.save()
    }
  })
  gasPriceSchema.static({
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
  export default mongoose.model('gas-price', gasPriceSchema)