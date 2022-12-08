                                  const mysql=require("./mysqlConnect");
const jwt=require("jsonwebtoken");
 get=async()=>{
  //users=await mysql.query("SELECT *, (SELECT nome FROM pessoa WHERE id=u.pessoa_id_pessoa) as nome FROM usuario u");
  users=await mysql.query("SELECT p.nome, p.email, u.senha FROM usuario u JOIN pessoa p ON p.id_pessoa=u.pessoa_id_pessoa")
  return users;
}

login= async (data)=>{
   sql="SELECT p.id_pessoa as id, p.nome, p.email,"+
   " (SELECT COUNT(pessoa_id_pessoa) FROM professor WHERE pessoa_id_pessoa=p.id_pessoa) as professor,"+
   "(SELECT COUNT(professor_pessoa_id_pessoa) FROM coordenacao WHERE professor_pessoa_id_pessoa=p.id_pessoa) as coordenador,"+
   " (SELECT COUNT(pessoa_id_pessoa) FROM aluno WHERE pessoa_id_pessoa=p.id_pessoa) as aluno,"+
   " (SELECT COUNT(pessoa_id_pessoa) FROM biblioteca WHERE pessoa_id_pessoa=p.id_pessoa) as biblioteca,"+
   
   " (SELECT COUNT(pessoa_id_pessoa) FROM administrador WHERE pessoa_id_pessoa=p.id_pessoa) as admin"+
   
   " FROM usuario u"+
   " JOIN pessoa p ON p.id_pessoa=u.pessoa_id_pessoa"+
   " WHERE p.email='"+data.email+"' AND u.senha='"+data.senha+"' ";

   console.log(sql)
   const usuarios = await  mysql.query(sql);
  
   result=null;
   if(usuarios){
      if(usuarios.length>0){
         let curso=null;
         if(usuarios[0].id){
            const id=usuarios[0].id;
            var token = jwt.sign({id} , 'CIMOL', {expiresIn:28800}); 
            console.log("Fez login e gerou token!");
            perfil=new Array();
            if(usuarios[0].aluno>0){
               perfil.push("aluno");
            }
            if(usuarios[0].professor>0){
               perfil.push("professor");
            }
            if(usuarios[0].coordenador>0){
               sql="SELECT * FROM curso c "+
               "JOIN coordenacao cc ON cc.curso_id_curso=c.id_curso "+
               "WHERE cc.professor_pessoa_id_pessoa="+usuarios[0].id;
               console.log(sql);
               curso = await  mysql.query(sql);
               console.log(curso);
               perfil.push("coordenador");
            }
            if(usuarios[0].biblioteca>0){
               perfil.push("biblioteca");
            }
            if(usuarios[0].admin>0){
               perfil.push("admin");
            }
            usuarios[0].perfil=perfil;
            if(curso){
               usuarios[0].curso=curso;
            }
            
            sql="UPDATE usuario set perfil='"+perfil.toString()+"' WHERE pessoa_id_pessoa="+usuarios[0].id;
            console.log(sql);
            await  mysql.query(sql);
      
            result={ auth: true, token: token , user:usuarios[0]}
         }else{
            result={ auth: true, token: token , user:null};
         }
      }else{
         result={ auth: true, token: token , user:null};
      }
   }else{
      result={ auth: true, token: token , user:null};
   }
  console.log(result)
  return result;
}


verifyJWT= async (token, perfil)=>{ 
   console.log(token)
   if (!token){
      resp= { auth: false, message: 'Token não informado.' }; 
   }
   
   jwt.verify(token, 'CIMOL', function(err, decoded) { 
         if (err){
            resp= { auth: false, message: 'Token inválido!' };
         }
         if(decoded){
            resp= {auth:true, idUser:decoded.id};
         }
   });

   if(resp.auth){
      sql="SELECT perfil FROM usuario WHERE pessoa_id_pessoa="+resp.idUser;
      usuario= await  mysql.query(sql);
      usuario[0].perfil=usuario[0].perfil.split(",");
      if(usuario[0].perfil.indexOf(perfil)<0){
         resp= { auth: false, message: 'Perfil Inválido!' };
      }
   }
   return resp;
} 

module.exports={get, login, verifyJWT}
