path$ = "C:\Users\Celeste\Desktop\demo"
;path$ = chooseDirectory$("选择demo文件夹")
path$ = path$ + "\textgrid\"
Create Strings as file list: "grid", path$+"*.TextGrid"
Create Strings as file list: "wav", path$+"*.wav"
fileTotal = Get number of strings
for iFile to fileTotal
	selectObject: "Strings grid"
	seqGrid$ = Get string: iFile
	Read from file: "'path$''seqGrid$'"
	selectObject: "Strings wav"
	seqWav$ = Get string: iFile
	Read from file: "'path$''seqWav$'"
endfor