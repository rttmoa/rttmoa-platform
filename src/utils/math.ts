// import math from '@/utils/math'
// import math from "mathjs";
const math = require("mathjs");

interface MathFunc {
  (...rest: Array<any>): number;
}

const Math: {
  add: MathFunc;
  subtract: MathFunc;
  multiply: MathFunc;
  divide: MathFunc;
} = {
  add: (...rest) => {
    return rest.reduce((m, n) => Number(math.format(math.chain(math.bignumber(m)).add(math.bignumber(n)).done())));
  },
  subtract: (...rest) => {
    return rest.reduce((m, n) => Number(math.format(math.chain(math.bignumber(m)).subtract(math.bignumber(n)).done())));
  },
  multiply: (...rest) => {
    return rest.reduce((m, n) => Number(math.format(math.chain(math.bignumber(m)).multiply(math.bignumber(n)).done())));
  },
  divide: (...rest) => {
    return rest.reduce((m, n) => Number(math.format(math.chain(math.bignumber(m)).divide(math.bignumber(n)).done())));
  }
};

export default Math;
