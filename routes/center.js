const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();


const {fetchMaan,fetchWork,fetchShuchok,fetchEkok,fetchShuchokMaan,expenseAddPost,expenseAdd,fetchExpenseCode,rajosshoAdd,rajosshoAddPost,
    fetchRajosshoCode,generatePdfMonthlyProgress,monthlyProgressEdit,monthlyProgressUpdate,monthlyProgress,monthlyProgressYear,
    monthlyProgressForm,monthlyProgressFormPost,charaKolomFixed,centersignup,centersignuppost,rajossho,rajosshoYear,rajosshoForm,
    rajosshoFormPost,expense,expenseYear,expenseForm,expenseFormPost,chak1,chak1Year,chak1Form,chak1FormPost,chak2,chak2Year,chak2Form,
    chak2FormPost,revolvingFund,revolvingFundYear,revolvingFundForm,revolvingFundFormPost,specialCoconut,specialCoconutYear,specialCoconutForm,
    specialCoconutFormPost,loan,loanYear,loanForm,loanFormPost,apa,apaYear,apaForm,apaFormPost,allcenter,centerlogin,centerloginpost,
    centerDashboard,topSheet,topSheetYear,topSheetForm,topSheetFormPost,center,centerEdit,centerEditPost,centerDelete,charaKolom,charaKolomYear,charaKolomForm,
    charaKolomFormPost,folMosholla,folMoshollaYear,folMoshollaForm,folMoshollaFormPost,winterVeg,winterVegYear,winterVegForm,fetchPodobiList,
    winterVegFormPost,summerVeg,summerVegYear,summerVegForm,summerVegFormPost,otherFlower,otherFlowerYear,otherFlowerForm,otherFlowerFormPost,
    seasonalFlower,seasonalFlowerYear,seasonalFlowerForm,seasonalFlowerFormPost,workerInfo,workerInfoYear,workerInfoForm,workerInfoFormPost,
    workerNum,workerNumYear,fetchSubCategory,fetchBiboron,fetchBreed} = require('../controllers/center.controller');


router.get('/',allcenter);
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
router.get('/centerEdit/:id',centerEdit);
router.post('/centerEditPost/:id',centerEditPost);
router.get('/centerDelete/:id',centerDelete);

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

router.get('/workerInfo',workerInfo);
router.post('/workerInfoYear',workerInfoYear);
router.get('/workerInfoForm',workerInfoForm);
router.post('/workerInfoForms',workerInfoFormPost);

router.get('/workerNum',workerNum);
router.post('/workerNumYear',workerNumYear);

router.get('/apa',apa);
router.post('/apaYear',apaYear);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);
router.post('/fetchMaan',fetchMaan);
router.post('/fetchWork',fetchWork);
router.post('/fetchShuchok',fetchShuchok);
router.post('/fetchEkok',fetchEkok);
router.post('/fetchShuchokMaan',fetchShuchokMaan);

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
router.post('/fetchPodobiList',fetchPodobiList);


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
router.get('/generatePdfMonthlyProgress',generatePdfMonthlyProgress);

router.get('/monthlyProgressEdit/:progressId/:editDate',monthlyProgressEdit)
router.post('/monthlyProgressUpdate/:progressId',monthlyProgressUpdate)

router.post('/fetchSubCategory',fetchSubCategory);
router.post('/fetchBiboron',fetchBiboron);
router.post('/fetchBreed',fetchBreed);
router.post('/monthlyProgressForms',monthlyProgressFormPost);


module.exports = router;