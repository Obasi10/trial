import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import CalcDetails from "../components/calcDetails";
import { motion } from "framer-motion";

const Profile =({setl, setm, modal, setdim, setp, dim,n, setn, setErrorr, setn1, setk, m, k, setem, n1})=>{
    const [f, setf]=useState(window.screen.availHeight*1.2)
    const {user}=useAuthContext()
    const [islo, setislo]=useState(false)
    const [set, sets]=useState(false)
    const {workouts, dispatch}=useWorkoutsContext()
    useEffect(()=>{
        if(!islo){
            setm({...modal, Ready:false})
        }
    },[islo])
    useEffect(() => {
        const fetchWorkouts = async () => {
          fetch('/api/workouts', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          .then(response=>{
            response.json()
            .then((json)=>{
                if (!json.error) {
                    dispatch({type: 'SET_WORKOUTS', payload: json})
                  } else {
                    setErrorr("Sorry, your log in time has expired.")
                  }
                    setislo(true)
              })
          })
        }
    
        if (user) {
          fetchWorkouts()
        }

      }, [dispatch, user])
      useEffect(()=>{setp(0);setl("p"); setm({...modal, Ready: false})},[])

    useEffect(()=>{
        function handle(){setdim({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        })
        setf(window.screen.availHeight*1.2)
        }
        window.addEventListener('resize', handle)
        
        return _=>{
            window.removeEventListener('resize', handle)
        }
    });
    useEffect(()=>{
        if(workouts){
            sets(false)
        } else {
            sets(true)
        }
    },[workouts])
    return(
        <div className={dim.w<700?"wrapper3 beginner px-1": "wrapper3 fs-4 px-1"}>
            <div className="container d-block m-0 p-lg-0 pb-2" style={{minHeight: f+"px"}}>
                <div className="col-lg-6 col-10" style={{margin:"auto"}}>
                    <div className="justify-content-center d-flex" style={{alignContent:"center", alignItems:"center"}}>
                         <div className="bi bi-person-fill begin px-4" style={{scale:"1.4"}}></div>
                         <div><p className="display-6 motion1 beginner"><strong>Welcome</strong></p>
                            <p><strong style={{textTransform:"capitalize"}}>{user.name}</strong></p></div>
                    </div>
                    <div className="mb-5">
                        <div className="display-6 motion1 beginner"><strong>Bio:</strong></div>
                        <div>{user.description}</div>
                    </div>
                    <section>
                        <div className="mt-4 text-danger">
                            {workouts && workouts.map((workout) => (
                            <CalcDetails key={workout._id} workout={workout} modal={modal} setm={setm} n1={n1} k={k} setn1={setn1} m={m} 
                            setem={setem} setk={setk} setn={setn} n={n} />
                            ))}
                            {set && <motion.div 
                                initial={{opacity: 0}} animate={{opacity:1}} transition={{delay:2, duration:4}}
                            >Oops, you have not saved anything yet. Click on the save button in your solution so you can keep track of them</motion.div>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Profile