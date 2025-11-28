/**
 * 조합 생성 함수
 */
function generateCombinationList(cafe_list, name_list, peer_list, peerToggle){
    var prompt_list = new Array();
    
    for(var idx_cafe = 0; idx_cafe < cafe_list.length ; idx_cafe++){
        for (var idx_name = 0; idx_name < name_list.length;idx_name++) {
            
            if (peerToggle){
                // Peer 활성화 (3중)
                for (var idx_peer = 0 ; idx_peer < peer_list.length; idx_peer++){
                    var single_prompt = `${cafe_list[idx_cafe]}_${name_list[idx_name]}_${peer_list[idx_peer]}`;       
                    prompt_list.push(single_prompt);
                }
            }
            else{
                // Peer 비활성화 (2중)
                var single_prompt = `${cafe_list[idx_cafe]}_${name_list[idx_name]}`;       
                prompt_list.push(single_prompt);
            }
        }
    }
    return prompt_list;
}

/**
 * 입력 문자열 정리 함수
 */
function cleanInput(input_string){
    if (!input_string) return []; 

    var input_list = input_string.split(',');
    var result_list = [];

    for(var idx_input = 0; idx_input < input_list.length ; idx_input++){
        var cleanedInput = input_list[idx_input].trim();
        if(cleanedInput.length !== 0){
            result_list.push(cleanedInput);
        }
    }
    return result_list;
}

/**
 * 생성 버튼 클릭 핸들러 (메인 로직)
 */
function onClickGeneration(){
    // 1. Toggle 상태 확인
    var toggleEl = document.getElementById('peerToggle');
    var peerToggle = toggleEl ? toggleEl.checked : true;

    // 2. 값 가져오기
    var cafeInput = document.getElementById('cafeInputText').value;
    var nameInput = document.getElementById('nameInputText').value;
    
    var peerInput = "";
    if(peerToggle){
        peerInput = document.getElementById('peerInputText').value;
    }

    // 3. 리스트 정제
    var cafeList = cleanInput(cafeInput);
    var nameList = cleanInput(nameInput);
    var peerList = [];
    
    if(peerToggle){
        peerList = cleanInput(peerInput);
        if(peerList.length === 0){
            alert('Peer List가 활성화되어 있지만 입력된 내용이 없습니다.');
            document.getElementById('peerInputText').focus();
            return;
        }
    }

    // 유효성 검사
    if(cafeList.length === 0){
        alert('Cafe List를 입력해주세요.');
        document.getElementById('cafeInputText').focus();
        return;
    }
    if(nameList.length === 0){
        alert('Name List를 입력해주세요.');
        document.getElementById('nameInputText').focus();
        return;
    }

    // 4. 조합 생성
    var promptOutput = generateCombinationList(cafeList, nameList, peerList, peerToggle);

    // 5. 결과 출력
    document.getElementById('resultArea').value = promptOutput.join('\n');
    
    // [추가] 결과 개수 업데이트
    var countDiv = document.getElementById('resultCount');
    if(countDiv) {
        countDiv.innerText = "Total Combinations: " + promptOutput.length;
    }
}