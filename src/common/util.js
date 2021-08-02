const isEmail = email => {
  let reg = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  if (reg.test(email)) {
    return true;
  } else {
    alert('Email을 제대로 작성해주세요!');
    return false;
  }
};

export { isEmail };
