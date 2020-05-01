var btnClick = function(event){
  //console.log(bookTitleText.innerText);
  // make a new request
  var request = new XMLHttpRequest();
  request.addEventListener("load", function(){
     console.log("response text", this.responseText);
     //var data = JSON.parse(this.responseText);
    event.target.style="display:none";
    //button.parentNode.removeChild(button);
    //button.disabled = true;
    //console.log("trying");
  });


  request.open("GET", "http://localhost:3000/readinglist/1");

  request.send(this.responseText);

}
//var bookname = document.querySelector('#book');
//console.log(bookname);
var button = document.querySelector('#readinglist');
console.log("button",button);
  button.addEventListener('click', btnClick);