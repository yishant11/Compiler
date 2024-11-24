const { join } = require("path");

module.exports.languages = ['java','py','cpp'];

module.exports.commands= (jobId, lang)=>{
    switch(lang){
        case 'java':

        return{
            // compileCommandPrefix:"javac",
            // compileCommandSuffix:[join(process.cwd(),`codes/${jobId}.java`)],
            executeCommandPrefix:'java',
            executeCommandSuffix:[join(process.cwd(), `codes/${jobId}.java`)]
        }
        case 'py':
            return {
                executeCommandPrefix:'python',
                executeCommandSuffix:[join(process.cwd(), `codes/${jobId}.py`)]
            }
        default:
            return {}
    }

}