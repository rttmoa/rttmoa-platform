var nodes7 = require('nodes7'); // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
var doneReading = false;
var doneWriting = false;

var variables: any = {
      TEST1: 'MR4',          // Memory real at MD4
      TEST2: 'M32.2',        // Bit at M32.2
      TEST3: 'M20.0',        // Bit at M20.0
      TEST4: 'DB1,REAL0.20', // Array of 20 values in DB1
      TEST5: 'DB1,REAL4',    // Single real value
      TEST6: 'DB1,REAL8',    // Another single real value
      TEST7: 'DB1,INT12.2',  // Two integer value array
      TEST8: 'DB1,LREAL4',   // Single 8-byte real value
      TEST9: 'DB1,X14.0',    // Single bit in a data block
      TEST10: 'DB1,X14.0.8'  // Array of 8 bits in a data block
};

conn.initiateConnection({ port: 102, host: '192.168.0.2', rack: 0, slot: 1, debug: false }, connected); // slot 2 for 300/400, slot 1 for 1200/1500, change debug to true to get more info
// conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000, doNotOptimize: true}, connected);
// local and remote TSAP can also be directly specified instead. The timeout option specifies the TCP timeout.

function connected(err: any) {
  if (typeof(err) !== "undefined") {
    // We have an error. Maybe the PLC is not reachable.
    console.log(err);
    process.exit();
  }
  conn.setTranslationCB(function(tag: string | number) { return variables[tag]; }); // This sets the "translation" to allow us to work with object names
  conn.addItems(['TEST1', 'TEST4']);
  conn.addItems('TEST6');
  // conn.removeItems(['TEST2', 'TEST3']); // We could do this.
  // conn.writeItems(['TEST5', 'TEST6'], [ 867.5309, 9 ], valuesWritten); // You can write an array of items as well.
  // conn.writeItems('TEST7', [666, 777], valuesWritten); // You can write a single array item too.
  conn.writeItems('TEST3', true, valuesWritten); // This writes a single boolean item (one bit) to true
  conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad: any, values: any) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
  console.log(values);
  doneReading = true;
  if (doneWriting) { process.exit(); }
}

function valuesWritten(anythingBad: any) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
  console.log("Done writing.");
  doneWriting = true;
  if (doneReading) { process.exit(); }
}