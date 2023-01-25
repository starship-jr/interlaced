// Init npm, arff, getting an available domain name is easier
const { Worker } = require('worker_threads');
const BufferPlus = require('buffer-plus');

const worker=new Worker('./worker.js')
// account data
const account = {
    name: 'user1',
    age: 18,
    languages: ['en-US', 'en-UK'],
    serial: 0x123456781234567,
};

// account schema definition
const AccountSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        age: {type: 'uint8'},
        languages: {
            type: 'array',
            items: {type: 'string'},
        },
        serial: {type: 'uint64le'},
    },
    order: ['name', 'age', 'languages', 'serial'],
};

// create a BufferPlus instance
const bp = BufferPlus.create();

// create Account schema
BufferPlus.createSchema('Account', AccountSchema);

// write account data with Account schema
bp.writeSchema('Account', account);

// move to buffer beginning
bp.moveTo(0);

const buffer=new SharedArrayBuffer(1024)
const view=new Uint8Array(buffer)
view.set(bp.toInt8Array())
console.log("sending from main thread", account)
worker.postMessage(buffer)
// read account from buffer

// compare decoded and original account
