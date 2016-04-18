# Jaspi
It's a vocal assistant write in Javascript. Use electron for enable the webkit api. This project it's for Internet of Objects, I use it on Raspberry Pi 2.

## Usage

## Structure
The structure is the most simple of possible.
The commands are in the commands folder, and in sub-folder for each type of command.
The multi-language is activate, and is in languages folder.

### Commands structure
In the commands folder you find a JSON whith 2 principal keys, Docs and Function. In Docs, you find the vocal command (text) and the response (label). 
If the label begin by function (ex: "label": "functionMeet"), the program try to find the corresponding function and will launch it automatically, if there is no function keywords it will say the content of the label.



