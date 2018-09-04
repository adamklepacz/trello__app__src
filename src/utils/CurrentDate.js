const today = new Date();
const yyyy = today.getFullYear();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let todaysDate;

if(dd < 10) {
  dd = '0' + dd;
}

if(mm < 10) {
  mm = '0' + mm;
}

todaysDate = yyyy + '-' + mm + '-' + dd;

export default todaysDate;