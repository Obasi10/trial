import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Login = ({setm, modal, setl, log, setlog, setErrorr, setp}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [isLoading, setIsLoading]= useState(false)
  const { dispatch } = useAuthContext()
  const {user}=useAuthContext()
  const [name, setsname]=useState("")
  const [butt, setb]=useState(false)
  const [butt1, setb1]=useState(false)
  const review=""
  const reviewStar=""
  const reviewTitle=""
  const query=""
  const queryName=""
  const queryEmail=""
  const queryType=""
  const suscribe=""
  const [description, setdes]=useState("")
  

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    if (navigator.onLine===false){
      setErrorr("Network problem! check your connection and try again.")
    } else {
      if(password===password1){
        setm({...modal, Ready:true})
        return new Promise(function(resolve, reject){
          const timeout= setTimeout(()=>{
            reject()
          }, 3000);
    
          fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, description, email, password, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe})
          })
          .then(response=>{
            clearTimeout(timeout);
            response.json()
            .then((json)=>{
              if (json.error) {
                setIsLoading(false)
                setErrorr(json.error)
                setm({...modal, Ready: false})
              } else {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))
                // update loading state
                setIsLoading(false)
                // update the auth context
                dispatch({type: 'LOGIN', payload: json})
                setm({...modal, Ready:false})
                setm({...modal, signed: true})
              }
            })
          })
          .catch(()=>{
            setErrorr("Took too long to load...")
          });
        })
      } else {
        setErrorr("Your password must match to sign up successfully")
        setPassword('')
        setPassword1('')
        setb(false)
        setb1(false)
      }
    }
  }

  const logsub=async (e)=>{
    e.preventDefault()
    if (!navigator.onLine){
      setErrorr("Network problem! check your connection and try again.")
    } else {
      setm({...modal, Ready:true})
      return new Promise(function(resolve, reject){
        const timeout= setTimeout(()=>{
          reject()
        }, 3000);
  
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
              setm({...modal, logged: true})
            }
          })
        })
        .catch(()=>{
          setErrorr("Took too long to load...")
        })
      })
    }
  }
  useEffect(()=>{setm({...modal, Ready: false}); setl("l"); setp(0)},[])
  const w=document.documentElement.clientWidth

  return (
    <>
    <section>
      <div className="container-lg mt-4">
      <div className="text-center">
        <h2 className="textpop fw-bold fs-1">The Ultimate Calculator</h2>
        <p className="beginner text-center lead text-muted">Stupendous design of innovative solutions...</p>
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-lg-6 col-md-8 col-10"> 
          {!log && (<form 
            method="post" 
            encType="multipart/form-data"
            className={w<700?"beginner justify-content-center":"fs-5 justify-content-center"}
            name="EmailForm"
            onSubmit={handleSubmit1}>
            <label htmlFor="email" className="form-label textpop">Email address:</label>
            <div className="input-group mb-4">
              <span className="input-group-text bgbtn">
                <i className="bi bi-envelope-fill text-secondary"></i>
              </span>
              <input type="text" id="email" onChange={(e)=>setEmail(e.target.value)} value={email}
              className="form-control bgliter" placeholder="e.g. dean234@gmail.com" />
              
              <span className="input-group-text bgbtn">
                <span className="tt" data-bs-placement="bottom" title="Enter an email address we can reply to.">
                  <i className="bi bi-question-circle text-muted"></i>
                </span>
              </span>
            </div>
            <label htmlFor="name" className="form-label textpop">User Id:</label>
            <div className="mb-4 input-group">
              <span className="input-group-text bgbtn">
                <i className="bi bi-person-fill text-secondary"></i>
              </span>
              <input type="text" id="name" onChange={(e)=>setsname(e.target.value)} value={name}
              className="form-control bgliter" placeholder="e.g. Daniel_127" />
              {/* <!-- tooltip --> */}
              <span className="input-group-text bgbtn">
                <span className="tt" data-bs-placement="bottom" title="Pretty self explanatory really...">
                  <i className="bi bi-question-circle text-muted"></i>
                </span>
              </span>
            </div>
            <div className="mb-4 mt-5 form-floating">
              <textarea className="form-control bgliter" id="query" onChange={(e)=>setdes(e.target.value)} value={description}
                style={{height: "140px"}} placeholder="Briefly describe yourself..."></textarea>
              <label htmlFor="query">Brief description about you...</label>
            </div>
            <label htmlFor="subject" className="form-label textpop">Password</label>
            <div className="mb-4 input-group">
              <span className="input-group-text bgbtn">
                <i className="bi bi-key text-secondary"></i>
              </span>
              <input type={butt?"text":"password"} id="password" onChange={(e)=>setPassword(e.target.value)} value={password}
                className="form-control bgliter"/>
              <span className="input-group-text bgbtn">
                <span type="button" onClick={()=>butt?setb(false):setb(true)}>
                  <i className={!butt?"bi bi-eye-fill text-muted":"bi bi-eye text-muted"}></i>
                </span>
              </span>
            </div>
            <label htmlFor="subject" className="form-label textpop">Confirm password</label>
            <div className="mb-4 input-group">
              <span className="input-group-text bgbtn">
                <i className="bi bi-key text-secondary"></i>
              </span>
              <input type={butt1?"text":"password"} id="password1" onChange={(e)=>setPassword1(e.target.value)} value={password1}
                className="form-control bgliter"/>
              <span className="input-group-text bgbtn">
                <span type="button" onClick={()=>butt1?setb1(false):setb1(true)}>
                  <i className={!butt1?"bi bi-eye-fill text-muted":"bi bi-eye text-muted"}></i>
                </span>
              </span>
            </div>
            <div className="mb-4 text-center">
              <button className="btn btn-secondary textpele bgpupp" disabled={isLoading}>Sign up</button>
            </div>
            
            <div className="beginer">
              Already have an account? <span type="button" className="textpop text-decoration-underline" onClick={()=>setlog(true)}>Login now</span>
            </div>
          </form>)}
          {log && (
                <form 
                method="post" 
                encType="multipart/form-data"
                className={w<700?"beginner col-lg-8 justify-content-center":"fs-5 col-lg-8 col-10 justify-content-center"}
                name="EmailForm"
                style={{margin:"auto"}}>
                <label htmlFor="email" className="form-label textpop">Email address</label>
                <div className="input-group mb-4">
                  <span className="input-group-text bgbtn">
                    <i className="bi bi-envelope-fill text-secondary"></i>
                  </span>
                  <input type="text" id="email" onChange={(e)=>setEmail(e.target.value)} value={email}
                  className="form-control bgliter" />
                  
                  <span className="input-group-text bgbtn">
                    <span className="tt" data-bs-placement="bottom" title="Enter your email">
                      <i className="bi bi-question-circle text-muted"></i>
                    </span>
                  </span>
                </div>
                <label htmlFor="name" className="form-label textpop">Password</label>
                <div className="mb-4 input-group">
                  <span className="input-group-text bgbtn">
                    <i className="bi bi-key text-secondary"></i>
                  </span>
                  <input type={butt?"text":"password"} id="password" onChange={(e)=>setPassword(e.target.value)} value={password}
                  className="form-control bgliter"/>
                  <span className="input-group-text bgbtn">
                    <span type="button" onClick={()=>butt?setb(false):setb(true)}>
                    <i className={!butt?"bi bi-eye-fill text-muted":"bi bi-eye text-muted"}></i>
                    </span>
                  </span>
                </div>
                
                <div className="mb-4 text-center">
                  <button className="btn btn-secondary textpele bgpupp" disabled={isLoading} onClick={logsub}>Log in</button>
                </div>
                <div className="beginer">
                  Don't have an account yet? <span type="button" className="textpop text-decoration-underline" onClick={()=>setlog(false)}>Sign up now </span>
                </div>
              </form>
          )}
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Login