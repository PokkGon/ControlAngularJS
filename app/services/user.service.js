angular.module('miapp')
  .service('User', function User ($state) {
    var x = JSON.parse(localStorage.getItem('users'))
    this.data = x || []
	this.name = '';
	this.mail = '';

    this.newUser = function newUser () {
		var user = {name: this.name, mail: this.mail};
		this.data.push(user);
		localStorage.setItem('users', JSON.stringify(this.data));
		$state.go('ListChat',{'name': this.name});
    }
  })