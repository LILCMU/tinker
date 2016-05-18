/**
 * Blockly Demo: Maze
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Demonstration of Blockly: Solving a maze.
 * @author fraser@google.com (Neil Fraser)
 */

// Extensions to Blockly's language and JavaScript generator.

// Define Language and JavaScript, in case this file is loaded too early.
window.addEvent('initBlockly', function(){

//alert(Blockly);
//if (!Blockly.Blocks) {
//  Blockly.Blocks = {};
//}
//Blockly.JavaScript = Blockly.Generator.get('JavaScript');
//
//Blockly.PseudoCode = Blockly.Generator.get('PseudoCode');

//Blockly.Blocks.action = {
//  helpUrl: 'http://www.example.com/',
//  init: function() {
//    this.setColour(120);
//    this.appendDummyInput().appendTitle("beep");
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
//    this.setTooltip('');
//  }
//};

Blockly.Blocks.action_beep = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendTitle("beep");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Causes Cricket to beep.');
  }
};

Blockly.JavaScript.action_beep = function() {
  var code = '<span class="c290">beep</span>\n';
  return code;
};

Blockly.PseudoCode.action_beep = function() {
  var code = '<beep> ';
  return code;
};

Blockly.Blocks.action_led = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendTitle("turn LED")
    .appendTitle(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "onoff");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Causes Cricket to turn LED on/off.');
  }
};

Blockly.JavaScript.action_led = function() {
  var dropdown_onoff = this.getTitleValue('onoff');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c290">led'+dropdown_onoff+'</span>\n';
  return code;
};

Blockly.PseudoCode.action_led = function() {
  var dropdown_onoff = this.getTitleValue('onoff');
  var code = '<led'+dropdown_onoff+'> ';
  return code;
};

Blockly.Blocks.action_wait = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendTitle("wait")
    .appendTitle(new Blockly.FieldTextInput("0.1"), "NAME")
    .appendTitle("second");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Waits for specified time period.');
  }
};

Blockly.JavaScript.action_wait = function() {
  var text_name = this.getTitleValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  text_name *= 10;
  var code = '<span class="c290">wait ' + (isNaN(text_name) ? 0 : text_name) + '</span> \n';
  return code;
};

Blockly.PseudoCode.action_wait = function() {
  var text_name = this.getTitleValue('NAME');
  text_name *= 10;
  text_name = isNaN(text_name) ? 0 : text_name ;
  var code = '<%num'+((text_name > 255) ? '16' : '' )+'> ' + splitNumber(text_name) + ' <wait> ';
  return code;
};

Blockly.Blocks.action_gettimer = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendTitle("get timer");
    this.setOutput(true, Number);
    this.setTooltip('Returns value of free-running timer.');
  }
};

Blockly.JavaScript.action_gettimer = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c120">timer</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.action_gettimer = function() {
  var code = '<timer> ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.action_reset_timer = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendTitle("reset timer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Resets free-running timer to zero.');
  }
};

Blockly.JavaScript.action_reset_timer = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c120">resett</span>\n'
  return code;
};

Blockly.PseudoCode.action_reset_timer = function() {
  var code = '<resett> '
  return code;
};

Blockly.Blocks.action_motor = {
  category: 'Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(310);
    this.appendDummyInput().appendTitle("talk to motor")
    .appendTitle(new Blockly.FieldDropdown([["a", "a"], ["", ""]]), "a")
    .appendTitle(",")
    .appendTitle(new Blockly.FieldDropdown([["", ""], ["b", "b"]]), "b")
    .appendTitle(",")
    .appendTitle(new Blockly.FieldDropdown([["", ""], ["c", "c"]]), "c")
    .appendTitle(",")
    .appendTitle(new Blockly.FieldDropdown([["", ""], ["d", "d"]]), "d");
    //var input =  this.appendValueInput( "NAME", "motor");
    //input.appendTitle("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Selects specific motor(s) for control.');
  }
};

Blockly.JavaScript.action_motor = function() {
  var dropdown_a = this.getTitleValue('a');
  var dropdown_b = this.getTitleValue('b');
  var dropdown_c = this.getTitleValue('c');
  var dropdown_d = this.getTitleValue('d');
  //var value_name = Blockly.JavaScript.valueToCode(this, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c316">'+dropdown_a+dropdown_b+dropdown_c+dropdown_d+',</span> \n';//+value_name.slice(1, value_name.length-1)+'\n';
  return code;
};

Blockly.PseudoCode.action_motor = function() {
  var dropdown_a = this.getTitleValue('a');
  var dropdown_b = this.getTitleValue('b');
  var dropdown_c = this.getTitleValue('c');
  var dropdown_d = this.getTitleValue('d');
  var code = '<'+dropdown_a+dropdown_b+dropdown_c+dropdown_d+'> ';
  var code = ''+dropdown_a+dropdown_b+dropdown_c+dropdown_d+', ';
  return code;
};

Blockly.Blocks.motor_action_turn = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendTitle("turn")
    .appendTitle(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "turn");
    //var input =  this.appendValueInput( "right", "motor");
    //input.appendTitle(",");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turns on/off selected motor(s).');
  }
};

Blockly.JavaScript.motor_action_turn = function() {
  var dropdown_turn = this.getTitleValue('turn');
  //var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c316">'+dropdown_turn+'</span> \n';//+value_right.slice(1, value_right.length-1);
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.PseudoCode.motor_action_turn = function() {
  var dropdown_turn = this.getTitleValue('turn');
  var code = '<'+dropdown_turn+'> ';
  return code;
};

Blockly.Blocks.motor_action_onfor = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendTitle("turn on for")
    //var input =  this.appendValueInput( "right", "motor");
    .appendTitle(new Blockly.FieldTextInput("1"), "second")
    .appendTitle("second(s)");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turns on selected motor(s) for specified period of time.');
  }
};

Blockly.JavaScript.motor_action_onfor = function() {
  //var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  var text_second = this.getTitleValue('second');
  // TODO: Assemble JavaScript into code variable.
  text_second *= 10;
  text_second = isNaN(text_second) ? 0 : text_second;
  var code = '<span class="c316">onfor ' + text_second + '</span> \n';//+value_right.slice(1, value_right.length-1);
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.PseudoCode.motor_action_onfor = function() {
  var text_second = this.getTitleValue('second');
  text_second *= 10;
  text_second = isNaN(text_second) ? 0 : text_second;
  var code = '<%num'+((text_second > 255) ? '16' : '' )+'> ' + splitNumber(text_second) + ' <onfor> ';
  return code;
};

Blockly.Blocks.motor_action_thisway = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendTitle(new Blockly.FieldDropdown([["this way", "thisway"], ["that way", "thatway"]]), "thisway");
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('xxxxx');
  }
};

Blockly.JavaScript.motor_action_thisway = function() {
  //var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_thisway = this.getTitleValue('thisway');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c316">'+dropdown_thisway+ '</span> \n';//+value_right.slice(1, value_right.length-1);
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.PseudoCode.motor_action_thisway = function() {
  var dropdown_thisway = this.getTitleValue('thisway');
  var code = '<'+dropdown_thisway+ '> ';
  return code;
};

Blockly.Blocks.motor_action_rd = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendTitle("reverse direction");
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Reverses direction of selected motor(s).');
  }
};

Blockly.JavaScript.motor_action_rd = function() {
  //var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c316">rd</span> \n';//+value_right.slice(1, value_right.length-1);
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.PseudoCode.motor_action_rd = function() {
  var code = '<rd> ';
  return code;
};

Blockly.Blocks.motor_action_power = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(316);
    this.appendDummyInput().appendTitle("set power")
    .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]]), "power");
    // this.appendValueInput( "right", "motor");
    //this.setOutput(true, "motor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Sets power level of selected motor(s).');
  }
};

Blockly.JavaScript.motor_action_power = function() {
  var dropdown_power = this.getTitleValue('power');
  //var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c316">setpower ' + dropdown_power + '</span> \n';//+value_right.slice(1, value_right.length-1);
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.PseudoCode.motor_action_power = function() {
  var dropdown_power = this.getTitleValue('power');
  var code = '<%num> ' + dropdown_power + ' <setpower> ';
  return code;
};

/***
Blockly.Blocks.motor_action_turn = {
  category: 'Motor Action',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(315);
    this.appendDummyInput().appendTitle("turn");
    this.appendDummyInput().appendTitle(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "turn");
    this.setPreviousStatement(true, "motor");
    this.setNextStatement(true, "motor");
    this.setTooltip('');
  }
};

Blockly.JavaScript.motor_action_turn = function() {
  var dropdown_turn = this.getTitleValue('turn');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_turn+' ';
  return code;
};
/***/

/**  CONTROL  **/

Blockly.Blocks.control_if = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendValueInput( "condition" ).setCheck(Boolean).appendTitle("if");
    var input =  this.appendStatementInput( "statement", null);
    input.appendTitle("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('If input expression is true, then do some statements.');
  }
};

Blockly.JavaScript.control_if = function() {
  var value_condition = Blockly.JavaScript.valueToCode(this, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_statement = Blockly.JavaScript.statementToCode(this, 'statement');
  
  //var code = 'if '+value_condition.slice(1, value_condition.length-1)+' [\n'+statements_statement+']\n';
  var code = '<span class="c120">if '+ value_condition +' \n[\n'+statements_statement+'\n]</span>\n';
  return code;
};

Blockly.PseudoCode.control_if = function() {
  var value_condition = Blockly.PseudoCode.valueToCode(this, 'condition', Blockly.PseudoCode.ORDER_ATOMIC);
  var statements_statement = Blockly.PseudoCode.statementToCode(this, 'statement');
  
  var statement = statements_statement.clean();
  var condition = value_condition.clean();
  var listLength = (statement != '') ? statement.split(' ').length + 1 : 1 ;
  
  var code = condition+' <%list> '+listLength+' '+statement+' <%eol> <if> ';
  return code.clean()+' ';
};

Blockly.Blocks.control_ifelse = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    var input =  this.appendValueInput( "condition" ).setCheck(Boolean);
    input.appendTitle("if");
    input =  this.appendStatementInput( "if", null);
    input.appendTitle("do");
    input =  this.appendStatementInput( "else", null);
    input.appendTitle("else do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('If a value is true, then do the first block of statements.\n' +
        'Otherwise, do the second block of statements.');
  }
};

Blockly.JavaScript.control_ifelse = function() {
  var value_condition = Blockly.JavaScript.valueToCode(this, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_if = Blockly.JavaScript.statementToCode(this, 'if');
  var statements_else = Blockly.JavaScript.statementToCode(this, 'else');
  // TODO: Assemble JavaScript into code variable.
  //var code = 'ifelse '+value_condition.slice(1, value_condition.length-1)+' [\n'+statements_if+'] [\n'+statements_else+']\n';
  var code = '<span class="c120">ifelse '+value_condition+' \n[\n'+statements_if+'\n] [\n'+statements_else+'\n]</span>\n';
  return code;
};

Blockly.PseudoCode.control_ifelse = function() {
  var value_condition = Blockly.PseudoCode.valueToCode(this, 'condition', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var statements_if = Blockly.PseudoCode.statementToCode(this, 'if').clean();
  var statements_else = Blockly.PseudoCode.statementToCode(this, 'else').clean();
  var ifLength = (statements_if != '') ? statements_if.split(' ').length + 1 : 1 ;
  var elseLength = (statements_else != '') ? statements_else.split(' ').length + 1 : 1 ;
  var code = value_condition+' <%list> '+ifLength+' '+statements_if+' <%eol> <%list> '+elseLength+' '+statements_else+' <%eol> <ifelse> ';
  return code.clean()+' ';
};

Blockly.Blocks.control_waituntil = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    //this.appendDummyInput();
     this.appendValueInput( "NAME" ).setCheck(Boolean).appendTitle("wait until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Repeatedly executes block until it evaluates to true.');
  }
};

Blockly.JavaScript.control_waituntil = function() {
  var value_name = Blockly.JavaScript.valueToCode(this, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c120">waituntil [ '+value_name.slice(1, value_name.length-1)+' ]</span>\n';
  return code;
};

Blockly.PseudoCode.control_waituntil = function() {
  var condition = Blockly.PseudoCode.valueToCode(this, 'NAME', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var conditionLength = (condition != '') ? condition.split(' ').length + 1 : 1 ;
  var code = '<%list> '+conditionLength+' '+condition+' <%eolr> <waituntil> ';
  return code.clean()+' ';
};

Blockly.Blocks.control_repeat = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendDummyInput().appendTitle("repeat");
     this.appendValueInput( "times", Number);
    var input = this.appendDummyInput();
    input.appendTitle("time(s)");
    input =  this.appendStatementInput( "do", null);
    input.appendTitle("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Repeats block for specific number of times.');
  }
};

Blockly.JavaScript.control_repeat = function() {
  var value_times = Blockly.JavaScript.valueToCode(this, 'times', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(this, 'do');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c120">repeat '+value_times.slice(1, value_times.length-1)+' \n[\n'+statements_do+'\n]</span>\n';
  return code;
};

Blockly.PseudoCode.control_repeat = function() {
  var value_times = Blockly.PseudoCode.valueToCode(this, 'times', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var statements_do = Blockly.PseudoCode.statementToCode(this, 'do').clean();
  var doLength = (statements_do != '') ? statements_do.split(' ').length + 1 : 1 ;
  
  var code = '<%num'+((value_times > 255) ? '16' : '' )+'> '+splitNumber(value_times)+' <%list> '+doLength+' '+statements_do+' <%eol> <repeat> ';
  return code;
};

Blockly.Blocks.control_forever = {
  category: 'Control',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    var input =  this.appendStatementInput( "do", null);
    input.appendTitle("do");
    input = this.appendDummyInput();
    input.appendTitle("forever");
    this.setPreviousStatement(true, null);
    this.setTooltip('Indefinitely executes block.');
  }
};

Blockly.JavaScript.control_forever = function() {
  var statements_do = Blockly.JavaScript.statementToCode(this, 'do');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c120">forever \n[\n'+statements_do+'\n]</span>\n';
  return code;
};

Blockly.PseudoCode.control_forever = function() {
  var statements_do = Blockly.PseudoCode.statementToCode(this, 'do').clean();
  var doLength = (statements_do != '') ? statements_do.split(' ').length + 1 : 1 ;
  var code = '<%list> '+doLength+' '+statements_do+' <%eol> <forever> ';
  return code;
};


Blockly.Blocks.input_switch = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendTitle("switch")
    .appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]]), "switch");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports boolean value of specific sensor.');
  }
};

Blockly.JavaScript.input_switch = function() {
  var dropdown_switch = this.getTitleValue('switch');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c290">switch'+dropdown_switch+'</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input_switch = function() {
  var dropdown_switch = this.getTitleValue('switch');
  var code = '<switch'+dropdown_switch+'> ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.input_sensor = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendTitle("sensor")
    .appendTitle(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]]), "sensor");
    this.setOutput(true, Number);
    this.setTooltip('Reports value of specific sensor.');
  }
};

Blockly.JavaScript.input_sensor = function() {
  var dropdown_sensor = this.getTitleValue('sensor');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c290">sensor'+dropdown_sensor+'</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input_sensor = function() {
  var dropdown_sensor = this.getTitleValue('sensor');
  // TODO: Assemble JavaScript into code variable.
  var code = '<sensor'+dropdown_sensor+'> ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.input__output__storage_setdp = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(220);
    //this.appendDummyInput();
     this.appendValueInput( "DP", Number).appendTitle("Set Data Pointer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Sets data buffer pointer to specified value.');
  }
};

Blockly.JavaScript.input__output__storage_setdp = function() {
  var value_dp = Blockly.JavaScript.valueToCode(this, 'DP', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c220">setdp '+value_dp.slice(1, value_dp.length-1)+'</span>\n';
  return code;
};

Blockly.PseudoCode.input__output__storage_setdp = function() {
  var value_dp = Blockly.PseudoCode.valueToCode(this, 'DP', Blockly.PseudoCode.ORDER_ATOMIC);
  var code = '<%num'+((value_dp > 255) ? '16' : '' )+'> '+splitNumber(value_dp)+' <setdp> ';
  return code;
};

Blockly.Blocks.input__output__storage_record = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(220);
    //this.appendDummyInput();
     this.appendValueInput( "value", null).appendTitle("record");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Records 8-bit value into data buffer.');
  }
};

Blockly.JavaScript.input__output__storage_record = function() {
  var value_value = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c220">record '+value_value.slice(1, value_value.length-1)+'</span>\n';
  return code;
};

Blockly.PseudoCode.input__output__storage_record = function() {
  var value_value = Blockly.PseudoCode.valueToCode(this, 'value', Blockly.PseudoCode.ORDER_ATOMIC);
  var code = '<%num'+((value_value > 255) ? '16' : '' )+'> '+splitNumber(value_value) +' <record> ';
  return code;
};

Blockly.Blocks.input__output__storage_recall = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(220);
    this.appendDummyInput().appendTitle("recall value");
    this.setOutput(true, null);
    this.setTooltip('Reports 8-bit value stored in data buffer.');
  }
};

Blockly.JavaScript.input__output__storage_recall = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c220">recall</span> ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input__output__storage_recall = function() {
  var code = '<recall> ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.input__output__storage_send_serial = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendTitle("send");
     this.appendValueInput( "send", null);
    var input = this.appendDummyInput();
    input.appendTitle("to serial port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Send data to serial port.');
  }
};

Blockly.JavaScript.input__output__storage_send_serial = function() {
  var value_send = Blockly.JavaScript.valueToCode(this, 'send', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c250">send '+value_send.slice(1, value_send.length-1)+'</span> \n';
  return code;
};

Blockly.PseudoCode.input__output__storage_send_serial = function() {
  var value_send = Blockly.PseudoCode.valueToCode(this, 'send', Blockly.PseudoCode.ORDER_ATOMIC);
  var code = '<send>';
  return code;
};

Blockly.Blocks.input__output__storage_new_serial = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendTitle("new serial?");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports whether value from serial port has been received.');
  }
};

Blockly.JavaScript.input__output__storage_new_serial = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c250">newserial?</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input__output__storage_new_serial = function() {
  var code = '<newserial>';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.input__output__storage_get_serial = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendTitle("get serial");
    this.setOutput(true, null);
    this.setTooltip('Get data from serial port.');
  }
};

Blockly.JavaScript.input__output__storage_get_serial = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c250">serial</span> ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input__output__storage_get_serial = function() {
  var code = '<serial>';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.input__output__storage_new_ir = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendTitle("new infrared?");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports whether infrared value has been received.');
  }
};

Blockly.JavaScript.input__output__storage_new_ir = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c250">newir?</span>'
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input__output__storage_new_ir = function() {
  var code = '<newir>';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};


Blockly.Blocks.input__output__storage_get_ir = {
  category: 'Input, Output, Storage',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(250);
    this.appendDummyInput().appendTitle("get infrared");
    this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.JavaScript.input__output__storage_get_ir = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c250">ir</span> '
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.input__output__storage_get_ir = function() {
  var code = '<ir>';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

/***
Blockly.Blocks.math_true = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    this.appendDummyInput().appendTitle("True");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.JavaScript.math_true = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = 'true'
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/***/

Blockly.Blocks.math_number = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    this.appendDummyInput().appendTitle(new Blockly.FieldTextInput("0"), "number");
    this.setOutput(true, Number);
    this.setTooltip('A number.');
  }
};

Blockly.JavaScript.math_number = function() {
  var text_number = this.getTitleValue('number');
  var code = '<span class="c10">'+(isNaN(text_number) ? 0 : text_number)+'</span>';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.math_number = function() {
  var text_number = this.getTitleValue('number');
  text_number = (isNaN(text_number) ? 0 : text_number - 0);
  var code = '<%num'+((text_number > 255) ? '16' : '' )+'> ' + splitNumber(text_number) + ' ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.math_random = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    this.appendDummyInput().appendTitle("random number");
    this.setOutput(true, Number);
    this.setTooltip('Reports pseudorandom 16 bit value.');
  }
};

Blockly.JavaScript.math_random = function() {
  // TODO: Assemble JavaScript into code variable.
  var code = Math.floor(Math.random() * 32768 * 2) - 32768;
  code = '<span class="c10">random</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.math_random = function() {
  var code = '<random> ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.math_equal = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
     this.appendValueInput( "left", Number);
    var input =  this.appendValueInput( "right", Number);
    input.appendTitle(new Blockly.FieldDropdown([["=", "="], ["<", "<"], [">", ">"]]), "cond");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports boolean comparison of two inputs.');
  }
};

Blockly.JavaScript.math_equal = function() {
  var value_left = Blockly.JavaScript.valueToCode(this, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_cond = this.getTitleValue('cond');
  // TODO: Assemble JavaScript into code variable.
  //var code = '( '+value_left.slice(1, value_left.length-1)+' '+dropdown_cond+' '+value_right.slice(1, value_right.length-1) +' )';
  var code = '<span class="c10">'+value_left+' '+dropdown_cond+' '+value_right+'</span> ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.math_equal = function() {
  var value_left = Blockly.PseudoCode.valueToCode(this, 'left', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var value_right = Blockly.PseudoCode.valueToCode(this, 'right', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var dropdown_cond = this.getTitleValue('cond');
  //var code = '( '+value_left.slice(1, value_left.length-1)+' '+dropdown_cond+' '+value_right.slice(1, value_right.length-1) +' )';
  var code = value_left+' '+value_right+' '+dropdown_cond+' ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.math_operator = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
     this.appendValueInput( "1stNum", Number);
    var input =  this.appendValueInput( "2ndNum", Number);
    input.appendTitle(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["×", "×"], ["÷", "÷"], ["%", "%"]]), "op");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('Reports operation of two inputs.');
  }
};

Blockly.JavaScript.math_operator = function() {
  var value_1stnum = Blockly.JavaScript.valueToCode(this, '1stNum', Blockly.JavaScript.ORDER_ATOMIC);
  var value_2ndnum = Blockly.JavaScript.valueToCode(this, '2ndNum', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_op = this.getTitleValue('op');
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c10">( '+value_1stnum.slice(1, value_1stnum.length-1)+' '+dropdown_op+' '+value_2ndnum.slice(1, value_2ndnum.length-1) +' )</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.math_operator = function() {
  var value_1stnum = Blockly.PseudoCode.valueToCode(this, '1stNum', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var value_2ndnum = Blockly.PseudoCode.valueToCode(this, '2ndNum', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var dropdown_op = this.getTitleValue('op');
  //var code = '( '+value_1stnum.slice(1, value_1stnum.length-1)+' '+dropdown_op+' '+value_2ndnum.slice(1, value_2ndnum.length-1) +' )';
  var code = value_1stnum+' '+value_2ndnum+' '+dropdown_op+' ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.math_andor = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
     this.appendValueInput( "left" ).setCheck(Boolean);
    var input =  this.appendValueInput( "right" ).setCheck(Boolean);
    input.appendTitle(new Blockly.FieldDropdown([["AND", "AND"], ["OR", "OR"]]), "andor");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('Reports bitwise AND/OR of two inputs.');
  }
};

Blockly.JavaScript.math_andor = function() {
  var value_left = Blockly.JavaScript.valueToCode(this, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(this, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_andor = this.getTitleValue('andor');
  // TODO: Assemble JavaScript into code variable.
  //var code = value_left.slice(1, value_left.length-1)+' '+dropdown_andor+' '+value_right.slice(1, value_right.length-1) +' ';
  var code = '<span class="c10">'+value_left+' '+dropdown_andor+' '+value_right +'</span> ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.math_andor = function() {
  var value_left = Blockly.PseudoCode.valueToCode(this, 'left', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var value_right = Blockly.PseudoCode.valueToCode(this, 'right', Blockly.PseudoCode.ORDER_ATOMIC).clean();
  var dropdown_andor = this.getTitleValue('andor').toUpperCase();
  //var code = value_left.slice(1, value_left.length-1)+' '+dropdown_andor+' '+value_right.slice(1, value_right.length-1) +' ';
  var code = value_left+' '+value_right+' '+dropdown_andor+' ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};

Blockly.Blocks.math_not = {
  category: 'Math',
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(10);
    //this.appendDummyInput();
     this.appendValueInput( "bool" ).setCheck(Boolean).appendTitle("not");
    this.setOutput(true, Boolean);
    this.setTooltip('Reports boolean that opposite of input.');
  }
};

Blockly.JavaScript.math_not = function() {
  var value_bool = Blockly.JavaScript.valueToCode(this, 'bool', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '<span class="c10">not '+value_bool+'</span>';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.PseudoCode.math_not = function() {
  var value_bool = Blockly.PseudoCode.valueToCode(this, 'bool', Blockly.PseudoCode.ORDER_ATOMIC);
  var code = value_bool+' NOT ';
  return [code, Blockly.PseudoCode.ORDER_NONE];
};







/****    VARIABLE    ****/

Blockly.Blocks.variables_get = {
  // Variable getter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput().appendTitle(Blockly.LANG_VARIABLES_GET_TITLE)
    .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
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
    this.appendValueInput( 'VALUE', null).appendTitle(Blockly.LANG_VARIABLES_SET_TITLE)
    .appendTitle(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};  

Blockly.JavaScript.variables_get = function() {
  // Variable getter.
  var code = '<span class="c330">[:]:'+Blockly.JavaScript.variableDB_.getName(this.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE)+'[;]</span>';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  //if (argument0 != '0') argument0 = argument0.slice(1, argument0.length-1);
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return '<span class="c330">make "' + varName + ' ' + argument0 + '</span>\n';
};

Blockly.PseudoCode.variables_get = function() {
  // Variable getter.
  //var code = '[:]:'+Blockly.PseudoCode.variableDB_.getName(this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE)+'[;]';
  var code = '';//'<--->';
  return [code, Blockly.PseudoCode.ORDER_ATOMIC];
};

Blockly.PseudoCode.variables_set = function() {
  //var argument0 = Blockly.PseudoCode.valueToCode(this, 'VALUE', Blockly.PseudoCode.ORDER_ASSIGNMENT) || '0';
  //var varName = Blockly.PseudoCode.variableDB_.getName(this.getTitleValue('VAR'), Blockly.PseudoCode.NAME_TYPE);
  //var code = 'make "' + varName + ' ' + argument0 + '\n';
  var code = '';//'<--->';
  return code;
};




/****    PROCEDURE    ****/
//***
Blockly.Blocks.procedure_procedure = {
  category: null,
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(210);
    this.appendDummyInput().appendTitle("to")
    .appendTitle(new Blockly.FieldTextInput("main"), "pname");
     this.appendStatementInput( "statement", null);
    var input = this.appendDummyInput();
    input.appendTitle("                   end");
    this.setTooltip('Main procedure.');
  }
};

Blockly.JavaScript.procedure_procedure = function() {
  var statements_statement = Blockly.JavaScript.statementToCode(this, 'statement');
  var text_pname = this.getTitleValue('pname');
  // TODO: Assemble JavaScript into code variable.
  //var code = '[SS]to '+text_pname+'\n[SS]'+statements_statement+'end[SS]';
  var code = '[p]<span class="c210">to '+text_pname+'</span>\n[SS]'+statements_statement+'<span class="c210">end</span>[/p]';
  return code;
};

Blockly.PseudoCode.procedure_procedure = function(){
	var statements_statement = Blockly.PseudoCode.statementToCode(this, 'statement');
	var text_pname = this.getTitleValue('pname');
	// TODO: Assemble JavaScript into code variable.
	//var code = '[SS]to '+text_pname+'\n[SS]'+statements_statement+'end[SS]';
	var code = '('+text_pname+' '+statements_statement+')';
	return code;
}
/****

Paste your new language here

****/


var splitNumber = function(num){
	return (num > 255) ? (Math.floor(num / 256)+' '+(num % 256)) : num ;
}

});