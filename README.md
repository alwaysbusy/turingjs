turing.js
=========

A customisable turing machine written in Javascript

Usage
-----
Include turing.js as a script and then create a Turing Machine using "var turing = new tm();"

Several function then exist to allow the machine to be specified
setTape([char, ...]) - Set the tape using an array of characters.  The null character will be inserted automatically.
int addState() - Add a new state to the Machine.  Integer giving state number will be returned.
addTransition(startState, input, output, endState, tapeMove) - Add a new transition from startState to endState with the input symbol being changed to the output symbol.  The tape head will move according to tapeMove, either "L", "R" or "S".  The transition over null character 0 is not automatic.
resetMachine() - Return the tape head to 0 (null) and state to 0
nextStep() - Run the next instruction in the machine
int runToEnd() - Run the machine to termination and return the final state -1 (Accepting) or -2 (Rejecting)