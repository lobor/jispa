# Jaspi
It's a vocal assistant write in Javascript. Use electron for enable the webkit api. This project it's for Internet of Objects, I use it on Raspberry Pi 2.

## Usage

## Structure
The structure is the most simple of possible.
The commands are on the classifier folder, and on sub-folder for each command.
The multi-language is activate, and is on languages folder.

### Classifier structure
On the classifier you found a JSON whith 2 principal keys, Docs and Function. In Docs, you find the vocal command (text) and the response (label). If the label begin by function, so JASPI find in keys function the value corresponds and launch the function, if not speak with the text.

