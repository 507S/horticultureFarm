const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();


const {monthlyProgressEdit,monthlyProgressUpdate,monthlyProgress,monthlyProgressYear,
    monthlyProgressForm,monthlyProgressFormPost,charaKolomFixed,allCenterInfo,centersignup,
    centersignuppost,rajossho,rajosshoYear,rajosshoForm,rajosshoFormPost,rajosshoAdd,rajosshoAddPost,fetchRajosshoCode,
    expense,expenseYear,expenseForm,expenseFormPost,expenseAddPost,expenseAdd,fetchExpenseCode,
    chak1,chak1Year,chak1Form,chak1FormPost,chak2,chak2Year,chak2Form,chak2FormPost,
    revolvingFund,revolvingFundYear,revolvingFundForm,revolvingFundFormPost,
    specialCoconut,specialCoconutYear,specialCoconutForm,specialCoconutFormPost,loan,loanYear,loanForm,loanFormPost,
    apa,apaYear,apaForm,apaFormPost,allcenter,centerlogin,centerloginpost,centerDashboard,
    topSheet,topSheetYear,topSheetForm,topSheetFormPost,center,centerYear,centerForm,centerFormPost,
    charaKolom,charaKolomYear,charaKolomForm,charaKolomFormPost,folMosholla,folMoshollaYear,folMoshollaForm,folMoshollaFormPost,
    winterVeg,winterVegYear,winterVegForm,winterVegFormPost,summerVeg,summerVegYear,summerVegForm,summerVegFormPost,
    otherFlower,otherFlowerYear,otherFlowerForm,otherFlowerFormPost,seasonalFlower,seasonalFlowerYear,seasonalFlowerForm,seasonalFlowerFormPost,
    regularWorker,regularWorkerYear,regularWorkerForm,regularWorkerFormPost,
    irregularWorker,irregularWorkerYear,irregularWorkerForm,irregularWorkerFormPost,fetchSubCategory,fetchBiboron,fetchBreed} = require('../controllers/center.controller');


router.get('/',allcenter);
router.get('/allCenterInfo',allCenterInfo);
router.get('/charaKolomFixed',charaKolomFixed);
router.get('/login',centerlogin);
router.post('/logins',centerloginpost);
router.get('/dashboard',centerDashboard);

router.get('/signup',centersignup);
router.post('/signups',centersignuppost);

router.get('/topSheet',topSheet);
router.post('/topSheetYear',topSheetYear);
router.get('/topSheetForm',topSheetForm);
router.post('/topSheetForms',topSheetFormPost);

router.get('/center',center);
router.post('/centerYear',centerYear);
router.get('/centerForm',centerForm);
router.post('/centerForms',centerFormPost);

router.get('/charaKolom',charaKolom);
router.post('/charaKolomYear',charaKolomYear);
router.get('/charaKolomForm',charaKolomForm);
router.post('/charaKolomForms',charaKolomFormPost);

router.get('/folMosholla',folMosholla);
router.post('/folMoshollaYear',folMoshollaYear);
router.get('/folMoshollaForm',folMoshollaForm);
router.post('/folMoshollaForms',folMoshollaFormPost);

router.get('/winterVeg',winterVeg);
router.post('/winterVegYear',winterVegYear);
router.get('/winterVegForm',winterVegForm);
router.post('/winterVegForms',winterVegFormPost);

router.get('/summerVeg',summerVeg);
router.post('/summerVegYear',summerVegYear);
router.get('/summerVegForm',summerVegForm);
router.post('/summerVegForms',summerVegFormPost);

router.get('/otherFlower',otherFlower);
router.post('/otherFlowerYear',otherFlowerYear);
router.get('/otherFlowerForm',otherFlowerForm);
router.post('/otherFlowerForms',otherFlowerFormPost);

router.get('/seasonalFlower',seasonalFlower);
router.post('/seasonalFlowerYear',seasonalFlowerYear);
router.get('/seasonalFlowerForm',seasonalFlowerForm);
router.post('/seasonalFlowerForms',seasonalFlowerFormPost);

router.get('/regularWorker',regularWorker);
router.post('/regularWorkerYear',regularWorkerYear);
router.get('/regularWorkerForm',regularWorkerForm);
router.post('/regularWorkerForms',regularWorkerFormPost);

router.get('/irregularWorker',irregularWorker);
router.post('/irregularWorkerYear',irregularWorkerYear);
router.get('/irregularWorkerForm',irregularWorkerForm);
router.post('/irregularWorkerForms',irregularWorkerFormPost);

router.get('/apa',apa);
router.post('/apaYear',apaYear);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);

router.get('/loan',loan);
router.post('/loanYear',loanYear);
router.get('/loanForm',loanForm);
router.post('/loanForms',loanFormPost);

router.get('/specialCoconut',specialCoconut);
router.post('/specialCoconutYear',specialCoconutYear);
router.get('/specialCoconutForm',specialCoconutForm);
router.post('/specialCoconutForms',specialCoconutFormPost);

router.get('/revolvingFund',revolvingFund);
router.post('/revolvingFundYear',revolvingFundYear);
router.get('/revolvingFundForm',revolvingFundForm);
router.post('/revolvingFundForms',revolvingFundFormPost);

router.get('/chak1',chak1);
router.post('/chak1Year',chak1Year);
router.get('/chak1Form',chak1Form);
router.post('/chak1Forms',chak1FormPost);

router.get('/chak2',chak2);
router.post('/chak2Year',chak2Year);
router.get('/chak2Form',chak2Form);
router.post('/chak2Forms',chak2FormPost);

router.get('/rajossho',rajossho);
router.post('/rajosshoYear',rajosshoYear);
router.get('/rajosshoForm',rajosshoForm);
router.post('/rajosshoForms',rajosshoFormPost);
router.get('/rajosshoAdd/:id',rajosshoAdd);
router.post('/rajosshoAddPost/:id',rajosshoAddPost);
router.post('/fetchRajosshoCode',fetchRajosshoCode);

router.get('/expense',expense);
router.post('/expenseYear',expenseYear);
router.get('/expenseForm',expenseForm);
router.post('/expenseForms',expenseFormPost);
router.get('/expenseAdd/:id',expenseAdd);
router.post('/expenseAddPost/:id',expenseAddPost);
router.post('/fetchExpenseCode',fetchExpenseCode);

router.get('/monthlyProgress',monthlyProgress);
router.post('/monthlyProgressYear',monthlyProgressYear);
router.get('/monthlyProgressForm',monthlyProgressForm);

router.get('/monthlyProgressEdit/:progressId',monthlyProgressEdit)
router.post('/monthlyProgressUpdate/:progressId',monthlyProgressUpdate)

router.post('/fetchSubCategory',fetchSubCategory);
router.post('/fetchBiboron',fetchBiboron);
router.post('/fetchBreed',fetchBreed);
router.post('/monthlyProgressForms',monthlyProgressFormPost);


module.exports = router;