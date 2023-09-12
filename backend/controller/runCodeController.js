const { generateFile } = require("./generateFile");
const { executeCompiledLang } = require("./executeCompiledLang");
const { executeInterpretedLang } = require("./executeInterpretedLang");

const runCode = async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code) {
    //generate file
    const filePath = await generateFile(language, code);

    //execute/run file
    try {
      let output;
      if (language === "c" || language === "cpp")
        output = await executeCompiledLang(filePath, language);
      if (language === "js" || language === "py")
        output = await executeInterpretedLang(filePath, language);

      res.json({ filePath, output: output });
    } catch (error) {
      res.status(400).json({ succes: false, message: error });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "oops!! no code to execute" });
  }
};

module.exports = { runCode };
