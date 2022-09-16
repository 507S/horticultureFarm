const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const db = require("../models")
var cc = db.center;

router.use(async function (req, res, next) {
    if (req.session.type === "center") {
        const c = await cc.findByPk(req.session.user_id)
        res.locals.user_name = c.dataValues.center
    }
    else {
        res.locals.user_name = "Horticulture Wing Bd"
    }
    next();
});
const { fetchMaan, fetchWork, fetchShuchok, fetchEkok, fetchShuchokMaan, expenseAddPost, expenseAdd, fetchExpenseCode, rajosshoAdd, rajosshoAddPost, allCenterInfo,
    fetchRajosshoCode, generatePdfMonthlyProgress, monthlyProgressEdit, monthlyProgressUpdate, monthlyProgressDelete, monthlyProgress, monthlyProgressYear,
    monthlyProgressForm, monthlyProgressFormPost, charaKolomFixed, centersignup, centersignuppost, rajossho, rajosshoYear, rajosshoForm, generatePdfexpense,
    rajosshoFormPost, expense, expenseYear, expenseForm, expenseFormPost,expenseEdit,expenseEditPost,expenseDelete, chak1, chak1Year, chak1Form, chak1FormPost, chak2, chak2Year, chak2Form,
    chak2FormPost, revolvingFund, revolvingFundYear, revolvingFundForm, revolvingFundFormPost,revolvingFundEdit,revolvingFundEditPost, specialCoconut, specialCoconutYear, specialCoconutForm,
    specialCoconutFormPost,specialCoconutEdit,specialCoconutEditPost, loan, loanYear, loanForm, loanFormPost,loanEdit, loanEditPost, apa, apaYear, apaForm, apaFormPost, allcenter, centerlogin, centerloginpost,
    centerDashboard, topSheet, topSheetYear, generatePdfTopSheet, topSheetBitoron, topSheetBitoronYear, generatePdfTopSheetBitoron, center, centerEdit, centerEditPost, centerDelete, chak1Delete, chak1Edit, chak1EditPost, chak2Delete, chak2Edit, chak2EditPost,
    fetchPodobiList, workerInfoDelete, workerInfoEdit, workerInfoEditPost, generatePdfworkerInfo, generatePdfworkerNum, generatePdfapa, generatePdfloan, generatePdfspecialCoconut, generatePdfrevolvingFund, generatePdfchak1, generatePdfchak2, generatePdfrajossho,
    workerInfo, workerInfoForm, workerInfoFormPost, workerNum, fetchSubCategory, fetchBiboron, fetchBreed, apaEdit, apaEditPost } = require('../controllers/center.controller');


router.get('/', allcenter);
router.get('/allCenterInfo', allCenterInfo);
router.get('/charaKolomFixed', charaKolomFixed);
router.get('/login', centerlogin);
router.post('/logins', centerloginpost);
router.get('/dashboard', centerDashboard);

router.get('/signup', centersignup);
router.post('/signups', centersignuppost);

router.get('/topSheet', topSheet);
router.post('/topSheetYear', topSheetYear);
router.get('/generatePdfTopSheet/:selectedDate', generatePdfTopSheet);

router.get('/topSheetBitoron', topSheetBitoron);
router.post('/topSheetBitoronYear', topSheetBitoronYear);
router.get('/generatePdfTopSheetBitoron/:selectedDate', generatePdfTopSheetBitoron);

router.get('/center', center);
router.get('/centerEdit/:id', centerEdit);
router.post('/centerEditPost/:id', centerEditPost);
router.get('/centerDelete/:id', centerDelete);



router.get('/workerInfo', workerInfo);
router.get('/workerInfoForm', workerInfoForm);
router.post('/workerInfoForms', workerInfoFormPost);
router.get('/workerInfoDelete/:id', workerInfoDelete);
router.get('/workerInfoEdit/:id', workerInfoEdit);
router.post('/workerInfoEditPost/:id', workerInfoEditPost);
router.post('/generatePdfworkerInfo', generatePdfworkerInfo);

router.get('/workerNum', workerNum);
router.post('/generatePdfworkerNum', generatePdfworkerNum);

router.get('/apa', apa);
router.post('/apaYear', apaYear);
router.get('/apaEdit/:id', apaEdit);
router.post('/apaEditPost/:id', apaEditPost);
router.get('/apaForm', apaForm);
router.post('/apaForms', apaFormPost);
router.post('/fetchMaan', fetchMaan);
router.post('/fetchWork', fetchWork);
router.post('/fetchShuchok', fetchShuchok);
router.post('/fetchEkok', fetchEkok);
router.post('/fetchShuchokMaan', fetchShuchokMaan);
router.post('/generatePdfapa', generatePdfapa);

router.get('/loan', loan);
router.post('/loanYear', loanYear);
router.get('/loanForm', loanForm);
router.post('/loanForms', loanFormPost);
router.get('/loanEdit/:id',loanEdit);
router.post('/loanEditPost/:id',loanEditPost);
router.post('/generatePdfloan', generatePdfloan);

router.get('/specialCoconut', specialCoconut);
router.post('/specialCoconutYear', specialCoconutYear);
router.get('/specialCoconutForm', specialCoconutForm);
router.post('/specialCoconutForms', specialCoconutFormPost);
router.get('/specialCoconutEdit/:id',specialCoconutEdit);
router.post('/specialCoconutEditPost/:id',specialCoconutEditPost);
router.post('/generatePdfspecialCoconut', generatePdfspecialCoconut);

router.get('/revolvingFund', revolvingFund);
router.post('/revolvingFundYear', revolvingFundYear);
router.get('/revolvingFundForm', revolvingFundForm);
router.post('/revolvingFundForms', revolvingFundFormPost);
router.get('/revolvingFundEdit/:id',revolvingFundEdit);
router.post('/revolvingFundEditPost/:id',revolvingFundEditPost);
router.post('/generatePdfrevolvingFund', generatePdfrevolvingFund);

router.get('/chak1', chak1);
router.post('/chak1Year', chak1Year);
router.get('/chak1Form', chak1Form);
router.post('/chak1Forms', chak1FormPost);
router.get('/chak1Delete/:id', chak1Delete);
router.get('/chak1Edit/:id', chak1Edit);
router.post('/chak1EditPost/:id', chak1EditPost);
router.post('/generatePdfchak1', generatePdfchak1);

router.get('/chak2', chak2);
router.post('/chak2Year', chak2Year);
router.get('/chak2Form', chak2Form);
router.post('/chak2Forms', chak2FormPost);
router.post('/fetchPodobiList', fetchPodobiList);
router.get('/chak2Delete/:id', chak2Delete);
router.get('/chak2Edit/:id', chak2Edit);
router.post('/chak2EditPost/:id', chak2EditPost);
router.post('/generatePdfchak2', generatePdfchak2);

router.get('/rajossho', rajossho);
router.post('/rajosshoYear', rajosshoYear);
router.get('/rajosshoForm', rajosshoForm);
router.post('/rajosshoForms', rajosshoFormPost);
router.get('/rajosshoAdd/:id', rajosshoAdd);
router.post('/rajosshoAddPost/:id', rajosshoAddPost);
router.post('/fetchRajosshoCode', fetchRajosshoCode);
router.post('/generatePdfrajossho', generatePdfrajossho);

router.get('/expense', expense);
router.post('/expenseYear', expenseYear);
router.get('/expenseForm', expenseForm);
router.post('/expenseForms', expenseFormPost);
router.get('/expenseEdit/:id',expenseEdit);
router.post('/expenseEditPost/:id',expenseEditPost);
router.get('/expenseDelete/:id',expenseDelete);
router.get('/expenseAdd/:id', expenseAdd);
router.post('/expenseAddPost/:id', expenseAddPost);
router.post('/fetchExpenseCode', fetchExpenseCode);
router.post('/generatePdfexpense', generatePdfexpense);


router.get('/monthlyProgress', monthlyProgress);
router.post('/monthlyProgressYear', monthlyProgressYear);
router.get('/monthlyProgressForm', monthlyProgressForm);
router.get('/generatePdfMonthlyProgress/:selectedDate', generatePdfMonthlyProgress);
router.get('/monthlyProgressEdit/:progressId/:editDate', monthlyProgressEdit)
router.post('/monthlyProgressUpdate/:progressId', monthlyProgressUpdate)
router.get('/monthlyProgressDelete/:progressId/:selectedDate', monthlyProgressDelete)

router.post('/fetchSubCategory', fetchSubCategory);
router.post('/fetchBiboron', fetchBiboron);
router.post('/fetchBreed', fetchBreed);
router.post('/monthlyProgressForms', monthlyProgressFormPost);


module.exports = router;