const mongoose = require('mongoose')

const ethPriceSchema = new mongoose.Schema({
    ethPrice: {type: Object, default: {}},
    addedOn: {type: Number}
  })
   
  ethPriceSchema.method({
    saveData: async function () {
      return this.save()
    }
  })
  ethPriceSchema.static({
    findData: function (findObj) {
      return this.find(findObj)
    },
    findDataWithLimitInDecreasingOrder: function (limit) {
      return this.find().sort({ addedOn: -1 }).limit(limit)
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
  export default mongoose.model('eth-price', ethPriceSchema)