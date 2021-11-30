import { access, mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import * as ejs from 'ejs';
import chalk from 'chalk';

const templateFiles = [
  "scripts/templates/index.template.ejs",
  "scripts/templates/main.template.ejs",
  "scripts/templates/part1.template.ejs",
  "scripts/templates/part2.template.ejs",
  "scripts/templates/readme.template.ejs",
  "scripts/templates/day.test.template.ejs"
];

const targetFiles = dayName =>
  [
    `src/${dayName}/index.js`,
    `src/${dayName}/main.js`,
    `src/${dayName}/part1.js`,
    `src/${dayName}/part2.js`,
    `src/${dayName}/README.md`,
    `test/${dayName}.test.js`
  ]

const targetInput = dayName =>
  `src/${dayName}/resources/input.txt`


const zip = (a, b) => a.map((v, i) => [v, b[i]])

// const pipe = (...funcs: Function[]) =>
//   (input: any) =>
//   funcs.reduce((v, func) =>
//                func(v), input);

const pipeAsync = (...funcs) =>
  input =>
  funcs.reduce(async (v, func) =>
               func(await v), input)


// check it the file exists or not
const filePathExists = async file =>
  await access(file)
    .then(() => true)
    .catch(() => false)

// read the template file
async function readTemplate(templateFile) {
  return readFile(templateFile, 'utf8');
}

// rendered the template with the data
function renderTemplate(templateData) {
  return async function(content) {
    return ejs.render(content, { data: templateData }, {async: true});
  }
}

// create the file with the rendered content
function createFile(filename) {
  return async function(content) {
    const fileExists = await filePathExists(filename);
    if (fileExists == true) {
      console.log(chalk.yellow("* ignoring ") + `${filename} already exists`);
      return;
    }

    try {
      const pathname = path.dirname(filename);
      const pathExist = await filePathExists(pathname);
      if (pathExist == false) {
        await mkdir(pathname, {recursive: true});
      }
    } catch (err) {
      console.log(err);
    }

    await writeFile(filename, content);
    console.log(chalk.green("* creating ") + `${filename}`);
  }
}

// return the default year
function defaultYear() {
  const today = new Date();
  const year = (today.getMonth() == 11)
    ? today.getFullYear()
    : today.getFullYear() - 1;
  return year;
}

// get the environment data
function getEnv() {
  let year = process.env.AOC_YEAR || "";
  year = year == ""
    ? defaultYear()
    : parseInt(year);

  const session = process.env.AOC_SESSION || "";
  return { year: year, session: session }
}

// fetch the puzzle input
async function getInput(year, day, session) {
  if (session != "") {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const headers = {"cookie": `session=${session}`};

    try {
      const content =  await fetch(url, {headers: headers})
      return content.status == 200
        ? content.text()
        : "";
    } catch (err) {
      console.error(err);
    }
  }

  return "";
}

// run the main routine
(async function() {
  dotenv.config();

  // check if exists one only argument
  const dayName = process.argv[2];
  if (process.argv.length != 3) {
    console.log("--- `npm run gen` needs one only argument ---");
    return;
  }

  // check the argument string format
  const re = /(?<=day)\d+(?!\w)/;
  const dayArray = re.exec(dayName) || [];
  const dayNumber = dayArray.length == 1
    ? parseInt(dayArray[0])
    : 0;

  if (dayNumber == 0) {
    console.log("--- The argument must be `day + NUM` (e.g. day01) ---");
    return;
  }

  const data = {
    dayName: dayName,
    dayNumber: dayNumber
  };

  const { year, session } = getEnv();
  const contentInput = await getInput(year, dayNumber, session);

  try {
    // create the input file
    await createFile(targetInput(dayName))(contentInput);

    // create and render the template files
    zip(templateFiles, targetFiles(dayName))
    .forEach(filePaths => {
      pipeAsync(
        readTemplate,
        renderTemplate(data),
        createFile(filePaths[1]),
      )(filePaths[0])
    });
  } catch (err) {
    console.error(err);
  }
})()
