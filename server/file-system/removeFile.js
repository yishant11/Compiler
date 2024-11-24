const {unlinkSync} = require('fs');
const {join} = require('path');

const removeFile = async (uuid,lang,output)=>{

    const codeFile = join(process.cwd(),`codes/${uuid}.${lang}`),
    outputFile=join(process.cwd(),`output/${uuid}.${lang}`)

    unlinkSync(codeFile);

    if(output){
        unlinkSync(outputFile);
    }

}

module.exports={removeFile};