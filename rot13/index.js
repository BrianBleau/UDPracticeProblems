//lower 97-122
//upper 65-90

const rot = function (string, num) {
  //get char codes
  const array = string.split("").map((el) => el.charCodeAt());
  //shift by num
  const shifted = array.map((el) => {
    //only shift letters
    if ((el >= 65 && el <= 90) || (el >= 97 && el <= 122)) {
      // conditionally return numbers that go over
      if (el >= 97 && el <= 122 && el + num > 122) {
        return el + num - 97;
      } else if (el >= 65 && el <= 90 && el + num > 90) {
        return el + num - 65;
      } else return el + num;
      // return all other codes as is
    } else return el;
  });
  console.log(String.fromCharCode(...shifted));
};
