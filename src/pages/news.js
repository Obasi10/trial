
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Variants from "../components/variants";
import { useAuthContext } from "../hooks/useAuthContext";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}
  

const News =({dim, modal, count, setm, setc})=>{
    const {w, h}=dim
    const {user}=useAuthContext()
    const [suscribe, setsus]=useState(false)
    const queryfunction=async ( user, suscribe)=>{
      if (user) {
        const response = await fetch('/api/user/p3', {
          method: 'PATCH',
          headers: {'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'},
          body: JSON.stringify({...user, suscribe})
       })
       const json = await response.json()
       if (response.ok) {
        setm({...modal, submit: true})
       }
      }
      setc(count+1)
      setm({...modal, News: false})
    }

    const handleSubmit = async (e)=>{
      e.preventDefault()
      setsus(true)
      await queryfunction( user, suscribe)
    }

    return (
        <AnimatePresence>
          { (modal.News) && (
            <motion.div className="backdroppe"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="modale1 col-lg-7 col-11 p-sm-0 bg-trans" 
                variants={Variants}
                initial="hidden3"
                animate="visible2"
                exit="exit3"
                style={w<=700? {marginTop:"10%", height: "fit-content"}:{marginTop:"0%", height: "fit-content"}}
              >
                <section className="beginner bglight container-lg" style={{borderRadius: "10%"}}>
                    <div className='text-end m-2'>
                      <button onClick={()=>setm({...modal, News:false})} className="btn-close text-primary fw-bolder m-3 border-1" aria-label="Close"></button>
                    </div>
                <div className="text-center">
                    <h2 className={w>700?"color1":"color1 fs-3"}>Get Updates</h2>
                    <p className={w<700?"beginner text-center lead":"fs-5 text-center lead"}>Get the latest updates on various projects...</p>
                </div>
                <div className="row justify-content-center" >
                    <div className="text-center">
                    <p className="beginer my-4 mx-lg-2">We are on a journey to make life in mathematics easier for students, researchers, scientists, engineers etc. 
                    We will be providing innovative calculator designs on the various aspects of mathematics. 
                    Register to be alerted on the latest addition; it is no under-statement to tell you that this calculator will surpass your expectations.</p>
                    <motion.button variants={Variants} whileHover="hover" className="btn rounded-pill bgpupp textpele"
                        onClick={handleSubmit}
                    >
                        Register to get updates
                    </motion.button>
                    </div>
                </div>
            </section>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default News