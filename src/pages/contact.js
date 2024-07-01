import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Pic from "../IMG-20211001-WA0003.jpg";
import Variants from "../components/variants";
import doc from "../Best ever Solutions to sets of Riccatti Equation.pdf"

const svgVariants = {
    hidden: { rotate: [-180,0,180] },
    visible: { 
      rotate: 0,
      transition: { duration : 15, repeat:10}
    },
  }
  
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { 
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
 };

const tooltips = document.querySelectorAll('.tt')
tooltips.forEach(t => {
  new Tooltip(t)
})


const Contact =({dim, setp, setl, lock, modal, setm, setdim, setErrorr})=>{
  const {user}=useAuthContext()
  const [queryEmail, setQemail]=useState('')
  const [queryType, setQtype]=useState('')
  const [query, setQuery]=useState('')
  const [queryName, setQname]=useState('')
  const [emptyFields, setEmptyFields] = useState([])
  const {logout}=useLogout()

  useEffect(()=>{setl('');setp(0); setl("c")},[lock])
  const w=dim.w
  const queryfunction=async ( user, queryName, queryEmail, queryType, query)=>{
    if (!user){
      setm({...modal, logSub:true})
    } else {

      if (navigator.onLine===false){
        setErrorr("Network problem! check your connection and try again.")
      } else{
        setm({...modal, Ready: true})
        return new Promise(function(resolve, reject){
          const timeout= setTimeout(()=>{
            reject()
          }, 500);
    
          fetch('/api/user/p1', {
            method: 'PATCH',
            headers: {'Authorization': `Bearer ${user.token}`,
                      'Content-Type': 'application/json'},
            body: JSON.stringify({...user, queryName, queryEmail, queryType, query})
          })
          .then(response=>{
            clearTimeout(timeout);
            response.json()
            .then((json)=>{
              if (json.error && json.error[0]==='P'){
                setErrorr(json.error)
                setEmptyFields(json.emptyFields)
                setm({...modal, Ready: false})
              } else if (!json.error && json.email){
                setQemail('')
                setQname('')
                setQtype('')
                setQuery('')
                setEmptyFields([])
                setm({...modal, Ready: false})
                setm({...modal, submit: true})
              } else {
                logout()
                setm({...modal, Ready: false})
                setErrorr(json.error)
              }
            })
          })
          .catch(()=>{
            queryfunction( user, queryName, queryEmail, queryType, query)
          });
        })
      }
    }}

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await queryfunction(user, queryName, queryEmail, queryType, query)
  }
  useEffect(()=>setp(0), [])
  useEffect(()=>{
    function handle(){setdim({
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    })
    const h1=dim.w<=1270?((1280-dim.w))*(10/1000)+"%":"0%"
    }
    window.addEventListener('resize', handle)
    
    return _=>{
      window.removeEventListener('resize', handle)
    }
  });
    return(
        <>
          {/* <!-- contact form -->
          <!-- form-control, form-label, form-select, input-group, input-group-text --> */}
          <div className={w<=700?"m-0 beginner":"m-0 fs-5"}>
            <div className="container container-lg row col-lg-7 col-md-9 beginner" style={w<=1280?{margin:"auto", paddingTop:(9-(w/(1280/9)))+"%"}:{paddingTop:"0%"}} >
              <div className="text-center">
                <h2 className="textpop fw-bold fs-1">About <span className="">Devel<motion.span className="bi bi-diamond-fill text-primary fs-5" initial={{opacity:0, rotate:[0,180,0,-180]}}
                  animate={{rotate: 0, opacity:1, transition:{repeat:Infinity, duration: 5}}}></motion.span>per</span></h2>
                <p className="beginner text-center lead text-muted">A pace-setter in web development and data presentation...</p>
              </div>
              <div className="bglight p-md-5 p-4" style={{borderRadius: "15%"}}>
              <p style={{fontWeight:400, fontStyle: "italic"}}>
                <img className="styleimg" src={Pic} alt=""/>
                 <a href="https://innocent-obasi.vercel.app" style={{textDecoration: "none", color: "purple", scale: 1.2}}>Innocent Obasi</a> is an innovative mathematician, engineer and web developer: with the sole purpose of bringing a new dimension of innovation to the IT sector.</p>
              <p style={{fontWeight:400, fontStyle: "italic"}}>My aim is to champion comprehensible, better quality and aesthetical data presentations in the market of data presentation that yearns for more innovation.</p>
              
              <p style={{fontWeight:400, fontStyle: "italic"}}>Also; to harness skills in IT, science and engineering towards the goal of forming a niche in the cyberspace; that enhances the effective synchronization of these fields (careers), with the aim of providing quality and comprehensible solutions to the needs of the environment and the world at large.</p>
              <p style={{fontWeight:400, fontStyle: "italic"}}>The PDF document below, authored by me, provides a detailed documentation to the formula used in this calculator</p>
              <div className="text-center"><motion.a href={doc} variants={Variants} download={""} type="button" whileHover="hover" className="btn rounded-pill bgpupp align-items-center text-center textpele"
                    >
                        Download
                    </motion.a></div>
              </div>
            </div>
            <div className="container-lg mt-4">
              <div className="text-center">
                <h2 className="textpop fw-bold fs-1">Get in Touch</h2>
                <p className="beginner text-center lead text-muted">Questions to ask? Fill out the form to contact us directly...</p>
              </div>
              <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                  
                  <form 
                    method="post" 
                    encType="multipart/form-data"
                    className='beginner'
                    name="EmailForm"
                    onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label textpop">Email address:</label>
                    <div className="input-group mb-4">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill text-secondary"></i>
                      </span>
                      <input type="text" id="email" onChange={(e)=>setQemail(e.target.value)} value={queryEmail}
                      className={emptyFields.includes('queryEmail') ? 'form-control error bgliter' : 'form-control bgliter'} placeholder="e.g. Ade@gmail.com" />
                      {/* <!-- tooltip --> */}
                      <span className="input-group-text textpop">
                        <span className="tt" data-bs-placement="bottom" title="Enter an email address we can reply to.">
                          <i className="bi bi-question-circle text-muted"></i>
                        </span>
                      </span>
                    </div>
                    <label htmlFor="name" className="form-label textpop">Name:</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i className="bi bi-person-fill text-secondary"></i>
                      </span>
                      <input type="text" id="name" onChange={(e)=>setQname(e.target.value)} value={queryName}
                      className={emptyFields.includes('queryName') ? 'form-control error bgliter' : 'form-control bgliter'} placeholder="e.g. mike" />
                      {/* <!-- tooltip --> */}
                      <span className="input-group-text">
                        <span className="tt" data-bs-placement="bottom" title="Pretty self explanatory really...">
                          <i className="bi bi-question-circle text-muted"></i>
                        </span>
                      </span>
                    </div>
                    <label htmlFor="subject" className="form-label textpop">What is the mail like?</label>
                    <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <i className="bi bi-chat-right-dots-fill text-secondary"></i>
                      </span>
                      <select className="form-select" id="subject" onChange={(e)=>setQtype(e.target.value)} value={queryType}>
                        <option defaultValue="click to select" className="bgliter">Click to select</option>
                        <option value="Contribution">Contribution</option>
                        <option value="Support">Support</option>
                        <option value="Questions">Questions</option>
                      </select>
                    </div>
                    <div className="mb-4 mt-5 form-floating">
                      <textarea className={emptyFields.includes('query') ? 'form-control error bgliter' : 'form-control bgliter'} id="query" onChange={(e)=>setQuery(e.target.value)} value={query}
                       style={{height: "140px"}} placeholder="query"></textarea>
                      <label htmlFor="query">Your query...</label>
                    </div>
                    <div className="mb-4 text-center">
                      <button type="submit" className="btn btn-secondary textpele bgpupp">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer id='footer' className='beginer textpop col-lg-6 col-11 text-decoration-none text-start' style={{margin:"auto"}}>
            <section className="split contact box">
                <section className="alt py-2 align-items-center px-2">
                  <h5 className='textpop beginner'>Address</h5>
                  <p className="change ms-2">Meiran, Lagos<br />
                  Nigeria</p>
                </section>
                <section className="alt py-2 align-items-center px-2">
                  <h5 className='textpop beginner'>Phone</h5>
                  <p className="change ms-2">(+234) 8133151825</p>
                </section>
                <section className="alt py-2 align-items-center px-2">
                  <h5 className='textpop beginner'>Email</h5>
                  <p className="change ms-2"> Obasiinno99@gmail.com<br />
                  Questerstores4u@gmail.com</p>
                </section>
                <section className="alt py-2 align-items-center ps-2">
                  <h5 className='textpop beginner me-0 pe-0'>Social</h5>
                  <ul className="icons alt ms-0 ps-0">
                    <ul style={{display: "flex"}} id="icons1">
                      <li className="p-2 nav-link"><Link to="https://www.linkedin.com/in/innocent-obasi-72ab6022a" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16" variants={svgVariants} initial="hidden" animate="visible">
                          <motion.path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" variants={pathVariants}/>
                        </svg></Link></li>
                      <li className="p-2 nav-link"><Link to="https://www.facebook.com/obasi.chukwuma.77" target="_blank" variants={svgVariants} initial="hidden" animate="visible">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16" variants={svgVariants} initial="hidden" animate="visible">
                          <motion.path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" variants={pathVariants}/>
                        </svg></Link></li>
                      <li className="p-2 nav-link">
                        <Link to="https://wa.link/fjkcmd" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16" variants={svgVariants} initial="hidden" animate="visible">
                            <motion.path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" variants={pathVariants}/>
                        </svg></Link></li>
                    </ul>
                  </ul>
                </section>
              </section>
          </footer>
        </>
    )
}

export default Contact