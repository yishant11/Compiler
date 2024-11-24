const {v4: getUUID}= require('uuid');
const {existsSync, mkdirSync,writeFileSync} = require('fs');
const {join} = require('path'); 
// console.log(process.cwd());
if(!existsSync(join(process.cwd(),"codes"))){
    mkdirSync(join(process.cwd(),"codes"));
}


if(!existsSync(join(process.cwd(),"outputs"))){
    mkdirSync(join(process.cwd(),"outputs"));
}

const createFile = async (lang, code)=>{
    const jobId = getUUID();
    // let extension="";
    // if(lang==="java"){
    //      extension="java";
    // }
    // else if(lang==="python"){
    //      extension= "py";
    // }
    // else{
    //      extension="cpp";
    // }
    const fileName = `${jobId}.${lang}`;
    const filePath =  join(process.cwd(),`codes/${fileName}`);

    await writeFileSync(filePath,code.toString());

    return {
        fileName,
        filePath,
        jobId
    }

}

module.exports=createFile;