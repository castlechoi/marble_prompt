function generateCombinationList(cafe_list, name_list, peer_list){
    var prompt_list = new Array();
    for(var idx_cafe = 0; idx_cafe < cafe_list.length ; idx_cafe++){
        for (var idx_name = 0; idx_name < name_list.length;idx_name++) {
            for (var idx_peer =0 ; idx_peer < peer_list.length; idx_peer++){
                var single_prompt =  `${cafe_list[idx_cafe]}_${name_list[idx_name]}_${peer_list[idx_peer]}`;       
                prompt_list.push(single_prompt);
            }
        }
    }
    return prompt_list;
}
function cleanInput(input_string){
    var input_list = input_string.trim().split(',');
    for(var idx_input = 0; idx_input < input_list.length ; idx_input++){
        cleanedInput = input_list[idx_input].trim();
        if(cleanedInput.length != 0){
            input_list[idx_input] = cleanedInput;
        }
    }
    return input_list;
}
function onClickGeneration(){
    var cafeInput = document.getElementById('cafeInputText').innerHTML;
    var nameInput = document.getElementById('nameInputText').innerHTML;
    var peerInput = document.getElementById('peerInputText').innerHTML;

    // clean input text
    var cafeList = cleanInput(cafeInput);
    var nameList = cleanInput(nameInput);
    var peerList = cleanInput(peerInput);

    // generate prompt combination
    var promptOutput = generateCombinationList(cafeList, nameList, peerList);

    // show result
    document.getElementById('resultArea').innerHTML = promptOutput;
}
