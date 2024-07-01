import React, {memo, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Variants from '../components/variants';
import { Tooltip } from 'bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

const tooltips = document.querySelectorAll('.tt')
tooltips.forEach(t => {
  new Tooltip(t)
})

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal1 = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    margin: "auto",
    y: "100px", 
    opacity: 1,
    transition: { delay: 0.5 }
  },
  exit: { y: "100vh", opacity: 0 }
}

const Log = ({modal, setm, setlog, setErrorr}) => {
  const w=document.documentElement.clientWidth
  const [email, setEmail] = useState('')
  const [butt, setb]=useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {dispatch}= useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!navigator.onLine){
      setErrorr("Network problem! check your connection and try again.")
    } else {
      setm({...modal, Ready:true})
      return new Promise(function(resolve, reject){
        const timeout= setTimeout(()=>{
          reject()
        }, 5000);
  
        fetch('/api/user/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, password })
        })
        .then(response=>{
          clearTimeout(timeout);
          response.json()
          .then((json)=>{
            if (json.error) {
              setIsLoading(false)
              setErrorr(json.error)
              setm({...modal, Ready:false})
            } else {
              // save the user to local storage
              localStorage.setItem('user', JSON.stringify(json))
              // update loading state
              setIsLoading(false)
              // update the auth context
              dispatch({type: 'LOGIN', payload: json})
              setm({...modal, Ready:false})
              setm({...modal, logpage: false})
              setm({...modal, logged: true})
            }
          })
        })
        .catch(()=>{
          handleSubmit(e)
        })
      })
    }
  }
  return (
    <AnimatePresence>
      { (modal.logpage) && (
        <motion.div className="backdropp"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modale1 col-lg-5 col-11 p-0 bg-trans" 
            variants={modal1}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={w<=700? {marginTop:"10%", height: "fit-content"}:{marginTop:"10%", height: "fit-content"}}
          >
            <section className="beginner bgbtn container-lg pt-3" style={{borderRadius: "10%"}}>
              <div className={w<700?"text-center beginner":"text-center fs-5"}>
                  <h2 className={w<700?"color1":"color1 fs-3"}><strong>Login/ Sign up</strong></h2>
                  <p className={w<700?"lead":"fs-5 lead"}>Join the community to get unlimited access...</p>
              </div>
              <div className="row justify-content-center" >
              <form 
                method="post" 
                encType="multipart/form-data"
                className='fs-5 col-lg-8 col-10'
                name="EmailForm"
                onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label textpop">Email address</label>
                <div className="input-group mb-4">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill text-secondary"></i>
                  </span>
                  <input type="text" id="email" onChange={(e)=>setEmail(e.target.value)} value={email}
                  className="form-control" />
                  
                  <span className="input-group-text textpop">
                    <span className="tt" data-bs-placement="bottom" title="Enter your email">
                      <i className="bi bi-question-circle text-muted"></i>
                    </span>
                  </span>
                </div>
                <label htmlFor="name" className="form-label textpop">Password</label>
                <div className="mb-4 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-key text-secondary"></i>
                  </span>
                  <input type={butt?"text":"password"} id="password" onChange={(e)=>setPassword(e.target.value)} value={password}
                  className="form-control"/>
                  <span className="input-group-text">
                    <span type="button" onClick={()=>butt?setb(false):setb(true)}>
                      <i className="bi bi-eye-fill text-muted"></i>
                    </span>
                  </span>
                </div>
                
                <div className="mb-4 text-center">
                  <button type="submit" disabled={isLoading} className="btn btn-secondary textpep bgpupp">Log in</button>
                </div>
                <div className="beginer" style={{color: "white"}}>
                  Don't have an account yet? <Link to="/login"><span type="button" className="textpop text-decoration-underline" onClick={()=>{setlog(false); setm({...modal, logpage:false})}}>Sign up now </span></Link>
                </div>
              </form>
              </div>
          </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default memo(Log);