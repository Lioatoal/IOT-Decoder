const fs = require('fs');
const dateFormat = require('dateFormat');

const dataFormat = JSON.parse(fs.readFileSync("./dataFormat.json"));

const NUMBER_MAX = 10;

var decoder = function(){};
decoder.prototype.decode = function (source, callback) {
    let data = {};
    for (let i in dataFormat) {
        const typeID = parseInt(dataFormat[i].typeID);
        const typeField = parseInt(dataFormat[i].typeField)-1;
        if (typeID === source[typeField]) {
            let tmp = dataFormat[i].data;
            data = JSON.parse(JSON.stringify(tmp));
            for (let i in data) {
                const valIndex = data[i].fields.split(',');
                const level = data[i].level;
                data[i].value = valueCalculation(source, level, valIndex);
                data[i].number = numberOutput(NUMBER_MAX);
                // data[i].log = dateFormat(new Date(), 'yyyymmdd-HH:MM:ss');
                delete data[i].fields;
                delete data[i].level;
            }
            callback(data);
        }
    }
}

decoder.prototype.crcCheck = function (source) {
    const START = 1;
    const END = 17;
    const PLOY = 55;
    let TYPE = 9;
    let crc = 0;

    for (let i = START; i < END+1; i++) {
        crc ^= source[i];
    }
    crc ^= PLOY;

    if(crc === source[source.length-1]){
        return false;
    } else {
        console.log("Package type ID : %d, crc check fail!" + " - " + new Date().toISOString(), source[TYPE]);
        return true;
    }
}

function valueCalculation(source, level, valIndex) {
    let valIndetInt = 0;
    let value = 0;
    for (let i = 0; i < valIndex.length; i++) {
        shiftVal = (valIndex.length-i-1)*8;
        valIndetInt = parseInt(valIndex[i])-1;
        value += source[valIndetInt] << (shiftVal);
    }
    value /= level;
    return value;
}

function numberOutput(max) {
    return Math.floor(Math.random()*max);
}


module.exports = new decoder();