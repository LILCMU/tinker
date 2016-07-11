

Blockly.Blocks.action_beep = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("beep");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Causes the GoGo to beep.');
  }
};

//Blockly.Blocks['action_beep'] = {
//  init: function() {
//    this.setHelpUrl('http://www.example.com/');
//    this.setColour(290);
//    this.appendDummyInput()
//        .appendField("beep");
//    this.setPreviousStatement(true);
//    this.setNextStatement(true);
//    this.setTooltip('');
//  }
//};

//Blockly.Blocks['date'] = {
//  init: function() {
//    this.setHelpUrl('http://www.example.com/');
//    this.setColour(290);
//    this.appendDummyInput()
//        .appendField("Date");
//    this.setOutput(true);
//    this.setTooltip('');
//  }
//};
Blockly.Blocks['clock_date'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("get ")
        .appendField(new Blockly.FieldDropdown([["day", "4"], ["month", "5"], ["year", "6"], ["hour", "2"], ["minute", "1"], ["second", "0"], ["day of week", "3"]]), "date");
    this.setOutput(true, "null");
    this.setTooltip('');
  }
};

Blockly.Blocks['display_text'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("show text  \"")
        .appendField(new Blockly.FieldTextInput("text"), "text")
        .appendField("\"");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

/***
Blockly.Blocks['display_showshorttext'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("show   \"")
        .appendField(new Blockly.FieldTextInput("text"), "text")
        .appendField("\"");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
/***/

Blockly.Blocks['display_number'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
//    this.appendDummyInput()
//        .appendField("show number  \"")
//        .appendField(new Blockly.FieldTextInput("text"), "text")
//        .appendField("\"");
    this.appendDummyInput()
        .appendField("show number  ");
    this.appendValueInput("value");
//        .setCheck("Number");
    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

/***


Blockly.Blocks['display_showtext'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
	this.appendDummyInput()
	    .appendField("show   \"");
	this.appendValueInput("value")
	    .setCheck("null")
	this.appendDummyInput()
	    .appendField("\"")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
/***/

Blockly.Blocks['display_movecursor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("move cursor to")
        .appendField(new Blockly.FieldTextInput("position"), "num");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['display_clearscreen'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("clear screen");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['recorder_play'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Play Track");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['recorder_next'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Next Track");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['recorder_prev'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Prev Track");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['recorder_select'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Select Track ")
        .appendField(new Blockly.FieldTextInput("N"), "track");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['recorder_eraseall'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Erase All Tracks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
/***


Blockly.Blocks['i2c_write'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Write I2C register:");
    this.appendValueInput("value")
        .appendField("write ");
    this.appendDummyInput()
        .appendField(" to ")
        .appendField(new Blockly.FieldTextInput("register address"), "reg_addr")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("I2C address"), "i2c_addr");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
/***/

//***
Blockly.Blocks['i2c_write'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
//    this.appendDummyInput()
//        .appendField("Write I2C register:");
//    this.appendValueInput("value")
//        .appendField("write ");
//    this.appendValueInput("reg_addr")
//        .appendField("to ");
//    this.appendValueInput("i2c_addr")
//        .appendField(", ");
//    this.setInputsInline(true);
    this.appendValueInput("value")
        .appendField("I2C Write value ");
    this.appendValueInput("reg_addr")
        .appendField("to register# ");
    this.appendValueInput("i2c_addr")
        .appendField(" on device address# ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
/***/

Blockly.Blocks['i2c_read'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
//    this.appendDummyInput()
//        .appendField("Read I2C register:")
//        .appendField("read from ")
//        .appendField(new Blockly.FieldTextInput("register address"), "reg_addr")
//        .appendField(", ")
//        .appendField(new Blockly.FieldTextInput("I2C address"), "i2c_addr");
//    this.appendValueInput("value")
//        .appendField("");
    this.appendValueInput("reg_addr")
        .appendField("I2C Read from register# ");
    this.appendValueInput("i2c_addr")
        .appendField(" on device address# ");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks.action_led = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("turn on-board LED")
    .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "onoff");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Causes the GoGo to turn LED on/off.');
  }
};

/***
Blockly.Blocks.action_wait = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("wait")
    .appendField(new Blockly.FieldTextInput("0.1"), "NAME")
    .appendField("second");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Waits for specified time period.');
  }
};
/***/

//***
Blockly.Blocks['action_wait'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField("wait");
    this.appendValueInput("NAME", Number);
    this.appendDummyInput()
        .appendField("1/10 second(s)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Waits for specified time period.');
  }
};
/***/

Blockly.Blocks.action_gettimer = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("get timer");
    this.setOutput(true, Number);
    this.setTooltip('Returns value of free-running timer.');
  }
};

Blockly.Blocks.action_reset_timer = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("reset timer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Resets free-running timer to zero.');
  }
};

Blockly.Blocks['action_settickrate'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(170);
    this.appendDummyInput()
        .appendField("Tick every");
    this.appendValueInput("NAME", Number);
    this.appendDummyInput()
        .appendField("1/10 second(s)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Sets the time beween each Tick');
  }
};

Blockly.Blocks.action_gettickcount = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(170);
    this.appendDummyInput().appendField("Tick count");
    this.setOutput(true, Number);
    this.setTooltip('Reports the number Ticks has passed since the last reset');
  }
};

Blockly.Blocks.action_ticked = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(170);
    this.appendDummyInput().appendField("Ticked?");
    this.setOutput(true, Boolean);
    this.setTooltip('Returns true if the clock has ticked');
  }
};



Blockly.Blocks.action_cleartick = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(170);
    this.appendDummyInput().appendField("clear Tick");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Resets the tick counter and reset the tick clock');
  }
};




Blockly.Blocks.action_motor = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(310);
    this.appendDummyInput().appendField("talk to motor")

    .appendField(new Blockly.FieldCheckbox("TRUE"), "a").appendField("A ")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "b").appendField("B ")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "c").appendField("C ")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "d").appendField("D");

    //var input =  this.appendValueInput( "NAME", "motor");
    //input.appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Selects specific motor(s) for control.');
  }
};

Blockly.Blocks.action_motor_is_on = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(310);
    this.appendDummyInput().appendField("motor")

    .appendField(new Blockly.FieldCheckbox("TRUE"), "a").appendField("A ")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "b").appendField("B ")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "c").appendField("C ")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "d").appendField("D");


    //var input =  this.appendValueInput( "NAME", "motor");
    //input.appendField("to");
    this.appendDummyInput().appendField("is(are) on?")
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip('Returns True if the selected motors are on');
  }
};



Blockly.Blocks.motor_action_turn = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendField("turn")
    .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "turn");
    //var input =  this.appendValueInput( "right", "motor");
    //input.appendField(",");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turns on/off selected motor(s).');
  }
};

Blockly.Blocks.motor_action_onfor = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
//    this.appendDummyInput().appendField("turn on for")
//    .appendField(new Blockly.FieldTextInput("1"), "second")
//    .appendField("second(s)");
    this.appendDummyInput()
        .appendField("turn on for");
    this.appendValueInput("value", Number);
    this.appendDummyInput()
        .appendField("1/10 second(s)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turns on selected motor(s) for specified period of time.');
  }
};

/***
Blockly.Blocks.motor_action_thisway = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["this way", "thisway"], ["that way", "thatway"]]), "thisway");
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('xxxxx');
  }
};
/***/

Blockly.Blocks.motor_action_thisway = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["turn Clockwise", "cw"], ["turn Counter-Clockwise", "ccw"]]), "clockwise");
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('xxxxx');
  }
};

Blockly.Blocks.motor_action_rd = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendField("reverse direction");
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Reverses direction of selected motor(s).');
  }
};

Blockly.Blocks.motor_action_power = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    
    //this.appendDummyInput().appendField("set power").appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]]), "power");
    
    this.appendValueInput("power", Number).appendField("Set power");
    
    //this.appendDummyInput().appendField("set power");
    //this.appendValueInput("power", Number);
    
    this.setInputsInline(true);
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Sets power level of selected motor(s). Values from 0-100.');
  }
};

Blockly.Blocks['servo_seth'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(316);
    this.appendValueInput("heading", Number).appendField("Set servo heading");
    this.setInputsInline(true);
//    this.appendDummyInput()
//        .appendField("Set servo heading")
//        .appendField(new Blockly.FieldTextInput("10"), "heading");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['servo_lt'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(316);
    this.appendValueInput("heading", Number).appendField("Servo left turn");
    this.setInputsInline(true);
//    this.appendDummyInput()
//        .appendField("Servo left turn")
//        .appendField(new Blockly.FieldTextInput("10"), "heading");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['servo_rt'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(316);
    this.appendValueInput("heading", Number).appendField("Servo right turn");
    this.setInputsInline(true);
//    this.appendDummyInput()
//        .appendField("Servo right turn")
//        .appendField(new Blockly.FieldTextInput("10"), "heading");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

/***
Blockly.Blocks.motor_action_turn = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(315);
    this.appendDummyInput().appendField("turn");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "turn");
    this.setPreviousStatement(true, "motor");
    this.setNextStatement(true, "motor");
    this.setTooltip('');
  }
};

/**  CONTROL  **/

Blockly.Blocks['control_true'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("true");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.control_if = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendValueInput( "condition" ).setCheck(Boolean).appendField("if");
    var input =  this.appendStatementInput( "statement", null);
    input.appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('If input expression is true, then do some statements.');
  }
};

Blockly.Blocks.control_ifelse = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    var input =  this.appendValueInput( "condition" ).setCheck(Boolean);
    input.appendField("if");
    input =  this.appendStatementInput( "if", null);
    input.appendField("do");
    input =  this.appendStatementInput( "else", null);
    input.appendField("else do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('If a value is true, then do the first block of statements.\n' +
        'Otherwise, do the second block of statements.');
  }
};


Blockly.Blocks['control_if_state_change'] = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(125);
    this.appendValueInput("condition").setCheck(Boolean).appendField("if state change");
    var input =  this.appendStatementInput( "statement", null);
    input.appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('If input expression is true, then do some statements.');
  }
};

Blockly.Blocks.control_waituntil = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    //this.appendDummyInput();
     this.appendValueInput( "NAME" ).setCheck(Boolean).appendField("wait until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Repeatedly executes block until it evaluates to true.');
  }
};

Blockly.Blocks.control_repeat = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("repeat");
     this.appendValueInput( "times", Number);
    var input = this.appendDummyInput();
    input.appendField("time(s)");
    input =  this.appendStatementInput( "do", null);
    input.appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Repeats block for specific number of times.');
  }
};

Blockly.Blocks.control_forever = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("forever");
    var input =  this.appendStatementInput( "do", null);
    input.appendField("do");

    //input = this.appendDummyInput();
    //input.appendField("forever");
    this.setPreviousStatement(true, null);
    this.setTooltip('Indefinitely executes block.');
  }
};


Blockly.Blocks.procedure_stop = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("stop this procedure");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('quit the current procedure.');
  }
};

// Blockly.Blocks.control_do_every = {
//   category: 'Control',
//   helpUrl: 'http://www.example.com/',
//   init: function() {
//     this.setColour(120);
//     this.appendDummyInput().appendField("every");
//     this.appendValueInput( "period", Number);
//     var input = this.appendDummyInput();
//     input.appendField("1/10 second(s)");
//     input =  this.appendStatementInput( "do", null);
//     input.appendField("do");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setTooltip('Repeats block forever at a constant peroid.');
//   }
// };

Blockly.Blocks.control_when_ticked = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("when Ticked");
    var input = this.appendStatementInput( "do", null);
    input.appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setTooltip('executes when the clock has ticked');
  }
};

Blockly.Blocks.control_if_ticked = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendField("if Ticked");
    var input = this.appendStatementInput( "do", null);
    input.appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('executes if the clock has ticked');
  }
};

Blockly.Blocks.input_switch = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("switch")
    .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]]), "switch");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports boolean value of specific sensor.');
  }
};

Blockly.Blocks.input_sensor = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("sensor")
    .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]]), "sensor");
    this.setOutput(true, Number);
    this.setTooltip('Reports value of specific sensor.');
  }
};

Blockly.Blocks.input__output__storage_setdp = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(220);
    //this.appendDummyInput();
     this.appendValueInput( "DP", Number).appendField("Set Data Pointer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Sets data buffer pointer to specified value.');
  }
};

Blockly.Blocks.input__output__storage_record = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(220);
    //this.appendDummyInput();
     this.appendValueInput( "value", null).appendField("record");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Records 8-bit value into data buffer.');
  }
};

Blockly.Blocks.input__output__storage_recall = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(220);
    this.appendDummyInput().appendField("recall value");
    this.setOutput(true, null);
    this.setTooltip('Reports 8-bit value stored in data buffer.');
  }
};

Blockly.Blocks.input__output__storage_send_serial = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendField("send");
     this.appendValueInput( "send", null);
    var input = this.appendDummyInput();
    input.appendField("to serial port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Send data to serial port.');
  }
};

Blockly.Blocks.input__output__storage_new_serial = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendField("new serial?");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports whether value from serial port has been received.');
  }
};

Blockly.Blocks.input__output__storage_get_serial = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendField("get serial");
    this.setOutput(true, null);
    this.setTooltip('Get data from serial port.');
  }
};

Blockly.Blocks.input__output__storage_new_ir = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendField("new infrared?");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports whether infrared value has been received.');
  }
};


Blockly.Blocks.input__output__storage_get_ir = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendField("get infrared");
    this.setOutput(true, null);
    this.setTooltip('');
  }
};

/***
Blockly.Blocks.math_true = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    this.appendDummyInput().appendField("True");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

/***/

/***
Blockly.Blocks['key_text'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("key")
        .appendField("key");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};
/***/

Blockly.Blocks['key_text'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
//    this.appendDummyInput()
//        .appendField("Read I2C register:")
//        .appendField("read from ")
//        .appendField(new Blockly.FieldTextInput("register address"), "reg_addr")
//        .appendField(", ")
//        .appendField(new Blockly.FieldTextInput("I2C address"), "i2c_addr");
//    this.appendValueInput("value")
//        .appendField("");

// 		.appendValueInput("key")
//        .appendField("key ");

    this.appendDummyInput()
		.appendField("Key")
		.appendField(new Blockly.FieldTextInput("name"), "name");
          
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

/**     KEY Value    **/

Blockly.Blocks.key_value = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendField("Key")
        .appendField(new Blockly.FieldDropdown([["Button", "button"], ["Slider", "slider"], ["Switch", "switch"], ["Face Name", "facename"], ["Speech", "speech"]]), "key_name");
    this.appendValueInput("key_value_input")
        .appendField("is equal to ");


    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports value of specific key.');
  }
};

Blockly.Blocks.key_value_unrestricted = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);

    this.appendValueInput("key_name")
        .appendField("Key");
    this.appendValueInput("key_value_input")
        .appendField("is equal to ");


    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports value of specific key.');
  }
};


Blockly.Blocks.send_string_message = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);

    this.appendValueInput("message")
        .appendField("Submit text ");
    this.appendValueInput("topic")
        .appendField("to topic ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.send_number_message = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    
    this.appendValueInput("message", Number)
        .appendField("Submit number ");
    this.appendValueInput("topic")
        .appendField("to topic");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ifttt_trigger = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    
    this.appendValueInput("topic")
        .appendField("Send IFTTT event ");
    this.appendValueInput("message", Number)
        .appendField(" with number value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ifttt_trigger_text = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    
    this.appendValueInput("topic")
        .appendField("Send IFTTT event ");
    this.appendValueInput("message")
        .appendField(" with text value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.math_number = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(165);
    this.appendDummyInput().appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "number");
    this.setOutput(true, Number);
    this.setTooltip('A number.');
  }
};

Blockly.Blocks.math_random = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    this.appendDummyInput().appendField("random number");
    this.setOutput(true, Number);
    this.setTooltip('Reports pseudorandom 16 bit value.');
  }
};

Blockly.Blocks.math_equal = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
     this.appendValueInput( "left", Number);
    var input =  this.appendValueInput( "right", Number);
    //input.appendField(new Blockly.FieldDropdown([["=","="],["\u2260","!="],[">",">"],["\u2265",">="],["<","<"],["\u2264","<="]]), "cond");
    input.appendField(new Blockly.FieldDropdown([["=","="],[">",">"],["\u2265",">="],["<","<"],["\u2264","<="]]), "cond");

    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports boolean comparison of two inputs.');
  }
};

Blockly.Blocks.math_in_between = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);

   
    this.appendValueInput( "input", Number);
    this.appendValueInput( "lower", Number)
    .appendField("is in between");
    this.appendValueInput( "upper", Number)
    .appendField(",");

    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports True if input is in between the given range.');
  }
};

Blockly.Blocks.variable_increase_by = {


  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);    
    this.appendDummyInput().appendField("increase").appendField(Blockly.LANG_VARIABLES_GET_TITLE)
    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
    //.appendField(this.getFieldValue('VAR'));
    
    this.appendValueInput( "increment", Number)
    .appendField("by ");

 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setTooltip('Increase a variable value by number.');
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};
  
Blockly.Blocks.variable_decrease_by = {


  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);    
    this.appendDummyInput().appendField("decrease").appendField(Blockly.LANG_VARIABLES_GET_TITLE)
    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
    //.appendField(this.getFieldValue('VAR'));
    
    this.appendValueInput( "increment", Number)
    .appendField("by ");

 
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setTooltip('Decrease a variable value by number.');
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};





   
  //   this.appendValueInput( "variable", Number)
  //   .appendField("Increase ");
  //   this.appendValueInput( "increment", Number)
  //   .appendField("by ");


  //   this.setPreviousStatement(true, null);
  //   this.setNextStatement(true, null);




Blockly.Blocks.math_operator = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
     this.appendValueInput( "1stNum", Number);
    var input =  this.appendValueInput( "2ndNum", Number);
    input.appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["×", "×"], ["÷", "÷"], ["%", "%"]]), "op");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('Reports operation of two inputs.');
  }
};

Blockly.Blocks.math_andor = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
     this.appendValueInput( "left" ).setCheck(Boolean);
    var input =  this.appendValueInput( "right" ).setCheck(Boolean);
    input.appendField(new Blockly.FieldDropdown([["and", "and"], ["or", "or"]]), "andor");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports bitwise AND/OR of two inputs.');
  }
};

Blockly.Blocks.math_not = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    //this.appendDummyInput();
     this.appendValueInput( "bool" ).setCheck(Boolean).appendField("not");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports boolean that opposite of input.');
  }
};


/**    Send SMS    **/


Blockly.Blocks.use_sms = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle("Use SMS");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};


/***
Blockly.Blocks.send_sms = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle("Send SMS");
    this.appendDummyInput()
        .appendTitle("to : 0")
        .appendTitle(new Blockly.FieldTextInput("8xxxxxxxx"), "phoneno");
    this.appendValueInput("NAME")
        //.setCheck(String)
        .appendTitle("message :");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};
/****/


Blockly.Blocks.send_sms = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    
    this.appendValueInput("number")
        .appendField("Send SMS to : ");
    this.appendValueInput("message")
        .appendField(", message : ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks.send_email = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    
    this.appendValueInput("email")
        .appendField("Send Email to : ");
    this.appendValueInput("title")
        .appendField(", title : ");
    this.appendValueInput("body")
        .appendField(", body : ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



/**     RFID    **/


Blockly.Blocks.userfid = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(230);
    this.appendDummyInput()
        .appendTitle("Use RFID");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};



Blockly.Blocks.read_from_rfid = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(230);
    this.appendDummyInput()
        .appendTitle("Read from RFID");
    this.setInputsInline(true);
    this.setOutput(true, String);
    this.setTooltip('');
  }
};



Blockly.Blocks.write_to_rfid = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(230);
    this.appendValueInput("NAME")
        .appendTitle("Write to RFID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};


/**     Finger Scan    **/


Blockly.Blocks.use_finer_scan = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Use Finger Scan");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};



Blockly.Blocks.identify_finger = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Identify Finger");
    this.setInputsInline(true);
    this.setOutput(true, String);
    this.setTooltip('');
  }
};



Blockly.Blocks.enroll_finger = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Enroll Finger");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};


/**     Camera    **/


Blockly.Blocks.use_camera = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Use camera");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.close_camera = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Close camera");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.start_find_face = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Start Find-Face");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.stop_find_face = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Stop Find-Face");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.take_snapshot = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Take snapshot");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.found_face = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Found a Face?");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.camera_is_on = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Camera is on?");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.find_face_is_on = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle("Find-Face is on?");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

/**     Sound    **/

Blockly.Blocks['play_sound'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(170);
    this.appendValueInput("string")
        .appendField("Play Sound");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

Blockly.Blocks['stop_sound'] = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(170);
    this.appendDummyInput()
        .appendTitle("Stop sound");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['say'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(170);
    this.appendValueInput("string")
        .appendField("Say");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

/**     Image    **/

Blockly.Blocks['show_image'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(165);
    this.appendValueInput("string")
        .appendField("Show image");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

Blockly.Blocks['hide_image'] = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(165);
    this.appendDummyInput()
        .appendTitle("Hide image");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['screen_tapped'] = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(165);
    this.appendDummyInput()
        .appendTitle("Screen tapped?");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

/****    Data Recording    ****/

Blockly.Blocks['new_record'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendValueInput("string")
        .appendField("New record file for");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['record_as'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendValueInput("expression")
        .appendField("Record");
    this.appendValueInput("string")
        .appendField("as");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['show_plot'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendValueInput("string")
        .appendField("Show plot of ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['show_plot_expression'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendValueInput("expression")
        .appendField("Show plot for last ");
    this.appendValueInput("string")
        .appendField("values of ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


/****    VARIABLE    ****/

Blockly.Blocks.variables_get = {
  // Variable getter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput().appendField(Blockly.LANG_VARIABLES_GET_TITLE)
    .appendField(new Blockly.FieldVariable(
        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks.variables_set = {
  // Variable setter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  init: function() {
    this.setColour(330);
    //this.appendDummyInput();
    //this;
    this.appendValueInput( 'VALUE', null).appendField("set").appendField(Blockly.LANG_VARIABLES_SET_TITLE)
    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};  




/****    PROCEDURE    ****/
//***
Blockly.Blocks.procedure_procedure = {
  category: null,
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(210);
    this.appendDummyInput().appendField("to")
    .appendField(new Blockly.FieldTextInput("main"), "pname");
     this.appendStatementInput( "statement", null);
    var input = this.appendDummyInput();
    input.appendField("                   end");
    this.setTooltip('Main procedure.');
    this.setDeletable(false);
  }
};
/****

Paste your new language here

****/

Blockly.Blocks['test_condition'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("inputs");
    this.appendStatementInput("NAME");
    this.setTooltip('');
  }
};

Blockly.Blocks['test_variable'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("input name:")
        .appendField(new Blockly.FieldTextInput("x"), "var_name");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['test_do_sth'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("do something");
    this.setOutput(true);
    this.setTooltip('');
    this.setMutator(new Blockly.Mutator(['test_variable']));
    this.arguments_ = [];
  },
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace,
                                           'test_condition');
    containerBlock.initSvg();
    
    //***
    var connection = containerBlock.getInput('NAME').connection;
    kk(connection);
    for (var x = 0; x < this.arguments_.length; x++) {
      var paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.arguments_[x], 'var_name');
      // Store the old location.
      paramBlock.oldLocation = x;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    /***/
    // Initialize procedure's callers with blank IDs.
    //Blockly.Procedures.mutateCallers(this.getFieldValue('var_name'), this.workspace, this.arguments_, null);
    return containerBlock;
  },
  compose: function(containerBlock) {
  	/***
  	this.arguments_ = [];
  	this.paramIds_ = [];
  	var paramBlock = containerBlock.getInputTargetBlock('NAME');
  	while (paramBlock) {
  	  this.arguments_.push(paramBlock.getFieldValue('var_name'));
  	  this.paramIds_.push(paramBlock.id);
  	  paramBlock = paramBlock.nextConnection &&
  	      paramBlock.nextConnection.targetBlock();
  	}
  	this.updateParams_();
  	/***/
  	//Blockly.Procedures.mutateCallers(this.getFieldValue('var_name'), this.workspace, this.arguments_, this.paramIds_);
  }
};
