function stringHash(str) {
	str = JSON.stringify(str);

	var hash = 5381,
		i = str.length,
		char;
	while(i--) {
		char = str.charCodeAt(i);
		hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
	}
	return hash;
}

function objectHash(obj) {
	var strings = [],
		key, i;

	if(typeof obj === 'object') {
		for(key in obj) {
			strings.push(key + ':' + objectHash(obj[key]));
		}
	} else if(obj instanceof Array) {
		i = obj.length;
		while(i--) {
			strings.push(i + ':' + objectHash(obj[i]));
		}
	} else if(obj === undefined) {
		return 'undefined';
	} else {
		return stringHash(obj);
	}

	strings.sort();

	return stringHash(strings.join('|'));
}

module.exports = objectHash;
