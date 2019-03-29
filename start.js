console.log('Starting app');
const fs = require('fs');
require('events').EventEmitter.defaultMaxListeners=Infinity;
const _ = require('lodash');
const yargs = require('yargs');

var csv = require('fast-csv');

var readFile = require('./playground/readFile');

var command = process.argv[2];
console.log('command', command);
console.log('process', process.argv);

const sortSKU = {
    description: 'SKU',
    demand: true,
    alias: 'ss'
};
// const countryOptions = {
//     description: 'Country',
//     demand: true,
//     alias: 'c'
// };
var args = yargs

    .command('listAll', 'Reading the complete data')
    .command('sortSKU', 'Sort data according to SKU value')
    // .command('filter', 'Filter Country', {
    //     country: countryOptions,
    // })
    .help()
    .argv;
console.log('yargs', args);

if (command === 'listAll') {
    readFile.getAll();
} else if (command === 'filterFiles') {
      readFile.filterAll();
}
//  else if (command === 'filter') {
//     console.log('Filtering Country: ', args.country);
//     readFile.filterCountry_Price(args.country);
// } 
else {
    console.log('command not recognized');
}