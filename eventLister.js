function initEventListers() {
    const inputs = [
        { inputId: 'cafeInputText', countId: 'numCafe' },
        { inputId: 'nameInputText', countId: 'numName' },
        { inputId: 'peerInputText', countId: 'numPeer' }
    ];

    // 1. Input 이벤트 리스너 등록 (실시간 카운트)
    inputs.forEach(item => {
        const inputEl = document.getElementById(item.inputId);
        const countEl = document.getElementById(item.countId);

        if (inputEl && countEl) {
            // 입력 시마다 카운트 업데이트
            inputEl.addEventListener('input', function() {
                updateCount(inputEl, countEl);
            });
            // 초기 로딩 시 카운트 업데이트
            updateCount(inputEl, countEl);
        }
    });

    // 2. 생성 버튼 클릭 이벤트 리스너
    const btnGenerate = document.getElementById('btnGenerate');
    if (btnGenerate) {
        btnGenerate.addEventListener('click', handleGeneration);
    }
}

// [헬퍼 함수] utils.js의 cleanInput 실행 후, 진짜 빈 값("")까지 필터링하여 반환
function getRealList(inputValue) {
    // utils.js의 cleanInput은 빈 문자열도 배열에 포함시킬 수 있으므로("") 필터링 추가
    const rawList = cleanInput(inputValue); 
    return rawList.filter(function(item) {
        return item.length > 0;
    });
}

// 카운트 업데이트 함수
function updateCount(inputElement, displayElement) {
    const realList = getRealList(inputElement.value);
    displayElement.innerText = realList.length;
}

// 생성 로직 및 유효성 검사 함수
function handleGeneration() {
    // 1. 각 영역 값 가져오기
    const cafeVal = document.getElementById('cafeInputText').value;
    const nameVal = document.getElementById('nameInputText').value;
    const peerVal = document.getElementById('peerInputText').value;

    // 2. 정제된 리스트 확보
    const cafeList = getRealList(cafeVal);
    const nameList = getRealList(nameVal);
    const peerList = getRealList(peerVal);

    // 3. 유효성 검사 (빈 리스트가 있는지 확인)
    if (cafeList.length === 0) {
        alert("⚠️ Cafe List가 비어있습니다.\n카페 이름을 입력해주세요.");
        document.getElementById('cafeInputText').focus();
        return;
    }
    if (nameList.length === 0) {
        alert("⚠️ Name List가 비어있습니다.\n이름을 입력해주세요.");
        document.getElementById('nameInputText').focus();
        return;
    }
    if (peerList.length === 0) {
        alert("⚠️ Peer List가 비어있습니다.\n이름을 입력해주세요.");
        document.getElementById('peerInputText').focus();
        return;
    }

    // 4. 모든 검사 통과 시 조합 생성 (utils.js 함수 사용)
    const resultList = generateCombinationList(cafeList, nameList, peerList);

    // 5. 결과 출력
    const resultArea = document.getElementById('resultArea');
    resultArea.value = resultList.join('\n');
    
    // 결과 개수 업데이트
    const resultCountDiv = document.getElementById('resultCount');
    if(resultCountDiv) {
        resultCountDiv.innerText = `Total Combinations: ${resultList.length}`;
    }
}