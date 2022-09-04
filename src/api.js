const express=require('express');
const cors = require('cors');
const app=express();

app.use(cors())

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {
    BASE_URL,
    KEY_TOKEN,
    DB_HOST,
    DB_USER,
    DB_USER_PASS,
    DB_DATABASE
  
  } = require ('./config');

//====================== Rotas  =======================
const route=require("./routers/route");
const userRoute=require("./routers/user");
const cursoRoute=require("./routers/curso");
const turmaRoute=require("./routers/turma");
const alunoRoute=require("./routers/aluno");
const armarioRoute=require("./routers/armario");
const professorRoute=require("./routers/professor");
const bibliotecaRoute=require("./routers/biblioteca");
const horarioRoute=require("./routers/horario");
const curriculoRoute=require("./routers/curriculo");
const patrimonioRoute=require("./routers/patrimonio");
app.use('/', route);
app.use('/user', userRoute);
app.use('/curso', cursoRoute);
app.use('/curso/turmas', turmaRoute);
app.use('/aluno', alunoRoute);
app.use('/curso/armarios', armarioRoute);
app.use('/professor', professorRoute);
app.use('/biblioteca', bibliotecaRoute);
app.use('/horario', horarioRoute);
app.use('/aluno/curriculo', curriculoRoute);
app.use('/curso/patrimonio',patrimonioRoute);

module.exports=app;

