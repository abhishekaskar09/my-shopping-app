const User=require('../models/AuthModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.register=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    const existing=await User.findOne({email});
    if(existing){
      return res.status(200).json({message:'user are already login'});
    }

    const salt=await bcrypt.genSalt(10);
    const passwordHashed=await bcrypt.hash(password,salt);

    const newUser=new User({
      name,
      email,
      password:passwordHashed,
      role:'user',
    })

    const user=await newUser.save();

    const token=jwt.sign(
      {id:user.id},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    )

    const {password:_,...others}=newUser.toObject();

    res.status(201).json({message:'Account are created successfully!',
      others:others,
      token:token
    });
  } catch (error) {
    console.log('server error in registerController',error);
    res.status(500).json({message:'server error in registerController',message:error.message});  
  }
}



exports.login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({message:'email is invalid!'});
    }

   
    const passwordMatched=await bcrypt.compare(password,user.password);
    if (!passwordMatched) {
      return res.status(401).json({message:'password are wrong try agiain!'});
    }

    const token=jwt.sign(
      {id:user.id},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    )

    res.status(200).json({message:'user are login successfully!',
      login:email,
      role:'user',
      token:token,
    });
  } catch (error) {
    console.log('server error in registerController',error);
    res.status(500).json({message:'server error in registerController',message:error.email,message:error.email});  
  }
}