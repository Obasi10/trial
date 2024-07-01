import React, {useEffect, useState} from "react";
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

const Solution=({n1,n,ref0, ref1,setk,k, page, setp, dim, setm, modal, setl, setn, setdim, tab, setErrorr})=>{
    var  w, a, x1, y1, y2
    const [h1, seth1]=useState(dim.w<=1280?((1280-dim.w))*(22/1000)+"%":"0%")
    const [input2, setIn2]=useState(undefined)
    const {dispatch}=useWorkoutsContext()
    const [comp, setcom]=useState(false)
    const {user}=useAuthContext()
    const [v1, setv1]=useState(((k*1)+(Number(n)+1)**2))
    const {logouter}=useLogout()
    const [v, setv]=useState(((k*1)+((n+1)*1)**2))
    const title= "Variable Coefficient Differential Equations 4"
    const [detail1, detail3]=[n1, k]
    useEffect(()=>{setn(n1); setk(Number(k)); setv(math.abs(v)); setv1(k+(n+1)**2)},[])
    const [sv,setsv]=useState(math.sqrt(math.abs(v)))
    useEffect(()=>{
        if (v1<0 && math.abs(v)!=1){
            setsv(math.sqrt(math.abs(v))+'i')
        } else if (v1<0 && math.abs(v)===1){
            setsv('i')
        } else if (v1>=0 && math.abs(v)===1){
            setsv('')
        }
        else {setsv(math.sqrt(math.abs(v)))}
        console.log(sv)
    },[])

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
    
    const p= (n,x)=> {
        let C, S, Se
        if (v1<0){
            C=math.cosh(math.sqrt(v)*math.acos(x))
            S=math.sinh(math.sqrt(v)*math.acos(x))
            if (n==0){
                Se=(x*S-math.sqrt(v*(1-x**2))*C)
            } else if (n==1){
                Se=(3*x**2*S-3*x*math.sqrt(v*(1-x**2))*C+(v-1)*(1-x**2)*S)
            } else if (n==2){
                Se=(15*x**3*S-15*x**2*math.sqrt(v*(1-x**2))*C+(6*v-9)*x*(1-x**2)*S-(v-4)*math.sqrt(v*(1-x**2)**3)*C)
            } else if (n==3){
                Se= (105*x**4*S-105*x**3*math.sqrt(v*(1-x**2))*C+(45*v-90)*x*(1-x**2)*S-(10*v-55)*math.sqrt(v*(1-x**2)**3)*C+(v**2-10*v+9)*(1-x**2)**2*S)
            }
        } else {
            C=math.cos(math.sqrt(v)*math.acos(x))
            S=math.sin(math.sqrt(v)*math.acos(x))
            if (n==0){
                Se=(x*S-math.sqrt(v*(1-x**2))*C)
            } else if (n==1){
                Se=(3*x**2*S-3*x*math.sqrt(v*(1-x**2))*C-(v-1)*(1-x**2)*S)
            } else if (n==2){
                Se=(15*x**3*S-15*x**2*math.sqrt(v*(1-x**2))*C-(6*v-9)*x*(1-x**2)*S+(v-4)*math.sqrt(v*(1-x**2)**3)*C)
            } else if (n==3){
                Se= (105*x**4*S-105*x**3*math.sqrt(v*(1-x**2))*C-(45*v-90)*x*(1-x**2)*S+(10*v-55)*math.sqrt(v*(1-x**2)**3)*C+(v**2-10*v+9)*(1-x**2)**2*S)
            }
        }
        return Se
    }

    const qet= (n,x)=> {
        let C, S, Se
        if (v<0){
            C=math.cosh(math.sqrt(v)*math.acos(x))
            S=math.sinh(math.sqrt(v)*math.acos(x))
            if (n==0){
                Se=(x*C-math.sqrt(v*(1-x**2))*S)
            } else if (n==1){
                Se=(3*x**2*C-3*x*math.sqrt(v*(1-x**2))*S+(v-1)*(1-x**2)*C)
            } else if (n==2){
                Se=(15*x**3*C-15*x**2*math.sqrt(v*(1-x**2))*S+(6*v-9)*x*(1-x**2)*C-(v-4)*math.sqrt(v*(1-x**2)**3)*S)
            } else if (n==3){
                Se= (105*x**4*C-105*x**3*math.sqrt(v*(1-x**2))*S+(45*v-90)*x*(1-x**2)*C-(10*v-55)*math.sqrt(v*(1-x**2)**3)*S+(v**2-10*v+9)*(1-x**2)**2*C)
            }
        } else {
            C=math.cos(math.sqrt(v)*math.acos(x))
            S=math.sin(math.sqrt(v)*math.acos(x))
            if (n==0){
                Se=(math.sqrt(1-x**2)**(-3))*(-x*C-math.sqrt(v*(1-x**2))*S)
            } else if (n==1){
                Se=(math.sqrt(1-x**2)**(-5))*(-3*x**2*C-3*x*math.sqrt(v*(1-x**2))*S-(v-1)*(1-x**2)*C)
            } else if (n==2){
                Se=(math.sqrt(1-x**2)**(-7))*(-15*x**3*C-15*x**2*math.sqrt(v*(1-x**2))*S-(6*v-9)*x*(1-x**2)*C+(v-4)*math.sqrt(v*(1-x**2)**3)*S)
            } else if (n==3){
                Se= (math.sqrt(1-x**2)**(-9))*(-105*x**4*C-105*x**3*math.sqrt(v*(1-x**2))*S-(45*v-90)*x*(1-x**2)*C+(10*v-55)*math.sqrt(v*(1-x**2)**3)*S+(v**2-10*v+9)*(1-x**2)**2*C)
            }
        }
        return Se
    }

    x1= []
    y1= []
    y2= []
    for (let i = 0; i < (2*0.999/0.001)+1; i++) {
        x1[i]=-0.999+0.001*i;
        y1[i]=p(n,x1[i])
        y2[i]=qet(n,x1[i])
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
        y: [p(n,-0.999)],
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3
        }
    })

    const [data02, setdat02]=useState({
        x: [-0.999],
        y: [qet(n,-0.999)],
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
                    y: [...data01.y, p(n,(data01.x[data01.x.length-1]+0.02))]
                })
                setdat02({
                    ...data02,
                    x: [...data02.x, data01.x[data01.x.length-1]+0.02],
                    y: [...data02.y, qet(n,(data01.x[data01.x.length-1]+0.02))]
                })
            } else {
                setdat01({
                    ...data01,
                    x: [-0.999],
                    y: [p(n,-0.999)]
                })
                setdat02({
                    ...data02,
                    x: [-0.999],
                    y: [qet(n,-0.999)]
                })
            }
            if (!tab){clearTimeout(get)}
        }, ((95/7)*n +50))
    }
    

    const width=dim.w<700? dim.w*0.94: dim.w*0.6
    const height=width*0.8
    var layout1={
        title:{
            text: '<span>Graph of P</span><span style="font-size: 0.7em">'+n+'</span><span>(x) for -1<x<1<\span>'
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
                text: '<span>P</span><span style="font-size: 0.7em">'+n+'</span><span>(x)<\span>',
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
            text: '<span>Graph of P</span><span style="font-size: 0.7em">'+n+'</span><span>(x) for -1<x<1<\span>'
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
                text: '<span>P</span><span style="font-size: 0.7em">'+n+'</span><span>(x)<\span>',
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
            text: '<span>Graph of Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x) for -1<x<1<\span>',
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
                text: '<span>Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x)<\span>',
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
            text: '<span>Graph of Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x) for -1<x<1<\span>',
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
                text: '<span>Q</span><span style="font-size: 0.7em">'+n+'</span><span>(x)<\span>',
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

    const coeff1='\\(y\\ =\\ C_1\\ F_{'+n+'}(x)\\ + C_2\\ G_{'+n+'}(x)\\)';
    const coeff11='\\(y\\ =\\ C_1\\ P_{'+n+'}(x)\\ + C_2\\ Q_{'+n+'}(x)\\)';
    const pn="\\(P_{"+n+"}(x)=\\)";
    const qn="\\(Q_{"+n+"}(x)=\\)";

    var array1=[
        "\\(x-i\\sqrt{1-x^2}\\)",
        "\\(x+i\\sqrt{1-x^2}\\)",
    ]
    const element=document.getElementById('pdf');
    const opt={
        margin: 1,
        filename: 'Ultimate Calculator.pdf',
        image: {type: 'jpeg', quality:0.98},
        html2canvas: {scale:1},
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'l'
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
                pdf.text(0.4, pdf.internal.pageSize.getHeight() - 0.5, "LEGENDRE CALCULATOR | Copyright 2023 | Designer: INNOCENT OBASI");
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
            "\\(P_{"+n+"}("+Number(input2)+")=\\ " + (Math.round(p(n,k,Number(input2))*10**8)/(10**8)) +"\\)",
            "\\(Q_{"+n+"}("+Number(input2)+")=\\ " +(Math.round(qet(n,k,Number(input2))*10**8)/(10**8)) +"\\)"
        ])
        setcompe(false)
    }

    useEffect(()=>{
        const ett=async()=>{
            setl('ss');
            await window.MathJax.typeset()
            if(title && page===1){
               setTimeout(()=>ref1.current.click(),20000);
                setTimeout(()=>ref0.current.click(), 40000);
            }
            else{ clearTimeout()}
            setm({...modal, Ready:false})
        }
        if(typeof window?.MathJax !== "undefined"){
            setp(1);
            ett()
        }
    }, [])
    useEffect(()=>{
        if(typeof window?.MathJax !== "undefined"){
             window.MathJax.typeset()
        }
    },[compa, compute])
    const [tap, settap]=useState(true)
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
        const workout = {title, detail1, detail3}
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
                        if (!response.ok) {
                            throw new Error(response.json().error)
                        }
                        if (response.ok) {
                            dispatch({type: 'CREATE_WORKOUT', payload: response.json()})
                            setm({...modal, saved: true})
                        }
                    })
                })
            } catch (err){
                if(err.message[0]==="U"){
                    setErrorr("Network problem! check your connection and try again.")
                } else {setErrorr(err.message)}
            }
            setm({...modal, Ready: false})
        }
    }

    return (
        <>
        <div className="d-block m-0 p-1" style={w<=1280?{minHeight: 1.1*f+"px", paddingTop:0+"%"}:{minHeight: 1.1*f+"px",paddingTop:"0%"}}>
        <div className="tab-content justify-content-center col-lg-8 col-12" id="nav-tabContent" style={{margin: "auto", marginTop: h1}}>
            <AnimatePresence >
            <motion.div className="tab-pane fade show active" id="nav-full-solution" role="tabpanel"
                key="full"
                aria-labelledby="nav-full-solution-tab">
                <section>
                    <div className="container-lg" id="pdf">
                        <div>
                        <div className={dim.w>700?"fs-5":"beginner"}>
                            <div>
                                <div className="fw-bolder" id="m1"> Inputed equation:</div>
                                <div className="text-center">{`\\((1-x^2)y''+${n1===0?"":2*(n1*1)+1}xy'${(k*1)<0? "": "+"}${k*1}y=0\\)`}</div>
                                <div className="fw-bolder" id="m2"> The General solution can be written as:</div>
                                <div className="text-center">{coeff1}</div>
                            </div>
                            <div id="pic1" className="mt-lg-5 mt-3 container table-responsive pt-0 mt-2 stytab">
                            <div className="text-start ms-0 pe-2 ps-0 fs-5 mb-3">
                                {
                                    n===0 && (<><div>{"\\(F_0(x)=\\)"}<span className="npallf">{array1[0]}</span><span>{`\\(^${sv}\\)`}</span></div>
                                        <div>{"\\(G_0(x)=\\)"}<span className="npallf">{array1[1]}</span>{`\\(^${sv}\\)`}</div></>
                                    )
                                }
                                {
                                    n===1 && (
                                        <><div>{"\\(F_1(x)=\\frac{1}{\\sqrt{1-x^2}}\\)"}<span className="npallf">{array1[0]}</span><span>{`\\(^${sv}\\)`}</span></div>
                                        <div>{"\\(G_1(x)=\\frac{1}{\\sqrt{1-x^2}}\\)"}<span className="npallf">{array1[1]}</span><span>{`\\(^${sv}\\)`}</span></div></>
                                    )
                                }
                                {
                                    n===2 && (<><div>{"\\(F_2(x)=\\frac{1}{\\sqrt{(1-x^2)^3}}\\)"}<span className="npallf">{array1[0]}</span><span>{`\\(^${sv}\\)`}</span><span className="mx-1 npallf">{`\\(x+i\\sqrt{${v1}(1-x^2)}\\)`}</span></div>
                                    <div>{"\\(G_2(x)=\\frac{1}{\\sqrt{(1-x^2)^3}}\\)"}<span className="npallf">{array1[1]}</span><span>{`\\(^${sv}\\)`}</span><span className="mx-1 npallf">{`\\(x-i\\sqrt{${v1}(1-x^2)}\\)`}</span></div></>)
                                }
                                {
                                    n===3 && (<><div className="d-flex align-items-center">{"\\(F_3(x)=\\frac{1}{\\sqrt{(1-x^2)^5}}\\)"}<span className="npallf">{array1[0]}</span><span>{`\\(^${sv}\\)`}</span><span className="mx-1 npallf d-flex">{`\\(3x^2+3ix\\sqrt{${v1}(1-x^2)}-(${v1-1})(1-x^2)\\)`}</span></div>
                                    <div className="d-flex align-items-center">{"\\(G_3(x)=\\frac{1}{\\sqrt{(1-x^2)^5}}\\)"}<span className="npallf">{array1[1]}</span><span>{`\\(^${sv}\\)`}</span><span className="mx-1 npallf d-flex">{`\\(3x^2-3ix\\sqrt{${v1}(1-x^2)}-(${v1-1})(1-x^2)\\)`}</span></div>
                                    </>)
                                }
                                {
                                    n===4 && (<><div className="d-flex align-items-center">{"\\(F_4(x)=\\frac{1}{\\sqrt{(1-x^2)^7}}\\)"}<span className="npallf">{array1[0]}</span><span>{`\\(^${sv}\\)`}</span><div className="mx-1 npallf d-flex">{`\\(15x^3+15ix^2\\sqrt{${v1}(1-x^2)}-(${6*v1-9})x(1-x^2)-i(${v1-4})\\sqrt{${v1}(1-x^2)^3}\\)`}</div></div>
                                            <div className="d-flex align-items-center">{"\\(G_4(x)=\\frac{1}{\\sqrt{(1-x^2)^7}}\\)"}<span className="npallf">{array1[0]}</span><span>{`\\(^${sv}\\)`}</span><div className="mx-1 npallf d-flex">{`\\(15x^3-15ix^2\\sqrt{${v1}(1-x^2)}-(${6*v1-9})x(1-x^2)+i(${v1-4})\\sqrt{${v1}(1-x^2)^3}\\)`}</div></div>
                                    </>)
                                }
                                {
                                    n===5 && (<><div className="max">{"\\(F_5(x)=\\frac{1}{\\sqrt{(1-x^2)^9}}\\)"}<div className="npallf">{array[0]}</div><div>{`\\(^${sv}\\)`}</div><span className="mx-1 npallf d-flex">{`\\(105x^4+105ix^3\\sqrt{${v1}(1-x^2)}-(${45*v1-90})x^2(1-x^2)-i(${10*v1-55})x\\sqrt{${v1}(1-x^2)^3}+(${v1**2-10*v+9})(1-x^2)^2\\)`}</span></div>
                                                <div className="max">{"\\(F_5(x)=\\frac{1}{\\sqrt{(1-x^2)^9}}\\)"}<div className="npallf">{array[0]}</div><div>{`\\(^${sv}\\)`}</div><span className="mx-1 npallf d-flex">{`\\(105x^4-105ix^3\\sqrt{${v1}(1-x^2)}-(${45*v1-90})x^2(1-x^2)+i(${10*v1-55})x\\sqrt{${v1}(1-x^2)^3}+(${v1**2-10*v+9})(1-x^2)^2\\)`}</span></div>
                                    </>)
                                }
                            </div>
                            </div>
                            <div className="fw-bolder" id="m2"> An alternative solution which might be preferable is:</div>
                            <div className="text-center">{coeff11}</div>
                            <div className="fw-bolder" id="m3"> Where:</div>
                            <div id="m4">\(C_1\) and \(C_2\) are constants</div>
                            <div id="pic1" className="mt-lg-5 mt-3 container table-responsive pt-0 mt-2 stytab">
                            <div className="text-start ms-0 pe-2 ps-0 fs-5 mb-3">
                            {
                                n===0 && (
                                    <div>{`\\(P_${n}(x)=cos(${sv}cos^{-1}x)\\)`}</div>
                                )
                            }
                            {
                                n===1 && (
                                    <div>{`\\(P_${n}(x)=\\frac{1}{\\sqrt{1-x^2}}\\)`}<span className="npallf">{`\\(sin(${sv}cos^{-1}x)\\)`}</span></div>
                                )
                            }
                            {
                                n===2 && (
                                    <div>{`\\(P_${n}(x)=\\frac{1}{\\sqrt{(1-x^2)^3}}\\)`}<span className="npallf">{`\\(x.S-\\sqrt(${v1}(1-x^2)).C\\)`}</span></div>
                                )
                            }
                            {
                                n===3 && (
                                    <div>{`\\(P_${n}(x)=\\frac{1}{\\sqrt{(1-x^2)^5}}\\)`}<span className="npallf">{`\\(3x^2.S-3x\\sqrt(${v1}(1-x^2)).C-(${v1-1})(1-x^2).S\\)`}</span></div>
                                ) 
                            }
                            {
                                n===4 && (
                                    <div>{`\\(P_${n}(x)=\\frac{1}{\\sqrt{(1-x^2)^7}}\\)`}<span className="npallf">{`\\(15x^3.S-15x^2\\sqrt(${v1}(1-x^2)).C-(${6*v1-9})(1-x^2)x.S + (${v1-4})\\sqrt{${v1}(1-x^2)^3}\\)`}</span></div>
                                ) 
                            }
                            
                            {
                                n===5 && (
                                    <div>{`\\(P_${n}(x)=\\frac{1}{\\sqrt{(1-x^2))^9}}\\)`}<span className="npallf">{`\\(105x^3.S-105x^2\\sqrt{${v1}(1-x^2)}.C-(${45*v1-90})(1-x^2)x.S + (${10*v1-55})\\sqrt{${v1}(1-x^2)^3} + (${v1**2-10*v1+9})(1-x^2)^2\\)`}</span></div>
                                ) 
                            }
                            {
                                n>1 && (
                                    <div>note also that, <span>{`\\(C=cos(${sv}cos^{-1}x)\\)`}</span> and <span>{`\\(S=sin(${sv}cos^{-1}x)\\)`}</span></div>
                                )
                            }
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
                        <div id="pic2">
                        <div className="text-start ms-0 pe-2 ps-0 fs-5 mb-3">
                        {
                                n===0 && (
                                    <div>{`\\(Q_${n}(x)=sin(${sv}cos^{-1}x)\\)`}</div>
                                )
                            }
                            {
                                n===1 && (
                                    <div>{`\\(Q_${n}(x)=\\frac{1}{sqrt{1-x^2}}\\)`}<span className="npallf">{`\\(-cos(${sv}cos^{-1}x)\\))`}</span></div>
                                )
                            }
                            {
                                n===2 && (
                                    <div>{`\\(Q_${n}(x)=\\frac{1}{\\sqrt{(1-x^2)^3}}\\)`}<span className="npallf">{`\\(-x.C-\\sqrt(${v1}(1-x^2)).S\\)`}</span></div>
                                )
                            }
                            {
                                n===3 && (
                                    <div>{`\\(Q_${n}(x)=\\frac{1}{\\sqrt((1-x^2))^5}\\)`}<span className="npallf">{`\\(-3x^2.C-3x\\sqrt(${v1}(1-x^2)).S+(${v1-1})(1-x^2).C\\)`}</span></div>
                                ) 
                            }
                            {
                                n===4 && (
                                    <div>{`\\(Q_${n}(x)=\\frac{1}{\\sqrt{(1-x^2)^7}}\\)`}<span className="npallf">{`\\(-15x^3.C-15x^2\\sqrt(${v1}(1-x^2)).S+(${6*v1-9})(1-x^2)x.C + (${v1-4})\\sqrt{${v1}(1-x^2)^3}\\)`}</span></div>
                                ) 
                            }
                            
                            {
                                n===5 && (
                                    <div>{`\\(Q_${n}(x)=\\frac{1}{\\sqrt{(1-x^2)^9}}\\)`}<span className="npallf">{`\\(-105x^4.S-105x^3\\sqrt(${v1}(1-x^2)).C+(${45*v1-90})(1-x^2)x^2.S + (${10*v1-55})x\\sqrt{${v1}(1-x^2)^3} -(${v1**2-10*v1+9})(1-x^2)^2\\)`}</span></div>
                                ) 
                            }
                            {
                                n>1 && (
                                    <div>note also that, <span>{`\\(C=cos(${sv}cos^{-1}x)\\)`}</span> and <span>{`\\(S=sin(${sv}cos^{-1}x)\\)`}</span></div>
                                )
                            }
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
            <motion.div className="tab-pane fade pt-4" id="nav-calculator" role="tabpanel"
                key="calculator1"
                aria-labelledby="nav-calculator-tab">
                <section className="container-lg justify-content-center text-center">
                    <div className={dim.w<800?"beginner":"fs-5"}>
                    Insert the value of x to compute for the values of <span className="cofp4">{`\\(P_{${n}}(x)\\)`}</span> and <span className="cofq4">{`\\(Q_{${n}}(x)\\)`}</span>.
                    <span style={{color: "red"}}> Note that x must be in the range \(\ -1\lt x\lt1\).</span>
                    <div>
                        <div className="mt-5" style={{alignContent: "center", display: "inline", alignItems: "center", alignSelf: "center", textAlign: "center", borderSpacing: "0ch"}}>
                        <input className="col-lg-5 col-8 text-center p-1" type="number" onChange={(e)=>setIn2(e.target.value)} value={input2} placeholder="Enter the value of x (-1 < x < 1)"/>
                        <motion.button variants={Variants} whileHover="hover" className="btn bgpupp textpele" onClick={()=>{(compe || Number(input2)<-1 || Number(input2)>1)?setcom(false):compute()}}>Compute</motion.button>
                        </div>
                        {(comp && input2!==undefined) && (<div className={dim.w>800?"fs-5":"beginner"} style={{textAlign: "left", marginTop: "10%"}}>
                        <div style={{scale: "1.1"}}>{array[0]}</div>
                        <div style={{scale: "1.1"}}>{array[1]}</div>
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

export default Solution