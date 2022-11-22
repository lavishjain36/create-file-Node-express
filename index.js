//importing packages
import express from "express";
import fs from "fs";

//initializing express
const app = express();

//defining port for our app
const PORT = process.env.PORT || 4000;

//test endpoint to know our app is working
app.get("/", (req, res) => {
  res.send(`App is working!!`);
});

//endpoint to display date and time 
app.get("/getDateTime", (req, res) => {

  //defining date and time
  const date = new Date().toDateString();
  const time = new Date().toTimeString();

  //writing date and time in backend folder
  fs.writeFile(
    "./backend/date-time.txt",
    `Current Date - ${date} \nCurrent Time - ${time}`,
    (err) => {
      if (err) console.log(err);
    }
  );
  res.send(`Text File with time stamp created sucessfully!! ${date} ${time}`);
});

//endpoint to read all files in a directory
app.get("/dirFiles", (req, res) => {

  //defining folder to read and reading the directory which returns an array of files
  let folder = "./backend";
  let filenames = fs.readdirSync(folder);

  console.log("\nFilenames in folder backend are:");

  //simply looping through each path and printing
  filenames.forEach((file) => {
    console.log("Filename:", file);
  });

  res.send("All Files present displayed sucessfully!!");
});

//running the app
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
