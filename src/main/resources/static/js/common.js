// 공통


function openOverlay() {
    fadeIn(document.getElementsByClassName("overlay")[0]);
}

function closePopup() {
    fadeOut(document.getElementsByClassName("overlay")[0]);
    for (i = 0; i < document.getElementsByClassName("layer").length; i++) {
        document.getElementsByClassName("layer")[i].innerHTML = "";
        fadeOut(document.getElementsByClassName("layer")[i]);
    }
}

// fadeIn, fadeOut 사용 시 style에 아래 속성 주셔야 부드럽게 적용됩니다.
// opacity: 1 또는 0;
// transition: opacity 0.5s ease;

function fadeIn(element) {
    element.style.display = "block";
    setTimeout(function () {
        element.style.opacity = 1;
    }, 10);
}

function fadeOut(element) {
    element.style.opacity = 0;
    setTimeout(function () {
        element.style.display = "none";
    }, 500);
}

function formatDate(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatNumber(element) {
    // 현재 입력된 값에서 숫자 외의 문자를 제거
    let value = element.value.replace(/[^0-9]/g, '');

    // 숫자에 천 단위로 쉼표 추가
    element.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 로그인

var modal = document.getElementById("loginModal");
var btn = document.getElementById("openModalBtn");

// 페이지 로드 시 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {
    // 회원가입 성공 후 로그인 모달 열기
    const urlParams = new URLSearchParams(window.location.search);
    const openLoginModal = urlParams.get('openLoginModal');
    if (openLoginModal === 'true') {
        openLoginModal();
    }
});

// 로그인 모달 열기 및 form.html 로드
function openLoginModal() {
    var modal = document.getElementById("loginModal");
    fetch('/auth/form')
        .then(response => response.text())
        .then(data => {
            document.getElementById('loginFormContainer').innerHTML = data;
            modal.style.display = "block";
            populateEmailField();
        });
}

// 회원가입 모달 열기 및 signup.html 로드
function openSignupModal() {
    var modal = document.getElementById("signupModal");
    fetch('/user/signup')
        .then(response => response.text())
        .then(data => {
            document.getElementById('signupFormContainer').innerHTML = data;
            modal.style.display = "block";
        });
}

// 로그인 모달 닫기
function closeLoginModal() {
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
}

// 회원가입 모달 닫기
function closeSignupModal() {
    var modal = document.getElementById("signupModal");
    modal.style.display = "none";
}

// 모달 외부 클릭 시 모달 닫기 처리
window.onclick = function (event) {
    var loginModal = document.getElementById("loginModal");
    var signupModal = document.getElementById("signupModal");
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
}
// 이메일을 쿠키에 저장하는 함수
function setEmailCookie(email, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = 'savedEmail=' + encodeURIComponent(email) + '; expires=' + expires + '; path=/';
}

// 저장된 쿠키에서 이메일을 가져오는 함수
function getEmailCookie() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('savedEmail='));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
}

// 로그인 폼 제출 시 이메일 저장 처리
function handleLoginSubmit() {
    const email = document.getElementById('email').value;
    const saveEmail = document.getElementById('saveEmail').checked;

    // '이메일 저장'이 체크된 경우 이메일 쿠키 저장
    if (saveEmail) {
        setEmailCookie(email, 30);  // 30일 동안 쿠키 유지
    } else {
        setEmailCookie('', -1);  // 체크 해제 시 쿠키 삭제
    }
}

// 페이지 로드 시 쿠키에 저장된 이메일을 폼에 채움
function populateEmailField() {
    const savedEmail = getEmailCookie();
    if (savedEmail) {
        const emailField = document.getElementById('email');
        const saveEmailCheckbox = document.getElementById('saveEmail');

        if (emailField && saveEmailCheckbox) {
            emailField.value = savedEmail;
            saveEmailCheckbox.checked = true;
        }
    }
}

// 마이홈



// 채팅
function openChatroomPopup() {
    const chat_btn = document.querySelector(".chat-btn");
    const chatroom_layer = document.querySelector(".chatroom-layer");

    fetchChatroom();
    chat_btn.setAttribute("onClick", "closeChatroomPopup()");
    fadeIn(chatroom_layer);
}

function closeChatroomPopup() {
    const chat_btn = document.querySelector(".chat-btn");
    const chatroom_layer = document.querySelector(".chatroom-layer");

    chat_btn.setAttribute("onClick", "openChatroomPopup()");
    fadeOut(chatroom_layer)
    setTimeout(function () {
        chatroom_layer.innerHTML = "";
    }, 500);
}

function openChat(chatroomNo) {
    const chatroom_layer = document.querySelector(".chatroom-layer");
    const chatroom = document.getElementsByClassName("chatroom");
    for (i = 0; i < chatroom.length; i++) {
        fadeOut(chatroom[i]);
    }

    setTimeout(function () {
        chatroom_layer.innerHTML = "";
    }, 500);


}

function fetchChatroom() {
    const chatroom_layer = document.querySelector(".chatroom-layer");

    fetch(`/chat/listRoom`)
        .then(response => response.json())
        .then(data => {

            data.forEach(chatroom => {
                console.log(chatroom);

                const div = document.createElement("div");
                div.className = "chatroom";
                div.setAttribute("onclick", `openChat(${chatroom.no})`);

                const userspan = document.createElement("span");
                const chatspan = document.createElement("span");
                userspan.className = "chatroom-user";
                chatspan.className = "chatroom-content";

                const img = document.createElement("img");
                img.src = chatroom.user.photo == null ? "/images/user/default1.png" : "/images/user/default2.png";
                img.alt = "프로필";
                img.className = "profile"

                const nickname = document.createElement("div")
                nickname.innerHTML = chatroom.user.nickname;
                nickname.className = "nickname";

                userspan.appendChild(img);
                userspan.appendChild(nickname);

                const message = document.createElement("div");
                message.className = "message";
                message.innerHTML = chatroom.lastMessage;
                const date = document.createElement("div");
                date.className = "date";
                date.innerHTML = formatDate(chatroom.chatDate);

                chatspan.appendChild(message);
                chatspan.appendChild(date);

                div.appendChild(userspan);
                div.appendChild(chatspan);

                chatroom_layer.appendChild(div);
            });
        })
}

function fetchChatroom(chatroomNo) {
    const chatroom_layer = document.querySelector(".chatroom-layer");
}

function fetchChat(chatroomNo) {

}



// 로그인



// 댓글 길이 카운팅
function countingLength(content) {
    if (content.value.length > 300) {
        alert('댓글을 300자 이하로 입력해 주세요.');
        content.value = content.value.substring(0, 300);
        content.focus();
    }
    document.getElementById('counter').innerText = content.value.length + '/300자';
}


// 댓글 저장
function saveComment() {

    const content = document.getElementById('content');
    isValid(content, '댓글');

    const boardNo = [[`${board.no}`]];
    const params = {
        boardNo: boardId,
        content: content.value,
        writer: '홍길동'
    }

    $.ajax({
        url: `/board/${boardNo}/comments`,
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false,
        success: function (response) {
            console.log(response);
        },
        error: function (request, status, error) {
            console.log(error)
        }
    })
}
