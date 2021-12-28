// var topics = ["Techonology", "Music", "Self-Help-Therapies", "World of Travelling", "Foodies", "Money", "Beauty", "Poetry", "Mythology & History", "Politics"];

// var myTopics = ["Music", "Beauty", "Money"];

//     const result =   myTopics.every( (topic) =>  topics.find( (temp) => temp == topic))
//        if (result) {
//        myTopics.forEach(topic => {
//            myTopics.push(topic)
//        });
//        console.log(result);
//        }

// console.log(myTopics);

// var date = new Date;

// var d = date.getMonth()
// console.log(d.toString());

// const generateUsername = async (user) => {
//     const fullName = user.fullName;
//     const DOB = user.DOB;
//     const userName = fullName.slice(fullName.length-4) + DOB.getYear() + "asgjb&cg#";
//     return userName.toLowerCase;
// }

// const validator = require("validator")
// var temp = "abc";
// console.log(validator.isIn(temp, ["abc"]));

// var name = "lahyuhkh khkskj";
// console.log(name.split(" ").slice(0,1))

// var username;
// var a = 2;
// if(a==1) username = "queen"
// console.log(username);

// const htmlContent = `<p>The <b>HyperText Markup Language</b>,or <b>HTML</b>is the standard<a href="/wiki/Markup_language"title="Markup language">markup language</a> for documents designed to be displayed in a <a href='/wiki/Web_browser'title=''>web browser</a>.It can be assisted by technologies such as <a href='/wiki/Cascading_Style_Sheets'class='mw-redirect'title='Cascading Style Sheets'>Cascading Style Sheets</a> (CSS) and <a href='/wiki/Scripting_language' title='Scripting language'>scripting languages</a> such as <a href='/wiki/JavaScript' title='JavaScript'>JavaScript</a></p>`
// const htmlMessage = JSON.stringify(htmlContent);
// console.log(htmlMessage);
// console.log("/n",JSON.parse(htmlMessage));

// const arr = ["let", "jack", "kite", "oops"];

// const arr2 = JSON.stringify(arr);
// console.log(typeof arr2);
// let b64 = [];
// arr2.forEach((a) => {
//   b64 = Buffer.from(arr2).toString("base64");
// });

const arr = ["apple", "mango", "tree"];

let arr2 = ["apple", "apple"];

// const result = req.body.myTopics.every((topic) =>
//   topics.find((temp) => temp == topic)
// );

// const result = arr2.every((a) => {
//   console.log(a);
//   console.log(arr.find((temp) => temp === a));
// });

let result;

arr2.forEach((a) => {
  if (arr.includes(a)) {
    result = true;
  }
});

const unique = new Set(arr2);
console.log(unique);

console.log(result);

if (result && unique && arr2.length <= 3) {
  console.log("Yes");
}
console.log(arr2);
