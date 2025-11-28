function initEventListers() {
    // 1. Cafe & Name Input (기존 로직)
    const textInputs = [
        { inputId: 'cafeInputText', countId: 'numCafe' },
        { inputId: 'nameInputText', countId: 'numName' }
    ];

    textInputs.forEach(item => {
        const inputEl = document.getElementById(item.inputId);
        const countEl = document.getElementById(item.countId);

        if (inputEl && countEl) {
            inputEl.addEventListener('input', function() {
                updateCount(inputEl, countEl);
            });
            // 초기 로드 시 카운트 실행
            updateCount(inputEl, countEl);
        }
    });

    // 2. Peer List Input & Toggle
    const peerInput = document.getElementById('peerInputText');
    const peerCount = document.getElementById('numPeer');
    const peerToggle = document.getElementById('peerToggle');

    if (peerInput && peerToggle) {
        // (A) 실시간 토글 상태 변경 감지
        peerToggle.addEventListener('change', function(e) {
            const isEnabled = e.target.checked; 
            
            setPeerInputState(isEnabled);
            
            if (isEnabled) {
                updateCount(peerInput, peerCount);
            } else {
                if(peerCount) peerCount.innerText = "-"; 
            }
        });

        // (B) Peer Input 내용 변경 감지
        peerInput.addEventListener('input', function() {
            if (peerToggle.checked) {
                updateCount(peerInput, peerCount);
            }
        });

        // (C) 초기 상태 설정
        setPeerInputState(peerToggle.checked);
        if (peerToggle.checked) updateCount(peerInput, peerCount);
    }

    // 3. ★ 핵심 수정: 버튼 클릭 시 utils.js의 onClickGeneration 실행 연결 ★
    const btnGenerate = document.getElementById('btnGenerate');
    if (btnGenerate) {
        // handleGeneration 삭제 -> onClickGeneration 연결
        btnGenerate.addEventListener('click', onClickGeneration);
    }
}

// [Helper] Textarea 활성화/비활성화 제어
function setPeerInputState(isEnabled) {
    const peerInput = document.getElementById('peerInputText');
    if(!peerInput) return;

    if (isEnabled) {
        peerInput.disabled = false;
        peerInput.classList.remove('bg-light'); 
        peerInput.style.opacity = "1";
    } else {
        peerInput.disabled = true;
        peerInput.classList.add('bg-light'); 
        peerInput.style.opacity = "0.5";     
    }
}

// [Helper] 카운트 업데이트
function updateCount(inputElement, displayElement) {
    // utils.js가 로드되어 있어야 cleanInput 사용 가능
    if (typeof cleanInput !== 'function') return;

    const rawList = cleanInput(inputElement.value);
    
    if (displayElement) {
        displayElement.innerText = rawList.length;
    }
}