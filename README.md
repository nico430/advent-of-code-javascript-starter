# Advent of Code Javascript Starter

A template for [Advent of Code](https://adventofcode.com) written in Javascript with Node.

## Usage

The project use [Node.js](https://nodejs.org) as javascript runtime, [esbuild](https://esbuild.github.io)
as ES6 Modules to CommonJS transpiler and [swc](https://swc.rs) with [Jest](https://jestjs.io) for testing.

    $ git clone https://github.com/ljgago/advent-of-code-javascript-starter aoc-javascript
    $ cd aoc-javascript

    # install dependencies
    $ npm install

    # check syntax with eslint
    $ npm run lint day01

    # run tests for day01
    $ npm test day01

    # run the day01
    # npm start day01

## Generate

You can generate all necesary files for use in the event with a simple
command:

    $ npm run gen day01

This command generate these files:

    * creating src/day01/resources/input.txt
    * creating src/day01/index.js
    * creating src/day01/main.js
    * creating src/day01/part1.js
    * creating src/day01/part2.js
    * creating src/day01/README.md
    * creating test/day01.test.js

- `/src/day01/resources/input.txt`: the input data.
- `/src/day01/index.js`: export the modules for testing.
- `/src/day01/main.js`: the main module.
- `/src/day01/part1.js`: solution for part 1.
- `/src/day01/part2.js`: solution for part 2.
- `/src/day01/README.md`: you can write the challenge statement.
- `/tests/day01.test.js`: the module where you write the tests.

## Config

You can configure the automatic input download from the Advent of Code
session token.

For dowload the inputs from web, you needs to set the environment var
`AOC_SESSION`. You can to get the session token from the cookie web browser.

Also can you set the `AOC_YEAR` to select a certain year.
(It is not mandatory use the `AOC_YEAR`, the `npm run gen` can get the year automatically)

You can set an `.env` file with these variables.

Folder structure:

    ├── src
    │   └── day01
    │       ├── index.js
    │       ├── main.js
    │       ├── part1.js
    │       ├── part2.js
    │       ├── README.md
    │       └── resources
    │           └── input.txt
    └── test
        └── day01.test.js

Happy coding!

[MIT License](LICENSE)
