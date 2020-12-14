const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {apaUddessho,apaMaan,karjokrom,suchok,ekok,suchokMaan,newKhorochCode,newRajosshoCode,addMainCategory,centerDelete,centerEdit,centerEditPost,
    addSubcategory,addBiboron,addJaat,monthlyProgress,monthlyProgressFilter,expenseEdit,expenseEditPost,expenseDelete,
    charaKolomFixed,pdsignup,pdsignuppost,rajossho,rajosshoFilter,rajosshoForm,rajosshoFormPost,newRajosshoCodeTable,
    newRajosshoCodeTableEdit,newRajosshoCodeTableDelete,newRajosshoCodeTableEditPost,expense,expenseFilter,newKhorochTable,newKhorochTableEdit,newKhorochTableEditPost,newKhorochTableDelete,
    expenseForm,expenseFormPost,chak1,chak1Filter,chak1Form,chak1FormPost,chak2,chak2Filter,chak2Form,chak2FormPost,revolvingFund,
    revolvingFundFilter,revolvingFundForm,revolvingFundFormPost,specialCoconut,specialCoconutFilter,specialCoconutForm,rajosshoEdit,rajosshoEditPost,rajosshoDelete,
    specialCoconutFormPost,loan,loanFilter,loanForm,loanFormPost,apa,apaFilter,apaYear,apaForm,apaFormPost,allcenter,pdlogin,
    pdloginpost,pdDashboard,topSheet,topSheetFilter,center,centerYear,newPodobiTable,newPodobiEdit,newPodobiEditPost,newPodobiDelete,newPodobi,
    charaKolomEdit,charaKolomEditPost,charaKolomDelete,winterVegEdit,winterVegEditPost,winterVegDelete,summerVegEdit,summerVegEditPost,summerVegDelete,
    otherFlowerEdit,otherFlowerEditPost,otherFlowerDelete,seasonalFlowerEdit,seasonalFlowerEditPost,seasonalFlowerDelete,
    charaKolom,charaKolomYear,folMoshollaEdit,folMoshollaEditPost,folMoshollaDelete,newcropCategoryList,newcropCategoryListPost,newcropCategoryListEdit,
    charaKolomForm,charaKolomFormPost,folMosholla,folMoshollaYear,folMoshollaForm,folMoshollaFormPost,winterVeg,winterVegYear,winterVegForm,
    winterVegFormPost,summerVeg,summerVegYear,summerVegForm,summerVegFormPost,otherFlower,otherFlowerYear,otherFlowerForm,otherFlowerFormPost,
    seasonalFlower,seasonalFlowerYear,seasonalFlowerForm,seasonalFlowerFormPost,workerInfo,workerInfoFilter,workerInfoForm,
    workerInfoFormPost,workerNum,workerNumFilter,monthlyProgressEdit,monthlyProgressUpdate} = require('../controllers/pd.controller');

router.get('/',allcenter);

router.post('/add/mainCategory',addMainCategory);
router.post('/add/subcategory',addSubcategory);
router.post('/add/biboron',addBiboron);
router.post('/add/jaat',addJaat);

router.get('/charaKolomFixed',charaKolomFixed);
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);

router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/topSheet',topSheet);
router.post('/topSheetFilter',topSheetFilter);

router.get('/center',center);
router.post('/centerYear',centerYear);
router.get('/centerEdit/:id',centerEdit);
router.post('/centerEditPost/:id',centerEditPost);
router.get('/centerDelete/:id',centerDelete);
// router.get('/centerForm',centerForm);
// router.post('/centerForms',centerFormPost);

router.get('/charaKolom',charaKolom);
router.post('/charaKolomYear',charaKolomYear);
router.get('/charaKolomForm',charaKolomForm);
router.post('/charaKolomForms',charaKolomFormPost);
router.get('/charaKolomEdit/:id',charaKolomEdit);
router.post('/charaKolomEditPost/:id',charaKolomEditPost);
router.get('/charaKolomDelete/:id',charaKolomDelete);

router.get('/folMosholla',folMosholla);
router.post('/folMoshollaYear',folMoshollaYear);
router.get('/folMoshollaForm',folMoshollaForm);
router.post('/folMoshollaForms',folMoshollaFormPost);
router.get('/folMoshollaEdit/:id',folMoshollaEdit);
router.post('/folMoshollaEditPost/:id',folMoshollaEditPost);
router.get('/folMoshollaDelete/:id',folMoshollaDelete);


router.get('/winterVeg',winterVeg);
router.post('/winterVegYear',winterVegYear);
router.get('/winterVegForm',winterVegForm);
router.post('/winterVegForms',winterVegFormPost);
router.get('/winterVegEdit/:id',winterVegEdit);
router.post('/winterVegEditPost/:id',winterVegEditPost);
router.get('/winterVegDelete/:id',winterVegDelete);

router.get('/summerVeg',summerVeg);
router.post('/summerVegYear',summerVegYear);
router.get('/summerVegForm',summerVegForm);
router.post('/summerVegForms',summerVegFormPost);
router.get('/summerVegEdit/:id',summerVegEdit);
router.post('/summerVegEditPost/:id',summerVegEditPost);
router.get('/summerVegDelete/:id',summerVegDelete);

router.get('/otherFlower',otherFlower);
router.post('/otherFlowerYear',otherFlowerYear);
router.get('/otherFlowerForm',otherFlowerForm);
router.post('/otherFlowerForms',otherFlowerFormPost);
router.get('/otherFlowerEdit/:id',otherFlowerEdit);
router.post('/otherFlowerEditPost/:id',otherFlowerEditPost);
router.get('/otherFlowerDelete/:id',otherFlowerDelete);

router.get('/seasonalFlower',seasonalFlower);
router.post('/seasonalFlowerYear',seasonalFlowerYear);
router.get('/seasonalFlowerForm',seasonalFlowerForm);
router.post('/seasonalFlowerForms',seasonalFlowerFormPost);
router.get('/seasonalFlowerEdit/:id',seasonalFlowerEdit);
router.post('/seasonalFlowerEditPost/:id',seasonalFlowerEditPost);
router.get('/seasonalFlowerDelete/:id',seasonalFlowerDelete);

router.get('/workerInfo',workerInfo);
router.post('/workerInfoFilter',workerInfoFilter);
router.get('/workerInfoForm',workerInfoForm);
router.post('/workerInfoForms',workerInfoFormPost);
router.post('/newPodobi',newPodobi);
router.get('/newPodobiTable',newPodobiTable);
router.get('/newPodobiEdit/:id',newPodobiEdit);
router.post('/newPodobiEditPost/:id',newPodobiEditPost);
router.get('/newPodobiDelete/:id',newPodobiDelete);

router.get('/workerNum',workerNum);
router.post('/workerNumFilter',workerNumFilter);

router.get('/apa',apa);
router.post('/apaFilter',apaFilter);
router.post('/apaYear',apaYear);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);

router.post('/apaUddessho',apaUddessho);
router.post('/apaMaan',apaMaan);
router.post('/karjokrom',karjokrom);
router.post('/suchok',suchok);
router.post('/ekok',ekok);
router.post('/suchokMaan',suchokMaan);

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
router.get('/rajosshoEdit/:id',rajosshoEdit);
router.post('/rajosshoEditPost/:id',rajosshoEditPost);
router.get('/rajosshoDelete/:id',rajosshoDelete);
router.get('/newRajosshoCodeTable',newRajosshoCodeTable);
router.post('/newRajosshoCode',newRajosshoCode);
router.get('/newRajosshoCodeTableEdit/:id',newRajosshoCodeTableEdit);
router.post('/newRajosshoCodeTableEditPost/:id',newRajosshoCodeTableEditPost);
router.get('/newRajosshoCodeTableDelete/:id',newRajosshoCodeTableDelete);


router.get('/expense',expense);
router.post('/expenseFilter',expenseFilter);
router.get('/expenseForm',expenseForm);
router.post('/expenseForms',expenseFormPost);
router.get('/expenseEdit/:id',expenseEdit);
router.post('/expenseEditPost/:id',expenseEditPost);
router.get('/expenseDelete/:id',expenseDelete);
router.post('/newKhorochCode',newKhorochCode);
router.get('/newKhorochTable',newKhorochTable);
router.get('/newKhorochTableEdit/:id',newKhorochTableEdit);
router.post('/newKhorochTableEditPost/:id',newKhorochTableEditPost);
router.get('/newKhorochTableDelete/:id',newKhorochTableDelete);

router.get('/monthlyProgress',monthlyProgress);
router.post('/monthlyProgressFilter',monthlyProgressFilter);

router.get('/monthlyProgressEdit/:progressId/:editDate',monthlyProgressEdit)
router.post('/monthlyProgressUpdate/:progressId',monthlyProgressUpdate)

router.get('/newcropCategoryList',newcropCategoryList);
router.post('/newcropCategoryListPost/:id',newcropCategoryListPost);
router.get('/newcropCategoryListEdit/:id',newcropCategoryListEdit);

module.exports = router;