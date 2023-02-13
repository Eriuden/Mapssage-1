import React, { useState} from 'react'
import axios from 'axios'
import Connexion from './connexion'

export default function Inscription() {
  const [ formSubmit, setFormSubmit] = useState(false)
  const [ name, setName] = useState("")
  const [ email,setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [ passwordConf, setPasswordConf] = useState("")

  const handleRegister = async(e) => {
    e.preventDefault()
    const terms = document.getElementById("terms")
    const nameError = document.querySelector(".name.error")
    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")
    const passwordConfError = document.querySelector(".password-conf.error")
    const termsError = document.querySelector(".terms.error")
    passwordConfError.innerHTML = ""
    termsError.innerHTML = ""

    if(password !== passwordConfError || !terms.checked) {
      if (password !== passwordConf){
        passwordConfError.innerHTML = "Les mots de passe ne correspondent pas"
      }

      if (!terms.checked){
        termsError.innerHTML = "Veuillez accepter les conditions générales"
      }
    } else {
      await axios({
        method:"post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          name,
          email,
          password,
        }
      })
      .then((res)=> {
        if (res.data.errors) {
          nameError.innerHTML = res.data.errors.name 
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password 
        } else {
          setFormSubmit(true)
        }
      })
      .catch((err) => window.alert(err))
    }
  }

  return (
    <div>
      <>
        {formSubmit ? (
          <>
            <h4 className='sucess'>Votre inscription s'est bien déroulée, vous pouvez vous connecter</h4>
            <Connexion/>
          </>
        ): (
          <form action='' onSubmit={handleRegister}>
            <label htmlFor='name'>Votre nom</label>
              <input type="text" name='name' id='name' value={name} onChange={(e)=> setName(e.target.value)}/>
            <div className='name error'></div>

            <label htmlFor='email'>Votre email</label>
              <input type="text" name='email' id='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <div className='email error'></div>

            <label htmlFor='password'>Votre mot de passe</label>
              <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className='password error'></div>

            <label htmlFor='password-conf'>Confirmez votre mot de passe</label>
              <input type="password" name='password-conf' id='password-conf' value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)}/>
            <div className='password-conf error'></div>

            <label htmlFor='terms'>J'accepte les <a className='underline' href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
              <input type="checkbox" id='terms' />
            <div className='terms error'></div>
            
            <input type="submit" value="inscription"/>

          </form>
        )}     
      </>
    </div>
  )
}
