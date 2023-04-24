const userModel = require("../models/user.model")
const salonModel = require("../models/salon.model")
const ObjectId = require("mongoose").Types.ObjectId
const fs = require("fs")
const { promisify } = require("util")
const { uploadErrors } = require("../utils/errors.utils")
const pipeline = promisify(require("stream").pipeline)

module.exports.getSalon = async(req,res) => {
    salonModel.find((err,docs) => {
        if(!err)res.send(docs)
        else console.log("Error to get data" + err)
    }).sort({createdAt: -1})
}

module.exports.createSalon = async (req,res) => {
    
    if (req.file !=null) {
       try {
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        )
            throw Error("invalide file")

        if (req.file.size > 500000) throw Error("taille maximale dépassée")
       } catch (err) {
        const errors = uploadErrors(err)
        return res.status(201).json({errors})
       }
        fileName = req.body.posterId + Date.now() + ".jpg"

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/client/public/uploads/salonImage/${fileName}`
            )
        )
    }

    const newSalon = new salonModel({
        name: req.body.name,
        address: req.body.address,
        cp: req.body.cp,
        town: req.body.town,
        massage: req.body.massage,
        potentialClients: req.body.potentialClients,
        employeesGender: req.body.employeesGender,
        favoriteBy:[],
        comments:[],
    })

    try {
        const salon = await newSalon.save()
        return res.status(201).json(salon)
    } catch(err) {
        return res.status(400).send(err)
    }
    
}

module.exports.updateSalon = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    const updatedRecord = {
        name: req.body.name,
        address: req.body.address,
        cp: req.body.cp,
        town: req.body.town,
        massage: req.body.massage,
        potentialClients: req.body.potentialClients,
        employeesGender: req.body.employeesGender,
    }

    salonModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord},
        { new: true },
        (err,docs) => {
            if (!err) res.send(docs)
            else console.log("update errors" + err)
        }
    )
}

module.exports.deleteSalon = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    salonModel.findByIdAndRemove(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("delete error:" + err)
    })
}

module.exports.favSalon = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    try {
        await salonModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { favoriteBy: req.body.id}
            },
            { new: true },
            (err,docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {favorites: req.params.id},
            },
            { news: true },
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.unfavSalon = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(" ID unknown : " + req.params.id)

    try {
        await salonModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {favoriteBy: req.body.id}},
            { new:true},
        (err,docs) => {
            if (err) return res.status(400).send(err)
        }
    )
    await userModel.findByIdAndUpdate(
            res.body.id,
            {
                $pull : { favorites: req.params.id}
            },
            {news:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.comment = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)    
    try {
        return salonModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comment: {
                        commenterId: req.body.commenterId,
                        commenterName: req.body.commenterName,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    } 
}

module.exports.editComment = (req,res) => {
    if (ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :" + req.params.id)

        try {
            return salonModel.findById(req.params.id, (err,docs) => {
                const theComment = docs.comment.find((comment) =>
                comment._id.equals(req.body.commentId)
                )

                if(!theComment) return res.status(404).send("commentaire introuvable")

                theComment.text = req.body.text 

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs)
                    return res.status(500).send(err)
                })
            })
        } catch {
            return res.send(400).send(err)
        }
}

module.exports.deleteComment = (req,res) => {
    if (ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id)
    
    try {
        return salonModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },

            { new:true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        res.status(400).send(err)
    }
}