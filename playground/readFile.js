console.log("Starting app");
const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

var csv = require("fast-csv");
var wsDummyFilter1 = fs.createWriteStream("csv/filterDummy1.csv");
var wsDummyFilter2 = fs.createWriteStream("csv/filterDummy2.csv");
var wsDummyFilter3 = fs.createWriteStream("csv/newFile.csv");

// var wsFile1 = fs.createWriteStream('csv/filterFile1.csv');
// var wsFile2 = fs.createWriteStream('csv/filterFile2.csv');
const csvjson = require("csvtojson");
const ObjectsToCsv = require("objects-to-csv");

/*
|----------------------------------------------------------------------------
| READING THE COMPLETE DATA FROM THE FILE1.CSV FILE
|----------------------------------------------------------------------------
*/
var fetchData = () => {
    fs.createReadStream("csv/dummy1.csv")
        .pipe(csv())
        .on("data", function (data) {
            console.log(data);
        })
        .on("end", function (data) {
            console.log("Read finished");
        });
};

// =====================  READ END HERE  =======================

/*
|----------------------------------------------------------------------------
| LIST ALL THE DATA OF FILE1.CSV FILE
|----------------------------------------------------------------------------
*/
var getAll = () => {
    return fetchData();
};
// ==================  LIST END HERE  =================

/*
|----------------------------------------------------------------------------
| FILTER DATA FOR SKU AND PRODUCT_TITLE
|----------------------------------------------------------------------------
*/
var filterAll = () => {
    const csvDummyPath1 = "csv/dummy1.csv";
    const csvDummyPath2 = "csv/dummy2.csv";

    // const csvFilePath1 = 'csv/file1.csv';
    // const csvFilePath2 = 'csv/file2.csv';

    var sortData1 = [];
    var sortData2 = [];

    var newArr = [];

    var columns = ["SKU", "Product_Title"];
    // convert csv file to json
    csvjson()
        .fromFile(csvDummyPath1)
        .then(jsonObj1 => {
          //  console.log("total entries in File1: " + jsonObj1.length); // array of objects

            // writing file headers
            csv
                .write([columns], {
                    headers: true
                })
                .pipe(wsDummyFilter1);

            // Sort data acc to SKU Values
            jsonObj1.sort(function (a, b) {
                return a.SKU - b.SKU;
            });

            sortData1 = jsonObj1;

            // console.log('After sorting: ');
            // for (let i = 0; i < jsonObj1.length; i++) {
            //     console.log(sortData1[i].SKU);
            //     console.log(sortData1[i].Product_Title);
            // }

            for (let i = 0; i < sortData1.length; i++) {
                // writing actual data into .csv file
                csv.
                write([
                        [],
                        [sortData1[i].SKU, sortData1[i].Product_Title],
                    ])
                    .pipe(wsDummyFilter1);
                // =============  WRITING END HERE =======
            }
        });

    csvjson()
        .fromFile(csvDummyPath2)
        .then(jsonObj2 => {
            // console.log("total entries in File2: " + jsonObj2.length); // array of objects

            // writing file headers
            csv
                .write([columns], {
                    headers: true
                })
                .pipe(wsDummyFilter2);

            // Sort data acc to SKU Values
            jsonObj2.sort(function (a, b) {
                return a.SKU - b.SKU;
            });

            sortData2 = jsonObj2;

            // console.log('After sorting: ');
            // for (let i = 0; i < sortData2.length; i++) {
            //     console.log(sortData2[i].SKU);
            //     console.log(sortData2[i].Product_Title);
            // }

            for (let i = 0; i < sortData2.length; i++) {
                // writing actual data into .csv file
                csv.
                write([
                        [],
                        [sortData2[i].SKU, sortData2[i].Product_Title],
                    ])
                    .pipe(wsDummyFilter2);
                // =============  WRITING END HERE =======
            }
        });

    console.log('Success123');

    // FIND THOSE PRODUCT TITLE THAT DO NOT MATCH FOR SAME VALUES OF SKU


    /* function myFunc() {
        let k = 0;

        for (let i = 0; i < sortData2.length; i++) {
            for (let j = 0; j < sortData1.length; j++) {
                if (sortData1[j].SKU == sortData2[i].SKU) {
                    if (sortData1[j].Product_Title != sortData2[i].Product_Title) {
                        newArr[k] = sortData1[j];
                        newArr[k + 1] = sortData2[i];
                        k = k + 2;
                    }
                }

            }
        }

        // writing file headers
        csv
            .write([columns], {
                headers: true
            })
            .pipe(wsDummyFilter3);

        // Changed values are :
        for (let k = 0; k < newArr.length; k++) {
            console.log('Success');
            console.log(newArr[k]);
            csv.
            write([
                    [],
                    [newArr[k].SKU, newArr[k].Product_Title],
                ])
                .pipe(wsDummyFilter3);
        }



    }

    setTimeout(myFunc, 15000); */

};
module.exports = {
    fetchData,
    getAll,
    filterAll
};