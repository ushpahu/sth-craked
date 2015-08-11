!function(w) {
	var d=[],s=2e4;
	function* scan()
	{
		var s=w.STH().authS();
		if(s) {
			while( d.length){
				w.app.faendData(d.pop());
				yield 1;
			}
		}
		s=null;
	}
	function start(){
		w.DB.item.select(function(t,data){
			var i=0,l=data.rows.length;
			for(;i<l;++i){
				var o=data.rows.item(i);
				d.push(o);
			}
			synch(scan,function(){setTimeout(start,s*10)},s)
		} , "market_hash_name is null or market_hash_name=''");
		
	}
	setTimeout(start,s)
}(this);