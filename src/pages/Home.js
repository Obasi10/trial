import { useEffect}from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {Tooltip} from "bootstrap";
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";
import pic1 from "../images (3).jpeg";
import pic2 from "../2022-07-20_16h11_15.png";
import pic3 from "../2022-09-20_01h28_31.png";
import doc2 from "../USAID Supply Chain analysis.xlsx";
import doc3 from "../Mooring system analysis.pdf";
import { useLogout } from '../hooks/useLogout';

const tooltips = document.querySelectorAll('.tt')
tooltips.forEach(t => {
  new Tooltip(t)
})

const svgVariants = {
  hidden: { rotate: [180,0,-180,0] },
  visible: { 
    rotate: 0,
    transition: { duration : 15, repeat:25}
  },
}

const pathVariants = {
  hidden: {
    opacity: 0.5,
    pathLength: 0.5,
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
const nextVariants = {
  hidden: { 
    x: '-100vw' 
  },
  visible: {
    x: 0,
    transition: { type: 'spring', stiffness: 200, duration:10}
  } 
}

const Home = ({dim, setInput, count, setc, setp, setm, modal,setn,setn1,setl, lock, setcalc, setErrorr}) => {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  const {w, h}=dim
  const height=h*0.3 +""
  const width=w*0.3+""
  const {logouter}=useLogout()


  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typeset()
    }
  },[])
  useEffect(() => {
    setcalc(false);
    setp(0);
    const fetchWorkouts = async () => {
      try{
        const response = await fetch('/api/workouts', {
          method: 'POST',
          body: JSON.stringify({title: ""}),
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
          }
        })
        if(response.status===401){
            logouter()
        }
      } catch(err){
        setErrorr(err.message)
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [])
  useEffect(()=>{setn(undefined);setInput("");setl("h"); setn1(undefined); setcalc(true); setm({...modal, Ready: false})},[lock, h,w])
  
  const des=["black","purple","#B7BBBD","#49616E","rgb(34, 34, 212)"]

  return (
      <>
          <section id="intro"> 
            <div className="container-lg">
              <div className="row g-md-2 g-1 col-lg-9 col-12 justify-content-around align-items-center" style={{margin: "auto"}}>
                <div className="col-7 text-start">
                  <h1>
                    <div className="loading11 fw-bolder mb-md-3 mt-lg-0 mt-4 mb-3 begin textpep text-start" style={{lineHeight: 1.1, fontFamily:"sans-serif"}} 
                    >The Ultimate Calculator</div>
                  </h1>
                  <div style={{fontStyle: "italic", lineHeight:1.1}}>
                  <div className="loading12 beginer text-start" >Stupendous design of innovative solutions...</div>
                  <div className="my-1 beginer motion3 text-start" style={{color: "purple"}} >Also introducing the simplest form of the ideal solution to the 
                    Legendre equation.</div>
                  <motion.p ><a href="#projects" className="mt-md-5 mt-1 text-muted text-decoration-none beginer">
                    Check out my other Projects
                  </a></motion.p></div>
                </div>
                <div className="col-md-4 col-3 me-2 d-md-block">
                  {/* <!-- tooltip --> */}
                  <motion.svg height={height} width={width} variants={svgVariants} initial="hidden" animate="visible" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 291.764 291.764">
                  <g>
                    <motion.path variants={pathVariants} className="motion14" d="M36.47,0h218.824c10.066,0,18.235,8.169,18.235,18.235v255.294c0,10.066-8.169,18.235-18.235,18.235
                      H36.47c-10.066,0-18.235-8.169-18.235-18.235V18.235C18.234,8.16,26.404,0,36.47,0z"/>
                    <motion.path variants={pathVariants} className="motion15" d="M45.587,27.353h200.588v63.824H45.587V27.353z"/>
                    <motion.path variants={pathVariants} style={{fill:des[2]}} d="M191.47,45.588v27.353h36.471V45.588H191.47z M218.823,63.824h-18.235v-9.118h18.235V63.824z"/>
                    <motion.path variants={pathVariants} className="motion17" d="M45.587,154.991h36.471V118.52H45.587V154.991z M100.293,154.991h36.471V118.52h-36.471V154.991z
                      M154.999,118.529V155h36.471v-36.471H154.999z M45.587,209.697h36.471v-36.461H45.587V209.697z M100.293,209.697h36.471v-36.461
                      h-36.471V209.697z M154.999,209.697h36.471v-36.461h-36.471V209.697z M45.587,264.403h36.471v-36.471H45.587V264.403z
                      M100.293,264.403h36.471v-36.471h-36.471V264.403z M154.999,264.403h36.471v-36.471h-36.471V264.403z"/>
                    <motion.path variants={pathVariants} className="motion16" d="M209.705,118.529V155h36.471v-36.471H209.705z M209.705,264.403h36.471v-91.167h-36.471V264.403z"/>
                  </g>
                  </motion.svg>
                </div>
              </div>
            </div>
          </section>

          <motion.div className="accordion beginner col-lg-5 col-9 mt-lg-5 mt-md-2 mt-1" style={{margin: "auto"}} id="chapters" variants={nextVariants} initial="hidden" animate="visible"
          >
            <div className="accordion-item bglight" >
              <h2 className="accordion-header" id="heading-1">
                <button className="beginner accordion-button bgbtn mx-0 mt-0" style={{fontWeight: 700, textAlign: "center", color:"rgb(240, 176, 240)"}} 
                type="button" data-bs-toggle="collapse" data-bs-target="#chapter-1" aria-expanded="true" aria-controls="chapter-1">
                  Select Field
                </button>
              </h2>
              <div id="chapter-1" className="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#chapters">
                <div className={dim.w<700?"accordion-body beginner justify-content-center px-0":"accordion-body fs-5 justify-content-center px-0"}>
                  <Link to="/calculation" style={{textDecoration: "none"}}><button className='btnlist col-12 align-items-center mx-0' style={{display:"flex"}} onClick={()=>{setc(count + 1); setcalc(true)}}>
                    <motion.div className='text-start motion23 col-8 ps-lg-3'>Legendre Equation</motion.div>
                  <div className='textpop begine col-4 text-end me-0'>available</div>
                  </button></Link>
                  <Link to="/calculation2" style={{textDecoration: "none"}}><button className='btnlist col-12 align-items-center mx-0' style={{display:"flex"}} onClick={()=>{setc(count + 1); setcalc(true)}}>
                  <div className="container table-responsive pt-0" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                      <motion.div
                        animate={{
                          x:[0,-300,0,-300,0],
                          transition:{
                              delay:2,
                              duration:140,
                              repeat:Infinity,
                              ease: "easeInOut",
                              spring: 120
                          }
                        }}
                      >
                    <motion.div className='text-start motion23 col-8 ps-lg-3'>\((1-x^2)y''-2(m+1)xy'+(n-m)(n+m+1)y=0\)</motion.div>
                      </motion.div>
                    </div>
                  <div className='textpop begine col-4 text-end me-0'>available</div>
                  </button></Link>
                  <Link to="/calculation3" style={{textDecoration: "none"}}><button className='btnlist col-12 align-items-center mx-0' style={{display:"flex"}} onClick={()=>{setc(count + 1); setcalc(true)}}>
                    <div className="container table-responsive pt-0" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                      <motion.div
                        animate={{
                          x:[0,-200,0,-200,0],
                          transition:{
                              delay:2,
                              duration:100,
                              repeat:Infinity,
                              ease: "easeInOut",
                              spring: 120
                          }
                        }}
                      >
                        <motion.div className='text-start motion23 col-8 ps-lg-3'>\((1-x^2)y''+2mxy'+(n-m)(n+m+1)y=0\)</motion.div>
                      </motion.div>
                    </div>
                  <div className='textpop begine col-4 text-end me-0'>available</div>
                  </button></Link>
                  <Link to="/calculation4" style={{textDecoration: "none"}}><button className='btnlist col-12 align-items-center mx-0' style={{display:"flex"}} onClick={()=>{setc(count + 1); setcalc(true)}}>
                  <div className="container table-responsive pt-0" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                      <motion.div
                        animate={{
                          x:[0,-120,0,-120,0],
                          transition:{
                              delay:2,
                              duration:60,
                              repeat:Infinity,
                              ease: "easeInOut",
                              spring: 120
                          }
                        }}
                      >
                    <motion.div className='text-start motion23 col-8 ps-lg-3'><span>\((1-x^2)y''-(2n+1)xy'+ky=0\)</span></motion.div></motion.div></div>
                  <div className='textpop begine col-4 text-end me-0'>available</div>
                  </button></Link>
                  <Link to="/calculation5" style={{textDecoration: "none"}}><button className='btnlist col-12 align-items-center mx-0' style={{display:"flex"}} onClick={()=>{setc(count + 1); setcalc(true)}}>
                  <div className="container table-responsive pt-0" style={{width:"fit-content", overflowX:"hidden", overflowY:"hidden"}}>
                      <motion.div
                        animate={{
                          x:[0,-120,0,-120,0],
                          transition:{
                              delay:2,
                              duration:50,
                              repeat:Infinity,
                              ease: "easeInOut",
                              spring: 120
                          }
                        }}
                      >
                    <motion.div className='text-start motion23 col-8 ps-lg-3'>\((1-x^2)y''+(2n+1)xy'+ky=0\)</motion.div></motion.div></div>
                  <div className='textpop begine col-4 text-end me-0'>available</div>
                  </button></Link>
                  <button className='btnlist col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8 ps-lg-3'>Laplace Equation</div>
                  <div className='textpop begine col-4 text-end me-0'>not available</div>
                  </button>
                  <button className='btnlist col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8 ps-lg-3'>Simultaneous Equation</div>
                  <div className='textpop begine col-4 text-end me-0'>not available</div>
                  </button>
                  <button className='btnlist col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8 ps-lg-3'>Quadratic Equation</div>
                  <div className='textpop begine col-4 text-end me-0'>not available</div>
                  </button>
                  <button className='btnlist col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8 ps-lg-3'>Differential Equations</div>
                  <div className='textpop begine col-4 text-end me-0'>not available</div>
                  </button>
                  <button className='btnlist col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8 ps-lg-3'>Mechanics</div>
                  <div className='textpop begine col-4 text-end me-0'>not available</div>
                  </button>
                  <button className='btnlist col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8 ps-lg-3'>Thermodynamics</div>
                  <div className='textpop begine col-4 text-end me-0'>not available</div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        
          <section id="projects" className="bgcon my-5 py-4 col-lg-10 col-9" style={{borderRadius: "10%", margin:"auto"}}>
            <div className="container-lg">
              <div className="text-center">
                <h2 className="fw-bolder fs-1 textpele">Other Projects</h2>
                <p className="lead text-muted beginner text-center">Review the projects that interests you...</p>
              </div>

              <div className="row my-lg-3 my-5 align-items-center justify-content-center">
                <div className="col-8 col-lg-4">
                  <div className="card border-0" style={{borderRadius: "10%", marginLeft: "4%"}}>
                    <div className="card-body text-center py-5">
                      <h4 className="card-title color1">Mooring Analysis</h4>
                      <p className="lead card-subtitle beginner text-center mb-1">Estimating environmental loads</p>
                      <img src={pic1} className="img-fluid" alt="mooring analysis"/>
                      <p className="card-text mx-1 text-muted d-none fs-5 d-lg-block">Determining the maximum environmental load to move the anchor...</p>
                      <a href={doc3} download="" className="btn bgpupp textpele btn-lg-lg mt-3">
                        view
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-9 col-lg-4">
                  <div className="card border-primary border-2" style={{borderRadius: "10%"}}>
                    <div className="card-header text-center text-primary">Most Popular</div>
                    <div className="card-body text-center py-5">
                      <h4 className="card-title color1">🎲 Roll 'n' Guess</h4>
                      <p className="lead card-subtitle beginner text-center mb-1">Test your guessing ability...</p>
                      <img src={pic3} className="img-fluid" alt="🎲"/>
                      <p className="card-text mx-1 text-muted d-none fs-5 d-lg-block">"... want to test your guessing ability? then be rest
                        assured you are in the right place."</p>
                      <a href="https://roll-and-guess.vercel.app/" className="btn bgpupp textpele btn-lg-lg mt-3">
                        view
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-8 col-lg-4">
                  <div className="card border-0" style={{borderRadius: "10%", marginRight: "4%"}}>
                    <div className="card-body text-center py-4">
                      <h4 className="card-title color1">Sales Data Analysis</h4>
                      <p className="lead card-subtitle beginner text-center mb-1">Interactive Dashboard Design</p>
                      <img src={pic2} className="img-fluid" alt="alternative calculator"/>
                      <p className="card-text mx-1 text-muted d-none fs-5 d-lg-block">The excel file contains four sheets, namely: dashboard, Input data, master data and analysis sheet.</p>
                      <a href={doc2} className="btn bgpupp textpele btn-lg-lg mt-3">
                        view
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>



          {/* <!-- reviews list --> */}
          <section id="reviews">
            <div className="container-lg mt-5">
              <div className="text-center">
                <h2 className="textpop fw-bold fs-1"><i className="bi bi-stars textpop"></i>Reviews</h2>
                <p className="lead text-muted beginner text-center mb-0">Reviews from scholars...</p>
              </div>

              <div className="row justify-content-center mb-1"  style={{borderRadius: "10%"}}>
                <div className="col-lg-8">
                  <div className="list-group">
                    <div className="list-group-item bgsel py-3">
                      <div className="pb-2">
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                      </div>
                      <h6 className="mb-1 fs-5  text-primary">Handful to students and researchers.</h6>
                      <p className="mb-1 beginner">The design is really impressive. It will be helpful to students and researchers studying mathematics.</p>
                      <small className="textpop begine">Math_407</small>
                    </div>
                    <div className="list-group-item bgsel py-3">
                      <div className="pb-2">
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                      </div>
                      <h6 className="mb-1 fs-5 text-primary">Nice</h6>
                      <p className="mb-1 beginner">Wow impressive, this is good work.</p>
                      <small className="textpop begine">Kobe_douche</small>
                    </div>
                    <div className="list-group-item bgsel py-3">
                      <div className="pb-2">
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-fill text-gold"></i>
                        <i className="bi bi-star-half text-gold"></i>
                      </div>
                      <h6 className="mb-1 fs-5 text-primary">I am impressed</h6>
                      <p className="mb-1 beginner"> I am impressed with all your projects that I have seen so far.</p>
                      <small className="textpop begine">Tolacat</small>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </section>
      </>
  )
}

export default Home