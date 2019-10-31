const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');

function Blockchain(){   //constructor functions
    this.chain =[];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100,'0','0');
}

Blockchain.prototype.createNewBlock = function(nounce,previousBlockHash,hash){
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.newTransactions,
        nounce: nounce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction =function(amount,sender,recepient){
    const newTransaction = {
        amount: amount,
        sender: sender,
        recepient: recepient,
        transactionId: uuid().split('-').join('')
    };

    
    return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function(previousBlockHash,currentBlockdata,nounce){
    const dataAsString = previousBlockHash + nounce.toString() + JSON.stringify(currentBlockdata);
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockdata){
    let nounce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockdata,nounce);
    while(hash.substring(0,4) != '0000'){  // to generate hash starting with 0000
        nounce++;
        hash = this.hashBlock(previousBlockHash,currentBlockdata,nounce);
    }

    return nounce;
}

Blockchain.prototype.chainIsValid = function(blockchain){
    let validChain = true;

    for (var i = 1;i < blockchain.length ; i++){
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i-1];
        const blockHash = this.hashBlock(prevBlock['hash'],{ transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nounce']); 
        if (blockHash.substring(0,4) !== '0000') validChain = false;
        if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
        
        console.log('previousBlockHash =>', prevBlock['hash']); 
        console.log('currrentBlockHash =>', currentBlock['hash']);
        
    };

    const genesisBlock = blockchain[0];
    const correctNounce = genesisBlock['nounce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    if(!correctNounce || !correctPreviousBlockHash || !correctHash || !correctTransactions ) validChain = false;

    return validChain;
};

Blockchain.prototype.getBlock = function(blockHash) {
    let correctBlock = null;
    this.chain.forEach(block => {
        if (block.hash === blockHash) correctBlock = block;
    });
    return correctBlock;
};

Blockchain.prototype.getTransaction = function(transactionId) {
    this.chain.forEach(block => {
        let correctTransaction = null;
        let correctBlock = null;
        block.transactions.forEach(transaction => {
            if (transaction.transactionId === transactionId) {
                correctTransaction = transaction;
                correctBlock = block;
            };
        });
    });

    return {
        transaction: correctTransaction,
        block: correctBlock
    };
};

Blockchain.prototype.getAddressData = function(address) {
    const addressTransactions = [];
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if (transaction.sender === address || transaction.recepient === address) {
                addressTransactions.push(transaction);
            };
        });
    });
    let balance = 0;
    addressTransactions.forEach(transaction => {
        if (transaction.recepient === address) balance += transaction.amount;
        else if (transaction.sender === address) balance -= transaction.amount; 
    });

    return {
        addressTransactions: addressTransactions,
        addressBalance: balance
    };
};

module.exports = Blockchain;