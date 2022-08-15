var express = require('express');
var collection = require('../config/collections');

const { render, response } = require('../app');
const billtypeHelpers = require('../helpers/billtype-helpers');
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const printHelpers = require('../helpers/print-helpers');
const advanceprintHelpers = require('../helpers/advanceprint-helpers');
const closureprintHelpers = require('../helpers/closureprint-helpers');
const teacherprintHelpers = require('../helpers/teacherprint-helpers');
const pensionHelpers = require('../helpers/pension-helpers');
const advanceHelpers = require('../helpers/advance-helpers');
const closureHelpers = require('../helpers/closure-helpers');
const arrearHelpers = require('../helpers/arrear-helpers');
const ntsarrearHelpers = require('../helpers/ntsarrear-helpers');
const arrearsHelpers = require('../helpers/arrears-helpers')
const elsHelpers = require('../helpers/els-helpers')
const cashbookHelpers = require('../helpers/cashbook-helpers')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user;
  console.log(user);
  res.render('', { user });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('user/login', { "LoginErr": req.session.loginErr });
    req.session.loginErr = false;
  }
});
router.get('/signup', function (req, res) {
  res.render('user/signup');
})
router.post('/signup', function (req, res) {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/');
  })
})
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    } else {
      req.session.loginErr = true;
      res.redirect('/login');
    }
  })
})
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

router.get('/add-form', function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllColleges().then((colleges) => {
    billtypeHelpers.getAllBilltypes().then((billtypes) => {
      res.render('user/add-form', { colleges, billtypes, user });
    })
  })
});

router.get('/add-vimala', function(req, res, next) {
    res.render('user/add-vimala');
});

router.post('/add-vimala',(req,res)=>{
  console.log(req.body);
  var collectname = collection.VIMALA_COLLECTION;
  pensionHelpers.addItem(req.body,collectname,(id)=>{
    res.render('user/add-vimala');
  });
});

router.get('/view-vimala', function(req, res, next) {
  var collectname = collection.VIMALA_COLLECTION;
  pensionHelpers.getAllItems(collectname).then((vimala)=>{
    res.render('user/view-vimala',{vimala});
  })
});

router.get('/edit-vimala/:id', async (req, res) => {
  var collectname = collection.VIMALA_COLLECTION;
  let vimala = await pensionHelpers.getItemDetails(req.params.id,collectname);
  res.render('user/edit-vimala', {vimala})
});

router.post('/edit-vimala/:id', async (req, res) => {
  var collectname = collection.VIMALA_COLLECTION;
  await pensionHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    res.redirect('/view-vimala')
  
  })
})





router.post('/add-form', (req, res) => {
  var page = `../files/letter.docx`;
  var collectname = collection.FORM_COLLECTION;
  pensionHelpers.addItem(req.body,collectname,(id) => {
    printHelpers.printWork(req.body,page,res);
  });
});

router.get('/view-forms', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.FORM_COLLECTION;
  pensionHelpers.getAllItems(collectname).then((forms) => {
    var totalgross = 0;
    for(i=0;i<forms.length;i++){
      totalgross = totalgross + eval(forms[i].gross)
    }
    
    res.render('user/view-forms', {totalgross, forms, user });
  })
});



router.get('/delete-form/:id', (req, res) => {
  let formId = req.params.id
  var collectname = collection.FORM_COLLECTION;
  console.log(formId);
  pensionHelpers.deleteItem(formId,collectname).then((response) => {
    res.redirect('/view-forms')
  })
})
router.get('/edit-form/:id', async (req, res) => {
  let user = req.session.user;
  var collectname = collection.FORM_COLLECTION;
  let form = await pensionHelpers.getItemDetails(req.params.id,collectname);
  console.log(form);
  res.render('user/edit-form', { form, user })
})

router.post('/edit-form/:id', async (req, res) => {
  var page = `../files/letter.docx`;
  var collectname = collection.FORM_COLLECTION;
  await pensionHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    printHelpers.printWork(req.body,page,res);
  })
})

router.get('/add-pensionform', function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllColleges().then((colleges) => {  
      res.render('user/add-pensionform', { colleges, user });
  })
})

router.post('/add-pensionform', (req, res) => {
  var page = `../files/pension.docx`;
  var collectname = collection.PENSION_COLLECTION;
  pensionHelpers.addItem(req.body,collectname,(id) => {
    printHelpers.printWork(req.body,page,res);
  });
});

router.get('/view-pensions', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.PENSION_COLLECTION;
  pensionHelpers.getAllItems(collectname).then((pensions) => {
    res.render('user/view-pensions', { pensions, user });
  })
});

router.get('/delete-pension/:id', (req, res) => {
  let pensionId = req.params.id
  var collectname = collection.PENSION_COLLECTION;
  console.log(pensionId);
  pensionHelpers.deleteItem(pensionId,collectname).then((response) => {
    res.redirect('/view-pensions')
  })
})
router.get('/edit-pension/:id', async (req, res) => {
  let user = req.session.user;
  var collectname = collection.PENSION_COLLECTION;
  let pension = await pensionHelpers.getItemDetails(req.params.id,collectname);
  console.log(pension);
  res.render('user/edit-pension', { pension, user })
})

router.post('/edit-pension/:id', async (req, res) => {
  var page = `../files/pension.docx`;
  var collectname = collection.PENSION_COLLECTION;
  await pensionHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    printHelpers.printWork(req.body,page,res);
  })
})

router.get('/add-advance', function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllColleges().then((colleges) => {  
      res.render('user/add-advance', { colleges, user });
  })
})

router.post('/add-advance', (req, res) => {
  var page = `../files/advance.docx`;
  var collectname = collection.ADVANCE_COLLECTION;
  advanceHelpers.addItem(req.body,collectname,(id) => {
    advanceprintHelpers.printWork(req.body,page,res);
  });
});

router.get('/view-advance', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.ADVANCE_COLLECTION;
  advanceHelpers.getAllItems(collectname).then((advance) => {
    res.render('user/view-advance', { advance, user });
  })
});

router.get('/delete-advance/:id', (req, res) => {
  let advanceId = req.params.id
  var collectname = collection.ADVANCE_COLLECTION;
  console.log(advanceId);
  advanceHelpers.deleteItem(advanceId,collectname).then((response) => {
    res.redirect('/view-advance')
  })
})
router.get('/edit-advance/:id', async (req, res) => {
  let user = req.session.user;
  var collectname = collection.ADVANCE_COLLECTION;
  let advance = await advanceHelpers.getItemDetails(req.params.id,collectname);
  console.log(advance);
  res.render('user/edit-advance', { advance, user })
})

router.post('/edit-advance/:id', async (req, res) => {
  var page = `../files/advance.docx`;
  var collectname = collection.ADVANCE_COLLECTION;
  await advanceHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    advanceprintHelpers.printWork(req.body,page,res);
  })
})

router.get('/add-closure', function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllColleges().then((colleges) => {  
      res.render('user/add-closure', { colleges, user });
  })
})

router.post('/add-closure', (req, res) => {
  var page = `../files/closure.docx`;
  var collectname = collection.CLOSURE_COLLECTION;
  closureHelpers.addItem(req.body,collectname,(id) => {
    closureprintHelpers.printWork(req.body,page,res);
  });
});

router.get('/view-closure', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.CLOSURE_COLLECTION;
  closureHelpers.getAllItems(collectname).then((closure) => {
    res.render('user/view-closure', { closure, user });
  })
});

router.get('/delete-closure/:id', (req, res) => {
  let closureId = req.params.id
  var collectname = collection.CLOSURE_COLLECTION;
  console.log(closureId);
  closureHelpers.deleteItem(closureId,collectname).then((response) => {
    res.redirect('/view-closure')
  })
})
router.get('/edit-closure/:id', async (req, res) => {
  let user = req.session.user;
  var collectname = collection.CLOSURE_COLLECTION;
  let closure = await closureHelpers.getItemDetails(req.params.id,collectname);
  console.log(closure);
  res.render('user/edit-closure', { closure, user })
})

router.post('/edit-closure/:id', async (req, res) => {
  var page = `../files/closure.docx`;
  var collectname = collection.CLOSURE_COLLECTION;
  await closureHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    closureprintHelpers.printWork(req.body,page,res);
  })
})

router.get('/add-teacher', function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllColleges().then((colleges) => {  
      res.render('user/add-teacher', { colleges, user });
  })
})

router.post('/add-teacher', (req, res) => {
  var page = `../files/teacherapproval.docx`;
  var collectname = collection.TEACHER_COLLECTION;
  
    teacherprintHelpers.printWork(req.body,page,res);
  
});


router.get('/add-els', function (req, res, next) {
  let user = req.session.user;
  res.render('user/add-els', { user });
})

router.get('/add-complex', function (req, res, next) {
  let user = req.session.user;
  res.render('user/add-complex', { user });
})

router.get('/add-cashbook', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.CASHBOOK_COLLECTION;
  cashbookHelpers.getAllItems(collectname).then((cashbook) => {
    if(cashbook.length == 0){
      var precash = 0;
      var prebank = 0;
    }else{
      precash = cashbook[cashbook.length-1].cashinhand;
      prebank = cashbook[cashbook.length-1].bankbalance;
    }
    
    res.render('user/add-cashbook', { precash, prebank, user });
})
})

router.post('/add-cashbook', (req, res) => {
  var collectname = collection.CASHBOOK_COLLECTION;
  cashbookHelpers.addItem(req.body,collectname,(id) => {
      res.redirect('add-cashbook');
  });
});

router.get('/view-cashbook', (req, res) => {
  var collectname = collection.CASHBOOK_COLLECTION;
    cashbookHelpers.getAllItems(collectname).then((cashbook) => {
      res.render('user/view-cashbook', {cashbook});
    })
  
});



router.get('/delete-cashbook/:id', (req, res) => {
  let cashbookId = req.params.id
  var collectname = collection.CASHBOOK_COLLECTION;
  console.log(cashbookId);
  cashbookHelpers.deleteItem(cashbookId,collectname).then((response) => {
    res.redirect('/view-cashbook')
  })
})

router.get('/edit-cashbook/:id', async (req, res) => {
  let user = req.session.user;
  var collectname = collection.CASHBOOK_COLLECTION;
  let cashbook = await cashbookHelpers.getItemDetails(req.params.id,collectname);
  console.log(cashbook);
  res.render('user/edit-cashbook', { cashbook, user })
})

router.post('/edit-cashbook/:id', async (req, res) => {
  var collectname = collection.CASHBOOK_COLLECTION;
  await cashbookHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    res.redirect('/view-cashbook')
  })
})

router.get('/add-ugcpr', function (req, res, next) {
  let user = req.session.user;
  res.render('user/add-ugcpr', { user });
})
router.get('/add-ugcprarrear', function (req, res, next) {
  res.render('user/add-ugcprarrear');
})
router.get('/add-ntsprarrear', function (req, res, next) {
  res.render('user/add-ntsprarrear');
})
router.get('/add-arrears', function (req, res, next) {
  res.render('user/add-arrears');
})
router.get('/add-index', function (req, res, next) {
  res.render('user/add-index');
})
router.post('/view-ugcarrear', (req, res) => {
  arrearHelpers.arrearWork(req.body).then((grand) => {
    var arrear = grand.items;
    var total = grand.total;
    res.render('user/view-ugcarrear',{arrear,total});
  })
});


router.post('/view-arrears', (req, res) => {
  arrearsHelpers.arrearsWork(req.body).then((grand) => {
    var arrear = grand.items;
    var total = grand.total;
    res.render('user/view-arrears',{arrear,total});
  })
});

router.post('/view-els', (req, res) => {
  elsHelpers.elsWork(req.body).then((elsdata) => {
    console.log(elsdata);
    res.render('user/view-els',{elsdata});
  })
});








router.post('/view-ntsarrear', (req, res) => {
  ntsarrearHelpers.arrearWork(req.body).then((grand) => {
    var arrear = grand.items;
    var total = grand.total;
    res.render('user/view-ntsarrear',{arrear,total});
  })
});

router.get('/ka', function (req, res, next) {
  res.render('user/pages/ka');
})




module.exports = router;
