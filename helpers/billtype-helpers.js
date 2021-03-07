var db = require('../config/connection')
var collection = require('../config/collections')





var objectId = require('mongodb').ObjectID;
module.exports = {
    addBilltype:(billtype,callback)=>{
        db.get().collection(collection.BILLTYPE_COLLECTION).insertOne(billtype).then((data)=>{
            callback(data.ops[0]._id);
        })
    },
    getAllBilltypes:()=>{
        return new Promise(async(resolve,reject)=>{
            let billtypes = await db.get().collection(collection.BILLTYPE_COLLECTION).find().toArray()
            resolve(billtypes)
        })
    },
    deleteBilltype:(billtypeId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BILLTYPE_COLLECTION).removeOne({_id:objectId(billtypeId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getBilltypeDetails:(billtypeId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BILLTYPE_COLLECTION).findOne({_id:objectId(billtypeId)}).then((billtype)=>{
                resolve(billtype);
            })
        })
    },
    updateBilltype:(billId,billDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BILLTYPE_COLLECTION).
            updateOne({_id:objectId(billId)},{
                $set:{
                    billtype:billDetails.billtype,
                    headofaccount:billDetails.headofaccount
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}