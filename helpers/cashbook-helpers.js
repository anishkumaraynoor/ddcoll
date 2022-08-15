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
                    op:itemDetails.op,
                    admission:itemDetails.admission,
                    rent: itemDetails.rent,
                    donation: itemDetails.donation,
                    gas: itemDetails.gas,
                    lab: itemDetails.lab,
                    advance: itemDetails.advance,
                    withdrawal: itemDetails.withdrawal,
                    expense: itemDetails.expense,
                    remittance: itemDetails.remittance,
                    total: itemDetails.total,
                    cashinhand: itemDetails.cashinhand,
                    bankbalance: itemDetails.bankbalance,
                    grandtotal: itemDetails.grandtotal,
                    precash: itemDetails.precash,
                    prebank: itemDetails.prebank,
                    cashbookdate: itemDetails.cashbookdate

                   
                    

                }
            }).then((response)=>{
                resolve()
            })
        })
    },

    cashbookWork: (cashbook) => {
        
        var bookcash = Array();
       
        for (j=0; j<cashbook.length; j++) {


            bookcash [j] = 
                {
                    op: cashbook[j].op,
                    admission: cashbook[j].admission,
                    rent: cashbook[j].rent[j],
                    donation: cashbook[j].donation,
                    gas: cashbook[j].gas,
                    lab: cashbook[j].lab,
                    advance: cashbook[j].advance,
                    withdrawal: cashbook[j].withdrawa,
                    expense: cashbook[j].expense,
                    remittance: cashbook[j].remittance
                }
                    
        }

        
        return new Promise(async (resolve, reject) => {
           
            resolve(cashbook)
            
        }) 
          
        
    }

}