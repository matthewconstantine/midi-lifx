var SocketIo = require('socket.io-client'),
    lifx = require('lifx'),
    socket = SocketIo("http://localhost:8000"),
    lx = new lifx(),
    HUE = 0.1,
    SAT = 0.3,
    COMMAND = 176;

socket.on('connect', function() {
  socket.on('note', function(m) {
    if (m.status === COMMAND && m.note === 1) {
      lx.bulbs[0] && lx.bulbs[0].set(HUE, SAT, m.velocity / 127, 0, 2);
      lx.bulbs[1] && lx.bulbs[1].set(HUE, SAT, m.velocity / 127, 0, 2);
    }
  });
});
