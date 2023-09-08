const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCPP = (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} &&  .//${jobId}.out`,
      (error, stdout, stderr) => {
        if (stderr ) {
          reject(stderr);
        }
        if(error){
          reject(error);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCPP,
};
