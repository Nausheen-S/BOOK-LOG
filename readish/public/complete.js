var btnClick = function(event){
  //console.log(bookTitleText.innerText);
  // make a new request
  var request = new XMLHttpRequest();
  request.addEventListener("load", function(){
    event.target.style="display:none";
    //button.parentNode.removeChild(button);
    //button.disabled = true;
    //console.log("trying");
  });
  var data = {
    book_id:bookIdText.innerText,
    completed: true
    //user_id: request.cookies['user_id']
  };

  request.open("POST", '/readinglist');
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(data));

}
var bookIdText = document.querySelector('#bookId');
console.log(bookIdText);
var button = document.querySelector('#completed');
console.log(button);
  button.addEventListener('click', btnClick);