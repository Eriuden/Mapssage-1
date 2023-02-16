/*Il nous faudra 
Le nom du salon
Son adresse
Son cp
Sa ville
Le type de massage
Quel type de clients est accepté (h,f, mixte)
Idem mais pour les masseurs
Une description
*/

const mongoose = require ("mongoose")

const salonSchema = mongoose.Schema(
    {
        ownerId: {
            type: String,
            required: true 
        },

        name: {
            type:String,
            required: true 
        },

        picture: {
            type: String,
            default: "../client/public/uploads/salonImages/random-salon.jpg",
            required: true
        },

        address: {
            type:String,
            required: true 
        },

        cp: {
            type: String,
            required: true 
        },

        town: {
            type: String,
            required: true 
        },

        massage: {
            type: String,
            required: true
        },

        potentialClients: {
            type: String,
            required: true 
        },

        employeesGender: {
            type:String,
            required: true 
        },


        //faire une notation en étoile

        favoriteBy: {
            type: [String]
        },

        comments: {
            type: [
                {
                    commenterId: String,
                    commenterName: String,
                    text:String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },

    { timestamps : true },
)

const salonModel = mongoose.model("salon", salonSchema)
module.exports = salonModel