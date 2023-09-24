const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(path.resolve(__dirname, ".."), "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCompiledLang = (filePath, language, userInput) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);
  let executeCommand;
  if (language === "cpp")
    executeCommand = `"g++" ${filePath} -o ${outPath} && cd ${outputPath} &&  .//${jobId}.out`;
  else if (language === "c")
    executeCommand = `"gcc" ${filePath} -o ${outPath} && cd ${outputPath} &&  .//${jobId}.out`;
  // else if(language==="java")executeCommand = `"javac" ${filePath} -d ${outPath} && cd ${outputPath} && java .//${jobId}.out` //need to handle java file as file name should be as that of the public class in prog
  return new Promise((resolve, reject) => {
    const childProcess = exec(executeCommand, (error, stdout, stderr) => {
      if (stderr) {
        reject(stderr);
      }
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
    if(userInput){
      childProcess.stdin.write(userInput);
      childProcess.stdin.end();  
    }
    fs.unlink(outPath,(error)=>{"error in deleting file"});
    console.log(outPath);
    
  });
};

module.exports = {
  executeCompiledLang,
};
