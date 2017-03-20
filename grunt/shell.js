module.exports = function (grunt, options) {
	return {
	  gitCheckout: {
	    command: function (commit) {
	    	if (commit)
	    		return 'git checkout ' + commit + ' ./';

	    	return 'git checkout -- ./';
	    }
	  },
	  gitCheckoutBranch: {
	  	command: function (branch) {
	  		return 'git checkout ' + branch;
	  	}
	  },
	  gitPull: {
	  	command: function (branch) {
	  		return 'git pull origin ' + branch;
	  	}
	  },
	  gitMerge: {
	  	command: function (branch) {
	  		return 'git merge ' + branch;
	  	}
	  }
	};
};