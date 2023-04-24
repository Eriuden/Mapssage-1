
const salonModel = require("../models/salon.model")
const userModel = require ("../models/user.model")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.getAllUsers = async (res) => {
    const users = await userModel.find().select("-password")
    res.status(200).json(users)
}

module.exports.getUser = (req,res) => {
    console.log(req.params)
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    userModel.findById(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("id unknown:" + err)
    }).select("-password")
}

module.exports.updateUser = async(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    try {
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    bio: req.body.bio,
                }
            },
            {new:true, upsert:true, setDefaultsOnInsert:true},

            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) res.status(500).send({message: err})
            }
        )
    } catch(err) {
        return res.status(500).json({message:err})
    }
}

module.exports.deleteUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)
    try {
        await userModel.remove({ _id: req.params.id}).exec()
        res.status(200).json({ message: "on manque de massage cochons ?"})
    } catch(err) {
        return res.status(500).json({message:err})
    }
}

module.exports.fav = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)
    
    try {
        await userModel.findByIdAndUpdate(
            req.params.id, 

            //On crée ICI l'idToFollow, il ajoute donc au set
            //cet élément et le fait correspondre à favorites
            { $addToSet: { favorites: req.body.idToFollow }},
            { new:true, upsert:true},
            (err,docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )

        //Ici on se mets du côté du salon, donc du receveur,
        //ergo, on inverse la place des deux id concernées
        // comme l'info ne concerne pas l'user, pas besoin
        //de renvoyer le status 201
        
        await salonModel.findByIdAndUpdate(
            req.body.idToFollow,

            { $addToSet: { favoriteBy: req.params.id}},
            { new:true, upsert:true},
            (err) => {
                if (err)
                return res.status(400).json(err)
            }
        )
    } catch(err) {
        return res.status(500).json({ message :err})
    }
}

module.exports.unfav = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)

    try {
        await userModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { favorites: req.body.idToUnfollow}},
            { new:true, upsert: true}, 
            (err,docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )

        await salonModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { favoriteBy: req.params.id}},
            { new:true, upsert:true},
            (err) => {
                if (err)
                return res.status(400).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json ({message: err})
    }
}