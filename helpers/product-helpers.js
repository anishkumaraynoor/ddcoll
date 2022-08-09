var db = require('../config/connection')
var collection = require('../config/collections')






var objectId = require('mongodb').ObjectID;
const { response } = require('express');
module.exports={
    addCollege:(college,callback)=>{
        db.get().collection('college').insertOne(college).then((data)=>{
            
            callback(data.ops[0]._id);
            
        })
    },
    getAllColleges:()=>{
        return new Promise(async(resolve,reject)=>{
            let colleges = await db.get().collection(collection.COLLEGE_COLLECTION).find().toArray()
            resolve(colleges)
        })
    },
    deleteCollege:(collegeId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COLLEGE_COLLECTION).removeOne({_id:objectId(collegeId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getCollegeDetails:(collegeId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COLLEGE_COLLECTION).findOne({_id:objectId(collegeId)}).then((college)=>{
                resolve(college);
            })
        })
    },
    updateCollege:(collId,collDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COLLEGE_COLLECTION).
            updateOne({_id:objectId(collId)},{
                $set:{
                    college:collDetails.college,
                    treasury:collDetails.treasury,
                    malayalam:collDetails.malayalam
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}