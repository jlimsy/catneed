const postalFirst2Digits = () => {
  let numArr = [];
  for (let i = 1; i <= 80; i++) {
    numArr.push(i.toString());
  }

  let first2Digits = [];
  for (let num of numArr) {
    let newNum = num.replace(num, num.padStart(2, 0));
    first2Digits.push(newNum);
  }

  return first2Digits;
};

export default postalFirst2Digits;
