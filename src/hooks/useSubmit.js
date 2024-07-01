import React, { useState } from "react";

export const useSubmit= ()=>{
    const [error, seterr]=useState(null)

    const Fetcher = async(url, fetchConfig, func)=>{
    seterr(null)
    let didTimeOut=false;
    return new Promise(function(resolve, reject){
      const timeout= setTimeout(()=>{
        didTimeOut=true;
        reject(new Error('Your request took too long, please try again.'))
      }, 8000);

      fetch(url, fetchConfig)
      .then(response=>{
        clearTimeout(timeout);
        if (!didTimeOut){
          resolve(response)
        }
      })
      .catch(err=>{
        if (didTimeOut){
          reject(err)
        }
      });
    })
    .then(response=>{
      response.json()
      .then((json)=>{
        func(json)
      })
    })
    .catch((err)=>{
      seterr(err)
    })
    }
    
}