$(document).ready(function() {
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';
	// if index path
	if(location.pathname === '/') {
		function getUsers() {
			$.ajax({
				url: baseUrl,
				data: 'GET',
				dataType: 'JSON'
			}).done(function(data) {
				var tbody = $('#users');
				tbody.children().remove();
				data.users.forEach(function(user) {
					console.log(user);
					var lastName = user.last_name ? user.last_name : '';
					var phoneNumber = user.phone_number ? user.phone_number : '';
					var row = '<tr data-id="' + user.id + '">'
							row += '<td>' + user.first_name + '</td>';
							row += '<td>' + lastName + '</td>';
							row += '<td>' + phoneNumber + '</td>';
							row += '<td>';
							row += '<button class="btn btn-primary show">Show</button>';
							row += '<button class="btn btn-danger delete">Delete</button>';
							row += '</td>';
							row += '</tr>';
							tbody.append(row);
				});
			}).fail(function(err) {
				alert('Something happen, and its not my fault');
			});
		}
		getUsers();

		$(document).on('click', '.show', function() {
			var id = $(this).closest('tr').data().id;
			location.pathname = '/users/' + id;
		});

		$(document).on('click', '.delete', function() {
			var id = $(this).closest('tr').data().id;
			deleteUser(id);
		});
		function deleteuser(id) {
			$.ajax({
				url: baseUrl + '/' + id,
				type: 'DELETE'
			}).done(function() {
				getProduct();
			}).fail(function(err) {
				alert('Could not delete');
			});
		}
	} //root route

	var re = /\/users\/\d+/;
	if(location.pathname.match(re)) {
		var showUser = $('#show-user');
		var id = showUser.data().id;
		$.ajax({
			url: baseUrl + '/' + id,
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			var user = data.user;
			showUser.children('#heading').html('<h1>Name: ' + user.first_name + ' ' + user.last_name + '</h1>');
			var showBody = $('#user-number');
			var phoneNumber = '<h3>Phone Number: ' + user.phone_number + '</h3>';
			showBody.append(phoneNumber);
		})
	}
	$('#new_user').on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			url: baseUrl,
			type: 'POST',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done(function() {
			location.pathname = '/';
		}).fail(function() {
			alert('Cannot create user')
		});
	})
});







