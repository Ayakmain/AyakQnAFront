const windowOpen = (...args) => {
  let [url, w, h] = args;
  let strPopupInfo =
    'left=10,top=10,width=' +
    w +
    ',height=' +
    h +
    ',menubar=yes,location=yes,resizable=no,scrollbars=no,status=no';
  window.open(url, 'sharePopUp', strPopupInfo);
};
export const shareFacebook = href => {
  let url = (href =
    'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fayak.kr%2F&amp;src=sdkpreparse');
  windowOpen(url, 600, 450);
};

export const shareKakao = href => {
  const Kakao = window.Kakao;

  // 중복 initialization 방지
  if (!Kakao.isInitialized()) {
    // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
    Kakao.init('15a4d53e0a645f328f92f010c998e863');
  }

  // TODO: 이부분 체크해야함(문구 & 디자인 체크)
  function sendLink() {
    Kakao.Link.sendDefault({
      objectType: 'feed', // 메시지 형식 : 피드 타입
      content: {
        title: '내 몸에 필요한 영양성분 테스트 결과',
        description: '내 몸에 필요한 영양성분 궁금하세요?',
        imageUrl: 'https://ayak.kr/web/season2_skin/skin4/images/logo.png', // 메인으로 보여질 이미지 주소
        link: {
          webUrl: 'http://www.ayak.kr',
          mobileWebUrl: 'http://www.m.ayak.kr',
        },
      },
      social: {
        likeCount: 2863,
        commentCount: 450,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '나도 테스트 해보기', // 버튼 이름
          link: {
            webUrl: 'http://www.ayak.kr',
            mobileWebUrl: 'http://www.m.ayak.kr',
          },
        },
      ],
    });
  }
  let url = (href = sendLink());
  windowOpen(url, 600, 450);
};
