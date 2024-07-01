import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Variants from './variants';
import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useRef, useState } from 'react';

const svgVariants = {
  hidden: { rotate: -180 },
  visible: { 
    rotate: 0,
    transition: { 
      duration : 10,
      repeat: Infinity
   }
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

const Navbar = ({k,page, ref0, ref1, ref2, search, sets, modal, setm, input, setInput,setnav,lock, settab, selc}) => {
  const { user } = useAuthContext()
  const text=[
    "Legendre Equation",
    "Laplace Equation",
    "Simultaneous Equation",
    "Quadratic Equation",
    "Differential Equations",
    "Mechanics",
    "Thermodynamics"
  ]



//   else {
//    clearTimeout(refe)
//    clearTimeout(refe1)
//    clearTimeout(refe2)
//  }

  useEffect(()=>{},[search,input, setInput]);

  useEffect(()=>{sets(false);setInput("")},[modal.av])
  return (
    <>
    {(!modal.Ready && !modal.submit && !modal.News && !modal.av && !modal.S && !modal.D &&
     !modal.review && !modal.error && !modal.logpage && !modal.logSub) && 
    (
    <div>
      <div className="container col-lg-10 col-12 mb-0">
        <nav className="navbar fixed-top navbar-expand-md bgcon py-1 d-block">
          <div style={document.documentElement.clientWidth<500?{alignItems: "center", alignContent: "center", alignSelf: "center"}:{alignItems: "center", alignContent: "center", alignSelf: "center", maxWidth:"90%"}
          } className={document.documentElement.clientWidth>650?"ms-lg-2 ms-md-0 container-md fs-5":"container-md"}>
            <Link to="/" className="navbar-brand text-decoration-none fs-4 pt-2 col-md-3 me-md-3">
              <span className="fw-bold motion1">
                <i className="bi bi-calculator"></i>
                UltimateCalc
              </span>
            </Link>
            <div className='d-flex col-lg-8 col-md-12 col-2 text-end justify-content-space-around'>
            <span className='d-flex'> <button onClick={()=>{!search?sets(true):sets(false); setInput("")}} className='fw-bold border-0' style={{background: "transparent"}}><i className='bi bi-search textpele'></i></button>
            <button className="navbar-toggler border-0 py-1 text-end" type="button" onClick={()=>setm({...modal, offcanvas: true})} >
              <i className="bi bi-three-dots-vertical textpele p-1" ></i>
            </button></span>

            <div className="nav nav-pills collapse navbar-collapse align-center" id="nav-tab" role="tablist">
              <ul className={"navbar-nav align-items-center p-0 m-0"}>
                <li className="nav-item px-3">
                  <Link to="/" style={{textDecoration:"none"}} className={lock==="h"?"nav-link active textpele":"nav-link textpele"}>Home</Link>
                </li>
                {user && (<><li className="nav-item px-3">
                  <Link to="/profile" style={{textDecoration:"none"}} className={lock==="p"?"nav-link active textpele":"nav-link textpele"}>Profile</Link>
                </li>
                </>)}
                {!user && (
                  <li className="nav-item px-3">
                    <Link to="/login" style={{textDecoration:"none", width:"150px", textAlign:"center"}} className={lock==="l"?"nav-link active textpele":"nav-link textpele"} >Login/ SignUp</Link>
                  </li>
                )}
                <li className="nav-item px-3">
                  <Link to="/contact" style={{textDecoration:"none", width:"140px", textAlign:"center"}} className={lock==="c"?"nav-link active textpele":"nav-link textpele"}>Get in touch</Link>
                </li>
                {user && (<>
                  <li className="nav-item px-3"><i className='bi bi-person-bounding-box fs-4 textpele'></i></li>
                  <li className="nav-item px-3"><div type="button" className={lock==="lo"?"nav-link active textpele":"nav-link textpele"} style={{width:"140px", textAlign:"center"}} onClick={()=>setm({...modal, logOutpage:true})}>Log out</div></li></>
                )}

                <ul style={{display: "flex", justifyContent: "space-around"}} id={document.documentElement.clientWidth>=1280?"icons1":""}>
                  <li className="p-2 nav-link textpele"><Link to="https://www.linkedin.com/in/innocent-obasi-72ab6022a" target="_blank">
                    <motion.svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16" variants={svgVariants} initial="hidden" animate="visible">
                      <motion.path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" variants={pathVariants}/>
                    </motion.svg></Link>
                  </li>
                  <li className="p-2 nav-link textpele"><Link to="https://www.facebook.com/obasi.chukwuma.77" target="_blank" variants={svgVariants} initial="hidden" animate="visible">
                    <motion.svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16" variants={svgVariants} initial="hidden" animate="visible">
                      <motion.path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" variants={pathVariants}/>
                    </motion.svg></Link>
                  </li>
                  <li className="p-2 nav-link textpele">
                    <Link to="https://wa.link/fjkcmd" target="_blank">
                    <motion.svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16" variants={svgVariants} initial="hidden" animate="visible">
                      <motion.path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" variants={pathVariants}/>
                    </motion.svg></Link>
                  </li>
                </ul>
              </ul>
            </div>
            </div>
          </div>
          {(search) && (
                <div className="col-lg-4 col-8 textpele" style={{justifyContent: "center", display:"flex", margin: "auto"}}>
                  <input 
                    type="string"
                    onChange={(e)=>setInput(e.target.value)}
                    value={input}
                    autoFocus={setTimeout(()=>true,1000)}
                    className="row form-control mt-lg-2 mb-3 border-0 me-0 col-lg-3 col-6" />
                  {/* <!-- tooltip --> */}
                  <button className='border-0 col-lg-1 col-2 p-0' style={{background: "transparent"}} onClick={()=>{
                    sets(false); 
                    setnav(input);
                    setInput("")
                    setm({...modal, S:true})}}><span className="input-group-text mt-lg-2 mb-3 textpele">
                    <span className="tt" title="search">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                  </span></button>
                </div>
            )}
          {text.map((i,k)=>(
              <AnimatePresence key={k}>
              {(i.toLowerCase().match(input.toLowerCase()) && input!=="" && page!==1 && input!==" " && k===0) && (
                  <motion.p 
                  key="re" 
                  variants={Variants}
                  initial="hidden2"
                  animate="visible"
                  exit="exitmode"
                  className='row beginner text-start col-10 py-1 my-0' style={{lineHeight:"1", marginLeft: "20%"}}>
                    <Link to='/calculation' onClick={()=>{sets(false); setInput("")}} className='text-decoration-none textpele' key="ree">
                      <i className='bi bi-diamond-fill text-primary' key={i} ></i>  {i}
                    </Link></motion.p>
              )}
              {(i.toLowerCase().match(input.toLowerCase()) && input!==""&& input!==" " && page!==1  && k!==0) && (
                  <motion.p 
                  key={k+"re"}
                  variants={Variants}
                  initial="hidden2"
                  animate="visible"
                  exit="exit2"
                  className='row beginner text-start col-10 py-1 my-0' style={{lineHeight:"1", marginLeft: "20%"}}>
                    <a href='#sorry' className='text-decoration-none textpele' onClick={()=>{setm({...modal, av:true})}} key={k+"ree"}>
                    <i className='bi bi-diamond-fill text-primary' key={i}></i>  {i}
                    </a></motion.p>
              )}
              </AnimatePresence>
          ))
          }

          {page===1 && ( <div className="my-1 col-lg-8 align-items-center table-responsive justify-content-lg-center container-lg stytab">
                <div id="nav-tab" style={document.documentElement.clientWidth<700?{minWidth: "32rem"}:{minWidth: "50rem"}} role="tablist" >
                    <ul className="nav nav-pills justify-content-around p-0">
                    <li className={document.documentElement.clientWidth>700?"nav-item fs-5":"nav-item p-0 beginner"}><button className={"nav-link active fw-bold px-2 fst-italic d-flex textpele"} id="nav-full-solution-tab" data-bs-toggle="tab" data-bs-target="#nav-full-solution" type="button"
                        role="tab" aria-controls="nav-full-solution" aria-selected={"false"} onClick={()=>settab(false)}>
                        Full Solution
                        </button>
                    </li>
                    <li className={document.documentElement.clientWidth>700?"nav-item fs-5":"nav-item p-0 beginner"}><button ref={ref0} className={"nav-link fw-bold px-2 fst-italic textpele"} id="nav-graph-tab" data-bs-toggle="tab" data-bs-target="#nav-graph" type="button"
                        role="tab" aria-controls="nav-graph" aria-selected={"false"} onClick={()=>settab(true)}>
                        Simulation
                        </button>
                    </li>
                    {(!k && k!==0)&& <li className={document.documentElement.clientWidth>700?"nav-item fs-5":"nav-item p-0 beginner"}><button ref={ref1} className={"nav-link fw-bold px-2 fst-italic textpele"} id="nav-solution-tab" data-bs-toggle="tab" data-bs-target="#nav-solution" type="button"
                        role="tab" aria-controls="nav-solution" aria-selected="true" onClick={()=>settab(false)}>
                        Solution
                        </button>
                    </li>}
                    <li className={document.documentElement.clientWidth>700?"nav-item fs-5":"nav-item p-0 beginner"}><button ref={ref2} className={"nav-link fw-bold px-2 fst-italic textpele"} id="nav-calculator-tab" data-bs-toggle="tab" data-bs-target="#nav-calculator" type="button"
                        role="tab" aria-controls="nav-calculator" aria-selected={"false"} onClick={()=>{settab(false); selc(true)}}>
                        Calculator
                        </button>
                    </li>
                    </ul>
                </div>
            </div>)}
        </nav>
      </div>
    </div>
    )}
    </>

  )
}

export default Navbar