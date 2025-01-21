const express = require("express");
const app = express();
const cors=require("mysql");
const mysql=require("cors");
const bodyParser=require("mysql");
app.use(bodyParser.json());
app.use(cors());