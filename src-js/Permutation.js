var Permutation = (function(){
	
	var Permutation = function () {
		
		this.elements = arguments[0];
		this.length = length;
		
		this.totalResults = this.factorial( this.elements );
		
		this.rewind();
		
	}
	Permutation.prototype = new CombinatoricsBase();
	Permutation.prototype.constructor = Permutation;
	
	Permutation.prototype.rewind = function () {
		
		this.current = this.totalResults;
		
		this.indices = new Array( this.elements );
		for ( var i = 0; i < this.indices.length; i++ )
			this.indices[i] = i;
	}
	
	/* boolean */
	Permutation.prototype.hasMore = function () {
		return this.current > 0;
	}

	/* int[] */
	Permutation.prototype.next = function () {
		
		if ( this.current == 0 ) 
			return this.indices.slice(0); // clone
			
		if ( this.current == this.totalResults )
		{
			this.decrease();
			return this.indices.slice(0); // clone
		}
		
		// Find largest index j with a[j] < a[j+1]
			
		var j = this.indices.length - 2;
		while ( this.indices[j] > this.indices[j+1] ) j--;
		
		// Find index k such that a[k] is smallest integer
		// greater than a[j] to the right of a[j]
		
		var k = this.indices.length - 1;
		while ( this.indices[j] > this.indices[k] ) k--;
		
		// Interchange a[j] and a[k]
		
		var tmp = this.indices[k];
		this.indices[k] = this.indices[j];
		this.indices[j] = tmp;
		
		// Put tail end of permutation after jth position in increasing order
		
		var r = this.indices.length - 1;
		var s = j + 1;

		while ( r > s )
		{
			tmp = this.indices[s];
			this.indices[s] = this.indices[r];
			this.indices[r] = tmp;
			r--;
			s++;
		}
		
		this.decrease();
		
		return this.indices.slice(0); //clone
	}
	
	/* float */
	Permutation.prototype.positionInPercent = function () {
		
		return 100 * (1 - CombinatoricsBase.prototype.positionInPercent.call( this )); // super.positionInPercent()
	}
	
	/* int */
	Permutation.prototype.positionAsInt = function () {
		
		return parseInt( this.getPosition() );
	}
	
	/* long */ 
	Permutation.prototype.positionAsLong = function () {
		
		return parseInt( this.getPosition() );
	}
	
	/* BigInteger */ 
	Permutation.prototype.position = function () {
		
		return parseInt( this.getPosition() );
	}
	
	/* BigInteger */ 
	Permutation.prototype.getPosition = function () {
		
		return parseInt( this.totalResults - this.current );
	}
	
	return Permutation;

})();