import React, {useEffect, useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Tooltip} from "bootstrap";
import Copyright from "../components/copyright";
import Plot from "react-plotly.js";
import * as math from "mathjs";
import html2pdf from 'html2pdf.js';
import Pic from "../pic.jpg"
import Variants from "../components/variants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useLogout } from "../hooks/useLogout";

const tooltips = document.querySelectorAll('.tt')
tooltips.forEach(t => {
  new Tooltip(t)
})
const factorial=(num)=> {
    if (num===0) {
        return 1
    } else if (num>0){
        return num*factorial(num-1);
    }
}

const Solution2=({n, lock, ref0, ref1, ref2, page, setp, dim, setm, modal, setl, setn, setem, m, setdim, tab, setErrorr})=>{
    var v, w, a, v1, x1, y1, y2
    useEffect(()=>{
        setn(Number(n));
        setem(Number(m));
    },[])
    const [h1, seth1]=useState(dim.w<=1280?((1280-dim.w))*(22/1000)+"%":"0%")
    const [input2, setIn2]=useState(undefined)
    const {dispatch}=useWorkoutsContext()
    const [comp, setcom]=useState(false)
    const {user}=useAuthContext()
    const {logouter}=useLogout()
    const title= "Variable Coefficient Differential Equation 1"
    const [detail1, detail2]=[n, m]
    const [tap, settap]=useState(false)

    const findhcf=(x,y)=>{
        while (Math.max(x,y) % Math.min(x,y)!==0){
            if (x>y){
                x%=y;
            } else {
                y %= x;
            }
        }
        return Math.min(x,y);
    }

    const gcd=(a,b)=>{
        return (b) ? gcd(b,a%b) : a;
    }

    const decimal2fraction= (dec)=>{
        if (dec===1){
            return {
                top: 1,
                bottom: 1,
                display: 1 + ':' + 1
            };
        } else {
            var top = dec.toString().replace(/\d+[.]/,'');
            var bottom=Math.pow(10,top.length);
            if (dec>1){
                top = +top + Math.floor(dec)*bottom;
            }
            var x=gcd(top,bottom);
            return {
                top: (top/x),
                bottom: (bottom/x),
                display: (top/x)+':'+(bottom/x)
            };
        }
    }
    const testdecimal=(dec)=>{
        if (Number.isInteger(dec)){
            return dec.toString();
        } else {
            var t=decimal2fraction(dec);
            return '\\frac {'+t['top']+'} {'+t['bottom']+'}';
        }
    }
    const refrac=(x,y)=>{
        var q=findhcf(x,y);
        q=math.fraction((x/q),(y/q));
        return q
    }

    if (Number.isInteger((n-m)/2)) {
        v=((n-m)/2);
        v1=(n-m-2)/2;
    } else {
        v=((n-m-1)/2);
        v1=v
    }
    w=((factorial(2*n))/(factorial(n)*factorial(n-m)))
    a=findhcf(w,2**n)


    const pin=(n,m)=> {
        var t, S, w1, a1
        w1=((factorial(2*n))/(factorial(n)*factorial(n-m)))
        a1=findhcf(w1,2**n)
        if ((n-m)<=1){
            if ((n-m)==0){
            S='\\('+(w1/a1) + '\\)';
            } else if ((n-m)==1){
            t='x';
            w1/a1===1?S="\\(x\\)":S='\\('+(w1/a1) + t+'\\)';
            }
        } else {
            t='x^'+'{'+ (n-m) +'}';
            S='\\('+(w1/a1) + t+'\\)';
            for (let r = 1; r <= (n-m)/2; r++) {
                if ((n-m)===2*r) {
                    t='\\)'
                } else if ((n-m)===2*r+1) {
                    t='x\\)'
                } else{
                    t='x^'+'{'+(n-m-2*r)+'}\\)'
                }
                if (Number.isInteger(r/2)) {
                    S= S + '\\(\\ +\\ '+ Math.round(((factorial(2*n-2*r))/(factorial(n-r)*factorial(n-m-2*r)*factorial(r)))/a1) + t;
                } else {
                    S= S + '\\(\\ -\\ '+ Math.round(((factorial(2*n-2*r))/(factorial(n-r)*factorial(n-m-2*r)*factorial(r)))/a1) + t;
                }
            } 
        }
        return S
    }

    const qen1=(m,r)=>{
        var S,t1,t2
        t1=2**n/a
        t1===1? t1='':t1=t1
        r===1? t2='': t2="^"+r
        S='\\(\\frac {'+(factorial(m)/(factorial(m-r)*r))+'} {'+t1+'(1-x^2)'+t2+'}\\)'
        return S
    }

    const qen2=(r)=>{
        var t, S
        if ((r-1)==0){
        S='';
        } else if ((r-1)==1){
        t='x';
        S='\\('+(r) + t+'\\)';
        } else {
            t='x^'+'{'+ (r-1) +'}';
            S='\\('+(r) + t+'\\)';
            for (let h = 1; 2*h < r; h++) {
                if ((r-1)===2*h) {
                    t='\\)'
                } else if ((r-1)===2*h+1) {
                    t='x\\)'
                } else{
                    t='x^'+'{'+(r-1-2*h)+'}\\)'
                }
                S= S + '\\(\\ +\\ '+ Math.round((factorial(r))/(factorial(r-2*h-1)*factorial(2*h+1))) + t;
            } 
        }
        return S
    }

    const qin=(n,m)=>{
        if (n-m>0){
            var t, S, S1, S2
            if ((n-m-1)===0){
                if (2**n===a) {
                    S='\\('+(w/a)+'\\)';
                } else {
                    S='\\(\\frac {'+(w/a)+'} {'+(2**n/a)+'}\\)';
                } 
            } else if ((n-m-1)===1){
                t='x\\)';
                if (2**n===a) {
                    S='\\('+(w/a)+t;
                } else {
                    S='\\(\\frac {'+(w/a)+'} {'+(2**n/a)+'}'+t;
                } 
            } else {
                t='x^'+'{'+ (n-m-1) +'}\\)';
                if (2**n===a) {
                    S='\\('+(w/a)+t;
                } else {
                    S='\\(\\frac {'+(w/a)+'} {'+(2**n/a)+'}'+t;
                }
                for (let r = 1; r < v1 + 1; r++) {
                    if ((n-m)===2*r+1) {
                        t='\\)'
                    } else if ((n-m)==2*r+2) {
                        t='x\\)'
                    } else{
                        t='x^'+'{'+(n-m-2*r-1)+'}\\)'
                    }
                    S1=0
                    var e,s
                    for (let i = 0; i < r+1; i++) {
                        e=factorial(2*n-2*i)*factorial(2*i)/(factorial(n-i)*factorial(i))**2
                        s=refrac(e,2**n)
                        S1 = math.add(S1,s);
                    }
                    S2=refrac(Math.round(factorial(n-1-r)*factorial(r)),Math.round(factorial(2*r+1)*factorial(n-m-1-2*r)))
                    S2=math.multiply(S1,S2)
                    S2='\\frac {'+S2['n']+'} {'+S2['d']+'}';
                    if (Number.isInteger(r/2)) {
                        S= S + '\\(\\ -\\ '+ S2 + t;
                    } else {
                        S= S + '\\(\\ +\\ '+ S2 + t;
                    }
                }
            }
            return S
        }
    }
    const total =(n,m)=>{
        var S
        n-m>0? S= "\\(["+pin(n,m)+"tanh^{-1}(x)"+qin(n,m):S="\\(["+pin(n,m)+"tanh^{-1}(x)"
        for (let r = 1; r <= m; r++) {
            S+= qen1(m,r)+qen2(r)+pin(n,m-r)   
        }
        return S
    }

    const p= (n,m,x)=> {
        var S=0
        for (let r = 0; r <= (n-m)/2; r++) {
            S+=((-1)**r*factorial(2*n-2*r)*x**(n-m-2*r))/(factorial(n-r)*factorial(n-m-2*r)*factorial(r));   
        }
        return S/(2**n)
    }


    const qet= (n,m,x)=> {
        var S=0
        var S1=0
        for (let r = 0; r <=(n-m-1)/2; r++) {
            for (let i = 0; i < r+1; i++) {
                S1 += (factorial(2*n-2*i)*factorial(2*i))/(factorial(n-i)*factorial(i))**2;
            }
            S +=(-1)**(r+1)*S1*((factorial(n-1-r)*factorial(r)*x**(n-m-1-2*r))/(factorial(2*r+1)*factorial(n-m-1-2*r)))
        }
        return S/2**n
    }

    const qete =(n,m,x)=>{
        var S=0
        var S1=0
        for (let r=1; r<=m; r++) {
            for (let h=0; h<=(r-1)/2; h++){
                S1 += (factorial(r)*x**(r-2*h-1))/(factorial(r-2*h-1)*factorial(2*h+1))
            }
            S += ((factorial(m))/(factorial(m-r)*r))*S1*(p(n,m-r,x)/((1-x**2)**r))
        }
        return S
    }

    const qe=(n,m,x)=> {
        return p(n,m,x)*Math.atanh(x)+ qete(n,m,x)+qet(n,m,x)
    }

    const formap=Array.from(Array(m+1).keys()).slice(1)

    x1= []
    y1= []
    y2= []
    for (let i = 0; i < (2*0.999/0.001)+1; i++) {
        x1[i]=-0.999+0.001*i;
        y1[i]=p(n,m,x1[i])
        y2[i]=qe(n,m,x1[i])
    }

    var data1={
        x: x1,
        y: y1,
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3,
        }
    }
    var data2={
        x: x1,
        y: y2,
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3,
        }
    }

    const [data01, setdat01]=useState({
        x: [-0.999],
        y: [p(n,m,-0.999)],
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3
        }
    })

    const [data02, setdat02]=useState({
        x: [-0.999],
        y: [qe(n,m,-0.999)],
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3,
        }
    })
    
    const simulation=()=>{
        let get=setTimeout(()=>{
            if((data01.x[data01.x.length-1]<1 && tab)){
                setdat01({
                    ...data01,
                    x: [...data01.x, data01.x[data01.x.length-1]+0.02],
                    y: [...data01.y, p(n,m,(data01.x[data01.x.length-1]+0.02))]
                })
                setdat02({
                    ...data02,
                    x: [...data02.x, data01.x[data01.x.length-1]+0.02],
                    y: [...data02.y, qe(n,m,(data01.x[data01.x.length-1]+0.02))]
                })
            } else {
                setdat01({
                    ...data01,
                    x: [-0.999],
                    y: [p(n,m,-0.999)]
                })
                setdat02({
                    ...data02,
                    x: [-0.999],
                    y: [qe(n,m,-0.999)]
                })
            }
            if (!tab){clearTimeout(get)}
        }, ((95/7)*n +50))
    }
    

    const width=dim.w<700? dim.w*0.94: dim.w*0.6
    const height=width*0.8
    var layout1={
        title:{
            text: '<span>Graph of P</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+') for -1<x<1<\span>'
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
        },
        yaxis:{
            title:{
                text: '<span>P</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+')<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1
        },
        paper_bgcolor:'linear-gradient(to top left, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: width
    }
    

    var layout11={
        title:{
            text: '<span>Graph of P</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+') for -1<x<1<\span>'
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
        },
        yaxis:{
            title:{
                text: '<span>P</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+')<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1
        },
        paper_bgcolor:'linear-gradient(to top left, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: width
    }
    var layout2={
        title:{
            text: '<span>Graph of Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+') for -1<x<1<\span>',
            font:{
                color:'rgb(236, 221, 236)',
                autosize: true
            }
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        yaxis:{
            title:{
                text: '<span>Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+')<\span>',
                autosize: true,
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        paper_bgcolor:'linear-gradient(to top right, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: width
    }

    var layout22={
        title:{
            text: '<span>Graph of Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+') for -1<x<1<\span>',
            font:{
                color:'rgb(236, 221, 236)',
                autosize: true
            }
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        yaxis:{
            title:{
                text: '<span>Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x,'+m+')<\span>',
                autosize: true,
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        paper_bgcolor:'linear-gradient(to top right, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: width
    }

    let config={
        responsive: true,
        staticPlot: true,
        scale: 1
    }

    const coeff='\\((1-x^2)y\'\'-'+2*(m+1)+'xy\'+'+(n-m)*(n+m+1)+'y=0\\)';
    const coeff1='\\(y\\ =\\ C_1\\ P_{'+n+'}(x,'+m+')\\ + C_2\\ Q_{'+n+'}(x,'+m+')\\)';
    const pp=pin(n,m);
    const qq=qin(n,m);
    const pn="\\(P_{"+n+"}(x,"+m+")=\\)";
    const qn="\\(Q_{"+n+"}(x,"+m+")=\\)";


    var aa, a2
    if (2**n!==a && 2**n/a<100000000) {
        aa ="\\(\\frac {1} {"+(2**n/a)+"}\\)"
        a2="\\(\\frac {1} {"+(2**n/a)+"}\\)"

    } else if (2**n/a>100000000){
        let num =2**n/a
        aa ="\\(\\frac {1} {"+num.toExponential(4)+"}\\)"
        a2="\\(\\frac {1} {"+num.toExponential(4)+"}\\)"
    }

    const element=document.getElementById('pdf');
    const orient =()=>{
        if (total(n,m).length>250){
            return 'l'
        } else return 'p'
    }
    const opt={
        margin: 0.08,
        filename: 'Legendre Calculator.pdf',
        image: {type: 'jpeg', quality:0.98},
        html2canvas: {scale:1},
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: orient()
        },
        pagebreak: {
        avoid: ['#pic1', '#pic2', "#pic3", "#pic4"]
        }
    };


    const finish= async ()=> {
        await html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
            var totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(12);
                pdf.setTextColor(151);
                pdf.text(0.3, pdf.internal.pageSize.getHeight() - 0.5, "ULTIMATE CALCULATOR | Copyright 2024 | Designer: INNOCENT OBASI");
                pdf.addImage(Pic, 'JPEG', pdf.internal.pageSize.getWidth() - 1.1, pdf.internal.pageSize.getHeight() - 1, 0.65, 0.8);
                pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 1.4, 0.5);
            }
        }).save()
        setm({...modal, Ready: false})
        setm({...modal, D: true})
    }
    const [f, setf]=useState(window.screen.availHeight)

    useEffect(()=>{
        function handle(){
        setdim({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        })
        seth1(dim.w<=1280?((1280-dim.w))*(34/1000)+"%":"0%")
        setf(window.screen.availHeight)
        }
        window.addEventListener('resize', handle)
        
        return _=>{
          window.removeEventListener('resize', handle)
        }
    });

    const [da, setda]=useState(Math.log10(2**n/a))
    useEffect(()=>{
        if (da>=9) {
            setda(12)
        }
    },[n])
    const [compe, setcompe]=useState(false)
    const [compa, setcompa]=useState(false)
    useEffect(()=>{
        if (Number(input2)>=1 || Number(input2)<=-1) {
            setcom(false)
            setcompe(true)
            setm({...modal, alert:true})
        } else {setcompe(false)}
        
        if(!input2){
            setcom(false)
        }
        if(!input2){
            setcompa(true)
        } else {
            setcompa(false)
        }
        
    },[compa, input2])
    const [array, setarr]=useState([])
    const compute=()=>{
        setcom(true);
        setarr([
            "\\(P_{"+n+"}("+Number(input2)+","+m+")=\\ " + (Math.round(p(n,m,Number(input2))*10**8)/(10**8)) +"\\)",
            "\\(Q_{"+n+"}("+Number(input2)+","+m+")=\\ " +(Math.round(qe(n,m,Number(input2))*10**8)/(10**8)) +"\\)"
        ])
        setcompe(false)
    }
    useEffect(()=>{
        const ett=async()=>{
            const calco=()=>{setl('ss')}
            setp(1);
            await window.MathJax.typeset()
            setTimeout(()=>setm({...modal, Ready:false}),((11/70)*n+3)*1000)
            setTimeout(calco,8000)
        }
        if(typeof window?.MathJax !== "undefined"){
            ett()
        }
    }, [])
    useEffect(()=>{
        if(typeof window?.MathJax !== "undefined"){
            window.MathJax.typeset()
        }
    },[compa, compute])
    const [scaz, setscaz]=useState(false)

    useEffect( ()=>{
        if (!tap){
            const tapChange = async ()=> {
                settap(window.scrollY >=1 || window.scrollX >=1)
                ref0.current=null
                clearTimeout(setTimeout(async ()=>ref0.current.click(),25000))
            }
            window.addEventListener("scroll",tapChange);
            return ()=> window.removeEventListener("scroll",tapChange)
        }
    },[window.scrollY])
    useEffect(()=>{
        setTimeout(()=>window.scrollY<1?setscaz(true):setl('ss'),10000)
    },[])
    useEffect(()=>{
        if (ref0.current){setTimeout(async ()=>ref0.current.click(),25000)} else { clearTimeout(setTimeout(async ()=>ref0.current.click(),25000))}
    },[scaz])

    useEffect(()=>{
        if(tab){
            simulation()
        }
    },[tab, data01])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, detail1, detail2}
        if (!user) {
            setErrorr('You must be logged in to save your files')
        } else {
            try{
                return new Promise(function(resolve, reject){
                    const timeout= setTimeout(()=>{
                      reject("error: timeout")
                    }, 3000);

                    setm({...modal, Ready: true})
                    fetch('/api/workouts/', {
                        method: 'POST',
                        body: JSON.stringify(workout),
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        }
                    })
                    .then(response=>{
                        clearTimeout(timeout);
                        if(response.status===401){
                            logouter()
                        }
                        if(navigator.onLine===false){
                            throw new Error("Network problem! check your connection and try again.")
                        } else if (!response.ok && navigator.onLine) {
                            throw new Error(response.json().error)
                        }
                        if (response.ok) {
                            dispatch({type: 'CREATE_WORKOUT', payload: response.json()})
                            setm({...modal, saved: true})
                        }
                    })
                })
            } catch (err){
                if(err){
                    setErrorr(err.message)
                }     
            }
            setm({...modal, Ready: false})
        }
    }

    return (
        <>
        <div className="d-block m-0 p-1"  style={w<=1280?{minHeight: 1.1*f+"px", paddingTop:0+"%"}:{minHeight: 1.1*f+"px",paddingTop:"0%"}}>
        <div className="tab-content justify-content-center col-lg-8 col-12" id="nav-tabContent" style={{margin: "auto", marginTop: h1}}>
            <AnimatePresence >
            <motion.div className="tab-pane fade show active" id="nav-full-solution" role="tabpanel"
                key="full"
                aria-labelledby="nav-full-solution-tab">
                <section>
                    <div className="container-lg" id="pdf">
                        <div>
                        <div className='beginner fs-5'>
                            <div>
                                <div className="fw-bolder" id="m1"> Inputed equation:</div>
                                <div className="text-center">{coeff}</div>
                                <div className="fw-bolder" id="m2"> The General solution:</div>
                                <div className="text-center">{coeff1}</div>
                                <div className="fw-bolder" id="m3"> Where:</div>
                                <div>\(C_1\) and \(C_2\) are constants</div>
                            </div>
                            <div id="pic1" className="mt-lg-5 mt-2 fs-5 container table-responsive pt-0 mt-2 stytab">
                            <div className={(dim.w<700)?
                                    "text-start ms-0 pe-2 beginner fs-5 ps-0 mb-3":"text-start beginner fs-5 mb-3"} style={{height: "fit-content"}}>
                                    <div className="we" style={pn.length<24?{textAlign:"start"}:{width:"500px", textAlign:"center"}}>
                                        <div className="d-flex align-items-center mb-2">
                                            <div style={{marginLeft:"0%", paddingRight: "2%"}}>{pn}</div>
                                            <span style={{scale:"1.15", paddingLeft:da*2+"px", paddingRight: da*2+"px"}}>{a2}</span>
                                            <span className={pn.length>30?"npall2 py-2 px-1":a2?"npall py-2":""} style={n<8?{ minWidth: "fit-content", textAlign:"center"}:{minWidth: "fit-content", textAlign:"center"}}>{pp}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div style={{margin:"auto", justifyContent:"center", display:"flex"}} id="pic3">
                                <Plot
                                id="p_graph1"
                                data={[data1]}
                                layout={layout11}
                                config={config}
                                style={{textAlign: "center", justifyContent:"center",marginBottom: "5%", marginTop: "5%", alignItems: "center"}}
                            />
                            </div>
                    </div>
                    <div>
                        <div id="pic2" style={{lineHeight: 1.8}}>
                        <div className={"table-responsive container pt-0 mt-2 stytab"}>
                        <div className={(dim.w<700)?
                            "text-start ms-0 pe-2 ps-0 beginner fs-5 my-3":"text-start beginner fs-5 my-3"} style={{height: "fit-content"}}>
                            <div className={pin(n,m).length<150?"we p we3 text-start":"we p we3 text-center"}>
                                <div className="d-flex align-items-center justify-contents-center mb-2">
                                    <div style={{marginLeft:"0%", paddingRight: "2%"}}>{qn}</div>
                                    <span style={{scale:"1.15", marginLeft:da*2+"px", marginRight: da*2+"px"}}>{a2}</span>
                                    <span className={pn.length>150?"npall2 mb-lg-2 mb-5 py-2 px-1":pp==="\\(1\\)"?"":"npall mb-5 py-2 npadd"} style={(pin(n,m).length>150)?{ minWidth: "fit-content", textAlign:"center"}:{ textAlign:"center"}}>{pp==="\\(1\\)"?"":pp}</span>
                                    <span id="t">{qq?"\\(tanh^{"+[-1]+"}(x)\\ -\\)":"\\(tanh^{"+[-1]+"}(x) \\ \\)"}</span>
                                    {(pin(n,m).length<=150) && (<span className="align-items-center justify-contents-center npalle" style={{scale:"1.15", display:"", minWidth:"fit-content"}} 
                                    >{qq && m>=1?qq+"\\(\\ +\\ \\)": qq? qq+"\\(\\ \\ \\)":""}
                                    {
                                      formap.map((i,k)=>(
                                        <>
                                        {(i!=m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k+"w"}>{qen1(m,i)}</span>
                                        <span key={k+'q'} className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k+'r'} className="npall npadd">{pin(n,m-i)}</span>{"\\(\\ +\\ \\)"}</div>
                                        )}
                                        {(i==m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k+'w'}>{qen1(m,i)}</span>
                                        <span key={k+'q'}className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k+'r'}className="npall npadd">{pin(n,m-i)}</span> {"\\(\\ \\ \\)"}</div>
                                        )}
                                        </>
                                      ))  
                                    }
                                    </span>)}
                                </div>
                                {(pin(n,m).length>150) && (<div id="q101" className="mt-4 text-end"  style={{scale:"1.1", marginLeft:(90+2*da)+"px", minWidth:"700px"}}>
                                    <span className="mb-3">{m>=1?qq+"\\(\\ +\\ \\)": qq+"\\(\\ \\ \\)"}</span>
                                    {
                                      formap.map((i,k)=>(
                                        <>
                                        {(i!=m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k}>{qen1(m,i)}</span>
                                        <span key={k} className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k} className="npall text-center npadd">{pin(n,m-i)}</span>{"\\(\\ +\\ \\)"}</div>
                                        )}
                                        {(i==m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k}>{qen1(m,i)}</span>
                                        <span key={k}className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k}className="npall npadd">{pin(n,m-i)}</span></div>
                                        )}
                                        </>
                                      ))  
                                    }
                                </div>)}
                            </div>
                        </div>

                        </div>
                        </div>
                        <div style={{margin:"auto", justifyContent:"center", display:"flex"}} id="pic4">
                            <Plot
                            id="q_graph1"
                            data={[data2]}
                            layout={layout22}
                            config={config}
                            style={{textAlign: "center", marginBottom: "5%", marginTop: "5%", alignItems: "center"}}
                            />
                        </div>
                        </div>
                </div>
                <div className="justify-content-center text-center mt-5 align-items-center">
                    <button className="btn bgpupp textpele mx-3" id="download" onClick={()=>{setm({...modal, Ready: true});finish()}}>Download PDF</button>
                    <button className="btn bgpupp textpele mx-3" onClick={handleSubmit}>Save</button>
                </div>
                </section>
                <footer className='mb-3 row col-12'>
                    <Copyright dim={dim}/>
                </footer>
            </motion.div>
            <motion.div className="tab-pane fade" id="nav-graph" role="tabpanel"
                    key="graph"
                aria-labelledby="nav-graph-tab">
                <section>
                    <div className="justify-content-center container-lg align-items-center">
                    <div style={{margin:"auto", justifyContent:"center", display:"flex"}}>
                        <Plot
                            id="p_graph"
                            data={[data01]}
                            layout={layout1}
                            config={config}
                            style={{textAlign: "center", marginBottom: "5%", marginTop: "5%", alignItems: "center"}}
                        />
                    </div>
                    <div style={{margin:"auto", justifyContent:"center", display:"flex"}}>
                        <Plot
                            id="q_graph"
                            data={[data02]}
                            layout={layout2}
                            config={config}
                            style={{textAlign: "center", marginBottom: "5%", marginTop: "5%", alignItems: "center"}}
                        />
                    </div>
                    </div>
                </section>
            </motion.div>
            <motion.div className="tab-pane fade" id="nav-solution" role="tabpanel" 
                key="solution1"
                aria-labelledby="nav-solution-tab">
                <section className="ms-md-3 ms-1">
                    <div className="beginner fs-5">
                    <div>
                        <div className="fw-bolder" id="m1"> Inputed equation:</div>
                        <div className="text-center">{coeff}</div>
                        <div className="fw-bolder" id="m2"> The General solution:</div>
                        <div className="text-center">{coeff1}</div>
                        <div className="fw-bolder" id="m3"> Where:</div>
                        <div>\(C_1\) and \(C_2\) are constants</div>
                    </div>
                    <div className="mt-lg-5 mt-3 container table-responsive pt-0 mt-2 stytab">
                    <motion.div className={(dim.w<700)?
                            "text-start ms-0 pe-2 ps-0 beginner fs-5 mb-3":"text-start beginner fs-5 mb-3"} 
                            animate={{
                                x:[0,-100,0,-100,0],
                                transition:{
                                    delay:5,
                                    duration:60,
                                    repeat:Infinity,
                                    ease: "easeInOut",
                                    spring: 120
                                }
                            }}
                            style={{height: "fit-content"}}>
                            <div className="we" style={pn.length<24?{textAlign:"start"}:{width:"500px", textAlign:"center"}}>
                                <div className="d-flex align-items-center mb-2">
                                    <div style={{marginLeft:"0%", paddingRight: "2%"}}>{pn}</div>
                                    <span style={{scale:"1.15", paddingLeft:da*2+"px", paddingRight: da*2+"px"}}>{a2}</span>
                                    <span className={pn.length>30?"npall2 py-2 px-1":a2?"npall py-2":""} style={n<8?{ minWidth: "fit-content", textAlign:"center"}:{minWidth: "fit-content", textAlign:"center"}}>{pp}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className={"table-responsive container pt-0 mt-2 stytab"}>
                        <motion.div className={(dim.w<700)?
                            "text-start ms-0 pe-2 ps-0 beginner fs-5 mb-3":"text-start beginner fs-5 mb-3"} 
                            animate={{
                                x:[0,-100,0,100,0],
                                transition:{
                                    delay:5,
                                    duration:60,
                                    repeat:Infinity,
                                    ease: "easeInOut",
                                    spring: 120
                                }
                            }}
                            style={{height: "fit-content"}}>
                            <div className={pin(n,m).length<150?"we p we4 text-start":"we p we3 text-center"}>
                                <div className="d-flex align-items-center justify-contents-center mb-2">
                                    <div style={{marginLeft:"0%", paddingRight: "2%"}}>{qn}</div>
                                    <span style={{scale:"1.15", marginLeft:da*2+"px", marginRight: da*2+"px"}}>{a2}</span>
                                    <span className={pn.length>150?"npall2 py-2 mb-5 px-1":pp==="\\(1\\)"?"":"npall py-2 npadd"} style={(pin(n,m).length>150)?{ minWidth: "fit-content", textAlign:"center"}:{ textAlign:"center"}}>{pp==="\\(1\\)"?"":pp}</span>
                                    <span id="t">{qq?"\\(tanh^{"+[-1]+"}(x)\\ -\\)":!qq && m>=1?"\\(tanh^{"+[-1]+"}(x) \\ +\\)":"\\(tanh^{"+[-1]+"}(x) \\ \\)"}</span>
                                    {(pin(n,m).length<=150) && (<span className="align-items-center justify-contents-center npalle" style={{scale:"1.15", display:"", minWidth:"fit-content"}} 
                                    >{qq && m>=1?qq+"\\(\\ +\\ \\)": qq? qq+"\\(\\ \\ \\)":""}
                                    {
                                      formap.map((i,k)=>(
                                        <>
                                        {(i!=m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k}>{qen1(m,i)}</span>
                                        <span key={k} className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k} className="npall npadd">{pin(n,m-i)}</span>{"\\(\\ +\\ \\)"}</div>
                                        )}
                                        {(i==m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k}>{qen1(m,i)}</span>
                                        <span key={k}className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k}className="npall npadd">{pin(n,m-i)}</span> {"\\(\\ \\ \\)"}</div>
                                        )}
                                        </>
                                      ))  
                                    }
                                    </span>)}
                                </div>
                                {(pin(n,m).length>150) && (<div id="q101" className="mt-4 text-end"  style={{scale:"1.1", marginLeft:(90+2*da)+"px", minWidth:"700px"}}>
                                    <span className="mb-3">{m>=1?qq+"\\(\\ +\\ \\)": qq+"\\(\\ \\ \\)"}</span>
                                    {
                                      formap.map((i,k)=>(
                                        <>
                                        {(i!=m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k}>{qen1(m,i)}</span>
                                        <span key={k} className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k} className="npall npadd">{pin(n,m-i)}</span>{"\\(\\ +\\ \\)"}</div>
                                        )}
                                        {(i==m) &&(
                                        <div className="my-2 d-flex align-items-center"><span key={k}>{qen1(m,i)}</span>
                                        <span key={k}className={qen2(i)==''?"":"npall me-1"}>{qen2(i)}</span>
                                        <span key={k}className="npall npadd">{pin(n,m-i)}</span> {"\\(\\ \\ \\)"}</div>
                                        )}
                                        </>
                                      ))  
                                    }
                                </div>)}
                            </div>
                        </motion.div>
                        </div>
                    </div>
                </section>
            </motion.div>
            <motion.div className="tab-pane fade pt-4" id="nav-calculator" role="tabpanel"
                key="calculator1" 
                aria-labelledby="nav-calculator-tab">
                <section className="container-lg justify-content-center text-center">
                    <div className="fs-5 mb-4">
                    Insert the value of x to compute for the values of <span className="cofp4">{`\\(P_{${n}}(x,${m})\\)`}</span> and <span className="cofq4">{`\\(Q_{${n}}(x,${m})\\)`}</span>.
                    <span style={{color: "red"}}> Note that x must be in the range \(\ -1\lt x\lt1\).</span>
                    <div>
                        <div className="mt-5" style={{alignContent: "center", display: "inline", alignItems: "center", alignSelf: "center", textAlign: "center", borderSpacing: "0ch"}}>
                        <input className="col-lg-5 col-8 text-center p-1" type="number" onChange={(e)=>setIn2(e.target.value)} value={input2} placeholder="Enter the value of x (-1 < x < 1)"/>
                        <motion.button variants={Variants} whileHover="hover" className="btn bgpupp textpele" onClick={()=>{(compe || Number(input2)<-1 || Number(input2)>1)?setcom(false):compute()}}>Compute</motion.button>
                        </div>
                        {(comp && input2!==undefined) && (<div className={"fs-5"} style={{textAlign: "left", marginTop: "10%"}}>
                        <div >{array[0]}</div>
                        <div >{array[1]}</div>
                        </div>)}
                    </div>
                    </div>
                </section>
            </motion.div>
            </AnimatePresence>
        </div>
        </div>

        </>
    )
}

export default Solution2