const clgDev=(x)=>{
    if(process.env.NODE_ENV==='development'){
        console.log(x);
    }
}

export default clgDev;