const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {apaUddessho,apaMaan,karjokrom,suchok,ekok,suchokMaan,newKhorochCode,newRajosshoCode,addMainCategory,centerDelete,centerEdit,centerEditPost,
    addSubcategory,addBiboron,addJaat,monthlyProgress,monthlyProgressFilter,expenseEdit,expenseEditPost,expenseDelete,centerPasswordEdit,centerPasswordEditPost,
    charaKolomFixed,pdsignup,pdsignuppost,rajossho,rajosshoFilter,rajosshoForm,rajosshoFormPost,newRajosshoCodeTable,adminInfo,adminInfoEdit,adminInfoEditPost,
    newRajosshoCodeTableEdit,newRajosshoCodeTableDelete,newRajosshoCodeTableEditPost,expense,expenseFilter,newKhorochTable,newKhorochTableEdit,newKhorochTableEditPost,newKhorochTableDelete,
    expenseForm,expenseFormPost,chak1,chak1Filter,chak1Form,chak1FormPost,chak2,chak2Filter,chak2Form,chak2FormPost,revolvingFund,newKhorochCodeForm,
    revolvingFundFilter,revolvingFundForm,revolvingFundFormPost,specialCoconut,specialCoconutFilter,specialCoconutForm,rajosshoEdit,rajosshoEditPost,rajosshoDelete,
    specialCoconutFormPost,loan,loanFilter,loanForm,loanFormPost,apa,apaFilter,apaForm,apaFormPost,apaEdit, apaEditPost, allcenter,pdlogin,newRajosshoCodeForm,chak1Delete,chak2Delete,
    pdloginpost,pdDashboard,topSheet,topSheetFilter,topSheetBitoron,topSheetBitoronFilter,center,centerYear,newPodobiTable,newPodobiEdit,newPodobiEditPost,newPodobiDelete,newPodobi,dashImageDelete,
    charaKolomEdit,charaKolomEditPost,charaKolomDelete,winterVegEdit,winterVegEditPost,winterVegDelete,summerVegEdit,summerVegEditPost,summerVegDelete,generatePdfexpense,
    otherFlowerEdit,otherFlowerEditPost,otherFlowerDelete,seasonalFlowerEdit,seasonalFlowerEditPost,seasonalFlowerDelete,podobiListForm,cropCategoryTable,
    charaKolom,folMoshollaEdit,folMoshollaEditPost,folMoshollaDelete,newcropCategoryList,newcropCategoryListPost,newcropCategoryListEdit,chak1Edit,chak1EditPost,chak2Edit,chak2EditPost,
    charaKolomForm,charaKolomFormPost,folMosholla,folMoshollaForm,folMoshollaFormPost,winterVeg,winterVegForm,dashImageForm,dashImageFormPost,gonona,
    winterVegFormPost,summerVeg,summerVegForm,summerVegFormPost,otherFlower,otherFlowerForm,otherFlowerFormPost,generatePdfworkerInfo,generatePdfworkerNum,generatePdfapa,generatePdfloan,generatePdfspecialCoconut,generatePdfrevolvingFund,generatePdfchak1,generatePdfchak2,generatePdfrajossho,
    seasonalFlower,seasonalFlowerForm,seasonalFlowerFormPost,workerInfo,workerInfoFilter,workerInfoForm,apaCategoryTable,uploaddashImage,workerInfoDelete,apaCodeEditPost,apaCodeEdit,apaCodeDelete,
    generatePdfcharaKolom,generatePdffolMosholla,generatePdfwinterVeg,generatePdfsummerVeg,generatePdfotherFlower,generatePdfseasonalFlower,newcropCategoryListDelete,
    workerInfoFormPost,workerNum,workerNumFilter,monthlyProgressEdit,monthlyProgressUpdate,monthlyProgressDelete,generatePdfMonthlyProgress,generatePdfTopSheet,generatePdfTopSheetBitoron,generatePdfcenter, apaDelete, loanEdit, loanEditPost,loanDelete, revolvingFundEdit, revolvingFundEditPost, revolvingFundDelete} = require('../controllers/pd.controller');


router.get('/',allcenter);

router.post('/add/mainCategory',addMainCategory);
router.post('/add/subcategory',addSubcategory);
router.post('/add/biboron',addBiboron);
router.post('/add/jaat',addJaat);

router.get('/charaKolomFixed',charaKolomFixed);
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);
router.get('/dashImageForm',dashImageForm);
router.post('/dashImageFormPost',uploaddashImage,dashImageFormPost);
router.get('/dashImageDelete/:id',dashImageDelete);

router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/topSheet',topSheet);
router.post('/topSheetFilter',topSheetFilter);
router.post('/generatePdfTopSheet',generatePdfTopSheet);

router.get('/topSheetBitoron',topSheetBitoron);
router.post('/topSheetBitoronFilter',topSheetBitoronFilter);
router.post('/generatePdfTopSheetBitoron',generatePdfTopSheetBitoron);

router.get('/center',center);
router.post('/centerYear',centerYear);
router.get('/centerEdit/:id',centerEdit);
router.post('/centerEditPost/:id',centerEditPost);
router.get('/centerDelete/:id',centerDelete);
router.get('/centerPasswordEdit/:id',centerPasswordEdit);
router.post('/centerPasswordEditPost/:id',centerPasswordEditPost);
router.post('/generatePdfcenter',generatePdfcenter);

router.get('/adminInfo',adminInfo);
router.get('/adminInfoEdit/:id',adminInfoEdit);
router.post('/adminInfoEditPost/:id',adminInfoEditPost);

router.get('/charaKolom',charaKolom);
router.get('/charaKolomForm',charaKolomForm);
router.post('/charaKolomForms',charaKolomFormPost);
router.get('/charaKolomEdit/:id',charaKolomEdit);
router.post('/charaKolomEditPost/:id',charaKolomEditPost);
router.get('/charaKolomDelete/:id',charaKolomDelete);
router.post('/generatePdfcharaKolom',generatePdfcharaKolom);

router.get('/folMosholla',folMosholla);
router.get('/folMoshollaForm',folMoshollaForm);
router.post('/folMoshollaForms',folMoshollaFormPost);
router.get('/folMoshollaEdit/:id',folMoshollaEdit);
router.post('/folMoshollaEditPost/:id',folMoshollaEditPost);
router.get('/folMoshollaDelete/:id',folMoshollaDelete);
router.post('/generatePdffolMosholla',generatePdffolMosholla);

router.get('/winterVeg',winterVeg);
router.get('/winterVegForm',winterVegForm);
router.post('/winterVegForms',winterVegFormPost);
router.get('/winterVegEdit/:id',winterVegEdit);
router.post('/winterVegEditPost/:id',winterVegEditPost);
router.get('/winterVegDelete/:id',winterVegDelete);
router.post('/generatePdfwinterVeg',generatePdfwinterVeg);

router.get('/summerVeg',summerVeg);
router.get('/summerVegForm',summerVegForm);
router.post('/summerVegForms',summerVegFormPost);
router.get('/summerVegEdit/:id',summerVegEdit);
router.post('/summerVegEditPost/:id',summerVegEditPost);
router.get('/summerVegDelete/:id',summerVegDelete);
router.post('/generatePdfsummerVeg',generatePdfsummerVeg);

router.get('/otherFlower',otherFlower);
router.get('/otherFlowerForm',otherFlowerForm);
router.post('/otherFlowerForms',otherFlowerFormPost);
router.get('/otherFlowerEdit/:id',otherFlowerEdit);
router.post('/otherFlowerEditPost/:id',otherFlowerEditPost);
router.get('/otherFlowerDelete/:id',otherFlowerDelete);
router.post('/generatePdfotherFlower',generatePdfotherFlower);

router.get('/seasonalFlower',seasonalFlower);
router.get('/seasonalFlowerForm',seasonalFlowerForm);
router.post('/seasonalFlowerForms',seasonalFlowerFormPost);
router.get('/seasonalFlowerEdit/:id',seasonalFlowerEdit);
router.post('/seasonalFlowerEditPost/:id',seasonalFlowerEditPost);
router.get('/seasonalFlowerDelete/:id',seasonalFlowerDelete);
router.post('/generatePdfseasonalFlower',generatePdfseasonalFlower);

router.get('/workerInfo',workerInfo);
router.post('/workerInfoFilter',workerInfoFilter);
router.get('/workerInfoForm',workerInfoForm);
router.post('/workerInfoForms',workerInfoFormPost);
router.get('/workerInfoDelete/:id',workerInfoDelete);
router.post('/newPodobi',newPodobi);
router.get('/newPodobiTable',newPodobiTable);
router.get('/podobiListForm',podobiListForm);
router.get('/newPodobiEdit/:id',newPodobiEdit);
router.post('/newPodobiEditPost/:id',newPodobiEditPost);
router.get('/newPodobiDelete/:id',newPodobiDelete);
router.post('/generatePdfworkerInfo',generatePdfworkerInfo);

router.get('/workerNum',workerNum);
router.post('/workerNumFilter',workerNumFilter);
router.post('/generatePdfworkerNum',generatePdfworkerNum);

router.get('/apa',apa);
router.post('/apaFilter',apaFilter);
router.get('/apaForm',apaForm);
router.post('/apaForms',apaFormPost);
router.get('/apaEdit/:id', apaEdit);
router.post('/apaEditPost/:id', apaEditPost);
router.get('/apaDelete/:id', apaDelete);
router.post('/apaUddessho',apaUddessho);
router.post('/apaMaan',apaMaan);
router.post('/karjokrom',karjokrom);
router.post('/suchok',suchok);
router.post('/ekok',ekok);
router.post('/gonona',gonona);
router.post('/suchokMaan',suchokMaan);
router.get('/apaCategoryTable',apaCategoryTable);
router.post('/generatePdfapa',generatePdfapa);
router.post('/apaCodeEditPost/:id',apaCodeEditPost);
router.get('/apaCodeEdit/:id',apaCodeEdit);
router.get('/apaCodeDelete/:id',apaCodeDelete)

router.get('/loan',loan);
router.post('/loanFilter',loanFilter);
router.get('/loanForm',loanForm);
router.post('/loanForms',loanFormPost);
router.get('/loanEdit/:id',loanEdit);
router.post('/loanEditPost/:id',loanEditPost);
router.get('/loanDelete/:id',loanDelete);
router.post('/generatePdfloan',generatePdfloan);

router.get('/specialCoconut',specialCoconut);
router.post('/specialCoconutFilter',specialCoconutFilter);
router.get('/specialCoconutForm',specialCoconutForm);
router.post('/specialCoconutForms',specialCoconutFormPost);
router.post('/generatePdfspecialCoconut',generatePdfspecialCoconut);

router.get('/revolvingFund',revolvingFund);
router.post('/revolvingFundFilter',revolvingFundFilter);
router.get('/revolvingFundForm',revolvingFundForm);
router.post('/revolvingFundForms',revolvingFundFormPost);
router.get('/revolvingFundEdit/:id',revolvingFundEdit);
router.post('/revolvingFundEditPost/:id',revolvingFundEditPost);
router.get('/revolvingFundDelete/:id',revolvingFundDelete);
router.post('/generatePdfrevolvingFund',generatePdfrevolvingFund);

router.get('/chak1',chak1);
router.post('/chak1Filter',chak1Filter);
router.get('/chak1Form',chak1Form);
router.post('/chak1Forms',chak1FormPost);
router.get('/chak1Edit/:id',chak1Edit);
router.post('/chak1EditPost/:id',chak1EditPost);
router.get('/chak1Delete/:id',chak1Delete);
router.post('/generatePdfchak1',generatePdfchak1);

router.get('/chak2',chak2);
router.post('/chak2Filter',chak2Filter);
router.get('/chak2Form',chak2Form);
router.post('/chak2Forms',chak2FormPost);
router.get('/chak2Edit/:id',chak2Edit);
router.post('/chak2EditPost/:id',chak2EditPost);
router.get('/chak2Delete/:id',chak2Delete);
router.post('/generatePdfchak2',generatePdfchak2);

router.get('/rajossho',rajossho);
router.post('/rajosshoFilter',rajosshoFilter);
router.get('/rajosshoForm',rajosshoForm);
router.post('/rajosshoForms',rajosshoFormPost);
router.get('/rajosshoEdit/:id',rajosshoEdit);
router.post('/rajosshoEditPost/:id',rajosshoEditPost);
router.get('/rajosshoDelete/:id',rajosshoDelete);
router.get('/newRajosshoCodeTable',newRajosshoCodeTable);
router.get('/newRajosshoCodeForm',newRajosshoCodeForm);
router.post('/newRajosshoCode',newRajosshoCode);
router.get('/newRajosshoCodeTableEdit/:id',newRajosshoCodeTableEdit);
router.post('/newRajosshoCodeTableEditPost/:id',newRajosshoCodeTableEditPost);
router.get('/newRajosshoCodeTableDelete/:id',newRajosshoCodeTableDelete);
router.post('/generatePdfrajossho',generatePdfrajossho);

router.get('/expense',expense);
router.post('/expenseFilter',expenseFilter);
router.get('/expenseForm',expenseForm);
router.post('/expenseForms',expenseFormPost);
router.get('/expenseEdit/:id',expenseEdit);
router.post('/expenseEditPost/:id',expenseEditPost);
router.get('/expenseDelete/:id',expenseDelete);
router.post('/newKhorochCode',newKhorochCode);
router.get('/newKhorochTable',newKhorochTable);
router.get('/newKhorochCodeForm',newKhorochCodeForm);
router.get('/newKhorochTableEdit/:id',newKhorochTableEdit);
router.post('/newKhorochTableEditPost/:id',newKhorochTableEditPost);
router.get('/newKhorochTableDelete/:id',newKhorochTableDelete);
router.post('/generatePdfexpense',generatePdfexpense);

router.get('/monthlyProgress',monthlyProgress);
router.post('/monthlyProgressFilter',monthlyProgressFilter);
router.post('/generatePdfMonthlyProgress',generatePdfMonthlyProgress);

router.get('/monthlyProgressEdit/:progressId/:editDate',monthlyProgressEdit)
router.post('/monthlyProgressUpdate/:progressId',monthlyProgressUpdate)
router.get('/monthlyProgressDelete/:progressId/:selectedDate',monthlyProgressDelete)

router.get('/cropCategoryTable',cropCategoryTable);
router.get('/newcropCategoryList',newcropCategoryList);
router.post('/newcropCategoryListPost/:id',newcropCategoryListPost);
router.get('/newcropCategoryListEdit/:id',newcropCategoryListEdit);
router.get('/newcropCategoryListDelete/:id',newcropCategoryListDelete)
module.exports = router;