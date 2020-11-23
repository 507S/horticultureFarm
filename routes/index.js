var express = require('express');
var router = express.Router();

const db=require('../models');
const Op = db.Sequelize.Op;
const { fn, col, cast } = db.sequelize;
const monthlyProgress = db.monthlyProgress;

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
        const monthly_progress = await monthlyProgress.findAll();

        var startRange = "";
        var endRange = "";
        if ( res.locals.moment().format("M") < 7){
          startRange = "jul"+"-"+res.locals.moment().subtract(1, "year").format('yyyy')
          endRange = "jul"+"-"+res.locals.moment().format('yyyy')
        }else{
          startRange = "jul"+"-"+res.locals.moment().format('yyyy')
          endRange = "jul"+"-"+res.locals.moment().add(1, "year").format('yyyy')
        }

        var totalProduct = 0;
        var totalBitoron = 0;
        var totalMojud = 0;
        monthly_progress.forEach((row) => {
          const productTotalParse = JSON.parse(row.productionTotal);
          const bitoronParse = JSON.parse(row.bitoronTotal);
          const mojudParse = JSON.parse(row.mojud);
          productTotalParse.forEach((prodTotal)=> {
            if (prodTotal.startTime === startRange && prodTotal.endTime === endRange){
              totalProduct += parseInt(prodTotal.amount)
            }
          })
          bitoronParse.forEach((bitorTotal) => {
            if (bitorTotal.startTime === startRange && bitorTotal.endTime === endRange){
              totalBitoron += parseInt(bitorTotal.amount)
            }
          })
          mojudParse.forEach((mojuToal) => {
            if ( res.locals.moment( mojuToal.time ).isAfter(startRange) &&  res.locals.moment( mojuToal.time ).isBefore(endRange) ){
              totalMojud += parseInt(mojuToal.amount)
            }
          })
        })
        res.render('index', { title: 'Horticulture' ,totalProduction: totalProduct, totalBitoron: totalBitoron, totalMojud:totalMojud });
  }
  catch (e) {
      console.log(e)
  }
});

module.exports = router;
