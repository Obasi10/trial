import React, {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Variants from "../components/variants";
import { Link } from "react-router-dom";
import Butt from "./butt";

var array=[
    "\\(x-i\\sqrt{1-x^2}\\)",
    "\\(x+i\\sqrt{1-x^2}\\)",
]

const Calculation=({n, setn,k,setk,n1,setn1,dim, setm, modal,calc, setcalc, setp, settab, setdim, setErrorr})=>{
  const {w,h}=dim
  const [select, setse]=useState(false)
  const ref=useRef()

  useEffect(()=>setp(0),[])
  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typeset()
      setse(false)
    }
  },[k,n1])
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
    setTimeout(()=>ref.current.focus(),2000)
  },[])
  const err=()=>{
    if(((!k && Number.isInteger(k)) || (!n1 && Number.isInteger(n1)===false))){
      setse(false)
      setErrorr("Choose the value of n and k")
    } else if (!n1 && Number.isInteger(n1)===false){
      setse(false)
      setErrorr("Choose the value of n")
    } else if (!k && Number.isInteger(k)==false){
      setse(false)
      setErrorr("Note that k can be any number, integer or not, real or complex.")
    } else {
      setse(true)
      setcalc(false)
      setm({...modal, Ready:true})
    }
  }

  const click=(i)=>{
    setn1(i)
    setn(i)
  }
  const formap=Array.from(Array(6).keys())

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
                              <h2 style={{textTransform: "none", textAlign: "center", fontWeight: 900}}><a href="#input" className="fs-5 fw-bolder" style={{color: "rgb(48, 1, 48)"}}>
                              <span style={{textDecoration: "none"}}>
                                    {((!k && Number.isInteger(k)==false) || (!n1 && Number.isInteger(n1)===false))?
                                    "\\((1-x^2)y''-2(n+1)xy'+ky=0\\)":`\\((1-x^2)y''-${n1===0?"":2*(n1*1)+1}xy'${(k*1)<0? "": "+"}${k*1}y=0\\)`}</span>
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
                                  <span className="tt" style={{maxWidth: "90%"}} data-bs-placement="bottom" title=" The above equation represents a certain set of variable coefficient differential equation...">
                                    <i className="bi bi-question-circle text-muted"></i>
                                  </span>
                                </span>
                                </span></h2>
                                <div className="row align-items-center text-center justify-content-center">
                                  <div className="col-4 note1 align-items-start">
                                    {
                                      formap.map((i,ko)=>(
                                        <>
                                        <Butt
                                         n1={n1} onClick={click}
                                         mkey={ko}>{i}</Butt>
                                        </>
                                      ))
                                    }
                                  </div>
                                  <div className="col-3 note1 align-items-center">
                                  <Link to={(n1 || Number.isInteger(n1)===true) && (k || Number.isInteger(k)===true)?"/solution4":""}><motion.button variants={Variants} whileHover="hover" className="btn textpele px-2 col-lg-2 col-4" id="btn--select" onClick={err}>Proceed</motion.button></Link>
                                  </div>
                                  <div className="col-4 note1 align-items-end">
                                  <input className="col-lg-7 col-10 text-center px-1" type="number" ref={ref} onInput={()=>setcalc(false)} id="input" placeholder="Enter k"
                                    onChange={(e)=>{setk(e.target.value)}} value={k}/>
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
                    <header id="logo1" className="textpep py-3 beginner">
                      \((1-x^2)y''-(2n+1)+ky=0\)
                      <div className="left1">\( where\ n=0,1,2,3... \ \ and\ k\ any\ number\)</div>
                      <div>{"\\(y=C_1\ F_n(x)+ C_2\ G_n(x)\\)"}</div>
                      <div className="left1">\(to\ aid \ easier\ presentation\ of\ solutions, \)</div><span>\(let\ v=k+n^2\)</span>
                      <div className="left1 my-0">\(for\ n=0,\ \ \ \ \ v=k+0=k\)</div>
                      <div className="my-0 py-0">\((1-x^2)y''-x+ky=0\)</div>
                      <div>{"\\(F_0(x)=\\)"}<span className="npallf">{array[0]}</span><span>{"\\(^{\\sqrt{V}}\\)"}</span>{"\\( \\ \\ \\)"}<span>{"\\(G_0(x)=\\)"}</span>
                      <span className="npallf">{array[1]}</span>{"\\(^{\\sqrt{V}}\\)"}</div>
                      <div className="left1 my-0">\(for\ n=1,\ \ \ \ \ v=k+1\)</div>
                      <div className="my-0 py-0">\((1-x^2)y''-3x+ky=0\)</div>
                      <div>{"\\(F_1(x)=\\frac{1}{\\sqrt{1-x^2}}\\)"}<span className="npallf">{array[0]}</span><span>{"\\(^{\\sqrt{V}}\\)"}</span></div>
                      <div>{"\\(G_1(x)=\\frac{1}{\\sqrt{1-x^2}}\\)"}<span className="npallf">{array[1]}</span>{"\\(^{\\sqrt{V}}\\)"}</div>
                      <div className="left1 my-0">\(for\ n=2,\ \ \ \ \ v=k+4\)</div>
                      <div className="my-0 py-0">\((1-x^2)y''-5x+ky=0\)</div>
                      <div>{"\\(F_2(x)=\\frac{1}{\\sqrt{(1-x^2)^3}}\\)"}<span className="npallf">{array[0]}</span><span>{"\\(^{\\sqrt{V}}\\)"}</span><span className="mx-1 npallf">{"\\(x+i\\sqrt{v(1-x^2)}\\)"}</span></div>
                      <div>{"\\(G_2(x)=\\frac{1}{\\sqrt{(1-x^2)^3}}\\)"}<span className="npallf">{array[1]}</span>{"\\(^{\\sqrt{V}}\\)"}<span className="mx-1 npallf">{"\\(x-i\\sqrt{v(1-x^2)}\\)"}</span></div>
                      <div className="container table-responsive pt-0 my-3" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                        <motion.div className=""
                          animate={{
                            x:[0,-300,0,-300,0],
                            transition:{
                                delay:2,
                                duration:20,
                                repeat:Infinity,
                                ease: "easeInOut",
                                spring: 120
                            }
                          }}
                        >
                      <div className="left1 my-0">\(for\ n=3,\ \ \ \ \ v=k+9\)</div>
                      <div className="my-0 py-0">\((1-x^2)y''-7x+ky=0\)</div>
                      <div className="d-flex align-items-center">{"\\(F_3(x)=\\frac{1}{\\sqrt{(1-x^2)^5}}\\)"}<span className="npallf">{array[0]}</span><span>{"\\(^{\\sqrt{V}}\\)"}</span><div className="mx-1 npallf d-flex">{"\\(3x^2+3ix\\sqrt{v(1-x^2)}-(v-1)(1-x^2)\\)"}</div></div>
                      <div className="d-flex align-items-center">{"\\(G_3(x)=\\frac{1}{\\sqrt{(1-x^2)^5}}\\)"}<span className="npallf">{array[1]}</span>{"\\(^{\\sqrt{V}}\\)"}<span className="mx-1 npallf d-flex">{"\\(3x^2-3ix\\sqrt{v(1-x^2)}-(v-1)(1-x^2)\\)"}</span></div>
                        </motion.div>
                      </div>
                      <div className="container table-responsive pt-0 my-3" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                        <motion.div className=""
                          animate={{
                            x:[0,-600,0,-600,0],
                            transition:{
                                delay:3,
                                duration:20,
                                repeat:Infinity,
                                ease: "easeInOut",
                                spring: 120
                            }
                          }}
                        >
                      <div className="left1 my-0">\(for\ n=4,\ \ \ \ \ v=k+16\)</div>
                      <div className="my-0 py-0">\((1-x^2)y''-9x+ky=0\)</div>
                      <div className="d-flex align-items-center">{"\\(F_4(x)=\\frac{1}{\\sqrt{(1-x^2)^7}}\\)"}<span className="npallf">{array[0]}</span><span>{"\\(^{\\sqrt{V}}\\)"}</span><div className="mx-1 npallf d-flex">{"\\(15x^3+15ix^2\\sqrt{v(1-x^2)}-(6v-9)x(1-x^2)-i(v-4)\\sqrt{v(1-x^2)^3}\\)"}</div></div>
                      <div className="d-flex align-items-center">{"\\(G_4(x)=\\frac{1}{\\sqrt{(1-x^2)^7}}\\)"}<span className="npallf">{array[1]}</span>{"\\(^{\\sqrt{V}}\\)"}<span className="mx-1 npallf d-flex">{"\\(15x^3-15ix^2\\sqrt{v(1-x^2)}-(6v-9)x(1-x^2)+i(v-4)\\sqrt{v(1-x^2)^3}\\)"}</span></div>
                        </motion.div>
                      </div>
                      <div className="container table-responsive pt-0 my-3" style={{overflowX:"hidden", overflowY:"hidden"}}>
                        <motion.div
                          animate={{
                            x:[0,-900,0,-900,0],
                            transition:{
                                delay:4,
                                duration:20,
                                repeat:Infinity,
                                ease: "easeInOut",
                                spring: 120
                            }
                          }}
                        >
                      <div className="left1 my-0">\(for\ n=25,\ \ \ \ \ v=k+25\)</div>
                      <div className="my-0 py-0">\((1-x^2)y''-11x+ky=0\)</div>
                      <div className="max" >{"\\(F_5(x)=\\frac{1}{\\sqrt{(1-x^2)^9}}\\)"}<div className="npallf">{array[0]}</div><div>{"\\(^{\\sqrt{V}}\\)"}</div><div className="mx-1 npallf d-flex">{"\\(105x^4+105ix^3\\sqrt{v(1-x^2)}-(45v-90)x^2(1-x^2)-i(10v-55)x\\sqrt{v(1-x^2)^3}+(v^2-10v+9)(1-x^2)^2\\)"}</div></div>
                      <div className="max">{"\\(G_5(x)=\\frac{1}{\\sqrt{(1-x^2)^9}}\\)"}<span className="npallf">{array[1]}</span>{"\\(^{\\sqrt{V}}\\)"}<span className="mx-1 npallf d-flex">{"\\(105x^4-105ix^3\\sqrt{v(1-x^2)}-(45v-90)x^2(1-x^2)+i(10v-55)x\\sqrt{v(1-x^2)^3}+(v^2-10v+9)(1-x^2)^2\\)"}</span></div>
                        </motion.div>
                      </div>
                    </header>
                  </div>
                  <div className="col-lg-6">

                  </div>
                </div>
              </div>
              <script>
                function focusor() {
                    ref.current && !k && calc? setTimeout(()=>ref.current.focus(),2000): k=k
                }
                document.getElementById("calculate").addEventListener("load", focusor) 
              </script>
            </section>

        </>
    )
}

export default Calculation