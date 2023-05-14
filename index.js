const express=require("express");
const dotenv=require("dotenv");
// const morgan = require("morgan");
const connectDB = require("./config/db");
const model = require("./models/scheme-model");
var cors = require('cors');
const bodyParser = require("body-parser");

// set up body parser


dotenv.config();
connectDB();

const app=express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(morgan("dev"));

// console.log("api");
// app.use('/api/v1/user',require("./routes/userRoutes"));


// creating a scheme
app.post('/api/v1/scheme', async (req,res)=>{
     try{
        console.log(req.body);
         
        const scheme = new model(req.body);
        await scheme.save();
        console.log(scheme);
        // send success response
        res.status(200).json({
            status: "success",
            data: scheme
        })
    }
    catch(err){
        console.log(err);
        // send error response
        res.status(400).json({
            status: "fail",
            message: err
        })

    }
})


// getting all schemes
app.get('/api/v1/schemes', async (req,res)=>{
    try{
        // console.log(req.body);
        const schemes = await model.find();
        const city = req.query.city;
        const category = req.query.category;
        const state = req.query.state;

  // perform filtering based on the query parameters
  let filteredSchemes = schemes;
  if (city) {
    filteredSchemes = filteredSchemes.filter(scheme => scheme.city === city);
  }
       

  if(state){
    filteredSchemes = filteredSchemes.filter(scheme => scheme.state === state);
    }

    if(category){
        filteredSchemes = filteredSchemes.filter(scheme => scheme.category === category);
        }

    res.status(200).json({
        status: "success",
        data: filteredSchemes
    })
}

    catch(err){
        console.log(err);
        // send error response
        res.status(400).json({
            status: "fail",
            message: err
        })

    }
})


// getting a single scheme
app.get('/api/v1/schemes/:id', async (req,res)=>{
    try{
        const scheme = await model.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: scheme
        })
    }
    catch(err){
        console.log(err);
        // send error response
        res.status(400).json({
            status: "fail",
            message: err
        })

    }
})

// deleting a scheme
app.delete('/api/v1/schemes/:id', async (req,res)=>{
    try{
        const scheme = await model.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: scheme
        })
    }
    catch(err){
        console.log(err);
        // send error response
        res.status(400).json({
            status: "fail",
            message: err
        })

    }
})

// getting all schemes of a particular category
app.get('/api/v1/schemes/category/:category', async (req,res)=>{
    try{
        const scheme = await model.find({category: req.params.category});
        res.status(200).json({
            status: "success",
            data: scheme
        })
    }
    catch(err){
        console.log(err);
        // send error response
        res.status(400).json({
            status: "fail",
            message: err
        })

    }
})









const port =process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(
        'Server Running in 8000'.bgCyan.white);
})