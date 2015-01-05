# MIDI LIFX Controller
Here's a very simple server that listens to MIDI events from this [MIDI Server](https://github.com/mattconstantine/midiserver) and forwards them to [two of these lights](http://lifx.co/).

It doesn't have any configuration. It listens to localhost:8000 and expects reacts to MIDI messages my Nord Electro sends. It triggers the brightness of my favorite color to two LIFX bulbs.

### Requirements
1. Have a MIDI controller hooked up to a computer.
2. Have a LIFX bulb or two on the same network as that computer.
3. Run [MIDI Server](https://github.com/mattconstantine/midiserver) on that computer.
4. Run this by typing `node server.js` on the same computer.

### Changing Stuff
Your MIDI controller probably isn't the same as mine. Find the command number of a given knob. Turn the knob and watch the output from the MIDI Server. Change COMMAND to the number in server.js. 

Feel free to fork this and change it to suit your needs.
