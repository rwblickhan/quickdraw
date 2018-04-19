### Logging

If you want logs from `debug`,
you have to have the `DEBUG` environment variable set appropriately;
I like to use `DEBUG=*` to just get everything (including from Express!)
but you can also set e.g. `DEBUG=gameio::*` to only get our own.

### Messages

##### Client 

* `register` with param `username`:
Register a player with the given username.
* `draw` with param `{x, y}`:
Draw to the player's given grid if it is their turn.
