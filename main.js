$(document).ready(init);

var friends = [];

function init() {
	// loadFromStorage();
	// updateTable();
	loadFromStorage();
	updateTable();
	$("#newFriend").submit(addFriend);
	$('#friendList').on('click', '#deleteButton', removeFriend);
	$('.table').on('dblclick', 'th', sortArray);
}

function sortArray(e) {
	var $target = $(e.target);
	var $targetClass = $target.attr('class');

	friends = _.sortBy(friends, $targetClass);
	
	saveToStorage();
	updateTable();
}	

function addFriend(e){
	e.preventDefault();

	var name = $('#nameInput').val();
	var phoneNum =$('#phoneInput').val();
	var email =$('#emailInput').val();

	var friend = {};
	friend.name = name;
	friend.phoneNum = phoneNum;
	friend.email = email;

	friends.push(friend);
	console.log(friends);

	saveToStorage();
	updateTable();
}

function removeFriend(e) {

	var $target = $(e.target)
	var $targetRow = $target.closest('tr');

	var index = $targetRow.index;

	console.log('index:', index);
	friends.splice(index, 1);
	
	updateTable();
	saveToStorage();
}

function saveToStorage() {
  localStorage.friends = JSON.stringify(friends);
}

function loadFromStorage() {
  if(!localStorage.friends) {
    localStorage.friends = '[]';
  }
  friends = JSON.parse(localStorage.friends);
}

function updateTable() {
  var $friendList = $('#friendList');

  $friendList.children().not('#template').remove();
  
  var $friends = friends.map(function(friend) {
			var $tr = $('#template').clone();
		  $tr.removeAttr('id');
			$tr.children('.name').text(friend.name);
			$tr.children('.phone').text(friend.phoneNum);
			$tr.children('.email').text(friend.email);

			return $tr;
  });
  $friendList.append($friends);
}