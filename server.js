var SocketIo = require('socket.io-client'),
    LifxClient = require('node-lifx').Client,
    client = new LifxClient(),
    socket = SocketIo("http://localhost:8000"),
    
    INIT_HUE = 0.1,
    INIT_SAT = 0.3,
    MIDI_COMMAND = 176;

var b1 = {
  h: INIT_HUE,
  s: INIT_SAT,
  b: 0.0
};

var b2 = {
  h: INIT_HUE,
  s: INIT_SAT,
  b: 0.0
};

var state = {
  lights: []
}

client.init()
client.on("light-new", (light) => {
  light.getLabel((error, label) => console.log(`found: ${label}`))
});

// const initState = () => {
//   const lights = client.lights()
//   console.log(client.lights())
//   if (lights.length) {
//     const labels = lights.map(l => l.label);
//     const noun = lights.length === 0 ? 'light' : 'lights'
//     console.log(`Found ${lights.length} ${noun}:`)
//     console.log(labels.join('/n'))
//   } else {
//     console.log('No lifx lights found.')
//   }
// }

// initState()


socket.on('connect', function() {
  socket.on('note', function(m) {
    if (m.status !== MIDI_COMMAND) {
      return;
    }
    var v = m.velocity / 127;
    var note = m.note;
    switch (note) {
      case 16:
        client.lights().map(light => light.color(INIT_HUE, INIT_SAT, v))
        break
      default:
    }
    // if (m.note === 16) { b1.b = v; }
    // if (m.note === 17) { b2.b = v; }
    // if (m.note === 18) { b1.h = (SAT + v) % 1; }
    // if (m.note === 19) { b2.h = (SAT + v) % 1; }
    // lx.bulbs[0] && lx.bulbs[0].set(b1.h, b1.s, b1.b, 0, 2);
    // lx.bulbs[1] && lx.bulbs[1].set(b2.h, b2.s, b2.b, 0, 2);
  });
});
