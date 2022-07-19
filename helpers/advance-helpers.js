var db = require('../config/connection')
var collection = require('../config/collections')






var objectId = require('mongodb').ObjectID;
const { response } = require('express');
module.exports={
    addItem:(item,collectname,callback)=>{
        db.get().collection(collectname).insertOne(item).then((data)=>{
            callback(data.ops[0]._id);
        })
    },
    getAllItems:(collectname)=>{
        return new Promise(async(resolve,reject)=>{
            let items = await db.get().collection(collectname).find().toArray()
            resolve(items)
        })
    },
    deleteItem:(itemId,collectname)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collectname).removeOne({_id:objectId(itemId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getItemDetails:(itemId,collectname)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collectname).findOne({_id:objectId(itemId)}).then((item)=>{
                resolve(item);
            })
        })
    },
    updateItem:(itemId,itemDetails,collectname)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collectname).
            updateOne({_id:objectId(itemId)},{
                $set:{
                    fileno:itemDetails.fileno,
                    date:itemDetails.date,
                    college:itemDetails.college,
                    name:itemDetails.name,
                    designation:itemDetails.designation,
                    pen:itemDetails.pen,
                    pfno:itemDetails.pfno,
                    basic:itemDetails.basic,
                    preadvance:itemDetails.preadvance,
                    drawdate:itemDetails.drawdate,
                    preno:itemDetails.preno,
                    predate:itemDetails.predate,
                    amount:itemDetails.amount,
                    object:itemDetails.object,
                    credit:itemDetails.credit,
                    lastmonth: itemDetails.lastmonth,
                    preconsolidated: itemDetails.preconsolidated,
                    remitted: itemDetails.remitted,
                    subscription:itemDetails.subscription,
                    refund:itemDetails.refund,
                    arrears:itemDetails.arrears,
                    notallowed:itemDetails.notallowed,
                    totaladvance: itemDetails.totaladvance,
                    ccyear:itemDetails.ccyear,
                    instalments:itemDetails.instalments,
                    lrno:itemDetails.lrno,
                    lrdate:itemDetails.lrdate,                  
                    treasury: itemDetails.treasury,
                   
                    

                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}