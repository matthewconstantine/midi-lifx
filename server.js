var SocketIo = require('socket.io-client'),
    lifx = require('lifx'),
    socket = SocketIo("http://localhost:8000"),
    lx = new lifx(),
    HUE = 0.1,
    SAT = 0.3,
    COMMAND = 176;

var b1 = {
  h: HUE,
  s: SAT,
  b: 0.0
};

var b2 = {
  h: HUE,
  s: SAT,
  b: 0.0
};

socket.on('connect', function() {
  socket.on('note', function(m) {
    if (m.status !== COMMAND) {return;}
    var v = m.velocity / 127;
    if (m.note === 16) { b1.b = v; }
    if (m.note === 17) { b2.b = v; }
    if (m.note === 18) { b1.h = (SAT + v) % 1; }
    if (m.note === 19) { b2.h = (SAT + v) % 1; }
    lx.bulbs[0] && lx.bulbs[0].set(b1.h, b1.s, b1.b, 0, 2);
    lx.bulbs[1] && lx.bulbs[1].set(b2.h, b2.s, b2.b, 0, 2);
  });
});
