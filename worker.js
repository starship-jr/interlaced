const { parentPort } = require("worker_threads")
const BufferPlus = require('buffer-plus');

parentPort.on("message", (buffer) => {
    const AccountSchema = {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'uint8' },
            languages: {
                type: 'array',
                items: { type: 'string' },
            },
            serial: { type: 'uint64le' },
        },
        order: ['name', 'age', 'languages', 'serial'],
    };
    BufferPlus.createSchema('Account', AccountSchema);
    const view = new Uint8Array(buffer);
    const bp = BufferPlus.from(view.buffer);
    const decodedAccount = bp.readSchema('Account');
    console.log("data from worker thread",decodedAccount);
    console.log(`Property name from worker thread : ${decodedAccount.name}`)

})