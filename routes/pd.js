const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {monthlyProgress,monthlyProgressFilter,monthlyProgressForm,monthlyProgressFormPost,charaKolomFixed,allCenterInfo,pdsignup,pdsignuppost,rajossho,rajosshoFilter,rajosshoForm,rajosshoFormPost,expense,expenseFilter,expenseForm,expenseFormPost,chak1,chak1Filter,chak1Form,chak1FormPost,chak2,chak2Filter,chak2Form,chak2FormPost,revolvingFund,revolvingFundFilter,revolvingFundForm,revolvingFundFormPost,specialCoconut,specialCoconutFilter,specialCoconutForm,specialCoconutFormPost,loan,loanFilter,loanForm,loanFormPost,apa,apaFilter,apaYear,apaForm,apaFormPost,allcenter,pdlogin,pdloginpost,pdDashboard,topSheet,topSheetFilter,topSheetForm,topSheetFormPost,center,centerYear,centerForm,centerFormPost,charaKolom,charaKolomYear,charaKolomForm,charaKolomFormPost,folMosholla,folMoshollaYear,folMoshollaForm,folMoshollaFormPost,winterVeg,winterVegYear,winterVegForm,winterVegFormPost,summerVeg,summerVegYear,summerVegForm,summerVegFormPost,otherFlower,otherFlowerYear,otherFlowerForm,otherFlowerFormPost,seasonalFlower,seasonalFlowerYear,seasonalFlowerForm,seasonalFlowerFormPost,regularWorker,regularWorkerFilter,regularWorkerForm,regularWorkerFormPost,irregularWorker,irregularWorkerFilter,irregularWorkerForm,irregularWorkerFormPost} = require('../controllers/pd.controller');

router.get('/',allcenter);
router.get('/allCenterInfo',allCenterInfo);
router.get('/charaKolomFixed',charaKolomFixed);
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);

router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/topSheet',topSheet);
router.post('/topSheetFilter',topSheetFilter);
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
router.post('/regularWorkerFilter',regularWorkerFilter);
router.get('/regularWorkerForm',regularWorkerForm);
router.post('/regularWorkerForms',regularWorkerFormPost);

router.get('/irregularWorker',irregularWorker);
router.post('/irregularWorkerFilter',irregularWorkerFilter);
router.get('/irregularWorkerForm',irregularWorkerForm);
router.post('/irregularWorkerForms',irregularWorkerFormPost);

router.get('/apa',apa);
router.post('/apaFilter',apaFilter);
router.post('/apaYear',apaYear);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);

router.get('/loan',loan);
router.post('/loanFilter',loanFilter);
router.get('/loanForm',loanForm);
router.post('/loanForms',loanFormPost);

router.get('/specialCoconut',specialCoconut);
router.post('/specialCoconutFilter',specialCoconutFilter);
router.get('/specialCoconutForm',specialCoconutForm);
router.post('/specialCoconutForms',specialCoconutFormPost);

router.get('/revolvingFund',revolvingFund);
router.post('/revolvingFundFilter',revolvingFundFilter);
router.get('/revolvingFundForm',revolvingFundForm);
router.post('/revolvingFundForms',revolvingFundFormPost);

router.get('/chak1',chak1);
router.post('/chak1Filter',chak1Filter);
router.get('/chak1Form',chak1Form);
router.post('/chak1Forms',chak1FormPost);

router.get('/chak2',chak2);
router.post('/chak2Filter',chak2Filter);
router.get('/chak2Form',chak2Form);
router.post('/chak2Forms',chak2FormPost);

router.get('/rajossho',rajossho);
router.post('/rajosshoFilter',rajosshoFilter);
router.get('/rajosshoForm',rajosshoForm);
router.post('/rajosshoForms',rajosshoFormPost);

router.get('/expense',expense);
router.post('/expenseFilter',expenseFilter);
router.get('/expenseForm',expenseForm);
router.post('/expenseForms',expenseFormPost);

router.get('/monthlyProgress',monthlyProgress);
router.post('/monthlyProgressFilter',monthlyProgressFilter);
router.get('/monthlyProgressForm',monthlyProgressForm);
router.post('/monthlyProgressForms',monthlyProgressFormPost);



module.exports = router;