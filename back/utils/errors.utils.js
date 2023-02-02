module.exports.signUpErrors = (err) => {
    let errors = { name:"", email: "", password:"Mot de passe incorrect"}

    if (err.message.includes("name"))
    errors.name = "Nom incorrect ou déjà pris"

    if (err.message.includes("email"))
    errors.name = "Email incorrect ou déjà pris"

    if (err.message.includes("password"))
    errors.name = "Mot de passe trop court, minimum 6 caractère"

    if (err.code === 11000 && Object.keys(err.keyValue) [0].includes("name"))
    err.name = "Nom déjà pris"

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    err.email = "Email déjà pris"

    return errors 
}

module.exports.signInErrors = (err) => {
    let errors = { email:"" , password: ""}

    if (err.message.includes("email"))
    errors.email = "email non enregistré"

    if (err.message.includes("password"))
    errors.password = "mot de passe inconnu"
}

module.exports.uploadErrors = (err) => {
    let errors = { format: "", maxsize:""}

    if (err.message.includes("invalid file"))
    errors.format = "Format invalide"

    if(err.message.includes("max size"))
    errors.format = "Taille maximale dépassée"

    return errors
}
