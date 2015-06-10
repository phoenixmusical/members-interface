
run.$inject = ['auth'];

function run(auth){
	auth.getUser();
}

module.exports = run;