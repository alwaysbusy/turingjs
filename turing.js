/* turing.js */
/* Copyright (c) Owen Hurford 2015 */
/*jslint passfail: false, sloppy: true*/

function tm() {
    function State () {
        this.transitions = new Array();
    };
    
    function Transition (inputSymbol, outputSymbol, stateChange, moveDirection) {
        this.input = inputSymbol;
        this.output = outputSymbol;
        this.state = stateChange;
        this.direction = moveDirection;
    };
    
    this.states = new Array();
    this.currentState = 0; //Current state is either positive integer N, -1 for accepting state or -2 for rejecting state
    this.currentChar = 0; //Gives character in input to be examined in nextStep()
    this.tape = new Array(null);
    
    this.setInput = function (chars) {
        var i = 0;
        this.tape = new Array(null);
        for (i = 0; i < chars.length; i++) {
            this.tape.push(chars[i]);
        }
    };
    
    this.resetMachine = function () {
        this.currentState = 0;
        this.currentChar = 0;
    };
    
    this.addState = function () {
        this.states.push(new State());
        return this.states.length - 1;
    };
        
    this.addTransition = function (startState, input, output, endState, move) {
        this.states[startState].transitions.push(new Transition(input, output, endState, move));
    };
    
    this.nextStep = function () {
        var i = 0, moved = false;
        if (this.currentState >= 0) {
            while (i < this.states[this.currentState].transitions.length && moved === false) {
                if (this.states[this.currentState].transitions[i].input === this.tape[this.currentChar]) {
                    this.tape[this.currentChar] = this.states[this.currentState].transitions[i].output;
                    if (this.states[this.currentState].transitions[i].direction === "L") {
                        this.currentChar -= 1;
                    } else if (this.states[this.currentState].transitions[i].direction === "R") {
                        this.currentChar += 1;
                    }
                    this.currentState = this.states[this.currentState].transitions[i].state;
                    moved = true;
                }
                i++;
            }
            if (moved == false) {
                this.currentState = -2;
            }
        }
    };
    
    this.runToEnd = function () {
        while(this.currentState >= 0) {
            this.nextStep();
        }
        
        return this.currentState;
    }
}