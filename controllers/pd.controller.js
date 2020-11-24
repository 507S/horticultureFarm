const db=require('../models');
const center = db.center;
const pd = db.pd;
const centerInfo = db.centerInfo;
const topSheet = db.topSheet;
const charaKolom = db.charaKolom;
const folMosholla = db.folMosholla;
const otherFlower = db.otherFlower;
const seasonalFlower = db.seasonalFlower;
const summerVeg = db.summerVeg;
const winterVeg = db.winterVeg;
const regularWorker = db.regularWorker;
const irregularWorker = db.irregularWorker;
const apa = db.apa;
const loan = db.loan;
const specialCoconut = db.specialCoconut;
const revolvingFund = db.revolvingFund;
const chak1 = db.chak1;
const chak2 = db.chak2;
const rajossho = db.rajossho;
const expense = db.expense;
const monthlyProgress = db.monthlyProgress;
const cropCategory = db.cropcategory

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.centertable=async(req,res)=>{
    res.json({ message: "hello center" });
};

module.exports.allcenter=async(req,res)=>{
    res.json({ message: "hello center" });
};
module.exports.allCenterInfo=async(req,res)=>{
    await centerInfo.findAll()
    .then(data => {
        console.log(data);
        res.render('allCenterInfo', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('allCenterInfo', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })
};
module.exports.charaKolomFixed=async(req,res)=>{
    
    try {
        const charaKoloms= await charaKolom.findAll();
        const folMoshollas= await folMosholla.findAll();
        const winterVegs= await winterVeg.findAll();
        const otherFlowers= await otherFlower.findAll();
        const seasonalFlowers= await seasonalFlower.findAll();
        const summerVegs= await summerVeg.findAll();
        console.log("inside");
        res.render('charaKolomFixed', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'', record1: charaKoloms,record2: folMoshollas,record3:winterVegs ,record4: summerVegs,record5:otherFlowers  ,record6:seasonalFlowers  });
    }
    catch(err) {
        console.log("outside");
        res.render('charaKolomFixed', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'',record1: err,record2: err,record3: err,record4: err,record5: err,record6: err });
    }
    
};
module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'Horticulture Wing Central Management Software',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals.type);
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // center.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , center.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/center/dashboard');
        //             }
        //             else{
        //                 res.redirect('/center/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('center/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.pdDashboard = async(req,res) => {
    try{

        const crop = await cropCategory.findAll();


        const centerinfo = await center.findAll();
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

        res.render('pd/dashboard', { title: 'Horticulture Wing Central Management Software', msg:'Welcome' ,totalProduction: totalProduct, totalBitoron: totalBitoron, totalMojud:totalMojud, center:centerinfo, crop: crop });
    }
    catch (e) {
        console.log(e)
    }
};

module.exports.addSubcategory = async(req,res) => {
    const subcategory = await cropCategory.create({
        name : req.body.sub_category,
        parent_id : req.body.main_category,
        type : 'subCategory'
    })
    res.send(subcategory)
}

module.exports.addBiboron = async(req,res) => {
    const biboron = await cropCategory.create({
        name : req.body.biboron,
        parent_id : req.body.sub_category_list,
        type : 'biboron'
    })
    res.send(biboron)
}

module.exports.addJaat = async(req,res) => {
    const jaat = await cropCategory.create({
        name : req.body.sub_category,
        parent_id : req.body.main_category,
        type : 'jat'
    })
    res.send(jaat)
}

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'Horticulture Wing Central Management Software',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'Horticulture Wing Central Management Software',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'Horticulture Wing Central Management Software',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    })
                res.render('pd/signup',{title: 'Horticulture Wing Central Management Software',msg:'pd Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//topSheet controller
module.exports.topSheet=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/topSheet/topSheet', { title: 'টপশীট',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/topSheet/topSheet', { title: 'টপশীট',success:'', records: err });
    })
     
    //  records:result

};

module.exports.topSheetFilter=async(req,res)=>{
    await topSheet.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/topSheet/topSheetTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.topSheetForm=async(req,res)=>{
    res.render('pd/topSheet/topSheetForm', { title: 'টপশীট',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.topSheetFormPost=async(req,res)=>{
    var item= req.body.item;
    var target= req.body.target;
    var lproduction= req.body.lproduction;
    var cproduction= req.body.cproduction;
    var tproduction= req.body.tproduction;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await topSheet.create({
        item: item,
        target:target,
        lproduction:lproduction,
        cproduction:cproduction,
        tproduction:tproduction,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/topSheet');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//topSheet controller end

//center controller
module.exports.center=async(req,res)=>{
    await centerInfo.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/centerinfo/center', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/centerinfo/center', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.centerYear=async(req,res)=>{
    await centerInfo.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/centerinfo/centerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/centerinfo/centerYear', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })

};

module.exports.centerForm=async(req,res)=>{
    res.render('pd/centerinfo/centerForm', { title: 'সেন্টারের যোগাযোগ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.centerFormPost=async(req,res)=>{
    var center= req.body.center;
    var kormokorta= req.body.kormokorta;
    var podobi= req.body.podobi;
    var mobile= req.body.mobile;
    var email= req.body.email;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await centerInfo.create({
        center: center,
        kormokorta:kormokorta,
        podobi:podobi,
        mobile:mobile,
        email:email,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/center');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//center controller end

//charaKolom controller
module.exports.charaKolom=async(req,res)=>{
    await charaKolom.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/charaKolom/charaKolom', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/charaKolom/charaKolom', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.charaKolomYear=async(req,res)=>{
    await charaKolom.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/charaKolom/charaKolomTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/charaKolom/charaKolomYear', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',success:'', records: err });
    })

};

module.exports.charaKolomForm=async(req,res)=>{
    res.render('pd/charaKolomPrice/charaKolom/charaKolomForm', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.charaKolomFormPost=async(req,res)=>{
    var cname= req.body.cname;
    var shotero= req.body.shotero;
    var atharo= req.body.atharo;
    var unish= req.body.unish;
    var parbotto= req.body.parbotto;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await charaKolom.create({
        cname: cname,
        shotero:shotero,
        atharo:atharo,
        unish:unish,
        parbotto:parbotto,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/charaKolom');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//charaKolom controller end

//folMosholla controller
module.exports.folMosholla=async(req,res)=>{
    await folMosholla.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/folMosholla/folMosholla', { title: 'হরটিকালচার সেন্টারের ফল/মসলা ও শাক-সবজি বিক্রয় মূল্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/folMosholla/folMosholla', { title: 'হরটিকালচার সেন্টারের ফল/মসলা ও শাক-সবজি বিক্রয় মূল্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.folMoshollaYear=async(req,res)=>{
    await folMosholla.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/folMosholla/folMoshollaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/folMosholla/folMoshollaYear', { title: 'হরটিকালচার সেন্টারের ফল/মসলা ও শাক-সবজি বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.folMoshollaForm=async(req,res)=>{
    res.render('pd/charaKolomPrice/folMosholla/folMoshollaForm', { title: 'হরটিকালচার সেন্টারের ফল/মসলা ও শাক-সবজি বিক্রয় মূল্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.folMoshollaFormPost=async(req,res)=>{
    var item= req.body.item;
    var amount= req.body.amount;
    var shotero= req.body.shotero;
    var atharo= req.body.atharo;
    var unish= req.body.unish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await folMosholla.create({
        item: item,
        amount:amount,
        shotero:shotero,
        atharo:atharo,
        unish:unish,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/folMosholla');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//folMosholla controller end

//otherFlower controller
module.exports.otherFlower=async(req,res)=>{
    await otherFlower.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/otherFlower/otherFlower', { title: 'বিভিন্ন ফুল ও সুদৃশ্য গাছের চারা/কলমের বিক্রয় মূল্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/otherFlower/otherFlower', { title: 'বিভিন্ন ফুল ও সুদৃশ্য গাছের চারা/কলমের বিক্রয় মূল্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.otherFlowerYear=async(req,res)=>{
    await otherFlower.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/otherFlower/otherFlowerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/otherFlower/otherFlowerYear', { title: 'বিভিন্ন ফুল ও সুদৃশ্য গাছের চারা/কলমের বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.otherFlowerForm=async(req,res)=>{
    res.render('pd/charaKolomPrice/otherFlower/otherFlowerForm', { title: 'বিভিন্ন ফুল ও সুদৃশ্য গাছের চারা/কলমের বিক্রয় মূল্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.otherFlowerFormPost=async(req,res)=>{
    var item= req.body.item;
    var polyshotero= req.body.polyshotero;
    var tobshotero= req.body.tobshotero;
    var polyatharo= req.body.polyatharo;
    var tobatharo= req.body.tobatharo;
    var polyunish= req.body.polyunish;
    var tobunish= req.body.tobunish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    

    await otherFlower.create({
        item: item,
        polyshotero:polyshotero,
        tobshotero:tobshotero,
        polyatharo:polyatharo,
        tobatharo:tobatharo,
        polyunish:polyunish,
        tobunish:tobunish,
        year:year,
        center_id:user_id

        }).then(data => {
            console.log(data)
            res.redirect('/pd/otherFlower');
        }).catch(err => {
            console.log(err);
            res.render('errorpage',err);
        });
  
};
//otherFlower controller end

//seasonalFlower controller
module.exports.seasonalFlower=async(req,res)=>{
    await seasonalFlower.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlower', { title: 'মৌসুমী ফুল ও চারার বিক্রয় মূল্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlower', { title: 'মৌসুমী ফুল ও চারার বিক্রয় মূল্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.seasonalFlowerYear=async(req,res)=>{
    await seasonalFlower.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlowerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlowerYear', { title: 'মৌসুমী ফুল ও চারার বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.seasonalFlowerForm=async(req,res)=>{
    res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlowerForm', { title: 'মৌসুমী ফুল ও চারার বিক্রয় মূল্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seasonalFlowerFormPost=async(req,res)=>{
    var item= req.body.item;
    var poriman= req.body.poriman;
    var polyatharo= req.body.polyatharo;
    var bedatharo= req.body.bedatharo;
    var polyunish= req.body.polyunish;
    var bedunish= req.body.bedunish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await seasonalFlower.create({
        item: item,
        poriman:poriman,
        polyatharo:polyatharo,
        bedatharo:bedatharo,
        polyunish:polyunish,
        bedunish:bedunish,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/seasonalFlower');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//seasonalFlower controller end

//summerVeg controller
module.exports.summerVeg=async(req,res)=>{
    await center.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/summerVeg/summerVeg', { title: 'গ্রীষ্মকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/summerVeg/summerVeg', { title: 'গ্রীষ্মকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.summerVegYear=async(req,res)=>{
    await summerVeg.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/summerVeg/summerVegTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/summerVeg/summerVegYear', { title: 'গ্রীষ্মকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.summerVegForm=async(req,res)=>{
    res.render('pd/charaKolomPrice/summerVeg/summerVegForm', { title: 'গ্রীষ্মকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.summerVegFormPost=async(req,res)=>{
    var item= req.body.item;
    var doshatharo= req.body.doshatharo;
    var ekshoucchoatharo= req.body.ekshoucchoatharo;
    var ekshohybridatharo= req.body.ekshohybridatharo;
    var doshbijunish= req.body.doshbijunish;
    var ekshoucchounish= req.body.ekshoucchounish;
    var ekshohybridunish= req.body.ekshohybridunish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await summerVeg.create({
        item:item,
        doshatharo:doshatharo,
        ekshoucchoatharo:ekshoucchoatharo,
        ekshohybridatharo:ekshohybridatharo,
        doshbijunish:doshbijunish,
        ekshoucchounish:ekshoucchounish,
        ekshohybridunish:ekshohybridunish,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/summerVeg');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//summerVeg controller end

//winterVeg controller
module.exports.winterVeg=async(req,res)=>{

    await center.findAll({
        where: {center_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/winterVeg/winterVeg', { title: 'শীতকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/winterVeg/winterVeg', { title: 'শীতকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.winterVegYear=async(req,res)=>{
    await winterVeg.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/winterVeg/winterVegTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/winterVeg/winterVegYear', { title: 'শীতকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.winterVegForm=async(req,res)=>{
    res.render('pd/charaKolomPrice/winterVeg/winterVegForm', { title: 'শীতকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.winterVegFormPost=async(req,res)=>{
    var item= req.body.item;
    var doshatharo= req.body.doshatharo;
    var ekshoucchoatharo= req.body.ekshoucchoatharo;
    var ekshohybridatharo= req.body.ekshohybridatharo;
    var doshbijunish= req.body.doshbijunish;
    var ekshoucchounish= req.body.ekshoucchounish;
    var ekshohybridunish= req.body.ekshohybridunish;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await winterVeg.create({
        item: item,
        doshatharo:doshatharo,
        ekshoucchoatharo:ekshoucchoatharo,
        ekshohybridatharo:ekshohybridatharo,
        doshbijunish:doshbijunish,
        ekshoucchounish:ekshoucchounish,
        ekshohybridunish:ekshohybridunish,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/winterVeg');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//winterVeg controller end

//regularWorker controller

module.exports.regularWorker=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/worker/regularWorker/regularWorker', { title: 'নিয়মিত শ্রমিকের তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/worker/regularWorker/regularWorker', { title: 'নিয়মিত শ্রমিকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.regularWorkerFilter=async(req,res)=>{
    await regularWorker.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/worker/regularWorker/regularWorkerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.regularWorkerForm=async(req,res)=>{
    res.render('pd/worker/regularWorker/regularWorkerForm', { title: 'নিয়মিত শ্রমিকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.regularWorkerFormPost=async(req,res)=>{
    var name= req.body.name;
    var date= req.body.date;
    var nid= req.body.nid;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await regularWorker.create({
        name: name,
        date:date,
        nid:nid,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/regularWorker');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//regularWorker controller end

//irregularWorker controller

module.exports.irregularWorker=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/worker/irregularWorker/irregularWorker', { title: 'অনিয়মিত শ্রমিকের তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/worker/irregularWorker/irregularWorker', { title: 'অনিয়মিত শ্রমিকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.irregularWorkerFilter=async(req,res)=>{
    await irregularWorker.findAll({
        where: {year: req.body.year, center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/worker/irregularWorker/irregularWorkerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.irregularWorkerForm=async(req,res)=>{
    res.render('pd/worker/irregularWorker/irregularWorkerForm', { title: 'অনিয়মিত শ্রমিকের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.irregularWorkerFormPost=async(req,res)=>{
    var name= req.body.name;
    var date= req.body.date;
    var nid= req.body.nid;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await irregularWorker.create({
        name: name,
        date:date,
        nid:nid,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/irregularWorker');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//irregularWorker controller end

//apa controller
module.exports.apa=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        console.log("PDdashboard",res.locals.type,);
        console.log("apdadata chai",data);
        res.render('pd/apa/apa', { title: 'এপিএ',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/apa/apa', { title: 'এপিএ',success:'', records: err });
    })
     
    //  records:result

};
module.exports.apaFilter=async(req,res)=>{
    await apa.findAll({
        where: {center_id : req.body.center,year: req.body.year}
    })
    .then(data => {
        res.render('pd/apa/apaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.apaYear=async(req,res)=>{
    await apa.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/apa/apaTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/apa/apaYear', { title: 'এপিএ',success:'', records: err });
    })

};

module.exports.apaForm=async(req,res)=>{
    res.render('pd/apa/apaForm', { title: 'এপিএ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.apaFormPost=async(req,res)=>{
    var uddessho= req.body.uddessho;
    var maan= req.body.maan;
    var work= req.body.work;
    var shuchok= req.body.shuchok;
    var ekok= req.body.ekok;
    var shuchokMaan= req.body.shuchokMaan;
    var achievement1= req.body.achievement1;
    var achievement2= req.body.achievement2;
    var best= req.body.best;
    var otiUttam= req.body.otiUttam;
    var uttam= req.body.uttam;
    var cholti= req.body.cholti;
    var below= req.body.below;
    var firstThree= req.body.firstThree;
    var secondThree= req.body.secondThree;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await apa.create({
        uddessho: uddessho,
        maan:maan,
        work:work,
        shuchok: shuchok,
        ekok:ekok,
        shuchokMaan:shuchokMaan,
        achievement1: achievement1,
        achievement2:achievement2,
        best:best,
        otiUttam: otiUttam,
        uttam:uttam,
        cholti:cholti,
        below: below,
        firstThree:firstThree,
        secondThree:secondThree,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/apa');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//apa controller end

//loan controller

module.exports.loan=async(req,res)=>{
    await center.findAll()
    .then(data => {
        res.render('pd/loan/loan', { title: 'ঋণ বিতরণ ও আদায় এর অগ্রগতির প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/loan/loan', { title: 'ঋণ বিতরণ ও আদায় এর অগ্রগতির প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};
module.exports.loanFilter=async(req,res)=>{
    await loan.findAll({
        where: {center_id : req.body.center, year: req.body.year}
    })
    .then(data => {
        res.render('pd/loan/loanTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.loanForm=async(req,res)=>{
    res.render('pd/loan/loanForm', { title: 'ঋণ বিতরণ ও আদায় এর অগ্রগতির প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.loanFormPost=async(req,res)=>{
    var boraddo= req.body.boraddo;
    var bitoron1= req.body.bitoron1;
    var aday1= req.body.aday1;
    var left1= req.body.left1;
    var bitoron2= req.body.bitoron2;
    var aday2= req.body.aday2;
    var left2= req.body.left2;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await loan.create({
        boraddo: boraddo,
        bitoron1:bitoron1,
        aday1:aday1,
        left1: left1,
        bitoron2:bitoron2,
        aday2:aday2,
        left2: left2,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/loan');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//apa controller end

//specialCoconut controller

module.exports.specialCoconut=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/specialCoconut/specialCoconut', { title: 'বিশেষ নারিকেল কর্মসূচি',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/specialCoconut/specialCoconut', { title: 'বিশেষ নারিকেল কর্মসূচি',success:'', records: err });
    })
     
    //  records:result

};

module.exports.specialCoconutFilter=async(req,res)=>{
    await specialCoconut.findAll({
        where: {year: req.body.year, center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/specialCoconut/specialCoconutTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.specialCoconutForm=async(req,res)=>{
    res.render('pd/specialCoconut/specialCoconutForm', { title: 'বিশেষ নারিকেল কর্মসূচি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.specialCoconutFormPost=async(req,res)=>{
    var center= req.body.center;
    var boraddo= req.body.boraddo;
    var target= req.body.target;
    var boughtNarikel= req.body.boughtNarikel;
    var seedProduction= req.body.seedProduction;
    var deadSeed= req.body.deadSeed;
    var salableSeedTarget= req.body.salableSeedTarget;
    var salableSeedAchieved= req.body.salableSeedAchieved;
    var salableSeedPercentage= req.body.salableSeedPercentage;
    var salableSeedNumber= req.body.salableSeedNumber;
    var soldSeed= req.body.soldSeed;
    var soldSeedPrice= req.body.soldSeedPrice;
    var presentMojud= req.body.presentMojud;
    var earnedMoneyDD= req.body.earnedMoneyDD;
    var earnedMoneyDate= req.body.earnedMoneyDate;
    var earnedMoneyHead= req.body.earnedMoneyHead;
    var earnedMoneyLocalBank= req.body.earnedMoneyLocalBank;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await specialCoconut.create({
        center: center,
        boraddo:boraddo,
        target:target,
        boughtNarikel: boughtNarikel,
        seedProduction:seedProduction,
        deadSeed:deadSeed,
        salableSeedTarget: salableSeedTarget,
        salableSeedAchieved:salableSeedAchieved,
        salableSeedPercentage:salableSeedPercentage,
        salableSeedNumber: salableSeedNumber,
        soldSeed:soldSeed,
        soldSeedPrice:soldSeedPrice,
        presentMojud: presentMojud,
        earnedMoneyDD:earnedMoneyDD,
        earnedMoneyDate:earnedMoneyDate,
        earnedMoneyHead: earnedMoneyHead,
        earnedMoneyLocalBank:earnedMoneyLocalBank,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/specialCoconut');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//specialCoconut controller end

//revolvingFund controller
module.exports.revolvingFund=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/revolvingFund/revolvingFund', { title: 'রিভলভিং ফান্ড',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/revolvingFund/revolvingFund', { title: 'রিভলভিং ফান্ড',success:'', records: err });
    })
     
    //  records:result

};

module.exports.revolvingFundFilter=async(req,res)=>{
    await revolvingFund.findAll({
        where: {year: req.body.year, center_id: req.body.center}
    })
    .then(data => {
        res.render('pd/revolvingFund/revolvingFundTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.revolvingFundForm=async(req,res)=>{
    res.render('pd/revolvingFund/revolvingFundForm', { title: 'রিভলভিং ফান্ড',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.revolvingFundFormPost=async(req,res)=>{
    var prapti= req.body.prapti;
    var presentOrtho= req.body.presentOrtho;
    var pastOrtho= req.body.pastOrtho;
    var totalOrtho= req.body.totalOrtho;
    var bank= req.body.bank;
    var soldPast= req.body.soldPast;
    var soldPresent= req.body.soldPresent;
    var soldTotal= req.body.soldTotal;
    var chara= req.body.chara;
    var productionTarget= req.body.productionTarget;
    var productionPast= req.body.productionPast;
    var productionPresent= req.body.productionPresent;
    var productionTotal= req.body.productionTotal;
    var bitoronPast= req.body.bitoronPast;
    var bitoronPresent= req.body.bitoronPresent;
    var bitoronDead= req.body.bitoronDead;
    var bitoronTotal= req.body.bitoronTotal;
    var totalMojud= req.body.totalMojud;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await revolvingFund.create({
        prapti: prapti,
        presentOrtho:presentOrtho,
        pastOrtho:pastOrtho,
        totalOrtho: totalOrtho,
        bank:bank,
        soldPast:soldPast,
        soldPresent: soldPresent,
        soldTotal:soldTotal,
        chara: chara,
        productionTarget:productionTarget,
        productionPast:productionPast,
        productionPresent: productionPresent,
        productionTotal:productionTotal,
        bitoronPast:bitoronPast,
        bitoronPresent: bitoronPresent,
        bitoronDead:bitoronDead,
        bitoronTotal: bitoronTotal,
        totalMojud:totalMojud,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/revolvingFund');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//revolvingFund controller end

//specialCoconut controller
module.exports.chak1=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/employee/chak1/employeeChak1', { title: 'ক্যাডার/নন ক্যাডার কর্মকর্তাদের নাম ও পদবী সহ শূন্য পদের তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/employee/chak1/employeeChak1', { title: 'ক্যাডার/নন ক্যাডার কর্মকর্তাদের নাম ও পদবী সহ শূন্য পদের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.chak1Filter=async(req,res)=>{
    await chak1.findAll({
        where: {year: req.body.year, center_id: req.session.user_id}
    })
    .then(data => {
        res.render('pd/employee/chak1/employeeChak1Table', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/employee/chak1/employeeChak1Year', { title: 'ক্যাডার/নন ক্যাডার কর্মকর্তাদের নাম ও পদবী সহ শূন্য পদের তথ্য',success:'', records: err });
    })

};

module.exports.chak1Form=async(req,res)=>{
    res.render('pd/employee/chak1/employeeChak1Form', { title: 'ক্যাডার/নন ক্যাডার কর্মকর্তাদের নাম ও পদবী সহ শূন্য পদের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.chak1FormPost=async(req,res)=>{
    var center= req.body.center;
    var porichito= req.body.porichito;
    var kormokorta= req.body.kormokorta;
    var nijDistrict= req.body.nijDistrict;
    var podobi= req.body.podobi;
    var birthDate= req.body.birthDate;
    var firstdate= req.body.firstdate;
    var presentDate= req.body.presentDate;
    var pastWorkstation= req.body.pastWorkstation;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await chak1.create({
        center: center,
        porichito:porichito,
        kormokorta:kormokorta,
        nijDistrict: nijDistrict,
        podobi:podobi,
        birthDate:birthDate,
        firstdate: firstdate,
        presentDate:presentDate,
        pastWorkstation:pastWorkstation,
        comment: comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/chak1');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//chak1 controller end

//chak2 controller
module.exports.chak2=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/employee/chak2/employeeChak2', { title: 'হরটিকালচার সেন্টারের কর্মকতা/কর্মচারীদের মঞ্জুরীকৃত পদ ও শুণ্য পদের সংখ্যা',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/employee/chak2/employeeChak2', { title: 'হরটিকালচার সেন্টারের কর্মকতা/কর্মচারীদের মঞ্জুরীকৃত পদ ও শুণ্য পদের সংখ্যা',success:'', records: err });
    })
     
    //  records:result

};

module.exports.chak2Filter=async(req,res)=>{
    await chak2.findAll({
        where: {year: req.body.year, center_id: req.body.center}
    })
    .then(data => {
        res.render('pd/employee/chak2/employeeChak2Table', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.chak2Form=async(req,res)=>{
    res.render('pd/employee/chak2/employeeChak2Form', { title: 'হরটিকালচার সেন্টারের কর্মকতা/কর্মচারীদের মঞ্জুরীকৃত পদ ও শুণ্য পদের সংখ্যা',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.chak2FormPost=async(req,res)=>{
    var name= req.body.name;
    var grade= req.body.grade;
    var pod= req.body.pod;
    var working= req.body.working;
    var shunno= req.body.shunno;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await chak2.create({
        name: name,
        grade:grade,
        pod:pod,
        working: working,
        shunno:shunno,
        comment:comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/chak2');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//chak2 controller end

//rajossho controller
module.exports.rajossho=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/rajossho/rajossho', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির হিসাব',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/rajossho/rajossho', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির হিসাব',success:'', records: err });
    })
     
    //  records:result

};

module.exports.rajosshoFilter=async(req,res)=>{
    await rajossho.findAll({
        where: {year: req.body.year, center_id: req.body.center}
    })
    .then(data => {
        res.render('pd/rajossho/rajosshoTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.rajosshoForm=async(req,res)=>{
    res.render('pd/rajossho/rajosshoForm', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির হিসাব',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.rajosshoFormPost=async(req,res)=>{
    var code= req.body.code;
    var upokhat= req.body.upokhat;
    var july1= req.body.july1;
    var august1= req.body.august1;
    var sept1= req.body.sept1;
    var oct1= req.body.oct1;
    var nov1= req.body.nov1;
    var dec1= req.body.dec1;
    var jan2= req.body.jan2;
    var feb2= req.body.feb2;
    var march2= req.body.march2;
    var apr2= req.body.apr2;
    var may2= req.body.may2;
    var june2= req.body.june2;
    var total= req.body.total;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await rajossho.create({
        code: code,
        upokhat:upokhat,
        july1:july1,
        august1: august1,
        sept1:sept1,
        oct1:oct1,
        nov1: nov1,
        dec1:dec1,
        jan2:jan2,
        feb2: feb2,
        march2:march2,
        apr2: apr2,
        may2:may2,
        june2:june2,
        total: total,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/rajossho');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//rajossho controller end

//expense controller
module.exports.expense=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/expense/expense', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/expense/expense', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী',success:'', records: err });
    })
     
    //  records:result

};

module.exports.expenseFilter=async(req,res)=>{
    await expense.findAll({
        where: {year: req.body.year,center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/expense/expenseTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.expenseForm=async(req,res)=>{
    res.render('pd/expense/expenseForm', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.expenseFormPost=async(req,res)=>{
    var code= req.body.code;
    var khat= req.body.khat;
    var boraddo= req.body.boraddo;
    var july1= req.body.july1;
    var august1= req.body.august1;
    var sept1= req.body.sept1;
    var oct1= req.body.oct1;
    var nov1= req.body.nov1;
    var dec1= req.body.dec1;
    var jan2= req.body.jan2;
    var feb2= req.body.feb2;
    var march2= req.body.march2;
    var apr2= req.body.apr2;
    var may2= req.body.may2;
    var june2= req.body.june2;
    var total= req.body.total;
    var baki= req.body.baki;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await expense.create({
        code: code,
        khat:khat,
        boraddo:boraddo,
        july1:july1,
        august1: august1,
        sept1:sept1,
        oct1:oct1,
        nov1: nov1,
        dec1:dec1,
        jan2:jan2,
        feb2: feb2,
        march2:march2,
        apr2: apr2,
        may2:may2,
        june2:june2,
        total: total,
        baki:baki,
        comment: comment,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/expense');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//expense controller end

//monthlyProgress controller

module.exports.monthlyProgress=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/monthlyProgress/monthlyProgress', { title: 'মাসিক প্রতিবেদন',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/monthlyProgress/monthlyProgress', { title: 'মাসিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.monthlyProgressFilter=async(req,res)=>{
    await monthlyProgress.findAll({
        where: {year: req.body.year, center_id : req.body.center}
    })
    .then(data => {
        res.render('pd/monthlyProgress/monthlyProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })

};

module.exports.monthlyProgressForm=async(req,res)=>{
    res.render('pd/monthlyProgress/monthlyProgressForm', { title: 'মাসিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.monthlyProgressFormPost=async(req,res)=>{
    var category= req.body.category;
    var subCategory= req.body.subCategory;
    var biboron= req.body.biboron;
    var breed= req.body.breed;
    var productionTarget= req.body.productionTarget;
    var productionCurrent= req.body.productionCurrent;
    var productionLast= req.body.productionLast;
    var productionTotal= req.body.productionTotal;
    var daePrapti= req.body.daePrapti;
    var lastYear= req.body.lastYear;
    var grandTotalProduction= req.body.grandTotalProduction; 
    var bitotonCurrentMonth= req.body.bitotonCurrentMonth;
    var bitotonLastMonth= req.body.bitotonLastMonth;
    var bitoronTotal= req.body.bitoronTotal;
    var daeProdan= req.body.daeProdan;
    var deadWriteup= req.body.deadWriteup;
    var grandTotalBitoron= req.body.grandTotalBitoron;
    var mojud= req.body.mojud;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;
console.log('productionTotal=',productionTotal);
    await monthlyProgress.create({
        category: category,
        subCategory:subCategory,
        biboron:biboron,
        breed:breed,
        productionTarget: productionTarget,
        productionCurrent:productionCurrent,
        productionLast:productionLast,
        productionTotal: productionTotal,
        daePrapti:daePrapti,
        lastYear:lastYear,
        grandTotalProduction: grandTotalProduction,
        bitotonCurrentMonth:bitotonCurrentMonth,
        bitotonLastMonth: bitotonLastMonth,
        bitoronTotal:bitoronTotal,
        daeProdan:daeProdan,
        deadWriteup: deadWriteup,
        grandTotalBitoron:grandTotalBitoron,
        mojud:mojud,
        comment: comment,
        year:year,
        center_id:user_id

        }).then(data => {
            console.log('productionTotal=',productionTotal);
            res.redirect('/pd/monthlyProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};

//monthlyProgress controller end