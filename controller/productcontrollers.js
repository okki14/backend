const {db}=require('../connection')
const fs=require('fs')
const handlebars=require('handlebars')
// const transporter=require('./../helpers')




const generatorotp=()=>{
    var val = Math.floor(1000 + Math.random() * 9000);
    return val
         
}
module.exports={
    register:(req,res)=>{      
                        const {email}=req.body      
                        const htmlrender=fs.readFileSync('./index.html','utf8')
                        const template=handlebars.compile(htmlrender) 
                        const htmlemail=template({otp:generatorotp})


                        transporter.sendMail({
                            from:"Bandar Togel<purbasiahaan@gmail.com>",
                            to:email,
                            subject:'Tekan Tombol Confirm ',
                            html:htmlemail
                        }).then(()=>{
                           
                            return  res.send('cocok')
                        }).catch((err)=>{
                            return res.status(500).send({message:err.message})
                        })
                    
    }
}