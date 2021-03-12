const { PDFNet } = require('@pdftron/pdfnet-node');
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var express = require('express');
const path = require('path');
const fs = require('fs');
var moment = require('moment');

const { render, response } = require('../app');
const billtypeHelpers = require('../helpers/billtype-helpers');
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const formHelpers = require('../helpers/form-helpers');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user;
  console.log(user);
  res.render('', { user });
});
router.get('/add-form', function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllColleges().then((colleges) => {
    billtypeHelpers.getAllBilltypes().then((billtypes) => {
      res.render('user/add-form', { colleges, billtypes, user });
    })
  })
});


router.get('/view-forms', function (req, res, next) {
  let user = req.session.user;
  formHelpers.getAllForms().then((forms) => {
    res.render('user/view-forms', { forms, user });
  })
});
router.get('/delete-form/:id', (req, res) => {
  let formId = req.params.id
  console.log(formId);
  formHelpers.deleteForm(formId).then((response) => {
    res.redirect('/view-forms')
  })
})
router.get('/edit-form/:id', async (req, res) => {
  let user = req.session.user;
  let form = await formHelpers.getFormDetails(req.params.id)
  console.log(form);
  res.render('user/edit-form', { form, user })
})


router.post('/edit-form/:id', async (req, res) => {

  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
  }


  var staff = req.body.staff;
  if(staff==="TS"){
    stafffull = "Teaching Staff";
  }else{
    stafffull = "Non Teaching Staff";
  }
  var dat = req.body.date;
  var date = moment(dat, "YYYY/MM/DD").format("DD/MM/YYYY")






  await formHelpers.updateForm(req.params.id, req.body).then(() => {
    function replaceErrors(key, value) {
      if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function (error, key) {
          error[key] = value[key];
          return error;
        }, {});
      }
      return value;
    }
  
    function errorHandler(error) {
      console.log(JSON.stringify({ error: error }, replaceErrors));
      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
          return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
      }
      throw error;
    }
  
    var content = fs.readFileSync(path.resolve(__dirname, `../files/letter.docx`), 'binary');
    var zip = new PizZip(content);
    var doc;
    
    try {
      doc = new Docxtemplater(zip);
    } catch (error) {
      errorHandler(error);
    }
  
    doc.setData({
      billno: req.body.billno,
      date: date,
      billtype: req.body.billtype,
      staff: req.body.staff,
      college: req.body.college,
      period: req.body.period,
      net: req.body.net,
      gross: req.body.gross,
      account: req.body.account,
      treasury: req.body.treasury,
      rupeewords: inWords(req.body.net),
      stafffull: stafffull
    });
  
    try {
      doc.render()
    }
    catch (error) {
      errorHandler(error);
    }
  
    var buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(path.resolve(__dirname, `../files/letterreplace.docx`), buf);
    const inputPath = path.resolve(__dirname, `../files/letterreplace.docx`);
    const outputPath = path.resolve(__dirname, `../files/letter.pdf`);
    const convertToPdf = async () => {
      const pdfdoc = await PDFNet.PDFDoc.create();
      await pdfdoc.initSecurityHandler();
      await PDFNet.Convert.toPdf(pdfdoc, inputPath);
      pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
    }
    PDFNet.runWithCleanup(convertToPdf).then(() => {
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(err);
        } else {
          res.setHeader('ContentType', 'application/pdf');
          res.end(data);
        }
      })
    }).catch(err => {
      res.statusCode = 500;
      res.end(err);
    })
  })
})

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

router.post('/add-form', (req, res) => {

  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
  }


  var staff = req.body.staff;
  if(staff==="TS"){
    stafffull = "Teaching Staff";
  }else{
    stafffull = "Non Teaching Staff";
  }
  var dat = req.body.date;
  var date = moment(dat, "YYYY/MM/DD").format("DD/MM/YYYY")




  formHelpers.addForm(req.body, (id) => {  
  
  function replaceErrors(key, value) {
    if (value instanceof Error) {
      return Object.getOwnPropertyNames(value).reduce(function (error, key) {
        error[key] = value[key];
        return error;
      }, {});
    }
    return value;
  }

  function errorHandler(error) {
    console.log(JSON.stringify({ error: error }, replaceErrors));
    if (error.properties && error.properties.errors instanceof Array) {
      const errorMessages = error.properties.errors.map(function (error) {
        return error.properties.explanation;
      }).join("\n");
      console.log('errorMessages', errorMessages);
    }
    throw error;
  }

  var content = fs.readFileSync(path.resolve(__dirname, `../files/letter.docx`), 'binary');
  var zip = new PizZip(content);
  var doc;
  
  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
    errorHandler(error);
  }

  doc.setData({
    billno: req.body.billno,
    date: date,
    billtype: req.body.billtype,
    staff: req.body.staff,
    college: req.body.college,
    period: req.body.period,
    net: req.body.net,
    gross: req.body.gross,
    account: req.body.account,
    treasury: req.body.treasury,
    rupeewords: inWords(req.body.net),
    stafffull: stafffull
  });

  try {
    doc.render()
  }
  catch (error) {
    errorHandler(error);
  }

  var buf = doc.getZip().generate({ type: 'nodebuffer' });
  fs.writeFileSync(path.resolve(__dirname, `../files/letterreplace.docx`), buf);
  const inputPath = path.resolve(__dirname, `../files/letterreplace.docx`);
  const outputPath = path.resolve(__dirname, `../files/letter.pdf`);
  const convertToPdf = async () => {
    const pdfdoc = await PDFNet.PDFDoc.create();
    await pdfdoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfdoc, inputPath);
    pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  }
  PDFNet.runWithCleanup(convertToPdf).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(err);
      } else {
        res.setHeader('ContentType', 'application/pdf');
        res.end(data);
      }
    })
  }).catch(err => {
    res.statusCode = 500;
    res.end(err);
  })
  });
});

module.exports = router;
