const express=require('express')
const app=express()

const bodyParser=require('body-parser')
const cors=require('cors')
const bearerToken= require('express-bearer-token')


require('dotenv').config()
const PORT=process.env.PORT ||5001

app.use(cors())
app.use(bearerToken())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))
const Crypto=require('crypto')
const {db} = require('./connection')




app.get('/',(req,res)=>{
    var data={
        name:'welcome'
    }
    res.send("<h1>Ini home page</h1>")
})

app.get('/movies',(req,res)=>{
    let sql=`select * from movies`
    db.query(sql,(err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.send(data)
    })
})

app.post('/movies',(req,res)=>{
    var data=req.body
        var sql='insert into movies set?'
        db.query(sql,data,(err)=>{
            if(err){
                return res.status(500).send(err)
            }
           db.query(`select * from movies`,(err,results)=>{
               if(err){
                   return res.status(500).send(err)
               }
               res.status(200).send(results)
           })
        })
})

app.put('/movies/:id',(req,res)=>{

    var data=req.body        
        var sql=`update movies set? where id= ${db.escape(req.params.id)}`
        db.query(sql,data,(err)=>{
            if(err){
                return res.status(500).send(err)
            }
           db.query(`select * from movies`,(err,results)=>{
               if(err){
                   return res.status(500).send(err)
               }
               return res.status(200).send(results)
           })
        })
})

app.delete('/movies/:id',(req,res)=>{
    var sql=`delete from movies where id= ${db.escape(req.params.id)} `
    db.query(sql,(err)=>{
        if(err){
            return res.status(500).send(err)
        }
        db.query(`select * from movies`,(err,results)=>{
           if(err){
            return res.status(500).send(err)
           } 
           return res.status(200).send(results)
        })
    })
})

//category
app.get('/cate',(req,res)=>{
    let sql=`select * from categories`
    db.query(sql,(err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.send(data)
    })
})

app.post('/cate',(req,res)=>{
    var data=req.body
        var sql='insert into categories set?'
        db.query(sql,data,(err)=>{
            if(err){
                return res.status(500).send(err)
            }
           db.query(`select * from categories`,(err,results)=>{
               if(err){
                   return res.status(500).send(err)
               }
               res.status(200).send(results)
           })
        })
})

app.put('/cate/:id',(req,res)=>{

    var data=req.body        
        var sql=`update categories set? where id= ${db.escape(req.params.id)}`
        db.query(sql,data,(err)=>{
            if(err){
                return res.status(500).send(err)
            }
           db.query(`select * from categories`,(err,results)=>{
               if(err){
                   return res.status(500).send(err)
               }
               return res.status(200).send(results)
           })
        })
})

app.delete('/cate/:id',(req,res)=>{
    var sql=`delete from categories where id= ${db.escape(req.params.id)} `
    db.query(sql,(err)=>{
        if(err){
            return res.status(500).send(err)
        }
        db.query(`select * from categories`,(err,results)=>{
           if(err){
            return res.status(500).send(err)
           } 
           return res.status(200).send(results)
        })
    })
})

app.listen(PORT,()=>console.log('Api Aktif di Port'+PORT))












































// const express=require('express')
// const app=express()

// const bodyParser=require('body-parser')
// const cors=require('cors')
// const bearerToken= require('express-bearer-token')
// const fs=require('fs')
// const handlebars=require('handlebars')
// const nodemailer =require('nodemailer')
// require('dotenv').config()
// const PORT=process.env.PORT ||5001

// app.use(cors())
// app.use(bearerToken())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static('public'))
// const Crypto=require('crypto')
// const {db} = require('./connection')


// const {
//    ProductRoutes
// }=require('./Routes')

// app.use('/product',ProductRoutes)

// app.get('/',(req,res)=>{
//     var data={
//         name:'welcome'
//     }
//     res.send("<h1>Ini home page</h1>")
// })

// //soal no 2
// //penjualan terbaik
// app.get('/penjualan',(req,res)=>{
//     console.log(req.query);
//     let sql=`select count(*),penjualid,p.namatoko
//                 from transaksi t 
//                 join penjual p on t.penjualid=p.id
//                 where t.status='finished';`

//     db.query(sql,(err,data)=>{
//         if(err){
//             return res.send(err)
//         }
//         return res.send(data)
//     })
// })
// //bukan penjual
// app.get('/bukanpenjualan',(req,res)=>{
//     console.log(req.query);
//     let sql=`select count(*) as bukanpenjual,users.username
//             from penjual
//             join users
//             on penjual.userid=users.id
//             where penjual.id`

//     db.query(sql,(err,data)=>{
//         if(err){
//             return res.send(err)
//         }
//         return res.send(data)
//     })
// })

// //category terbaik
// app.get('/category',(req,res)=>{
//     console.log(req.query);
//     let sql=`select count(*),products.categoryprodid,category_products.namacategory
//             from transaksi
//             join products
//             on transaksi.productid=products.id
//             join category_products
//             on products.categoryprodid=category_products.id
//             where transaksi.status='finished';`

//     db.query(sql,(err,data)=>{
//         if(err){
//             return res.send(err)
//         }
//         return res.send(data)
//     })
// })


// //soal no 3
// app.get('/products',(req,res)=>{
//     console.log(req.query);
//     let sql=`select count(*),products.nama,image,informasiproduct,penjual.namatoko
//                 from transaksi 
//                 join products
//                 on transaksi.productid=products.id
//                 join penjual
//                 on penjual.id=products.penjualid
//                 group by products.nama,image,informasiproduct
//                 order by count(*) limit 6;`

//     db.query(sql,(err,data)=>{
//         if(err){
//             return res.send(err)
//         }
//         return res.send(data)
//     })
// })


// //soal no 1

// let transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'purbasiahaan@gmail.com',
//         pass:'cpuedzwucfbpdasy'
//     },
//     tls:{
//         rejectUnauthorized:false
//     }
// })

// const generatorotp=()=>{
//     return Math.floor(1000 + Math.random() * 9000);
// }
//  app.post('/kirim',(req,res)=>{
//             const {email}=req.body      
//             const htmlrender=fs.readFileSync('./index.html','utf8')
//             const template=handlebars.compile(htmlrender) 
//             const htmlemail=template({otp:generatorotp})


//             transporter.sendMail({
//                 from:"Bandar Togel<purbasiahaan@gmail.com>",
//                 to:email,
//                 subject:'Tekan Tombol Confirm ',
//                 html:htmlemail
//             }).then(()=>{            
//                 return  res.send('cocok')
//             }).catch((err)=>{
//                 return res.status(500).send({message:err.message})
//             })
//  })



// app.listen(PORT,()=>console.log('Api Aktif di Port'+PORT))


















