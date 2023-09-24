const { exec } = require("child_process");

const executeInterpretedLang = (filePath, language, userInput) => {
  if(userInput){
    userInput = userInput.toString();
  }
  let execComand;
  if (language === "js") execComand = `node ${filePath}`;
  else if (language === "py") execComand = `python ${filePath}`;
  return new Promise((resolve, reject) => {
    const childProcess = exec(execComand, (error, stdout, stderr) => {
      if (!(stderr === "")) {
        reject(stderr);
      } else if (error) {
        reject(error);
      }
      resolve(stdout);
    });
    if(userInput){
      childProcess.stdin.write(userInput);
      childProcess.stdin.end();
    }
    

  });
};

module.exports = {
  executeInterpretedLang,
};
