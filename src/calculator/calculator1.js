import React, {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Variants from "../components/variants";
import { Link } from "react-router-dom";

var array=[
    "\\(P_n(x)=\\frac {1} {2^n}\\sum_{r=0}^\\frac {n} {2} \\frac {(-1)^r\\ (2n-2r)!} {(n-r)!\\ (n-2r)!\\ r!}x^{n-2r}\\)",
    "\\(Q_n(x)=[P_n(x)]\\ tanh^{-1}(x) \\ \\ +\\)",
    "\\(\\frac {1} {2^n}\\sum_{r=0}^\\frac {n-1} {2} \\ (-1)^{r+1}\\)",
    "\\(\\sum_{k=0}^r \\frac {(2n-2k)!\\ (2k)!}{((n-k)!\\ k!)^2}\\)",
    "\\(\\frac {(n-1-r)!\\ r!}{(2r+1)!\\ (n-1-2r)!}x^{n-1-2r}\\)"
]

const Calculation=({n, setn,n1,setn1,dim, setm, modal,calc, setcalc, setp, settab, setdim, setErrorr})=>{
  const {w,h}=dim
  const [select, setse]=useState(false)
  const ref=useRef(null)

  useEffect(()=>setp(0),[])
  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typeset()
      setse(false)
    }
  },[n1])
  const [h1, seth1]=useState(dim.w<=1280?((1280-dim.w))*(25/1000)+"%":"0%")
  useEffect(()=>{
      function handle(){setdim({
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
      })
      seth1(dim.w<=1280?((1280-dim.w))*(25/1000)+"%":"0%")
      }
      window.addEventListener('resize', handle)
      
      return _=>{
          window.removeEventListener('resize', handle)
      }
  });
  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typeset()
      settab(false)
    }
    setcalc(true)
  },[])
  const err=()=>{
    if((n1<0 || Number.isInteger(Number(n1))===false || n1>75 || !n1)){
      setse(false)
      setErrorr("Note that n must be either zero or a positive integer less than or equal to 75")
    } else {
      setse(true)
      setcalc(false)
      setm({...modal, Ready: true})
    }
  }
    return (
        <>
                <section id="calculate" className="container-md col-lg-6 col-11 bglight py-2 px-1 px-sm-0" style={{marginTop:h1}}
                >
                <div className="mt-1 beginner px-sm-0">
                    <article>
                    <div id="pa1">
                        <span className="date begine px-sm-0"> Smart calculator</span>
                        <AnimatePresence>
                            <motion.div key={n1}
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              transition={{spring: 700, ease: 'easeIn', duration:1}}
                              exit={{opacity:0}}
                            >
                              <h2 style={{textTransform: "none", textAlign: "center", fontWeight: 900}}><a href="#input" className={dim.w<700?"beginner fw-bolder":"fs-5 fw-bolder"} style={{color: "rgb(48, 1, 48)"}}>\((1-x^2)y''-2xy'+\)
                                {(!n1 || n1<0 || Number.isInteger(Number(n1))===false || n1>75)?"\\(n(n+1)\\)":`\\(${(n*1)*((n*1)+1)}\\)`}\(y=0\)
                              </a>
                              </h2>
                            </motion.div>
                          {
                            (!select) && (
                              <motion.div key="selecte"
                                variants={Variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit2"
                              >
                                <h2><span className={dim.w<700?"text-start beginner text-muted":"text-start fs-5 text-muted"}> Select the value of 'n': 
                                <span className="ms-2">
                                  <span className="tt" style={{maxWidth: "90%"}} data-bs-placement="bottom" title=" The above equation represents the legendre equation, the solution presented by this calculator
                                  consists of two terminating series Pn(x) and Qn(x) as its fundamental solution; which makes it better than any other contemporary solution...">
                                    <i className="bi bi-question-circle text-muted"></i>
                                  </span>
                                </span>
                                </span></h2>
                                <div className="row g-0 col-10 note1 align-contents-center align-items-center justify-contents-center">
                                <input ref={ref} className="col-lg-6 col-8 text-center p-1" type="number" onInput={()=>setcalc(false)} id="input" placeholder="Enter the value of n (1,2,3...)"
                                  onChange={(e)=>{setn1(e.target.value); setn(Number(e.target.value))}} value={n1}/>
                                <Link className="col-3 col-lg-1" to={!n? "":"/solution"}><motion.button variants={Variants} whileHover="hover" className="btn textpele p-1 px-2" id="btn--select" onClick={err}>Select</motion.button></Link>
                                </div>
                              </motion.div>
                            )
                          }
                        </AnimatePresence>
                    </div>
                    </article>
                </div>
            </section>
          {/* <!-- topics at a glance --> */}
            <section id="topics">
              <div className="container-md mt-5">
                <div className="text-center">
                  <h2 className="textpop fs-1 fw-bold"><i className='bi bi-book'></i> Documentation...</h2>
                  <p className="lead text-muted beginner text-center">A quick glance at the innovative solution</p>
                </div>
                <div className="row mb-3 g-1 justify-content-lg-around align-items-center">
                  <div className="col-12 col-lg-5 beginner" style={w>350?{margin: "auto"}: {width:"100%"}}>
                    {/* <!-- Header --> */}
                    <header id="logo" className="textpep py-3 beginner">
                      \((1-x^2)y''-2xy'+n(n+1)y=0
                      \)
                      <div className="left1">\( where\ n=0,1,2,3,...\)</div>
                      <div>\(y=C_1\ P_n(x)+ C_2\ Q_n(x)\)</div>
                      <div className="left1">\( where: \)</div><span>{array[0]}</span>
                      <div className="px-2 container table-responsive pt-0 my-3" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}} >
                        <motion.div className="align-items-center d-flex"
                              animate={{
                                x:[0,-300,0,300,0],
                                transition:{
                                    delay:2,
                                    duration:60,
                                    repeat:Infinity,
                                    ease: "easeInOut",
                                    spring: 120
                                }
                              }}
                        >
                          {array[1]+array[2]+array[3]+array[4]}
                        </motion.div>
                      </div>
                    </header>
                  </div>
                  <div className="col-lg-6">
                    
                    {/* <!-- accordion --> */}
                    
                    <div className={dim.w<700?"accordion beginner":"accordion fs-5"} id="chapters">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="heading-1">
                          <button className={dim.w<700?"accordion-button beginner m-0 bgbtn":"accordion-button fs-5 bgbtn"} style={{fontWeight: 700, textAlign: "center", color:"rgb(240, 176, 240)"}} 
                          type="button" data-bs-toggle="collapse" data-bs-target="#chapter-1" aria-expanded="true" aria-controls="chapter-1">
                            Overview
                          </button>
                        </h2>
                        <div id="chapter-1" className="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#chapters">
                          <div className="accordion-body bglight border-0 justify-content-center">
                            <p>The Legendre equation arises in mathematical models of heat conduction in spherical geometries and expansion of electromagnetic potential. It is encountered in situations where one has to solve partial differential equations containing the Laplacian polar coordinates. This Calculator presents the simplest form of the Legendre function of the second kind, \(Q_n(x)\). Before now, it had been presented in form of a recursion formula. The Legendre equation can be written as:</p>
                            <div className="text-center mb-2">\((1-x^2)y''-2xy'+n(n+1)y=0\)</div>
                            <div>\( where\ n=1,2,3,...\)</div>
                            <p style={{marginTop: "3%", marginBottom:"0%"}}>
                              The general solution is given in the form of Legendre functions of the first and second kind (\(P_n(x)\) and \(Q_n(x)\)), it can be written as:
                            </p>
                            <div className="text-center">\(y=C_1\ P_n(x)+ C_2\ Q_n(x)\)</div>
                            <p>\(P_n (x)\) and  \(Q_n (x)\) are the two fundamental solutions, and both of which converge for \(-1\lt x\lt1\).
                            </p>
                          </div>
                        </div>
                      </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="heading-2">
                          <button className={dim.w<700?"accordion-button beginner m-0 bgbtn":"accordion-button fs-5 bgbtn"} style={{fontWeight: 700, textAlign: "center", color:"rgb(240, 176, 240)"}} 
                            type="button" data-bs-toggle="collapse" data-bs-target="#chapter-2" aria-expanded="false" aria-controls="chapter-2">
                              Legendre function of the first kind, \(\ P_n(x)\)
                            </button>
                          </h2>
                          <div id="chapter-2" className="accordion-collapse collapse" aria-labelledby="heading-2" data-bs-parent="#chapters">
                            <div className={dim.w<700?"accordion-body beginner m-0 bglight border-0 justify-content-center":"accordion-body m-0 bglight border-0 fs-5 justify-content-center"}>
                              <p>
                                \(P_n (x)\) is also referred to as Legendre polynomial. 
                              </p>
                              <div className="text-center">
                              {"\\(P_n(x)=\\frac {1} {2^n} \\sum_{r=0}^\\frac {n} {2} \\frac {(-1)^r\\ (2n-2r)!} {(n-r)!\ (n-2r)!\ r!}x^{n-2r}\\)"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="heading-3">
                          <button className={dim.w<700?"accordion-button beginner m-0 bgbtn":"accordion-button fs-5 bgbtn"} style={{fontWeight: 700, textAlign: "center", color:"rgb(240, 176, 240)"}} 
                             type="button" data-bs-toggle="collapse" data-bs-target="#chapter-3" aria-expanded="false" aria-controls="chapter-1">
                              Legendre function of the second kind, \(\ Q_n(x)\)
                            </button>
                          </h2>
                          <div id="chapter-3" className="accordion-collapse collapse" aria-labelledby="heading-3" data-bs-parent="#chapters">
                            <div className="accordion-body m-0 bglight border-0 justify-content-center">
                            <div className="px-2 container table-responsive pt-0 my-3" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}} >
                            <motion.div className="align-items-center d-flex"
                              animate={{
                                x:[0,-300,0,300,0],
                                transition:{
                                    delay:2,
                                    duration:60,
                                    repeat:Infinity,
                                    ease: "easeInOut",
                                    spring: 120
                                }
                              }}
                            >
                              {array[1]+array[2]}<span className="npall">{array[3]}</span>{array[4]}
                            </motion.div>
                            </div>
                              <p>
                                The above equation (Obasi, 2022) is analogous to the recursion formula (Campbell, 2020) given by the French mathematician Pierre Ossian Bonnet, however, this equation which was developed by the author, will undoubtedly prove to be more direct; especially when trying to determine the solution to a Legendre equation with a high value of n. 
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="heading-4">
                          <button className={dim.w<700?"accordion-button beginner m-0 bgbtn":"accordion-button fs-5 bgbtn"} style={{fontWeight: 700, textAlign: "center", color:"rgb(240, 176, 240)"}} 
                             type="button" data-bs-toggle="collapse" data-bs-target="#chapter-4" aria-expanded="false" aria-controls="chapter-4">
                              References
                            </button>
                          </h2>
                          <div id="chapter-4" className="accordion-collapse collapse" aria-labelledby="heading-4" data-bs-parent="#chapters">
                            <div className="accordion-body m-0 bglight border-0 justify-content-center">
                              <ol>
                                <li className="py-2"> Obasi, I. C. (2022). The Ideal Solution to the Legendre Equation and Laplace Equation. (Undergoing review)</li>
                                <li className="py-2">Campbell, J. (2020). New families of double hypergeometric series for constants involving 1/π^2 .  hal-02986446</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                    </div>

                  </div>
                </div>
              </div>
              <script>
                function focusor() {
                    ref.current && !n1 && n1!==0 && calc? setTimeout(()=>ref.current.focus(),2000): n1=n1
                }
                document.getElementById("calculate").addEventListener("load", focusor) 
              </script>
            </section>

        </>
    )
}

export default Calculation