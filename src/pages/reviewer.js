import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Variants from "../components/variants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}
  
const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      margin: "auto",
      y: "200px", 
      opacity: 1,
      transition: { delay: 0.5 }
    },
}

const Reviewer =({dim, modal, setm, count, setc, setErrorr})=>{
    const {w, h}=dim
    const {user}=useAuthContext()
    const [rev, setrev]=useState(false)
    const star=[1,2,3,4,5]
    const {logout}=useLogout()
    const [emptyFields, setEmptyFields]=useState([])
    const [reviewStar, setrev2]=useState(0)
    const [reviewTitle, setTitle]=useState("")
    const [review, setBody]=useState("")

    const revfunc=(i)=>{
      setrev2(i)
    } 
    const queryfunction=async ( user, reviewTitle, review, reviewStar)=>{
      if (user) {
        if (navigator.onLine===false){
          setErrorr("Network problem! check your connection and try again.")
        } else{
          setm({...modal, Ready: true})
          const response = await fetch('/api/user/p2', {
            method: 'PATCH',
            headers: {'Authorization': `Bearer ${user.token}`,
                      'Content-Type': 'application/json'},
                      body: JSON.stringify({...user, reviewTitle, review, reviewStar})
          })
          const json = await response.json()
          .then((json)=>{
            if (json.error && json.error[0]==='P'){
              setErrorr(json.error)
              setEmptyFields(json.emptyFields)
              setm({...modal, Ready: false})
            } else if (!json.error && json.email){
              setTitle('')
              setBody('')
              setEmptyFields([])
              setm({...modal, review: false})
              setm({...modal, submit: true})
            } else {
              logout()
              setm({...modal, review: false})
              setErrorr(json.error)
            }
          })
      }
      }
      setc(count+1)
    }
    const clasrev=(i)=>{
     if (i<=reviewStar){
        return "bi bi-star-fill text-gold px-2"
     } else {
       return "bi bi-star px-2"
     }
    }
    const anim={
      y: [1.5, 0, -1.5, 0],
      scale: [1.7,1.6,1.7,1.6],
      transition:{
        repeat: 3,
        duration: 1
      }
    }
    const animrev=(i)=>{
      if (i<=reviewStar){
        return anim
     } else {
       return ""
     }
    }
    const setting=()=>{
      if (user && reviewStar){
        setrev(true)
      }
      if (!user){
        setm({...modal, review: false})
        setc(count+1)
      }
    }
    const handleSubmit = async (e)=>{
      e.preventDefault()
      await queryfunction( user, reviewTitle, review, reviewStar)
    }
    return (
        <AnimatePresence>
          { (modal.review) && (
            <motion.div className="backdropp"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="modale1 col-lg-5 col-10 bg-trans p-0" 
                variants={Variants}
                initial="hidden3"
                animate="visible2"
                exit="exit3"
                style={w<=700? {marginTop:"25%", height: "fit-content"}:{marginTop:"8%", height: "fit-content"}}
              >
              <section className={rev?"beginner bgbtn container-lg pt-1":"beginner bglight container-lg pt-1"} style={{borderRadius: "10%"}}>
                <div className='text-end m-0 p-0'>
                  <button onClick={()=>setm({...modal, review: false})} className="btn-close text-primary fw-bolder m-3 border-1" aria-label="Close"></button>
                </div>
              <div className={w<700?"text-center beginner":"text-center fs-5"}>
                  <h2 className={w>700?"color1":"color1 fs-3"}><strong>Review</strong></h2>
                  <p className={w>700?"lead":"fs-5 lead"}>Please rate your experience...</p>
              </div>
              {!rev && (<div className="row p-0">
                <div className="text-center d-flex justify-content-center mt-0 pt-0" style={{margin: "auto"}}>
                  {star.map((i,k)=>(
                    <motion.div type="button" key={k} onClick={()=>revfunc(i)} animate={animrev(i)} className={clasrev(i)} style={{scale:"1.6"}}></motion.div>
                  ))}
                </div>
                <div className="d-flex mt-4" style={{margin: "auto", justifyContent: "center", alignSelf: "center"}}>
                  <button onClick={()=>setting()} className="btn bgpupp textpele mx-3 px-2"> proceed</button>
                  <button onClick={()=>{setrev2(0)}} className="btn bgpupp textpele mx-3 px-2"> clear</button>
                </div>
              </div>)}
              {rev && (
                <div className="row p-0">
                <div className="text-center d-flex justify-content-center mt-0 pt-0" style={{margin: "auto"}}>
                  {star.map((i,k)=>(
                    <motion.div animate={animrev(i)} key={k} className={clasrev(i)} style={{scale:"1.6"}}></motion.div>
                  ))}
                </div>
                <div>
                <form 
                    method="post" 
                    encType="multipart/form-data"
                    className={w<700? "beginner col-lg-8 col-10":"fs-5 col-lg-8 col-10"}
                    style={{margin:"auto", alignSelf: "center"}}
                    onSubmit={handleSubmit}>
                    <label htmlFor="name" className="form-label fw-bolder textpop">Title:</label>
                    <div className="input-group mb-4">
                      <span className="input-group-text">
                        <i className="bi bi-calculator text-secondary"></i>
                      </span>
                      <input type="text" onChange={(e)=>setTitle(e.target.value)} value={reviewTitle}
                      className={emptyFields.includes('reviewTitle') ? 'form-control error' : 'form-control'} />
                      {/* <!-- tooltip --> */}
                      <span className="input-group-text textpop">
                        <span className="tt" data-bs-placement="bottom" title="Please enter a title for your review">
                          <i className="bi bi-question-circle text-muted"></i>
                        </span>
                      </span>
                    </div>
                    <div className="mb-2 mt-2 form-floating">
                    <textarea className={emptyFields.includes('review') ? 'form-control error' : 'form-control'} id="query" onChange={(e)=>setBody(e.target.value)} value={review}
                       style={{height: "140px"}}></textarea>
                      <label htmlFor="query">Drop your review...</label>
                    </div>
                    <div className="mb-0 pb-0 text-center">
                      <button type="submit" className="btn btn-secondary textpele bgpupp">Submit</button>
                    </div>

                  </form>
                </div>

                </div>
              )}
              </section>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default Reviewer