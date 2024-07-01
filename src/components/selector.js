import React, {memo, useState, Fragment, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Variants from './variants';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const nextVariants = {
    hidden: { 
      x: '-100vw'
    },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 200, duration:10}
    } 
}

const moda={
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    margin: "auto",
    y: "200px", 
    opacity: 1,
    transition: { delay: 0.5 }
  },
}

const text=[
    "Legendre Equation",
    "Laplace Equation",
    "Simultaneous Equation",
    "Quadratic Equation",
    "Differential Equations",
    "Mechanics",
    "Thermodynamics"
]

const Selector=({modal, input,count, setm, setc, nav}) => {
    useEffect(()=>{},[input])
  return (
    <div>
    <AnimatePresence >
      { modal.S && (
        <motion.div className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
        <div className="accordion beginner col-lg-5 col-9" style={{margin: "auto", marginTop:"20%"}} id="chapters" variants={nextVariants} initial="hidden" animate="visible">
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading-1">

              </h2>
                <div id="chapter-1" className="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#chapters">
                        <div className='text-end'>
                            <button className="btn-close text-primary fw-bolder mt-1 border-1" aria-label="Close" onClick={()=>setm({...modal, S: false})}></button>
                        </div>
                        {text.map((i,k)=>(
                            <>
                            {(i.toLowerCase().match(nav.toLowerCase()) && nav!==""&& nav!==" " && k===0) && (
                                <div key={k}>
                                <div className="accordion-body beginner justify-content-center px-0">
                                <Link to="/calculation" style={{textDecoration: "none"}}><button className='btnlist row col-12 align-items-center mx-0' onClick={()=>{setc(count + 1)}} 
                                 style={{display:"flex"}}><div className='text-start col-8'>Legendre Equation</div>
                                <div className='textpop begine col-4 text-end me-0'>available</div>
                                </button></Link></div></div>
                            )}</>
                        ))
                        }
                        {text.map((i,k)=>(
                            <>
                            {(i.toLowerCase().match(nav.toLowerCase()) && nav!==""&& nav!==" " && k!==0) && (
                                <Fragment key={k}>
                                <div className="accordion-body beginner justify-content-center px-0">
                                <button className='btnlist row col-12 align-items-center mx-0' onClick={()=>{setc(count + 1); setm({...modal, av:true})}} style={{display:"flex"}}><div className='text-start col-8'>{i}</div>
                                <div className='textpop begine col-4 text-end me-0'>not available</div>
                                </button></div></Fragment>
                            )}</>
                        ))
                        }
                    </div>
                </div>
                </div>
          </motion.div>
      )}
    </AnimatePresence>
    </div>
  )

}

export default memo(Selector);