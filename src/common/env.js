const localStorage = (storage, data, obj) => {
  // data 없을때 {...data} 를 사용해주어 초기화 시켜주는 부분
  const json = obj ?? { ...data };
  return window.localStorage.setItem(storage, JSON.stringify(json));
};

export { localStorage };
