##### 1.0.47 - Sep 2, 2017 - Marutpong Chailangka
- Fixed a incorrect algorithm of the procedure named "time between"
- Added a new "Import" button and a useful feature, It's allowed a user to import the saved/other xml file (except a main block) into the workspace without clearing entire workspace.

##### 1.0.46 - Aug 10, 2017 - Marutpong Chailangka
- Updated UIs
- Removed : a selection of boards on the top.
- Updated : Raspberry Pi blocks have moved into a new category.

##### 1.0.45 - July 20, 2017 - Arnan Sipitakiat
- Added a new forever-with-wait block.

##### 1.0.44 - Dec 16, 2016 - Marutpong Chailangka
- Added changing status color back to white when WS is disconnected.
- Added a function of checking the ws connection.

##### 1.0.43 - Dec 15, 2016 - Marutpong Chailangka
- Added GoGo Board status color, changed to yellow when WS connected.
- Added trying to connect other WS port when the connection is error.
- Updated URL of share feature
- Fixed issues

##### 1.0.42 - Oct 12, 2016 - Marutpong Chailangka
- Added sending command and compile to Widget via HTTP instead of WS when WS is not connected

##### 1.0.41 - Aug 22, 2016 - Marutpong Chailangka
- Added a time between procedure

##### 1.0.40 - Aug 21, 2016 - Arnan Sipitakiat, Marutpong Chailangka
- Added a Dust Level Sensor (I2C Sensor)
- Fixed a logo conversion of operator "<=" issue

##### 1.0.39 - Aug 6, 2016 - Marutpong Chailangka
- Added online storage
- Added share button
- Fixed bugs

##### 1.0.38 - Aug 2, 2016 - Marutpong Chailangka
- Added: Send message/image command blocks
- Changed: Improved IFTTT command blocks  generation
- Fixed: a block display issue when changing board type

##### 1.0.37 - Jul 11, 2016 - Arnan Sipitakiat
- Added: IFTTT command blocks
- Removed: USE SMS block
- Added: Unrestricted key-value reporter block
- Added: Display number is now in the common blocks section


##### 1.0.36 - Jul 7, 2016 - Arnan Sipitakiat
- Added: Variable "increase by" and "decrease by" commands. It is an alias to "set variable variable + increment"

##### 1.0.35 - Jul 4, 2016 - Arnan Sipitakiat
- Added send message commands. This allows the gogo to send topic/message value pairs to the Raspberry Pi
  send integer to topic
  send string to topic
- Hid the Conversion and Condition links in the left menu

##### 1.0.34 - Jun 10, 2016 - Marutpong Chailangka
- Hidden the Conversion Lab and Condition Lab for better performance.

##### 1.0.33 - May 18, 2016 - Marutpong Chailangka
- Added - If connecting to WSS is not supported, it will redirect to normal http

##### 1.0.32 - Mar 23, 2016 - Arnan Sipiatkiat
- Added support for the DS18D20 temperature sensors

##### 1.0.31 - Feb 11, 2016 - Marutpong Chailangka
- Added - a feature, Switching WS to WSS when load the webpage from HTTPS

##### 1.0.29 - Sep 21, 2015 - Arnan Sipiatkiat
- Added Tick timer commands

##### 1.0.28 - Sep 3, 2015 - Arnan Sipitakiat
- Added: the missing "stop" Logo command. This command stops the current procedure.

##### 1.0.27 - Sep 3, 2015 - Arnan Sipitakiat
- Fixed: Division now works
- Fixed: "Show Number" can now take an expression as an input

##### 1.0.26 - Sep 2, 2015 - Arnan Sipitakiat
- Hidden the "every - do" command. Will re-enable it once the board firmware supports it
- Hidden the depricated data recording commands.
- Fixed i2c_read bug. A parentheses has been added around the command to prevent errors when used in math operations

##### 1.0.25 - Aug 14, 2015 - Marutpong Chailangka
- Added - a Run/Stop Button

##### 1.0.24 - Aug 14, 2015 - Arnan (Roger) Sipitakiat
- Updated the examples.

##### 1.0.23 - Aug 6, 2015 - Arnan (Roger) Sipitakiat
- Fixed - Bug where procedure variable inputs have ":" in from of them
          in the code body
- Added - The number block now ensures that the user only enters numbers.

##### 1.0.22 - July 30, 2015 - Arnan (Roger) Sipitakiat
- Changed - talk to motor block now uses a checkbox instead of a dropdown list
- Added - reporter to check the motor on/off
- Added - 'in between' math operator. Should be usful in shortening
          code to define sensor ranges.
- Changed - the order of command categories
- Added - doevery x []. This is an alternative for 'forever'. It allows
          the code block to be executed at a given peroid.

##### 1.0.21 - July 29, 2015 - Arnan (Roger) Sipitakiat
- Changed - I2C commands now default to number parameters, not strings
- Changed - Some blocks now have more handy parameters attached

##### 1.0.20 - July 29, 2015 - Arnan (Roger) Sipitakiat
- Changed - Key-Value block is now used without needing a logical block
- Changed - The blocks categories and names have be optimized

##### 1.0.15 - July 22, 2015  - Arnan (Roger) Sipitakiat
- Fixed - Key-Value block incorrectly uses capital letters for the key name.


##### 1.0.14 - July 20, 2015  - Arnan (Roger) Sipitakiat
- Added - Key-Value command block
- Added - E-mail command block
