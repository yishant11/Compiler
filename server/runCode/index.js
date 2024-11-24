const {languages,commands}= require('./codeDetails');
const createFile= require('../file-system/createFile');
const {removeFile} = require('../file-system/removeFile');

const {spawn} = require('child_process');

async function runCode({lang="", code="",input=""}){
    if(code === ""){
        return "not Runnable"
    }

    if(!languages.includes(lang)){
        return "Lang not found";
    }

    const {jobId} =  await createFile(lang,code);
    console.log("file created");
    // await removeFile(jobId,lang,0);
    
    const {compileCommandPrefix,compileCommandSuffix,executeCommandPrefix, executeCommandSuffix} = commands(jobId,lang);

    if(compileCommandPrefix){
        await new Promise((resolve,reject)=>{
            const exec = spawn(compileCommandPrefix,compileCommandSuffix);
            exec.stderr.on('data', (error) => {
            });
            exec.on('exit',()=>{
                resolve();
            })
        })
        
    }



    const result = await new Promise((resolve,reject)=>{
        const exec = spawn(executeCommandPrefix,executeCommandSuffix||[]);

        let output="",error="";
        if(input!==""){
            // console.log(input.match(/[^\s]+/g));
            input.split('\n').forEach((line)=>{
                console.log(line);
                exec.stdin.write(`${line}`);
                exec.stdin.write("\n");
            })
            exec.stdin.end();
        }
        exec.stdout.on('data', (data) => {
            output += data.toString();
        });

        exec.stderr.on('data', (data) => {
            error += data.toString();
        });
        exec.on('exit',(err)=>{
            resolve({output,error})
        })
    })

    await removeFile(jobId,lang,0);

    return {
        ...result,
        lang
    }
    

}
module.exports={runCode};