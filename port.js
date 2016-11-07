var SerialPort = require('serialport');
var arduino;
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
    if(port.manufacturer.split(" ")[0] == "Arduino"){
      console.log("arduino detected");
      arduino = new SerialPort(port.comName);
      arduino.on('open', function() {
        arduino.write('main turn on$', function(err) {
          if (err) {
            return console.log('Error on write: ', err.message);
          }
          console.log('message written');
        });
      });
      arduino.on('error', function(err) {
        console.log('Error: ', err.message);
      });
      exports.arduino = arduino;
    }
  });
});
