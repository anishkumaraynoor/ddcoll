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
                    staff:itemDetails.staff,
                    college:itemDetails.college,
                    name:itemDetails.name,
                    designation:itemDetails.designation,
                    house:itemDetails.house,
                    place:itemDetails.place,
                    post:itemDetails.post,
                    district:itemDetails.district,
                    pin:itemDetails.pin,
                    joining:itemDetails.joining,
                    retirement:itemDetails.retirement,
                    treasury:itemDetails.treasury
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}