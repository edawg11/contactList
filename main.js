$(document).ready(init);

var friends = [];

function init() {
	loadFromStorage();
	updateTable();
	$("#newFriend").submit(addFriend);
	$('#friendList').on('click', '.deleteButton', removeFriend);
	$('.table').on('dblclick', 'th', sortArray);
	$('#friendList').on('click', '.editButton', editing.openModal);
	$('#save').click(editing.saveEdit);
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
	$("#newFriend")[0].reset()
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

editing = {
	openModal: function(e) {
	editing.index = $(e.target).closest('tr').index()-1;
	var friendToEdit = friends[editing.index];

	console.log(friendToEdit);
	$('#nameEdit').val(friendToEdit.name);
	$('#phoneEdit').val(friendToEdit.phoneNum);
	$('#emailEdit').val(friendToEdit.email);		
	$('#myModal').modal('show');
	
	},

	saveEdit: function(){
	var name = $('#nameEdit').val();
	var email = $('#emailEdit').val();
	var phoneNum = $('#emailEdit').val();

	friends[editing.index].name = name;
	friends[editing.index].phoneNum = phoneNum;
	friends[editing.index].email = email;

	updateTable();
	saveToStorage();

	$('#myModal').modal('hide');

	},
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

  $friendList.children().not('#template').empty();
  
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