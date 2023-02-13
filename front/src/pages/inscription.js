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
    <div className ="flex flex-col">
      <>
        {formSubmit ? (
          <>
            <h4 className='sucess'>Votre inscription s'est bien déroulée, vous pouvez vous connecter</h4>
            <Connexion/>
          </>
        ): (
          <form action='' onSubmit={handleRegister} className=" bg-slate-50 flex flex-col border-2 border-l-4 rounded-md border-black mx-12 my-4 md:mx-[20%] lg:mx-[20%]">
            <label htmlFor='name' className='my-2'>Votre nom</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%] lg:mx-[30%]'
               type="text" name='name' id='name' value={name} onChange={(e)=> setName(e.target.value)}/>
            <div className='name error'></div>

            <label htmlFor='email' className='my-2'>Votre email</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%] lg:mx-[30%]'
               type="text" name='email' id='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <div className='email error'></div>

            <label htmlFor='password' className='my-2'>Votre mot de passe</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%] lg:mx-[30%]'
               type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className='password error'></div>

            <label htmlFor='password-conf' className='my-2'>Confirmez votre mot de passe</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%] lg:mx-[30%]'
               type="password" name='password-conf' id='password-conf' value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)}/>
            <div className='password-conf error'></div>

            <label htmlFor='terms' className=' mx-8 my-2 md:mx-12'>J'accepte les <a className='underline' href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
              <input type="checkbox" id='terms' />
            <div className='terms error'></div>
            
            <input type="submit" className='border-2 border-black my-2 mx-[25%] xs:mx-[40%] sm:mx-[42%] md:mx-[40%] lg:mx-[43%] xl:mx-[43%] 2xl:mx-[43%]' value="inscription"/>

          </form>
        )}     
      </>
    </div>
  )
}
