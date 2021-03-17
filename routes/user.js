var express = require('express');
var collection = require('../config/collections');

const { render, response } = require('../app');
const billtypeHelpers = require('../helpers/billtype-helpers');
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const printHelpers = require('../helpers/print-helpers');
const pensionHelpers = require('../helpers/pension-helpers');
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
    res.render('user/view-forms', { forms, user });
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

module.exports = router;
