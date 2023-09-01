const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:[{
        name:{type:String},
        path:{type:String}
    }]

})

userschema.statics.compare = async function(username, password){
    const Exists = await this.findOne({ username })
    if (Exists) {
        const ismatch =  await bcrypt.compare(password,user.password);
        if(ismatch){
            return Exists;
        }else{
            return {error:"password is wrong"}
        }

    } else {
        return { error: "username not found" }
    }
}

const User = mongoose.model("yo",userschema);
module.exports = User;