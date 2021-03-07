var db = require('../config/connection')
var collection = require('../config/collections')






var objectId = require('mongodb').ObjectID;
const { response } = require('express');
module.exports={
    addForm:(form,callback)=>{
        db.get().collection('form').insertOne(form).then((data)=>{
            callback(data.ops[0]._id);
        })
    },
    getAllForms:()=>{
        return new Promise(async(resolve,reject)=>{
            let forms = await db.get().collection(collection.FORM_COLLECTION).find().toArray()
            resolve(forms)
        })
    },
    deleteForm:(foId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.FORM_COLLECTION).removeOne({_id:objectId(foId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getFormDetails:(formId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.FORM_COLLECTION).findOne({_id:objectId(formId)}).then((form)=>{
                resolve(form);
            })
        })
    },
    updateForm:(foId,foDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.FORM_COLLECTION).
            updateOne({_id:objectId(foId)},{
                $set:{
                    billno:foDetails.billno,
                    date:foDetails.date,
                    billtype:foDetails.billtype,
                    staff:foDetails.staff,
                    college:foDetails.college,
                    period:foDetails.period,
                    net:foDetails.net,
                    pay:foDetails.pay,
                    agp:foDetails.agp,
                    da:foDetails.da,
                    hra:foDetails.hra,
                    cca:foDetails.cca,
                    splls:foDetails.splls,
                    splallow:foDetails.splallow,
                    gross:foDetails.gross,
                    treasury:foDetails.treasury,
                    account:foDetails.account
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}