import React, {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Variants from "../components/variants";
import { Link } from "react-router-dom";

var array=[
    "\\(P_n(x,m)=\\frac {1} {2^n}\\sum_{r=0}^\\frac {n-m} {2} \\frac {(-1)^r\\ (2n-2r)!} {(n-r)!\\ (n-m-2r)!\\ r!}x^{n-m-2r}\\)",
    "\\(Q_n(x,m)=[P_n(x,m)]\\ tanh^{-1}(x) \\ \\ +\\)",
    "\\(\\frac {1} {2^n}\\sum_{r=0}^\\frac {n-m-1} {2}(-1)^{r+1}\\)",
    "\\(\\sum_{k=0}^r \\frac {(2n-2k)!\\ (2k)!}{((n-k)!\\ k!)^2}\\)",
    "\\(\\frac {(n-1-r)!\\ r!}{(2r+1)!\\ (n-m-2r-1)!}x^{n-m-2r-1}\\)",
    "\\(\\sum_{r=1}^m \\frac {m!} {(m-r)!r} \\)",
    "\\(\\sum_{k=0}^\\frac {r-1}{2} \\frac {r!}{(r-2k-1)!(2k+1)!} x^{r-2h-1}\\)",
    "\\(\\frac {P_n(x,m-r)} {(1-x^2)^r} \\ \\ +\\ \\)",
]

const Calculation2=({n, setn, n1,setn1,dim, setm, modal,calc,m, setem, setcalc, setp, settab, setdim, setErrorr})=>{
  const {w,h}=dim
  const [select, setse]=useState(false)
  const ref=useRef(null)
  useEffect(()=>setp(0),[])
  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typeset()
      setse(false)
    }
  },[n1,m])
  useEffect(()=>{
    setcalc(true)
  }, [])
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
  },[])
  const err=()=>{
    if((n1<0 || Number.isInteger(Number(n1))===false || !n1)){
      setse(false)
      setErrorr("Note that n must be a non-negative integer.")
    } else if ( n1-m>35 || m>15){
      setErrorr("Cannot handle cases belonging to m>15 and n-m>35")
    } else if (Number(m)<0 || Number.isInteger(Number(m))==false){
      setse(false)
      setErrorr("Note that m must be either zero or a positive integer less than or equal to the value of n.")
    } else if (Number(m)>Number(n)){
      setse(false)
      setErrorr("Note that m must be less than or equal to the value of n.")
    } else {
      setse(true)
      setcalc(false)
      setm({...modal, Ready: true})
    }
  }

    return (
        <>
                <section id="calculate"  className="container-md col-lg-6 col-11 bglight py-2 px-1 px-sm-0" style={{marginTop:h1}}
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
                              <div className="container table-responsive pt-0" 
                              style={(!n1 || n1<0 || Number.isInteger(Number(n1))===false||(!m)||Number.isInteger(Number(m))==false || Number(m)<0 || Number(m)>n || n1-m>35 || m>15)?
                                {width:"fit-content", overflowX:"hidden", overflowY:"hidden"}:{width:"80%", overflowX:"hidden", overflowY:"hidden"}}>
                                <motion.h2 style={{textTransform: "none", textAlign: "center", fontWeight: 900}}
                                    animate={{
                                      x:[0,-100,0,100,0],
                                      transition:{
                                          delay:2,
                                          duration:20,
                                          repeat:Infinity,
                                          ease: "easeInOut",
                                          spring: 120
                                      }
                                    }}
                                >
                                  <a href="#input" className={"fs-5 fw-bolder"} style={{color: "rgb(48, 1, 48)"}}>
                                  <span style={{textDecoration: "none"}}>
                                    {(!n1 || n1<0 || Number.isInteger(Number(n1))===false||(!m)||Number.isInteger(Number(m))==false || Number(m)<0 || Number(m)>n || n1-m>35 || m>15)?
                                    "\\((1-x^2)y''-2(m+1)xy'+(n-m)(n+m+1)y=0\\)":`\\((1-x^2)y''-${2*((m*1)+1)}xy'+${((n*1)-(m*1))*((n*1)+(m*1)+1)}y=0\\)`}</span>
                                </a>
                                </motion.h2>
                              </div>
                            </motion.div>
                          {
                            (!select) && (
                              <motion.div key="selecte"
                                variants={Variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit2"
                              >
                                <h2><span className={dim.w<700?"text-start beginner text-muted":"text-start fs-5 text-muted"}> Select the value of m and n; note that n <span>\(\geq m\)</span> 
                                <span className="ms-2">
                                  <span className="tt" style={{maxWidth: "90%"}} data-bs-placement="bottom" title=" The above equation represents a certain form of  
                                   variable coefficient differential equation...">
                                    <i className="bi bi-question-circle text-muted"></i>
                                  </span>
                                </span>
                                </span></h2>
                                <div className="row align-items-center text-center justify-content-center">
                                  <div className="col-4 note1 align-items-start">
                                  <input ref={ref} className="col-lg-7 col-10 text-center ps-1" type="number" onInput={()=>setcalc(false)} id="input" placeholder="Enter m"
                                    onChange={(e)=>{setem(e.target.value)}} value={m}/>
                                  </div>
                                  <div className="col-3 note1 align-items-center">
                                  <Link to={(!m || !n1 || m>n)?"": "/solution2"}><motion.button variants={Variants} whileHover="hover" className="btn textpele px-2 col-lg-2 col-3" id="btn--select" onClick={err}>Proceed</motion.button></Link>
                                  </div>
                                  <div className="col-4 note1 align-items-end">
                                  <input className="col-lg-7 col-10 text-center ps-1" type="number" onInput={()=>setcalc(false)} id="input" placeholder="Enter n"
                                    onChange={(e)=>{setn1(e.target.value); setn(Number(e.target.value))}} value={n1}/>
                                  </div>
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
                <div className="g-1 justify-content-lg-around align-items-center">
                  <div className="col-12 col-lg-7 beginner" style={w>350?{margin: "auto"}: {width:"100%"}}>
                    {/* <!-- Header --> */}
                    <header id="logo" className="textpep py-3 beginner">
                      <div className="container table-responsive pt-0" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                        <motion.div
                          animate={{
                            x:[0,-100,0,-100,0],
                            transition:{
                                delay:2,
                                duration:20,
                                repeat:Infinity,
                                ease: "easeInOut",
                                spring: 120
                            }
                          }}
                        >
                          \((1-x^2)y''-2(m+1)xy'+(n-m)(n+m+1)y=0
                          \)
                        </motion.div>
                      </div>
                      <div className="left1">\( where\ n=0,1,2,3,... \ \ and\ m\leq n\)</div>
                      <div>\(y=C_1\ P_n(x,m)+ C_2\ Q_n(x,m)\)</div>
                      <div className="left1">\( where: \)</div><span>{array[0]}</span>
                      <div className="px-2 container table-responsive pt-0 my-2" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}} >
                        <motion.div className="align-items-center d-flex"
                              animate={{
                                x:[0,-1000,0,-1000,0],
                                transition:{
                                    delay:2,
                                    duration:60,
                                    repeat:Infinity,
                                    ease: "easeInOut",
                                    spring: 120
                                }
                              }}
                        >
                          {array[1]+array[5]}<span className="npall">{array[6]}</span>{array[7]+array[2]}<span className="npall">{array[3]}</span>{array[4]}
                        </motion.div>
                      </div>
                    </header>
                  </div>

                </div>
              </div>
              <script>
                function focusor() {
                    ref.current && !m && m!==0 && calc? setTimeout(()=>ref.current.focus(),2000): m=m
                }
                document.getElementById("calculate").addEventListener("load", focusor) 
              </script>
            </section>
        </>
    )
}

export default Calculation2