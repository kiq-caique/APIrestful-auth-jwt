require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connectDB = require("./connectMongo");
connectDB();

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require("./models/User");

// Private Route
app.get("/user/:id", checkToken, async (req,res) => {
   const id = req.params.id
   
   // check if user exists
   const user = await User.findById(id, '-password')

   if(!user) {
      return res.status(404).json({msg: "Usuário não encontrado"})
   }
   res.status(200).json({user})
})

function checkToken(req, res, next) {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(" ")[1]

   if(!token) {
      return res.status(401).json({msg: 'Acesso negado'})
   }

   try {
      const secret = process.env.SECRET
      
      jwt.verify(token, secret)
      
      next()

   } catch (error) {
      res.status(400).json({msg: 'Token inválido'})
   }
}

//Register User
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  // Validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem" });
  }

  // check if user exists
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({ msg: "Utilize outro email!" });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
      });
  }
});

// Login User
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // Check if password match
  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) {
   return res.status(404).json({ msg: "Senha inválida!" });
 }

 try {

   const secret = process.env.SECRET
   const token = jwt.sign(
      {
         id: user._id,
      },
      secret,
   )

   res.status(200).json({ msg: 'Autenticação realizada com sucesso', token})
   
 } catch (error) {
   console.log(error);
   res
     .status(500)
     .json({
       msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
     });
 }

});
