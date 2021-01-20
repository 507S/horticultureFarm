var express = require('express');
var router = express.Router();

const db=require('../models');
const Op = db.Sequelize.Op;
const { fn, col, cast } = db.sequelize;
const monthlyProgress = db.monthlyProgress;
const rajossho = db.rajossho;
const center  = db.center;
const cropcategory  = db.cropcategory;


/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
        const centerinfo = await center.findAll();
        const biboronList = await cropcategory.findAll({
            where: {
                type: 'biboron'
            }
        });
        const jaatList = await cropcategory.findAll({
              where: {
                  type: 'jat'
              }
        });
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
          // mojudParse.forEach((mojuToal) => {
          //   if ( res.locals.moment( mojuToal.time ).isAfter(startRange) &&  res.locals.moment( mojuToal.time ).isBefore(endRange) ){
          //     totalMojud += parseInt(mojuToal.amount)
          //   }
          // })
        })
        res.render('index', { title: 'Horticulture' ,totalProduction: totalProduct, totalBitoron: totalBitoron,  center: centerinfo, biboron: biboronList, breed: jaatList });
  }
  catch (e) {
      console.log(e)
  }
});

router.post('/centerData', async (req,res) => {
    var monthly_progress = [];
    if (req.body.center === "all"){
        monthly_progress = await monthlyProgress.findAll();
    }else{
        monthly_progress = await monthlyProgress.findAll({
            where:{
                center_id : req.body.center
            }
        });
    }
    var total_rajossho = [];
    if (req.body.center === "all"){
      total_rajossho = await rajossho.findAll();
    }else{
      total_rajossho = await rajossho.findAll({
            where:{
                center_id : req.body.center
            }
        });
    }


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
    var totalrajossho = 0;
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
        // mojudParse.forEach((mojuToal) => {
        //     if ( res.locals.moment( mojuToal.time ).isAfter(startRange) &&  res.locals.moment( mojuToal.time ).isBefore(endRange) ){
        //         totalMojud += parseInt(mojuToal.amount)
        //     }
        // })
    });
    total_rajossho.forEach((row) => {
      totalrajossho += parseInt(row.total)
      
  });
    // res.send({title: 'Horticulture' ,totalProduction: totalProduct, totalBitoron: totalBitoron, totalMojud:totalMojud, center: centerinfo });
    res.json({title: 'Horticulture',totalProduction: totalProduct, totalBitoron: totalBitoron,totalrajossho:totalrajossho })
})

router.post('/findMojud', async(req,res) => {
    var monthly_progress = [];
    if (req.body.center === "all"){
        monthly_progress = await monthlyProgress.findAll();
    }else{
        monthly_progress = await monthlyProgress.findAll({
            where:{
                center_id : req.body.center,
                biboron : req.body.biboron,
                breed : req.body.breed
            }
        });
    }

    // console.log("mojud find 1", monthly_progress, req.body.center, req.body.biboron, req.body.breed, monthly_progress.length)

    var total_rajossho = [];
    if (req.body.center === "all"){
        total_rajossho = await rajossho.findAll();
    }else{
        total_rajossho = await rajossho.findAll({
            where:{
                center_id : req.body.center
            }
        });
    }


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
    var totalrajossho = 0;
    monthly_progress.forEach((row) => {
        const productTotalParse = JSON.parse(row.productionTotal);
        const bitoronParse = JSON.parse(row.bitoronTotal);
        // const mojudParse = JSON.parse(row.mojud);
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

    });
    total_rajossho.forEach((row) => {
        totalrajossho += parseInt(row.total)

    });
    // res.send({title: 'Horticulture' ,totalProduction: totalProduct, totalBitoron: totalBitoron, totalMojud:totalMojud, center: centerinfo });
    res.json({title: 'Horticulture',totalProduction: totalProduct, totalBitoron: totalBitoron,totalrajossho:totalrajossho })
})

module.exports = router;
