// Advent of Code - Day 1 - Part One

export function part1(input) {
  let lines = input.split("\n");
  let decodedNumbers = [];

  lines.forEach(line => {
    let lineNumbers = []
    line.split("").forEach(char=>{
      let parsed = parseInt(char)
      if(!isNaN(parsed)){
        lineNumbers.push(parsed)
      }
    })
    let parsedLine = parseInt([ lineNumbers[0], lineNumbers[lineNumbers.length-1] ].join("")) // a1b2c3d4e5f -> 1, 2, 3, 4, 5 -> 15
    if (!isNaN(parsedLine)){
      decodedNumbers.push(parsedLine)
    }
  });
  let sum = decodedNumbers.reduce(
    (acumulator, current)=>{
      //console.log(acumulator, current)
      return acumulator + current
    },0
  )
  return sum;
}