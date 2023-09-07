const express = require("express");
const app = express();
const { generateFile } = require('./generateFile');
const { executeCPP } = require("./executeCPP");

//middlewares
app.use(express.urlencoded({ extended: true }));
//above middleware use as we get data from FE html forms in urlencoded manner
app.use(express.json());
//above middleware converts the data in json fromat

app.get("/", (req, res) => {
  res.json({ online: "complier" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code) {

    //generate file
    const filePath = await generateFile(language,code);
    
    //execute/run file
    const output = await executeCPP(filePath)
    res.json({ filePath, output });

  } else {
    res
      .status(400)
      .json({ success: false, message: "oops!! no code to execute" });
  }
});

app.listen(8000, () => {
  console.log(`server is listening on port : 8000`);
});
