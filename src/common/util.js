const isEmail = email => {
  // let reg =
  //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // if (reg.test(email)) {
  return true;
  // } else {
  //   alert('Email을 제대로 작성해주세요!');
  //   return false;
  // }
};

export { isEmail };
