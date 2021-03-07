var express = require('express');
const {render} = require('../app');
var router = express.Router();




var productHelper=require('../helpers/product-helpers');
var billtypeHelper=require('../helpers/billtype-helpers');
const productHelpers = require('../helpers/product-helpers');
const { response } = require('express');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('',{admin:true});
});
router.get('/view-colleges', function(req, res, next) {
  productHelper.getAllColleges().then((colleges)=>{
    res.render('admin/view-colleges',{colleges, admin:true});
  })
});
router.get('/view-billtypes',function(req,res,next){
  billtypeHelper.getAllBilltypes().then((billtypes)=>{
    res.render('admin/view-billtypes',{billtypes, admin:true});
  })
});
router.get('/add-college', function(req, res){
  res.render('admin/add-college',{admin:true})
});
router.get('/add-billtype', function(req, res){
  res.render('admin/add-billtype',{admin:true})
});
router.post('/add-college',(req,res)=>{
  console.log(req.body);
  productHelper.addCollege(req.body,(id)=>{
    res.render('admin/add-college',{admin:true})
  });
});
router.post('/add-billtype',(req,res)=>{
  console.log(req.body);
  billtypeHelper.addBilltype(req.body,(id)=>{
    res.render('admin/add-billtype',{admin:true})
  });
})
router.get('/delete-college/:id',(req,res)=>{
  let collId = req.params.id
  console.log(collId);
  productHelper.deleteCollege(collId).then((response)=>{
    res.redirect('/admin/view-colleges')
  })
})
router.get('/delete-billtype/:id',(req,res)=>{
  let billId = req.params.id
  console.log(billId);
  billtypeHelper.deleteBilltype(billId).then((response)=>{
    res.redirect('/admin/view-billtypes')
  })
})
router.get('/edit-college/:id',async(req,res)=>{
  let college = await productHelper.getCollegeDetails(req.params.id)
  console.log(college);
  res.render('admin/edit-college',{college, admin:true})
})
router.post('/edit-college/:id',(req,res)=>{
  productHelper.updateCollege(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-colleges')
  })
})
router.get('/edit-billtype/:id',async(req,res)=>{
  let billtype = await billtypeHelper.getBilltypeDetails(req.params.id)
  console.log(billtype);
  res.render('admin/edit-billtype',{billtype, admin:true})
})
router.post('/edit-billtype/:id',(req,res)=>{
  billtypeHelper.updateBilltype(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-billtypes')
  })
})


module.exports = router;
