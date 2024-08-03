const userSchema = require("./models/userSchema");

module.exports.signUp = async (req,res) => {
    try{
        console.log(req.body);
        const {name,email,password} = req.body;
            if(!name || !email || !password){
                return res.status(400).json({success: false , message:"Please Fill the form"});
            }

            const existingUser = await userSchema.findOne({email});
            if(existingUser){
                return res.status(400).json({success: false, message:"Email already exists"});
            }
            await userSchema.create({name,email,password});
            return res.status(200).json({success: true, message:"User created Successfully"});
        
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message:"Server Error"});
    }
}