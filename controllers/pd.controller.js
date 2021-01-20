const db=require('../models');
const center = db.center;
const pd = db.pd;
const charaKolom = db.charaKolom;
const folMosholla = db.folMosholla;
const otherFlower = db.otherFlower;
const seasonalFlower = db.seasonalFlower;
const summerVeg = db.summerVeg;
const winterVeg = db.winterVeg;
const workerInfo = db.workerInfo;
const apa = db.apa;
const apaCode = db.apaCode;
const loan = db.loan;
const specialCoconut = db.specialCoconut;
const revolvingFund = db.revolvingFund;
const chak1 = db.chak1;
const chak2 = db.chak2;
const rajossho = db.rajossho;
const rajosshoCode = db.rajosshoCode;
const expenseCode = db.expenseCode;
const expense = db.expense;
const monthlyProgress = db.monthlyProgress;
const cropCategory = db.cropcategory;
const podobiList = db.podobiList;
const dashImages = db.dashImage;

const multer = require("multer");
const path = require("path");

//multer setup for dashImage image
var storagedashImage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/dashImageGallery');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });  
var uploaddashImage = multer({
    storage: storagedashImage,
 }).single("dashImage");
 exports.uploaddashImage=uploaddashImage;
 //multer setup for dashImage image ends

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
    res.render('pd/login', { title: 'Horticulture Wing Center Management Software',msg:'' });
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
                        return res.status(200).render('pd/login', { title: 'Horticulture Wing Center Management Software',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'Horticulture Wing Center Management Software',msg:'Please provide a username and password' });
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
        //         return res.status(200).render('center/login', { title: 'Horticulture Wing Center Management Software',msg:'Please provide a username and password' });
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
        const dashImage = await dashImages.findAll()
        const crop = await cropCategory.findAll();
        const centerinfo = await center.findAll();
        const monthly_progress = await monthlyProgress.findAll();
        const rajosshos = await rajossho.findAll();
        const apaCodes = await apaCode.findAll();
        const expenseCodess = await expenseCode.findAll();
        const rajosshoCodess = await rajosshoCode.findAll();
        const podobiListss = await podobiList.findAll();

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
        rajosshos.forEach((row) => {
            totalrajossho += parseInt(row.total)
            
        });


        res.render('pd/dashboard', { title: 'Horticulture Wing Center Management Software', msg:'Welcome' ,dashImage:dashImage,podobiLists:podobiListss,rajosshoCodes:rajosshoCodess,expenseCodes:expenseCodess,totalrajossho:totalrajossho, totalProduction: totalProduct, totalBitoron: totalBitoron,  center:centerinfo, crop: crop,apaCodes:apaCodes });

    }
    catch (e) {
        console.log(e)
    }
};

module.exports.addMainCategory = async(req,res) => {
    const mainCategory = await cropCategory.create({
        name : req.body.mainCatg,
        parent_id : null,
        type : 'mainCategory'
    })
    res.redirect('/pd/dashboard')
}

module.exports.addSubcategory = async(req,res) => {
    const subcategory = await cropCategory.create({
        name : req.body.sub_category,
        parent_id : req.body.main_category,
        type : 'subCategory'
    })
    res.redirect('/pd/dashboard')
}

module.exports.addBiboron = async(req,res) => {
    const biboron = await cropCategory.create({
        name : req.body.biboron,
        parent_id : req.body.sub_category_list,
        type : 'biboron'
    })
    res.redirect('/pd/dashboard')
}

module.exports.addJaat = async(req,res) => {
    const jaat = await cropCategory.create({
        name : req.body.jaat,
        parent_id : req.body.biboron_list,
        type : 'jat'
    })
    res.redirect('/pd/dashboard')
}

module.exports.apaUddessho = async(req,res) => {
    const apaUddessho = await apaCode.create({
        name : req.body.apaUddessho,
        parent_id : null,
        type : 'apaUddessho'
    })
    res.redirect('/pd/dashboard')
}

module.exports.apaMaan = async(req,res) => {
    const apaMaan = await apaCode.create({
        name : req.body.apaMaan,
        parent_id : req.body.apaUddessho,
        type : 'apaMaan'
    })
    res.redirect('/pd/dashboard')
}

module.exports.karjokrom = async(req,res) => {
    const karjokrom = await apaCode.create({
        name : req.body.karjokrom,
        parent_id : req.body.apaMaan,
        type : 'karjokrom'
    })
    res.redirect('/pd/dashboard')
}

module.exports.suchok = async(req,res) => {
    const suchok = await apaCode.create({
        name : req.body.suchok,
        parent_id : req.body.karjokrom,
        type : 'suchok'
    })
    res.redirect('/pd/dashboard')
}

module.exports.ekok = async(req,res) => {
    const ekok = await apaCode.create({
        name : req.body.ekok,
        parent_id : req.body.suchok,
        type : 'ekok'
    })
    res.redirect('/pd/dashboard')
}
module.exports.suchokMaan = async(req,res) => {
    const suchokMaan = await apaCode.create({
        name : req.body.suchokMaan,
        parent_id : req.body.suchok,
        type : 'suchokMaan'
    })
    res.redirect('/pd/dashboard')
}


//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'Horticulture Wing Center Management Software',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'Horticulture Wing Center Management Software',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'Horticulture Wing Center Management Software',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    })
                res.render('pd/signup',{title: 'Horticulture Wing Center Management Software',msg:'pd Registered Successfully!'})
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
};

module.exports.topSheetFilter=async(req,res)=>{
    try{
        const selectedDate = req.body.year.toLowerCase();
        var data = []
        const cropCatg = await cropCategory.findAll({
            where: {
                type: 'subCategory'
            }
        })
        if (req.body.center === "all"){
            const topSheets = await monthlyProgress.findAll()
            topSheets.map((monthlyProg) => {
                const timeList = JSON.parse(monthlyProg.timeFrame)
                timeList.map((eachTime) => {
                    if (eachTime.time === selectedDate){
                        data.push(monthlyProg);
                    }
                })
            })

            res.render('pd/topSheet/topSheetTable', {records: data , cropCatg:cropCatg} ,function(err, html) {
                res.send(html);
            });
        }else{
            const topSheets = await monthlyProgress.findAll({
                where: {center_id: req.body.center}
            })
            topSheets.map((monthlyProg) => {
                const timeList = JSON.parse(monthlyProg.timeFrame)
                timeList.map((eachTime) => {
                    if (eachTime.time === selectedDate){
                        data.push(monthlyProg);
                    }
                })
            })
            res.render('pd/topSheet/topSheetTable', {records: data , cropCatg:cropCatg} ,function(err, html) {
                res.send(html);
            });
        }

    }
    catch (e) {
        console.log(e);
    }

};

//topSheet controller end

//center controller
module.exports.center=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside",data);
        res.render('pd/centerInfo/center', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log(err);
        res.render('pd/centerInfo/center', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.centerYear=async(req,res)=>{
    await center.findAll()
    .then(data => {
        res.render('pd/centerInfo/centerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/centerInfo/centerYear', { title: 'সেন্টারের যোগাযোগ তথ্য',success:'', records: err });
    })

};
module.exports.centerEdit=async(req,res)=>{
    await center.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/centerInfo/centerEdit', { title: 'সেন্টারের যোগাযোগ তথ্য ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/centerInfo/centerEdit', { title: 'সেন্টারের যোগাযোগ তথ্য ফর্ম',success:'', records: err });
    })
};
module.exports.centerEditPost=async(req,res)=>{
    var centers = req.body.center;
    var kormokorta= req.body.kormokorta;
    var podobi = req.body.podobi;
    var mobile= req.body.mobile;
    var email = req.body.email;

    await center.update({ 
        center:centers,
        kormokorta:kormokorta,
        podobi:podobi,
        mobile:mobile,
        email:email,
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/center');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.centerDelete=async(req,res)=>{
    var centerDelete = await center.findByPk(req.params.id);
    try {
        centerDelete.destroy();
        res.redirect("/pd/center");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
module.exports.centerPasswordEdit=async(req,res)=>{
    await center.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/centerInfo/centerPasswordEdit', { title: 'সেন্টারের যোগাযোগ তথ্য ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/centerInfo/centerPasswordEdit', { title: 'সেন্টারের যোগাযোগ তথ্য ফর্ম',success:'', records: err });
    })
};
module.exports.centerPasswordEditPost=async(req,res)=>{
    var password = req.body.password;
    var uname = req.body.uname;
    const hashedPassword = await bcrypt.hash(password, 10);
    await center.update({ 
        uname:uname,
        password:hashedPassword
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        console.log("data",data);
        res.redirect('/pd/center');
    }).catch(err => {
        console.log(err);
    });
};
//adminInfo controller
module.exports.adminInfo=async(req,res)=>{
    await pd.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/adminInfo/adminInfo', { title: 'সেন্ট্রাল এডমিন তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log(err);
        res.render('pd/adminInfo/adminInfo', { title: 'সেন্ট্রাল এডমিন তথ্য ফর্ম',success:'', records: err });
    })
     
    //  records:result

};
module.exports.adminInfoEdit=async(req,res)=>{
    await pd.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/adminInfo/adminInfoEdit', { title: 'সেন্ট্রাল এডমিন তথ্য ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/adminInfo/adminInfoEdit', { title: 'সেন্ট্রাল এডমিন তথ্য ফর্ম',success:'', records: err });
    })
};
module.exports.adminInfoEditPost=async(req,res)=>{
    var password = req.body.password;
    var uname = req.body.uname;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pd.update({ 
        uname:uname,
        password:hashedPassword
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/adminInfo');
    }).catch(err => {
        console.log(err);
    });
};

//charaKolom controller
module.exports.charaKolom=async(req,res)=>{
    await charaKolom.findAll()
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
        where: {year: req.body.year}
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
    await cropCategory.findAll({
        where: {type:"jat"}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/charaKolom/charaKolomForm', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য',msg:'' ,success:'',records:data});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.charaKolomFormPost=async(req,res)=>{
    var cname= req.body.cname;
    var cholti= req.body.cholti;
    var parbotto= req.body.parbotto;
    var year =req.body.year;

    await charaKolom.create({
        cname: cname,
        cholti:cholti,
        parbotto:parbotto,
        year:year,

        }).then(data => {
            res.redirect('/pd/charaKolom');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.charaKolomEdit=async(req,res)=>{
    await charaKolom.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/charaKolom/charaKolomEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/charaKolom/charaKolomEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: err });
    })
};
module.exports.charaKolomEditPost=async(req,res)=>{
    var cname= req.body.cname;
    var cholti= req.body.cholti;
    var parbotto= req.body.parbotto;
    await charaKolom.update({ 
        cname: cname,
        cholti:cholti,
        parbotto:parbotto,
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/charaKolom');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.charaKolomDelete=async(req,res)=>{
    var charaKolomDelete = await charaKolom.findByPk(req.params.id);
    try {
        charaKolomDelete.destroy();
        res.redirect("/pd/charaKolom");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//charaKolom controller end

//folMosholla controller
module.exports.folMosholla=async(req,res)=>{
    await folMosholla.findAll()
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
        where: {year: req.body.year}
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
    await cropCategory.findAll({
        where: {type:"jat"}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/folMosholla/folMoshollaForm', { title: 'হরটিকালচার সেন্টারের ফল/মসলা ও শাক-সবজি বিক্রয় মূল্য',msg:'' ,success:'',records:data});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.folMoshollaFormPost=async(req,res)=>{
    var item= req.body.item;
    var amount= req.body.amount;
    var cholti= req.body.cholti;
    var year =req.body.year;

    await folMosholla.create({
        item: item,
        amount:amount,
        cholti:cholti,
        year:year,

        }).then(data => {
            res.redirect('/pd/folMosholla');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.folMoshollaEdit=async(req,res)=>{
    await folMosholla.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/folMosholla/folMoshollaEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/folMosholla/folMoshollaEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: err });
    })
};
module.exports.folMoshollaEditPost=async(req,res)=>{
    var item= req.body.item;
    var amount= req.body.amount;
    var cholti= req.body.cholti;
    await folMosholla.update({ 
        item: item,
        amount:amount,
        cholti:cholti,

    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/folMosholla');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.folMoshollaDelete=async(req,res)=>{
    var folMoshollaDelete = await folMosholla.findByPk(req.params.id);
    try {
        folMoshollaDelete.destroy();
        res.redirect("/pd/folMosholla");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//folMosholla controller end

//otherFlower controller
module.exports.otherFlower=async(req,res)=>{
    await otherFlower.findAll()
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
        where: {year: req.body.year}
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
    await cropCategory.findAll({
        where: {type:"jat"}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/otherFlower/otherFlowerForm', { title: 'বিভিন্ন ফুল ও সুদৃশ্য গাছের চারা/কলমের বিক্রয় মূল্য',msg:'' ,success:'',records:data});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.otherFlowerFormPost=async(req,res)=>{
    var item= req.body.item;
    var polycholti= req.body.polycholti;
    var tobcholti= req.body.tobcholti;
    var year =req.body.year;

    

    await otherFlower.create({
        item: item,
        polycholti:polycholti,
        tobcholti:tobcholti,
        year:year,

        }).then(data => {
            console.log(data)
            res.redirect('/pd/otherFlower');
        }).catch(err => {
            console.log(err);
            res.render('errorpage',err);
        });
  
};
module.exports.otherFlowerEdit=async(req,res)=>{
    await otherFlower.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/otherFlower/otherFlowerEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/otherFlower/otherFlowerEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: err });
    })
};
module.exports.otherFlowerEditPost=async(req,res)=>{
    var item= req.body.item;
    var polycholti= req.body.polycholti;
    var tobcholti= req.body.tobcholti;
    await otherFlower.update({ 
        item: item,
        polycholti:polycholti,
        tobcholti:tobcholti,
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/otherFlower');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.otherFlowerDelete=async(req,res)=>{
    var otherFlowerDelete = await otherFlower.findByPk(req.params.id);
    try {
        otherFlowerDelete.destroy();
        res.redirect("/pd/otherFlower");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//otherFlower controller end

//seasonalFlower controller
module.exports.seasonalFlower=async(req,res)=>{
    await seasonalFlower.findAll()
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
        where: {year: req.body.year}
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
    await cropCategory.findAll({
        where: {type:"jat"}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlowerForm', { title: 'মৌসুমী ফুল ও চারার বিক্রয় মূল্য',msg:'' ,success:'',records:data});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.seasonalFlowerFormPost=async(req,res)=>{
    var item= req.body.item;
    var poriman= req.body.poriman;
    var polycholti= req.body.polycholti;
    var bedcholti= req.body.bedcholti;
    var year =req.body.year;

    await seasonalFlower.create({
        item: item,
        poriman:poriman,
        polycholti:polycholti,
        bedcholti:bedcholti,
        year:year,

        }).then(data => {
            res.redirect('/pd/seasonalFlower');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.seasonalFlowerEdit=async(req,res)=>{
    await seasonalFlower.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlowerEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/seasonalFlower/seasonalFlowerEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: err });
    })
};
module.exports.seasonalFlowerEditPost=async(req,res)=>{
    var item= req.body.item;
    var poriman= req.body.poriman;
    var polycholti= req.body.polycholti;
    var bedcholti= req.body.bedcholti;
    await seasonalFlower.update({ 
        item: item,
        poriman:poriman,
        polycholti:polycholti,
        bedcholti:bedcholti,
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/seasonalFlower');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.seasonalFlowerDelete=async(req,res)=>{
    var seasonalFlowerDelete = await seasonalFlower.findByPk(req.params.id);
    try {
        seasonalFlowerDelete.destroy();
        res.redirect("/pd/seasonalFlower");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//seasonalFlower controller end

//summerVeg controller
module.exports.summerVeg=async(req,res)=>{
    await summerVeg.findAll()
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
        where: {year: req.body.year}
    })
    .then(data => {
        console.log("inside",data);

        res.render('pd/charaKolomPrice/summerVeg/summerVegTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/summerVeg/summerVegYear', { title: 'গ্রীষ্মকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.summerVegForm=async(req,res)=>{
    await cropCategory.findAll({
        where: {type:"jat"}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/summerVeg/summerVegForm', { title: 'গ্রীষ্মকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',msg:'' ,success:'',records:data});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.summerVegFormPost=async(req,res)=>{
    var item= req.body.item;
    var doshcholti= req.body.doshcholti;
    var ekshoucchocholti= req.body.ekshoucchocholti;
    var ekshohybridcholti= req.body.ekshohybridcholti;
    var year =req.body.year;

    await summerVeg.create({
        item:item,
        doshcholti:doshcholti,
        ekshoucchocholti:ekshoucchocholti,
        ekshohybridcholti:ekshohybridcholti,
        year:year,

        }).then(data => {
            res.redirect('/pd/summerVeg');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.summerVegEdit=async(req,res)=>{
    await summerVeg.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/summerVeg/summerVegEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/summerVeg/summerVegEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: err });
    })
};
module.exports.summerVegEditPost=async(req,res)=>{
    var item= req.body.item;
    var doshcholti= req.body.doshcholti;
    var ekshoucchocholti= req.body.ekshoucchocholti;
    var ekshohybridcholti= req.body.ekshohybridcholti;
    await summerVeg.update({ 
        item:item,
        doshcholti:doshcholti,
        ekshoucchocholti:ekshoucchocholti,
        ekshohybridcholti:ekshohybridcholti,

    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/summerVeg');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.summerVegDelete=async(req,res)=>{
    var summerVegDelete = await summerVeg.findByPk(req.params.id);
    try {
        summerVegDelete.destroy();
        res.redirect("/pd/summerVeg");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//summerVeg controller end

//winterVeg controller
module.exports.winterVeg=async(req,res)=>{

    await winterVeg.findAll()
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
        where: {year: req.body.year}
    })
    .then(data => {
        console.log("inside",data);
        res.render('pd/charaKolomPrice/winterVeg/winterVegTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/charaKolomPrice/winterVeg/winterVegYear', { title: 'শীতকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',success:'', records: err });
    })

};

module.exports.winterVegForm=async(req,res)=>{
    await cropCategory.findAll({
        where: {type:"jat"}
    })
    .then(data => {
        res.render('pd/charaKolomPrice/winterVeg/winterVegForm', { title: 'শীতকালীন সবজি ও অন্যান্য বীজের/চারার বিক্রয় মূল্য',msg:'' ,success:'',records:data});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.winterVegFormPost=async(req,res)=>{
    var item= req.body.item;
    var doshcholti= req.body.doshcholti;
    var ekshoucchocholti= req.body.ekshoucchocholti;
    var ekshohybridcholti= req.body.ekshohybridcholti;
    var year =req.body.year;

    await winterVeg.create({
        item: item,
        doshcholti:doshcholti,
        ekshoucchocholti:ekshoucchocholti,
        ekshohybridcholti:ekshohybridcholti,
        year:year,

        }).then(data => {
            res.redirect('/pd/winterVeg');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.winterVegEdit=async(req,res)=>{
    await winterVeg.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/charaKolomPrice/winterVeg/winterVegEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/charaKolomPrice/winterVeg/winterVegEdit', { title: 'হরটিকালচার সেন্টারের চারা/কলমের বিক্রয়মূল্য ফর্ম',success:'', records: err });
    })
};
module.exports.winterVegEditPost=async(req,res)=>{
    var item= req.body.item;
    var doshcholti= req.body.doshcholti;
    var ekshoucchocholti= req.body.ekshoucchocholti;
    var ekshohybridcholti= req.body.ekshohybridcholti;
    await winterVeg.update({ 
        item:item,
        doshcholti:doshcholti,
        ekshoucchocholti:ekshoucchocholti,
        ekshohybridcholti:ekshohybridcholti,

    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/winterVeg');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.winterVegDelete=async(req,res)=>{
    var winterVegDelete = await winterVeg.findByPk(req.params.id);
    try {
        winterVegDelete.destroy();
        res.redirect("/pd/winterVeg");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//winterVeg controller end

//workerInfo controller

module.exports.workerInfo=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/worker/workerInfo/workerInfo', { title: 'শ্রমিকদের তথ্য',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/worker/workerInfo/workerInfo', { title: 'শ্রমিকদের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.workerInfoFilter=async(req,res)=>{
    if (req.body.center === "all") {
        console.log("resss")
        await workerInfo.findAll({
            where: {year: req.body.year,month:req.body.month}
        })
        .then(data => {
            res.render('pd/worker/workerInfo/workerInfoTable', {records: data} ,function(err, html) {
                res.send(html);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
    await workerInfo.findAll({
        where: {year: req.body.year,center_id : req.body.center,month:req.body.month}
    })
    .then(data => {
        res.render('pd/worker/workerInfo/workerInfoTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })
    }
};

module.exports.workerInfoForm=async(req,res)=>{
    res.render('pd/worker/workerInfo/workerInfoForm', { title: 'শ্রমিকদের তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.workerInfoFormPost=async(req,res)=>{
    var name= req.body.name;
    var date= req.body.date;
    var nid= req.body.nid;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await workerInfo.create({
        name: name,
        date:date,
        nid:nid,
        year:year,
        center_id:user_id

        }).then(data => {
            res.redirect('/pd/workerInfo');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.newPodobiTable=async(req,res)=>{
    await podobiList.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/newPodobi/podobiList', { title: 'কর্মকর্তা কর্মচারীদের পদবী ও গ্রেডের তালিকা',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/newPodobi/podobiList', { title: 'কর্মকর্তা কর্মচারীদের পদবী ও গ্রেডের তালিকা',success:'', records: err });
    })
     
    //  records:result

};
module.exports.newPodobiEdit=async(req,res)=>{
    await podobiList.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/newPodobi/podobiListEdit', { title: 'কর্মকর্তা কর্মচারীদের পদবী ও গ্রেডের তালিকা',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/newPodobi/podobiListEdit', { title: 'কর্মকর্তা কর্মচারীদের পদবী ও গ্রেডের তালিকা',success:'', records: err });
    })
};
module.exports.podobiListForm=async(req,res)=>{
        res.render('pd/newPodobi/podobiListForm', { title: 'কর্মকর্তা কর্মচারীদের পদবী ও গ্রেডের তালিকা ফর্ম',msg:'' ,success:''});

};
module.exports.newPodobiEditPost=async(req,res)=>{
    var podobi = req.body.podobi;
    var grade= req.body.grade;
    await podobiList.update({ 
        podobi:podobi,
        grade:grade
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/newPodobiTable');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.newPodobiDelete=async(req,res)=>{
    var newPodobiDelete = await podobiList.findByPk(req.params.id);
    try {
        newPodobiDelete.destroy();
        res.redirect("/pd/newPodobiTable");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
//workerInfo controller end

//workerInfo controller

module.exports.workerNum=async(req,res)=>{
    await center.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/worker/workerNum/workerNum', { title: 'শ্রমিকদের সংখ্যা',success:'', centers: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/worker/workerNum/workerNum', { title: 'শ্রমিকদের সংখ্যা',success:'', records: err });
    })
     
    //  records:result

};

module.exports.workerNumFilter=async(req,res)=>{
    if (req.body.center === "all") {
        console.log("resss")
        await workerInfo.findAll({
            where: {year: req.body.year,month: req.body.month}
        })
        .then(data => {
            console.log("inside");
            var reg=0;
            var irreg=0;
            data.forEach(function(row){
                if(row.regularWorker !== 0){
                    reg+=1;
                };
            });
            data.forEach(function(row){
                if(row.irregularWorker !== 0){
                    irreg+=1;
                };
            });
            var total;
            total = reg+irreg;
            res.render('pd/worker/workerNum/workerNumTable', { title: 'শ্রমিকদের সংখ্যা',success:'', totals:total,regs: reg,irregs:irreg,records:data });
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
    await workerInfo.findAll({
        where: {center_id: req.body.center,year: req.body.year,month: req.body.month}
    })
    .then(data => {
        console.log("inside");
        var reg=0;
        var irreg=0;
        data.forEach(function(row){
            if(row.regularWorker !== 0){
                reg+=1;
            };
        });
        data.forEach(function(row){
            if(row.irregularWorker !== 0){
                irreg+=1;
            };
        });
        var total;
        total = reg+irreg;
        res.render('pd/worker/workerNum/workerNumTable', { title: 'শ্রমিকদের সংখ্যা',success:'', totals:total,regs: reg,irregs:irreg,records:data });
    })
    .catch(err => {
        console.log(err);
    })
    }
};

//workerNum controller end

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
module.exports.apaCategoryTable=async(req,res)=>{
    await apaCode.findAll()
    .then(data => {
        res.render('pd/apa/apaCategoryTable', { title: 'এপিএ',success:'', apaCodes: data });
    })
    .catch(err => {
        console.log(err);
    })
     

    //  records:result

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
    if (req.body.center === "all") {
        await chak1.findAll({
            where: {year: req.body.year,month:req.body.month}
        })
        .then(data => {
            res.render('pd/employee/chak1/employeeChak1Table', {records: data} ,function(err, html) {
                res.send(html);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
    await chak1.findAll({
        where: {year: req.body.year,center_id : req.body.center,month:req.body.month}
    })
    .then(data => {
        res.render('pd/employee/chak1/employeeChak1Table', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })
    }
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
    if (req.body.center === "all") {
        await chak2.findAll({
            where: {year: req.body.year,month:req.body.month}
        })
        .then(data => {
            res.render('pd/employee/chak2/employeeChak2Table', {records: data} ,function(err, html) {
                res.send(html);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
    await chak2.findAll({
        where: {year: req.body.year,center_id : req.body.center,month:req.body.month}
    })
    .then(data => {
        res.render('pd/employee/chak2/employeeChak2Table', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log(err);
    })
    }
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
module.exports.rajosshoEdit=async(req,res)=>{
    await rajossho.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/rajossho/rajosshoEdit', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির হিসাব ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/rajossho/rajosshoEdit', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির হিসাব ফর্ম',success:'', records: err });
    })
};
module.exports.rajosshoEditPost=async(req,res)=>{
    var july1=req.body.july1;
    var august1=req.body.august1;
    var sept1=req.body.sept1;
    var oct1=req.body.oct1;
    var nov1=req.body.nov1;
    var dec1=req.body.dec1;
    var jan2=req.body.jan2;
    var feb2=req.body.feb2;
    var march2=req.body.march2;
    var apr2=req.body.apr2;
    var may2=req.body.may2;
    var june2=req.body.june2;
    var comment=req.body.comment;
    var user_id=req.body.user_id;
    if(july1==null){        
        july1=0;
    };
    if(august1==null){
        august1=0;
    };
    if(sept1==null){
        sept1=0;
    };
    if(oct1==null){
        oct1=0;
    };
    if(nov1==null){
        nov1=0;
    };
    if(dec1==null){
        dec1=0;
    };
    if(jan2==null){
        jan2=0;
    };
    if(feb2==null){
        feb2=0;
    };
    if(march2==null){
        march2=0;
    };
    if(apr2==null){
        apr2=0;
    };
    if(may2==null){
        may2=0;
    };
    if(june2==null){
        june2=0;
    };
    var boraddo= parseInt(boraddo);
    var july1= parseInt(july1);
    var august1= parseInt(august1);
    var sept1= parseInt(sept1);
    var oct1= parseInt(oct1);
    var nov1= parseInt(nov1);
    var dec1= parseInt(dec1);
    var jan2= parseInt(jan2);
    var feb2= parseInt(feb2);
    var march2= parseInt(march2);
    var apr2= parseInt(apr2);
    var may2= parseInt(may2);
    var june2= parseInt(june2);
    var total= july1+august1+sept1+oct1+nov1+dec1+jan2+feb2+march2+apr2+may2+june2;
    await rajossho.update({ 
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
        comment: comment,
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/rajossho');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.rajosshoDelete=async(req,res)=>{
    var rajosshoDelete = await rajossho.findByPk(req.params.id);
    try {
        rajosshoDelete.destroy();
        res.redirect("/pd/rajossho");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
module.exports.newRajosshoCodeTable=async(req,res)=>{
    await rajosshoCode.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/rajossho/newRajosshoCodeTable', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/rajossho/newRajosshoCodeTable', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'', records: err });
    })
     
    //  records:result
    
};
module.exports.newRajosshoCodeForm=async(req,res)=>{
        res.render('pd/rajossho/newRajosshoCodeForm', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',msg:'' ,success:''});
};
module.exports.newRajosshoCodeTableEdit=async(req,res)=>{
    await rajosshoCode.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/rajossho/newRajosshoCodeTableEdit', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/rajossho/newRajosshoCodeTableEdit', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'', records: err });
    })
};
module.exports.newRajosshoCodeTableEditPost=async(req,res)=>{
    var code = req.body.code;
    var upokhat= req.body.upokhat;
    await rajosshoCode.update({ 
        code:code,
        upokhat:upokhat
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/newRajosshoCodeTable');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.newRajosshoCodeTableDelete=async(req,res)=>{
    var rajosshoCodeDelete = await rajosshoCode.findByPk(req.params.id);
    try {
        rajosshoCodeDelete.destroy();
        res.redirect("/pd/newRajosshoCodeTable");
    }
    catch{
        console.log(err);
    }
    
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
module.exports.expenseEdit=async(req,res)=>{
    await expense.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/expense/expenseEdit', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণী ফর্ম',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/expense/expenseEdit', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণীর কোডসমূহ ফর্ম',success:'', records: err });
    })
};
module.exports.expenseEditPost=async(req,res)=>{
    var boraddo=req.body.boraddo;
    var july1=req.body.july1;
    var august1=req.body.august1;
    var sept1=req.body.sept1;
    var oct1=req.body.oct1;
    var nov1=req.body.nov1;
    var dec1=req.body.dec1;
    var jan2=req.body.jan2;
    var feb2=req.body.feb2;
    var march2=req.body.march2;
    var apr2=req.body.apr2;
    var may2=req.body.may2;
    var june2=req.body.june2;
    var comment=req.body.comment;
    var user_id=req.body.user_id;
    if(july1==null){        
        july1=0;
    };
    if(august1==null){
        august1=0;
    };
    if(sept1==null){
        sept1=0;
    };
    if(oct1==null){
        oct1=0;
    };
    if(nov1==null){
        nov1=0;
    };
    if(dec1==null){
        dec1=0;
    };
    if(jan2==null){
        jan2=0;
    };
    if(feb2==null){
        feb2=0;
    };
    if(march2==null){
        march2=0;
    };
    if(apr2==null){
        apr2=0;
    };
    if(may2==null){
        may2=0;
    };
    if(june2==null){
        june2=0;
    };
    var boraddo= parseInt(boraddo);
    var july1= parseInt(july1);
    var august1= parseInt(august1);
    var sept1= parseInt(sept1);
    var oct1= parseInt(oct1);
    var nov1= parseInt(nov1);
    var dec1= parseInt(dec1);
    var jan2= parseInt(jan2);
    var feb2= parseInt(feb2);
    var march2= parseInt(march2);
    var apr2= parseInt(apr2);
    var may2= parseInt(may2);
    var june2= parseInt(june2);
    var total= july1+august1+sept1+oct1+nov1+dec1+jan2+feb2+march2+apr2+may2+june2;
    var baki=boraddo-total;
    await expense.update({ 
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
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/expense');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.expenseDelete=async(req,res)=>{
    var expenseDelete = await expense.findByPk(req.params.id);
    try {
        expenseDelete.destroy();
        res.redirect("/pd/expense");
    }
    catch{
        res.render('errorpage',err);
    }
    
};
module.exports.newKhorochTable=async(req,res)=>{
    await expenseCode.findAll()
    .then(data => {
        console.log("inside");
        res.render('pd/expense/newKhorochCodeTable', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণীর কোডসমূহ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/expense/newKhorochCodeTable', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণীর কোডসমূহ',success:'', records: err });
    })
     
    //  records:result

};
module.exports.newKhorochCodeForm=async(req,res)=>{
        res.render('pd/expense/newKhorochCodeForm', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণীর কোডসমূহ',msg:'' ,success:'',});
};
module.exports.newKhorochTableEdit=async(req,res)=>{
    await expenseCode.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/expense/newKhorochCodeTableEdit', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণীর কোডসমূহ',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/expense/newKhorochCodeTableEdit', { title: 'খরচের (বিএস্টেটমেন্ট) হিসাব বিবরণীর কোডসমূহ',success:'', records: err });
    })
};
module.exports.newKhorochTableEditPost=async(req,res)=>{
    var code = req.body.code;
    var khat= req.body.khat;
    await expenseCode.update({ 
        code:code,
        khat:khat
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/newKhorochTable');
    }).catch(err => {
        res.render('errorpage',err);
    });
};
module.exports.newKhorochTableDelete=async(req,res)=>{
    var expenseCodeDelete = await expenseCode.findByPk(req.params.id);
    try {
        expenseCodeDelete.destroy();
        res.redirect("/pd/newKhorochTable");
    }
    catch{
        res.render('errorpage',err);
    }
    
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
    try{
        const currentMonth = res.locals.moment().format("MMM-YYYY").toLowerCase();
        const selectedDate = req.body.year.toLowerCase();
        var data = [];
        if (req.body.center === "all") {
            const cropCatg = await cropCategory.findAll({where: {type: 'jat'} });
            const allCropCatg = await cropCategory.findAll();
            console.log("crop",cropCatg.length)
            const monthlyProgressList = await monthlyProgress.findAll({ where: {pd_id: req.session.user_id} });
            console.log("monthlyprogressList1",monthlyProgressList)
            monthlyProgressList.map((monthlyProg) => {
                const timeList = JSON.parse(monthlyProg.timeFrame)
                timeList.map((eachTime) => {
                    if (eachTime.time === selectedDate){
                        data.push(monthlyProg);
                    }
                })
            })
            res.render('pd/monthlyProgress/monthlyProgressCustomTable', {records: data,selectedDate:selectedDate,cropCatg:cropCatg,allCropCatg:allCropCatg} ,function(err, html) {
                res.send(html);
            });
        }else{
            console.log("center_id",req.body.center)
            console.log("center_id",req.session.user_id)
            const monthlyProgressList = await monthlyProgress.findAll({ where: {center_id : req.body.center, pd_id: req.session.user_id} });
            console.log("monthlyprogressList",monthlyProgressList)
            monthlyProgressList.map((monthlyProg) => {
                const timeList = JSON.parse(monthlyProg.timeFrame)
                timeList.map((eachTime) => {
                    if (eachTime.time === selectedDate){
                        data.push(monthlyProg);
                    }
                })
            })

            res.render('pd/monthlyProgress/monthlyProgressTable', {records: data,selectedDate:selectedDate} ,function(err, html) {
                res.send(html);
            });
        }

    }
    catch (e) {
        console.log(" mpl",e);
    }
};

module.exports.monthlyProgressEdit = async(req,res) => {
    try{
        const monthProgress = await monthlyProgress.findByPk(req.params.progressId);
        const categoryList = await cropCategory.findAll();
        res.render('pd/monthlyProgress/monthlyProgressFormEdit', { title: 'মাসিক প্রতিবেদন',msg:'' ,success:'',  categoryList: categoryList, monthProgress:monthProgress,editDate: req.params.editDate });
    }catch (err) {
        console.log(err)
    }
}

module.exports.monthlyProgressUpdate = async(req,res) => {
    var category= req.body.category;
    var subCategory= req.body.subCategory;
    var biboron= req.body.biboron;
    var breed= req.body.breed;
    var productionTarget= req.body.productionTarget;
    var productionCurrent= req.body.productionCurrent;
    var daePrapti= req.body.daePrapti;
    var bitoronCurrentMonth= req.body.bitotonCurrentMonth;
    var daeProdan= req.body.daeProdan;
    var deadWriteup= req.body.deadWriteup;
    var comment= req.body.comment;
    var editDate = req.body.editDate.toLowerCase();


    const currentMonth = res.locals.moment().format("MMM-YYYY").toLowerCase();

    const progress = await monthlyProgress.findByPk(req.params.progressId)

    /////////
    var startRange = "";
    var endRange = "";
    if ( res.locals.moment().format("M") < 7 ){
        startRange = "jul"+"-"+res.locals.moment().subtract(1, "year").format('yyyy')
        endRange = "jul"+"-"+res.locals.moment().format('yyyy')
    }else{
        startRange = "jul"+"-"+res.locals.moment().format('yyyy')
        endRange = "jul"+"-"+res.locals.moment().add(1, "year").format('yyyy')
    }


    ///////// moment(currentMonth).isAfter(bitorTotal.startTime) &&  moment(currentMonth).isBefore(bitorTotal.endTime)
    var productionTargetList = JSON.parse(progress.productionTarget);
    productionTargetList.forEach((TargetTotal,index) => {
        if ( res.locals.moment(editDate).isAfter(TargetTotal.startTime) &&  res.locals.moment(editDate).isBefore(TargetTotal.endTime) ) {
            productionTargetList[index].amount = parseInt(productionTarget)
        }
    })

    var currentProduction = JSON.parse(progress.productionCurrent);
    currentProduction.forEach((prodCurrent,index) => {
        if ( prodCurrent.time === editDate ) {
            currentProduction[index].amount = parseInt(currentProduction[index].amount) + parseInt(productionCurrent)
        }
    })

    var totalProduction = JSON.parse(progress.productionTotal);
    totalProduction.forEach((prodTotal,index) => {
        if ( res.locals.moment(editDate).isAfter(prodTotal.startTime) &&  res.locals.moment(editDate).isBefore(prodTotal.endTime) ) {
            totalProduction[index].amount = parseInt(totalProduction[index].amount) + parseInt(productionCurrent)
        }
    })

    var currentDaePraptis = JSON.parse(progress.daePrapti);
    currentDaePraptis.forEach((daePraptiCurrent,index) => {
        if ( daePraptiCurrent.time === editDate ) {
            currentDaePraptis[index].amount = parseInt(currentDaePraptis[index].amount) + parseInt(daePrapti)
        }
    })

    var currentBitoron = JSON.parse(progress.bitoronCurrentMonth);
    currentBitoron.forEach((currentBitoronCurrent,index) => {
        if ( currentBitoronCurrent.time === editDate ) {
            currentBitoron[index].amount = parseInt(currentBitoron[index].amount) + parseInt(bitoronCurrentMonth)
        }
    })

    var totalBitoron = JSON.parse(progress.bitoronTotal);
    totalBitoron.forEach((bitoronTotal,index) => {
        if ( res.locals.moment(editDate).isAfter(bitoronTotal.startTime) &&  res.locals.moment(editDate).isBefore(bitoronTotal.endTime) ) {
            totalBitoron[index].amount = parseInt(totalBitoron[index].amount) + parseInt(bitoronCurrentMonth)
        }
    })

    var currentDaeProdan = JSON.parse(progress.daeProdan);
    currentDaeProdan.forEach((daeProdanCurrent,index) => {
        if ( daeProdanCurrent.time === editDate ) {
            currentDaeProdan[index].amount = parseInt(currentDaeProdan[index].amount) + parseInt(daeProdan)
        }
    })

    var currentDeadWriteup = JSON.parse(progress.deadWriteup);
    currentDeadWriteup.forEach((deadWriteupCurrent,index) => {
        if ( deadWriteupCurrent.time === editDate ) {
            currentDeadWriteup[index].amount = parseInt(currentDeadWriteup[index].amount) + parseInt(deadWriteup)
        }
    })

    // var currentMojud = JSON.parse(progress.mojud);
    // currentMojud.forEach((mojudCurrent,index) => {
    //     if ( mojudCurrent.time === currentMonth ) {
    //         currentMojud[index].amount = parseInt(currentMojud[index].amount) + parseInt(mojud)
    //     }
    // })

    var currentComment = JSON.parse(progress.comment);
    currentComment.forEach((commentCurrent,index) => {
        if ( commentCurrent.time === editDate ) {
            currentComment[index].msg = comment
        }
    })



    const categoryName = await cropCategory.findByPk(category)
    const subCategoryName = await cropCategory.findByPk(subCategory)
    const biboronName = await cropCategory.findByPk(biboron)
    const breedName = await cropCategory.findByPk(breed)

    await monthlyProgress.update(
        {
            category: categoryName.name,
            subCategory: subCategoryName.name,
            biboron: biboronName.name,
            breed: breedName.name,
            productionTarget: JSON.stringify(productionTargetList),
            productionCurrent: JSON.stringify(currentProduction),
            productionTotal: JSON.stringify(totalProduction),
            daePrapti: JSON.stringify(currentDaePraptis),
            bitoronCurrentMonth: JSON.stringify(currentBitoron),
            bitoronTotal: JSON.stringify(totalBitoron),
            daeProdan: JSON.stringify(currentDaeProdan),
            deadWriteup: JSON.stringify(currentDeadWriteup),
            comment: JSON.stringify(currentComment),
            // timeFrame: time,

        },
        {
            where: {id: req.params.progressId}
        }
    )
        .then(data => {
            console.log('productionTotal=',data);
            res.redirect('/pd/monthlyProgress');
        }).catch(err => {
            console.log("err",err);
        });

}

//monthlyProgress controller end

//newRajosshoCode
module.exports.newRajosshoCode=async(req,res)=>{
    var code= req.body.code;
    var upokhat= req.body.upokhat;
    await rajosshoCode.create({
        code: code,
        upokhat:upokhat
        }).then(data => {
            res.redirect('/pd/newRajosshoCodeTable');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//newRajosshoCode ends

//newKhorochCode
module.exports.newKhorochCode=async(req,res)=>{
    var code= req.body.code;
    var khat= req.body.khat;
    await expenseCode.create({
        code: code,
        khat:khat
        }).then(data => {
            res.redirect('/pd/newKhorochTable');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//newKhorochCode ends
//newPodobi
module.exports.newPodobi=async(req,res)=>{
    var podobi= req.body.podobi;
    var grade= req.body.grade;
    await podobiList.create({
        podobi: podobi,
        grade:grade
        }).then(data => {
            res.redirect('/pd/newPodobiTable');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//newPodobi ends
//apaCode
module.exports.apaCode=async(req,res)=>{
    var newApaUddessho= req.body.newApaUddessho;
    await apaCode.create({
        newApaUddessho: newApaUddessho,
        }).then(data => {
            res.redirect('/pd/dashboard');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//apaCode ends

//cropCategoryList

module.exports.cropCategoryTable=async(req,res)=>{
        const crop = await cropCategory.findAll();

    try{
        console.log("inside");
        res.render('pd/cropCategoryTable/cropCategoryTable', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'',crop:crop});
    }
    catch{
        console.log(err);
    }
     
    //  records:result

};
module.exports.newcropCategoryList=async(req,res)=>{
    var mainCategory=await cropCategory.findAll({
        where: {type : "mainCategory"}
    });
    var subCategory=await cropCategory.findAll({
        where: {type : "subCategory"}
    });
    var biboron=await cropCategory.findAll({
        where: {type : "biboron"}
    });
    var jaat=await cropCategory.findAll({
        where: {type : "jaat"}
    });
    try{
        console.log("inside");
        res.render('pd/cropCategoryList/cropCategoryList', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'', mainCategorys: mainCategory,subCategorys:subCategory,biborons:biboron,jaats:jaat});
    }
    catch{
        console.log("outside");
        res.render('pd/cropCategoryList/cropCategoryList', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'', mainCategorys: err });
    }
     
    //  records:result

};
module.exports.newcropCategoryListEdit=async(req,res)=>{
    await cropCategory.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('pd/cropCategoryList/cropCategoryListEdit', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',msg:'' ,success:'',records: data});
    })
    .catch(err => {
        console.log("outside");
        res.render('pd/cropCategoryList/cropCategoryListEdit', { title: 'মাসিক রাজস্ব অর্থ প্রাপ্তির কোডসমূহ',success:'', records: err });
    })
};
module.exports.newcropCategoryListPost=async(req,res)=>{
    var code = req.body.code;
    var upokhat= req.body.upokhat;
    await cropCategory.update({ 
        code:code,
        upokhat:upokhat
    },
    {
        where: {id: req.params.id}
    }).then(data => {
        res.redirect('/pd/cropCategoryListEdit');
    }).catch(err => {
        res.render('errorpage',err);
    });
};

// dashImage controller
// module.exports.dashImage=async(req,res)=>{
//     await dashImage.findAll()
//     .then(data => {
//         console.log("inside");
//         res.render('pd/dashImage/dashImage', { title: 'সৌর আলো ফাঁদ বিতরণ তথ্য',success:'', records: data });
//     })
//     .catch(err => {
//         console.log(err);
//     })
     
//     //  records:result

// };
module.exports.dashImageForm=async(req,res)=>{
    res.render('pd/dashImage/dashImageForm', { title: 'সৌর আলো ফাঁদ বিতরণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};
module.exports.dashImageFormPost=async(req,res)=>{
    const path = req.file && req.file.path;
    console.log("path",path,req.file,req.file.path)
    if(path){
        var imagePath = "/dashImageGallery/" + req.file.filename;
        await dashImages.create({
                image: imagePath,
            })
            .then(data => {
            res.redirect('/pd/dashboard');
            }).catch(err => {
            console.log("file not uploaded successfully");
            });
        }
        else{
        
            console.log("path doesn't exist so file not uploaded successfully");
        };
    
  
};
// dashImage controller ends