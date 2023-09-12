const { exec } = require("child_process");

const executeInterpretedLang = (filePath, language) => {
  let execComand;
  if (language === "js") execComand = `node ${filePath}`;
  else if (language === "py") execComand = `python ${filePath}`;
  return new Promise((resolve, reject) => {
    exec(execComand, (error, stdout, stderr) => {
      if (!(stderr === "")) {
        reject(stderr);
      } else if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
};

module.exports = {
  executeInterpretedLang,
};
