const [ (num) ] = [1]; // SyntaxError: Unexpected token (

const { x: (x1)} = {}; // SyntaxError: Unexpected token (

const ({ x: x2 }) = {}; // SyntaxError: Unexpected token (

const { (x: x3) } = {}; // SyntaxError: Unexpected token (

const { (x): x4 } = {}; // SyntaxError: Unexpected token (
