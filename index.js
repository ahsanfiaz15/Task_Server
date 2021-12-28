const express=require("express");
const app=express();
const cors=require("cors");
require('dotenv').config(); 
const sql=require("mysql");
const bodypars=require('body-parser');
app.use(bodypars.json());
app.use(cors());
app.use(bodypars.urlencoded(({extended:true})));



const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_test"
  });
  
  con.connect(function(err) {
      if (err) {
         console.log(err.message);
      }
      else{
       console.log("connected");
      }
    });

app.get('/getusers',(req,res)=>{
  

       
            // console.log(search);
              con.query('select * from user_list',(err,row)=>{
                  if(err){
                      console.log(err.message);
                  }
                  else{
                   
                      res.send(row);
                  }
              });
            
        
      
      });
app.post('/adduser',(req,res)=>{  
    con.query('INSERT INTO user_list SET ?', {name: req.body.name}, function(err, result, fields) {
            
              if(err){
                       // console.log(err.message);
                        res.send(err.message);
                    }
                    else{
                        const s=[{
                         id:result.insertId
                        }];
                        res.send(s);
                    }
                
              
         
                });
});

app.post('/addhobby',(req,res)=>{  
    var obj=req.body;
    con.query('INSERT INTO hobbies SET ?', {uid: obj.uid,passion:obj.passion,hobby:obj.hobby,year:obj.year}, function(err, result, fields) {
            
              if(err){
                       console.log(err.message);
                        //res.send(err.message);
                    }
                    else{
                        const s=[{
                         id:result.insertId
                        }];
                        res.send(s);
                    }
                
              
         
                });
});
app.post('/gethobby',(req,res)=>{
  

       
     
      con.query('select * from hobbies where uid=?', [req.body.uid],(err,row)=>{
          if(err){
              console.log(err.message);
          }
          else{
               
              res.send(row);
          }
      });
    


});
app.post('/delete',(req,res)=>{
  

       
     
    con.query('delete from hobbies where id=?', [req.body.id],(err,row)=>{
        if(err){
            console.log(err.message);
        }
        else{
             
            res.send("deleted");
        }
    });
  


});


app.listen("3001",()=>{
  console.log("start server");
});