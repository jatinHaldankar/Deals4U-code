const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret ='hiiamajatinhaldanakarstudentofldcollegeofengineering';



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = 5000 || process.env.PORT;
mongoose.connect('mongodb+srv://haldankarjatin:DrgFhWCMs5R7gZiK@cluster0.wddcbrl.mongodb.net/Deals4U');



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


const ItemSchema = new mongoose.Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: Array,
    description: String
})

const Item = mongoose.model('Item', ItemSchema);

const CategorySchema = new mongoose.Schema({
    CategoryName: String
});

const Category = mongoose.model('Category', CategorySchema);


const UserSchema = new mongoose.Schema({
    name: String,
    location: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

const User=mongoose.model('User', UserSchema);


app.post("/displayItem", (req, res) => {
    Item.find().then((items) => {
        res.send(items);
    })
})

app.post("/displayCategory", (req, res) => {
    Category.find().then((categories) => {
        res.send(categories);
    })
})


app.post("/signupData", async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securePassword
    });

    newUser.save().then(() => {
        res.json({ success: true });
    }).catch((err) => {
        console.log(err);
        res.json({ success: false });
    })
})

app.post("/loginData", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email}).then((user) => {
        if (!user) {
            res.json({ success: false });
        } else {
            bcrypt.compare(password, user.password).then((ans) => {
                if(ans){
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    const authToken=jwt.sign(data,jwtSecret);
                    res.json({ success:true,authToken:authToken});
                }
                else{
                res.json({ success: false });
                }
            });
        }

    }).catch((err) => {
        // console.log(err);
        res.json({ success: false });
    });
})


const orderSchema=mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    orderData:{
        type:Array,
        required: true
    }
})

const Order=mongoose.model("Order",orderSchema);



app.post("/checkout",async(req,res)=>{
    let email=req.body.email;
    let orderData=req.body.orderData;
    await orderData.splice(0,0,{orderDate:req.body.orderDate,orderPrice:req.body.orderPrice});

    Order.findOne({email:email}).then((order)=>{
        if(!order){

            //first order
            const newOrder=new Order({
                email:email,
                orderData:[orderData]
            })
            newOrder.save();
            res.json({success:true});
        }
        else{
            //not a first order...
            Order.findOneAndUpdate({email:req.body.email},{$push:{orderData:orderData}}).then(()=>{
                res.json({ success: true });
            }).catch((err)=>{
                //   console.log(err);
                  res.json({success:false});
            })
        }
       
    }).catch((err)=>{
        // console.log(err);
        res.json({success:false});
    })
})

app.post('/orderData',(req,res)=>{
    Order.findOne({email:req.body.email}).then((order)=>{
        if(order){
        res.send(order.orderData);
        }
    })
})


app.listen(port, () => {
    console.log(`server is running on ${port}`);
})
