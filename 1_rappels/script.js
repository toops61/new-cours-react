//import foo, {age} from './module.js';
import * as Utils from './module.js'; 

// foo();

console.log(Utils);

const { age } = Utils;

console.log(age);