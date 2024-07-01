import React, {memo} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Variants from './variants';

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

const Available = ({modal, dim, setm}) => {
    const {w, h}=dim
  return (
    <AnimatePresence>
      { modal.av && (
        <motion.div className="backdroppe"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modale1  col-lg-4 col-7" 
            variants={modal}
            onLoad={console.log(w)}
            style={w<=700? {marginTop:"30%", height: "fit-content"}:{marginTop:"20%", height: "fit-content"}}
          >
            <div className='text-end'>
                <Link to="/"><button className="btn-close text-primary fw-bolder mt-1 border-1" aria-label="Close" onClick={()=>setm({...modal, av: false})}></button></Link>
            </div>
            <p className='text-danger beginner'>
            Sorry, this field is not yet available. Suscribe to our news letter to be notified when it is made available. 
            </p>
            <div style={{ justifyContent:"center"}}>
                <Link to="/"><button className="btn bgpupp textpele btn-lg-lg text-center p-1 px-2 align-center">view</button>
                </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

}

export default memo(Available);