angular.module('miapp')
  .service('Messages', function Messages ($http,$state,$interval) {
    this.data = []
	this.new = '';
	this.loading = false;
	this.user = $state.params.name;
	this.reverse = false;
	this.resource = 'http://192.168.100.153:9000/api/messages/';
	this.users = [];
	this.blocks = [];
	
	this.listar = function listar() {
		var self = this;
		if(this.data.length == 0) {
			$http.get(this.resource)
			  .success(function success(data){
				self.data = data;
				self.users = data.reduce(function reducir(user, e1){  
					var matches = user.filter(function(e2){return e1.user== e2.user}); 
					if (matches.length == 0){ 
						user.push(e1);  
					};
					return user;
				}, []);
			  })
		}
	};
	
	this.crear = function crear () {
		this.loading = true;
		var message = {
			user: this.user,
			desc: this.new
		}
		this.data.push(message);
		var self = this;
		$http.post(this.resource + this.user, message)
		  .success(function success(x){
          self.data = self.data.map(function map (el) {
            if (el === message) {
              return x
            }
            return el
          })
        })
        .finally(function final() {
			self.loading = false;
        })
		this.new = '';
	}
	
	this.invert = function invert(){
		this.reverse = !this.reverse;
	}

	// this.seleccionar = function seleccionar (id, cb) {
      // if (!this.data.length) {
        // if(!cb) { cb = function() {}}
        // $http
          // .get(this.resource + id)
          // .success(function success (data) {
            // cb(data)
          // })
      // }else {
        // var todo = {}
        // this.data.map(function map (el) {
          // if(el._id == id) {
            // todo = el
          // }
        // })

        // return todo
      // }
      
    // }
	
	this.eliminar = function eliminar(id, user) {
            this.loading = true;
            if (user === this.user) {
                this.data = this.data.filter(function filter(el) {
                    return el._id != id;
                });
                var self = this;
                $http.delete(this.resource + this.user + '/' + id)
                    .success(function success() {
                        self.loading = false;
                    });
            } else {
                alert('No puedes eliminar un mensaje que no sea tuyo!');
            }
        };
	
	// this.modificar = function modificar (id) {
		// this.loading = true;
		// var self = this;
		// var todo = {};
		// this.data = this.data.map(function map (el){
			// if(el._id == id){
				// el.desc = self.new
				// todo = el;
			// }
			// return el;
		// })
		// this.new = '';
		// $http.put(this.resource + todo._id, todo)
			// .success(function success () {
				// self.loading = false
			// })
	// }
	
	this.bloquear = function bloquear (name){
		this.blocks.push(name);
	}
	
	this.isBlock = function isblock (name){
		var users = this.blocks.filter(function filtrar(user){
			return user == name;
		});
		if(users.length > 0){
			return true;
		}else{
			return false;
		};
	}
	
	this.listar();
	
	this.refresh = function refresh() {
		$http
			.get(this.resource)
			.success(function success(data) {
				self.data = data;
			});
	};

	var self = this;
	$interval(function(){
		self.refresh();
	}, 3000);
  })