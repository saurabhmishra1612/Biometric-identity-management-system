const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();



console.log(bitcoin);


const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1572443330570,
    "nounce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1572443504997,
    "nounce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1572444114454,
    "nounce": 31834,
    "hash": "000058d0d52578910f5e498959cad62b7a0b0e0195383fcc6e10ab1cfe71e576",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1572444227336,
    "nounce": 100980,
    "hash": "0000a2e592f560481202dd7ff8488af39649355927ed4f003b99ce63e49d3f02",
    "previousBlockHash": "000058d0d52578910f5e498959cad62b7a0b0e0195383fcc6e10ab1cfe71e576"
    },
    {
    "index": 5,
    "timestamp": 1572444339432,
    "nounce": 47534,
    "hash": "0000424fa54bc4580a0fb17fdcadf97c93c125480342284608ef728d293da7ed",
    "previousBlockHash": "0000a2e592f560481202dd7ff8488af39649355927ed4f003b99ce63e49d3f02"
    }
    ],
    "pendingTransactions": [
    {
    "sender": "00",
    "recepient": "00fc1f90fb1c11e9839d2b84e362df66",
    "transactionId": "5a523b40fb1e11e9839d2b84e362df66"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

    console.log('VALID: ',bitcoin.chainIsValid(bc1.chain));