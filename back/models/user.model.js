const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
            unique: true,
            trim:true,
        },

        email: {
            type: String,
            required: true,
            validate: [isEmail],
            max: 1024,
            minlength: 6,
        },

        password: {
            type:String,
            required:true,
            max: 1024,
            minlength: 6   
        },

        picture: {
            type: String,
            default: "./uploads/profil/random-user.jpg"
        },

        bio: {
            type: String,
            max: 1000,
        },

        favorites: {
            type: [String]
        },
    },
    {timestamps: true,}
)

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.static.login = async function(email,password) {
    const user = await this.findOne({ email })
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error("mot de passe incorrect")
    }
    throw Error("adresse mail incorrect")
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel