import React, {useState} from 'react'
import axios from "axios"

export default function Connexion() {

  const [email, setEmail] = useState("")
  const [ password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")

    axios({
      method:"post",
      url:`${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials:true,
      data: {
        email,
        password,
      }
    })
      .then((res)=> {
        if(res.data.errors){
          emailError.innerHTML = res.data.errors.email 
          passwordError.innerHTML = res.data.errors.password 
        } else {
          window.location="/"
        }
      })
      .catch((err)=> {
        window.alert(err)
      })
  }

  return (
    <div>
      <form action='' onSubmit={handleLogin} className="">
        <label htmlFor='email'>Votre email</label>
        <br/>

        <input  className="border-2 border-black"
          type="text"
          name='email'
          id='email'
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
        />

        <div className='email error'></div>
        <br/>

        <label htmlFor='password'>Votre mot de passe</label>
        <br/>

        <input className='border-2 border-black'
          type="password"
          name='password'
          id='password'
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
        />

        <div className='password error'></div>
        <br/>

        <input className='border-2 border-black my-2 px-2' type="submit" value="connexion" />
      </form>
    </div>
  )
}
