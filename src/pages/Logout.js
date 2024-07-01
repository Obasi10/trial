import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Variants from "../components/variants";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}
  
  
const Logout =({dim, modal, setm, setl})=>{
    const {w, h}=dim
    const { logout } = useLogout()
    const [first, setfirs]=useState(false)
    const {user}=useAuthContext()
    useEffect(()=>setl("lo"),[])
    const handleClick = () => {
      logout()
      setm({...modal, logOutpage:false})
      setl("")
      setfirs(false)
    }
    return (
        <AnimatePresence>
          {(modal.logOutpage && user) && (
            <motion.div className="backdroppe"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="modale1 col-lg-4 col-7" 
                variants={Variants}
                initial="hidden3"
                animate="visible2"
                exit="exit3"
                style={w<=700? {marginTop:"30%", height: "fit-content"}:{marginTop:"10%", height: "fit-content"}}
              >
                {!first && (<><p className={w<700?"beginner":"fs-5"}>Are you sure you want to log out?</p>
                <div>
                  <button onClick={()=>setfirs(true)} className="btn bgpupp textpele mx-3 px-2"> Yes</button>
                  <button onClick={()=>{setm({...modal, logOutpage:false}); setl("")}} className="btn bgpupp textpele mx-3 px-2"> no</button>
                </div></>)}
                {first && (<><p className={w<700?"beginner text-danger text-center":"fs-5 text-danger text-center"}>Log out successful.</p>
                            <motion.button variants={Variants} whileHover="hover" className="btn bgpupp textpele p-2"
                                onClick={handleClick}
                            >Ok</motion.button>
                </>)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default Logout