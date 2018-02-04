"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const net = require("net");
const helpers_1 = require("../../helpers");
class SocketServer extends events_1.EventEmitter {
    constructor() {
        super();
    }
    Stop() {
        if (!this.socketServer) {
            return;
        }
        try {
            this.socketServer.close();
            // tslint:disable-next-line:no-empty
        }
        catch (ex) { }
        this.socketServer = undefined;
    }
    Start(options = {}) {
        const def = helpers_1.createDeferred();
        this.socketServer = net.createServer(this.connectionListener.bind(this));
        const port = typeof options.port === 'number' ? options.port : 0;
        const host = typeof options.host === 'string' ? options.host : 'localhost';
        this.socketServer.listen({ port, host }, () => {
            def.resolve(this.socketServer.address().port);
        });
        this.socketServer.on('error', ex => {
            console.error('Error in Socket Server', ex);
            const msg = `Failed to start the socket server. (Error: ${ex.message})`;
            def.reject(msg);
        });
        return def.promise;
    }
    connectionListener(client) {
        client.on('close', () => {
            this.emit('close', client);
        });
        client.on('data', (data) => {
            this.emit('data', client, data);
        });
        client.on('timeout', d => {
            // let msg = "Debugger client timedout, " + d;
        });
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=socketServer.js.map