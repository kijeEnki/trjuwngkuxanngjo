const initials = [
	"p", "ph", "b", "m",
	"t", "th", "d", "n", "l",
	"tr", "trh", "dr", "nr",
	"ts", "tsh", "dz", "s", "z",
	"tsr", "tsrh", "dzr", "sr", "zr",
	"tsy", "tsyh", "dzy", "sy", "zy", "y",
	"k", "kh", "g", "ng",
	"'", "x", "h"
]

const kana = {
	"k": "カキクケコ",
	"g": "ガギグゲゴ",
	"s": "サシスセソ",
	"z": "ザジズゼゾ",
	"t": "タチツテト",
	"d": "ダヂヅデド",
	"n": "ナニヌネノ",
	"h": "ハヒフヘホ",
	"b": "バビブベボ",
	"p": "パピプペポ",
	"m": "マミムメモ",
	"y": "ヤイユエヨ",
	"r": "ラリルレロ",
	"w": "ワヰウヱヲ",
	"x": "ャィュェョ",
	"": "アイウエオ",
}

const hangulInitials = {
	"m": "ᄆ", "n": "ᄂ", "X": "ᄋ",
	"p": "ᄑ", "t": "ᄐ", "ch": "ᄎ",
	"b": "ᄇ", "d": "ᄃ", "j": "ᄌ", "g": "ᄀ",
	"s": "ᄉ", "h": "ᄒ", "r": "ᄅ"
}

const hangulMedials = {
	"wae": "ᅫ",
	"yae": "ᅤ",
	"yeo": "ᅧ",
	"ae": "ᅢ",
	"eo": "ᅥ",
	"eu": "ᅳ",
	"oe": "ᅬ",
	"ui": "ᅴ",
	"wa": "ᅪ",
	"we": "ᅰ",
	"wi": "ᅱ",
	"wo": "ᅯ",
	"ya": "ᅣ",
	"ye": "ᅨ",
	"yo": "ᅭ",
	"yu": "ᅲ",
	"a": "ᅡ",
	"e": "ᅦ",
	"i": "ᅵ",
	"o": "ᅩ",
	"u": "ᅮ"
}

const hangulFinals = {
	"m": "ᆷ",
	"n": "ᆫ",
	"ng": "ᆼ",
	"p": "ᆸ",
	"l": "ᆯ",
	"k": "ᆨ"
}

let kanaTable = {}
for (i in kana) {
	kanaTable[i + "a"] = kana[i][0];
	kanaTable[i + "i"] = kana[i][1];
	kanaTable[i + "u"] = kana[i][2];
	kanaTable[i + "e"] = kana[i][3];
	kanaTable[i + "o"] = kana[i][4];
}
kanaTable["n"] = "ン"

function kanaize(s, handakuon = true) {
	handakuon || (s = s.replaceAll("p", "h"));
	s = s.replace("ũ", "u");
	s = s.replace("ĩ", "i");
	s = s.replace(/([^aeiou])y/, "$1iy");
	s = s.replace(/([^aeiou])w/, "$1uw");
	for (i in kanaTable) {
		s = s.replaceAll(i, kanaTable[i]);
	}
	return s;
}

function modernize(s) {
	s = s.replaceAll("p", "h");
	s = s.replace("ũ", "u");
	s = s.replace("ĩ", "i");
	s = s.replace(/w([oeiy])/, "$1");
	s = s.replace(/([^aeiou])w/, "$1");
	s = s.replace(/(a|o)h?u/, "ou");
	s = s.replace(/ih?u/, "yuu");
	s = s.replace(/eh?u|yau/, "you");
	s = s.replace(/([^aeiou])y/, "$1ix");
	s = s.replace(/d([iuy])/, "z$1");
	return s;
}

function hangulize(s) {
	s = s.replace(/d(i|y)/, "j$1");
	s = s.replace(/t(i|y)/, "ch$1");
	s = s.replace(/(ch|j|s)y/, "$1");
	for (init in hangulInitials) {
		s = s.replace(RegExp("^" + init), hangulInitials[init]);
	}
	for (fin in hangulFinals) {
		s = s.replace(RegExp(fin + "$"), hangulFinals[fin]);
	}
	for (med in hangulMedials) {
		s = s.replace(med, hangulMedials[med]);
	}
	return s.normalize("NFKC");
}

const goFinals = {
	"a": ["a", "a", "a", "a", "a", "a"],
	"ae": ["e", "e", "ya", "ya", "e", "e"],
	"wa": ["a", "a", "a", "a", "wa", "wa"],
	"wae": ["e", "e", "e", "e", "we", "we"],
	"ja": ["ya", "ya", "ya", "ya", "ya", "ya"],
	"jae": ["ya", "ya", "ya", "ya", "ya", "ya"],
	"u": ["u", "u", "u", "u", "u", "u"],
	"jo": ["yo", "yo", "yo", "yo", "o", "o"],
	"ju": ["u", "u", "u", "u", "u", "u"],
	"oj": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"aj": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"eaj": ["e", "e", "e", "e", "e", "e"],
	"ea": ["e", "e", "e", "e", "e", "e"],
	"aej": ["e", "e", "e", "e", "e", "e"],
	"woj": ["ai", "ai", "ai", "ai", "we", "we"],
	"waj": ["ai", "ai", "ai", "ai", "we", "we"],
	"weaj": ["ai", "ai", "ai", "ai", "we", "we"],
	"wea": ["ai", "ai", "ai", "ai", "we", "we"],
	"waej": ["ai", "ai", "ai", "ai", "we", "we"],
	"jej": ["ai", "ai", "ai", "ai", "ai", "ei"],
	"jiej": ["e", "e", "e", "e", "e", "e"],
	"ej": ["ai", "ai", "ai", "ai", "e", "ai"],
	"joj": ["o", "o", "o", "o", "e", "o"],
	"jwej": ["ai", "ai", "ai", "ai", "we", "we"],
	"jwoj": ["we", "we", "we", "we", "we", "we"],
	"wej": ["we", "we", "we", "we", "we", "we"],
	"je": ["i", "i", "i", "i", "i", "i"],
	"jie": ["i", "i", "i", "i", "i", "i"],
	"ij": ["i", "i", "i", "i", "i", "i"],
	"jij": ["i", "i", "i", "i", "i", "i"],
	"i": ["i", "i", "i", "i", "i", "i"],
	"j+j": ["i", "i", "i", "i", "e", "e"],
	"jwe": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"jwie": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"wij": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"jwij": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"jw+j": ["we", "we", "we", "we", "we", "we"],
	"aw": ["au", "au", "au", "au", "au", "au"],
	"aew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"jew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"jiew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"ew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"uw": ["u", "u", "u", "u", "u", "u"],
	"juw": ["u", "u", "iu", "yu", "u", "u"],
	"jiw": ["iu", "iu", "iu", "iu", "iu", "iu"],
	"am": ["an", "an", "an", "an", "an", "an"],
	"om": ["on", "on", "on", "on", "on", "on"],
	"jom": ["on", "on", "on", "on", "on", "on"],
	"eam": ["en", "en", "en", "en", "en", "en"],
	"aem": ["en", "en", "en", "en", "en", "en"],
	"jem": ["en", "en", "en", "en", "en", "en"],
	"jiem": ["en", "en", "en", "en", "en", "en"],
	"em": ["en", "en", "en", "en", "en", "en"],
	"jaem": ["on", "on", "on", "on", "on", "on"],
	"im": ["in", "in", "in", "in", "on", "on"],
	"jim": ["in", "in", "in", "in", "in", "in"],
	"an": ["an", "an", "an", "an", "an", "an"],
	"aen": ["en", "en", "en", "en", "en", "en"],
	"ean": ["en", "en", "en", "en", "en", "en"],
	"jen": ["en", "en", "en", "en", "en", "en"],
	"jien": ["en", "en", "en", "en", "en", "en"],
	"en": ["en", "en", "en", "en", "en", "en"],
	"wan": ["an", "an", "an", "an", "wan", "wan"],
	"waen": ["en", "en", "en", "en", "wen", "wen"],
	"wean": ["en", "en", "en", "en", "wen", "wen"],
	"jon": ["on", "on", "on", "on", "on", "on"],
	"jwen": ["en", "en", "en", "en", "wen", "wen"],
	"jwien": ["en", "en", "en", "en", "wen", "wen"],
	"wen": ["en", "en", "en", "en", "wen", "wen"],
	"on": ["on", "on", "on", "on", "on", "on"],
	"won": ["on", "on", "on", "on", "on", "won"],
	"jwon": ["on", "on", "on", "on", "on", "won"],
	"in": ["in", "in", "in", "in", "on", "in"],
	"jin": ["in", "in", "in", "in", "on", "in"],
	"win": ["yun", "yun", "yun", "yun", "on", "win"],
	"jwin": ["in", "in", "in", "yun", "in", "in"],
	"j+n": ["on", "on", "on", "on", "on", "on"],
	"jun": ["un", "un", "un", "un", "un", "un"],
	"ang": ["aũ", "aũ", "aũ", "aũ", "aũ", "aũ"],
	"aeng": ["yaũ", "yaũ", "yaũ", "yaũ", "yaũ", "yaũ"],
	"eang": ["yaũ", "yaũ", "yaũ", "yaũ", "yaũ", "yaũ"],
	"aewng": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"ong": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"wong": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"wang": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"waeng": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"weang": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"jang": ["yaũ", "aũ", "yaũ", "yaũ", "aũ", "yaũ"],
	"jwang": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"ing": ["yoũ", "yoũ", "yoũ", "yoũ", "yoũ", "oũ"],
	"jaeng": ["yaũ", "yaũ", "yaũ", "yaũ", "yaũ", "yaũ"],
	"jeng": ["yaũ", "yaũ", "yaũ", "yaũ", "yaũ", "yaũ"],
	"jieng": ["yaũ", "yaũ", "yaũ", "yaũ", "yaũ", "yaũ"],
	"eng": ["yaũ", "yaũ", "yaũ", "yaũ", "yaũ", "yaũ"],
	"jwaeng": ["wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ"],
	"jweng": ["wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ"],
	"jwieng": ["wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ"],
	"weng": ["wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ", "wyaũ"],
	"uwng": ["u", "u", "uũ", "u", "u", "u"],
	"owng": ["o", "o", "oũ", "o", "o", "o"],
	"juwng": ["u", "u", "yuũ", "u", "u", "u"],
	"jowng": ["u", "u", "yuũ", "u", "u", "u"],
	"ap": ["apu", "apu", "apu", "apu", "apu", "apu"],
	"op": ["opu", "opu", "opu", "opu", "opu", "opu"],
	"jop": ["opu", "opu", "opu", "opu", "opu", "opu"],
	"eap": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"aep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"jep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"jiep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"ep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"jaep": ["opu", "opu", "opu", "opu", "opu", "opu"],
	"ip": ["ipu", "ipu", "ipu", "ipu", "opu", "opu"],
	"jip": ["ipu", "ipu", "ipu", "ipu", "ipu", "ipu"],
	"at": ["atu", "atu", "atu", "atu", "atu", "atu"],
	"aet": ["eti", "eti", "eti", "eti", "eti", "eti"],
	"eat": ["eti", "eti", "eti", "eti", "eti", "eti"],
	"jet": ["eti", "eti", "eti", "eti", "eti", "eti"],
	"jiet": ["eti", "eti", "eti", "eti", "eti", "eti"],
	"et": ["eti", "eti", "eti", "eti", "eti", "eti"],
	"wat": ["ati", "ati", "ati", "ati", "wati", "wati"],
	"waet": ["eti", "eti", "eti", "eti", "weti", "weti"],
	"weat": ["eti", "eti", "eti", "eti", "weti", "weti"],
	"jot": ["oti", "oti", "oti", "oti", "oti", "oti"],
	"jwet": ["eti", "eti", "eti", "eti", "weti", "eti"],
	"jwiet": ["eti", "eti", "eti", "eti", "weti", "eti"],
	"wet": ["eti", "eti", "eti", "eti", "weti", "eti"],
	"ot": ["oti", "oti", "oti", "oti", "oti", "oti"],
	"wot": ["oti", "oti", "oti", "oti", "oti", "oti"],
	"jwot": ["oti", "oti", "oti", "oti", "oti", "woti"],
	"it": ["iti", "iti", "iti", "iti", "oti", "oti"],
	"jit": ["iti", "iti", "iti", "iti", "iti", "iti"],
	"wit": ["iti", "iti", "yuti", "yuti", "witi", "witi"],
	"jwit": ["iti", "iti", "yuti", "yuti", "witi", "witi"],
	"j+t": ["oti", "oti", "oti", "oti", "oti", "oti"],
	"jut": ["uti", "oti", "uti", "uti", "uti", "uti"],
	"ak": ["aku", "aku", "aku", "aku", "aku", "aku"],
	"aek": ["yaku", "yaku", "yaku", "yaku", "yaku", "yaku"],
	"eak": ["yaku", "yaku", "yaku", "yaku", "yaku", "yaku"],
	"aewk": ["aku", "aku", "aku", "aku", "aku", "aku"],
	"ok": ["oku", "oku", "oku", "oku", "oku", "oku"],
	"wok": ["oku", "oku", "oku", "oku", "oku", "waku"],
	"wak": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"waek": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"weak": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"jak": ["aku", "aku", "yaku", "aku", "aku", "yaku"],
	"jwak": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"ik": ["iki", "iki", "iki", "iki", "oku", "oku"],
	"jaek": ["yaku", "yaku", "yaku", "yaku", "yaku", "yaku"],
	"jek": ["yaku", "yaku", "yaku", "yaku", "yaku", "yaku"],
	"jiek": ["yaku", "yaku", "yaku", "yaku", "yaku", "yaku"],
	"ek": ["yaku", "yaku", "yaku", "yaku", "yaku", "yaku"],
	"jwaek": ["wyaku", "wyaku", "wyaku", "wyaku", "wyaku", "wyaku"],
	"jwek": ["wyaku", "wyaku", "wyaku", "wyaku", "wyaku", "wyaku"],
	"jwiek": ["wyaku", "wyaku", "wyaku", "wyaku", "wyaku", "wyaku"],
	"wek": ["wyaku", "wyaku", "wyaku", "wyaku", "wyaku", "wyaku"],
	"wik": ["oku", "oku", "oku", "oku", "oku", "wiki"],
	"uwk": ["oku", "oku", "oku", "oku", "oku", "woku"],
	"owk": ["oku", "oku", "oku", "oku", "oku", "woku"],
	"juwk": ["uku", "uku", "iku", "uku", "wiku", "wiku"],
	"jowk": ["oku", "oku", "oku", "oku", "oku", "oku"]
}

const kanFinals = {
	"a": ["a", "a", "a", "a", "a", "a"],
	"ae": ["a", "a", "a", "a", "a", "a"],
	"wa": ["a", "a", "a", "a", "wa", "wa"],
	"wae": ["a", "a", "a", "a", "wa", "wa"],
	"ja": ["ya", "ya", "ya", "ya", "ya", "ya"],
	"jae": ["ya", "ya", "ya", "ya", "ya", "ya"],
	"u": ["o", "o", "o", "o", "o", "wo"],
	"jo": ["yo", "yo", "yo", "yo", "yo", "yo"],
	"ju": ["u", "u", "u", "yu", "u", "u"],
	"oj": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"aj": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"eaj": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"ea": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"aej": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"woj": ["ai", "ai", "ai", "ai", "wai", "wai"],
	"waj": ["ai", "ai", "ai", "ai", "wai", "wai"],
	"weaj": ["ai", "ai", "ai", "ai", "wai", "wai"],
	"wea": ["ai", "ai", "ai", "ai", "wai", "wai"],
	"waej": ["ai", "ai", "ai", "ai", "wai", "wai"],
	"jej": ["ei", "ei", "ei", "ei", "ei", "ei"],
	"jiej": ["ei", "ei", "ei", "ei", "ei", "ei"],
	"ej": ["ei", "ei", "ei", "ei", "ei", "ei"],
	"joj": ["ai", "ai", "ai", "ai", "ai", "ai"],
	"jwej": ["ei", "ei", "ei", "ei", "wei", "wei"],
	"jwoj": ["wai", "wai", "wai", "wai", "wai", "wai"],
	"wej": ["wei", "wei", "wei", "wei", "wei", "wei"],
	"je": ["i", "i", "i", "i", "i", "i"],
	"jie": ["i", "i", "i", "i", "i", "i"],
	"ij": ["i", "i", "i", "i", "i", "i"],
	"jij": ["i", "i", "i", "i", "i", "i"],
	"i": ["i", "i", "i", "i", "i", "i"],
	"j+j": ["i", "i", "i", "i", "i", "i"],
	"jwe": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"jwie": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"wij": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"jwij": ["wi", "wi", "ui", "ui", "wi", "wi"],
	"jw+j": ["wi", "wi", "wi", "wi", "wi", "wi"],
	"aw": ["au", "au", "au", "au", "au", "au"],
	"aew": ["au", "au", "au", "au", "au", "au"],
	"jew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"jiew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"ew": ["eu", "eu", "eu", "eu", "eu", "eu"],
	"uw": ["ou", "ou", "ou", "ou", "ou", "ou"],
	"juw": ["iu", "uu", "iu", "iu", "iu", "iu"],
	"jiw": ["iu", "iu", "iu", "iu", "iu", "iu"],
	"am": ["an", "an", "an", "an", "an", "an"],
	"om": ["an", "an", "an", "an", "an", "an"],
	"jom": ["an", "an", "an", "an", "an", "an"],
	"eam": ["an", "an", "an", "an", "an", "an"],
	"aem": ["an", "an", "an", "an", "an", "an"],
	"jem": ["en", "en", "en", "en", "en", "en"],
	"jiem": ["en", "en", "en", "en", "en", "en"],
	"em": ["en", "en", "en", "en", "en", "en"],
	"jaem": ["en", "en", "en", "en", "en", "en"],
	"im": ["in", "in", "in", "in", "in", "in"],
	"jim": ["in", "in", "in", "in", "in", "in"],
	"an": ["an", "an", "an", "an", "an", "an"],
	"aen": ["an", "an", "an", "an", "an", "an"],
	"ean": ["an", "an", "an", "an", "an", "an"],
	"jen": ["en", "en", "en", "en", "en", "en"],
	"jien": ["en", "en", "en", "en", "en", "en"],
	"en": ["en", "en", "en", "en", "en", "en"],
	"wan": ["an", "an", "an", "an", "wan", "wan"],
	"waen": ["an", "an", "an", "an", "wan", "wan"],
	"wean": ["an", "an", "an", "an", "wan", "wan"],
	"jon": ["an", "an", "an", "an", "en", "en"],
	"jwen": ["en", "en", "en", "en", "wen", "wen"],
	"jwien": ["en", "en", "en", "en", "wen", "wen"],
	"wen": ["en", "en", "en", "en", "wen", "wen"],
	"on": ["on", "on", "on", "on", "on", "on"],
	"won": ["on", "on", "on", "on", "on", "won"],
	"jwon": ["wen", "wen", "wen", "wen", "wen", "wen"],
	"in": ["in", "in", "in", "in", "in", "in"],
	"jin": ["in", "in", "in", "in", "in", "in"],
	"win": ["yun", "yun", "yun", "yun", "win", "win"],
	"jwin": ["in", "in", "in", "yun", "in", "in"],
	"j+n": ["in", "in", "in", "in", "in", "in"],
	"jun": ["un", "un", "un", "un", "un", "un"],
	"ang": ["aũ", "aũ", "aũ", "aũ", "aũ", "aũ"],
	"aeng": ["aũ", "aũ", "aũ", "aũ", "aũ", "aũ"],
	"eang": ["aũ", "aũ", "aũ", "aũ", "aũ", "aũ"],
	"aewng": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"ong": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"wong": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"wang": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"waeng": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"weang": ["waũ", "waũ", "waũ", "waũ", "waũ", "waũ"],
	"jang": ["yaũ", "aũ", "yaũ", "yaũ", "aũ", "yaũ"],
	"jwang": ["waũ", "waũ", "waũ", "waũ", "wyaũ", "waũ"],
	"ing": ["yoũ", "yoũ", "yoũ", "yoũ", "yoũ", "yoũ"],
	"jaeng": ["eĩ", "eĩ", "eĩ", "eĩ", "eĩ", "eĩ"],
	"jeng": ["eĩ", "eĩ", "eĩ", "eĩ", "eĩ", "eĩ"],
	"jieng": ["eĩ", "eĩ", "eĩ", "eĩ", "eĩ", "eĩ"],
	"eng": ["eĩ", "eĩ", "eĩ", "eĩ", "eĩ", "eĩ"],
	"jwaeng": ["weĩ", "weĩ", "weĩ", "weĩ", "weĩ", "weĩ"],
	"jweng": ["weĩ", "weĩ", "weĩ", "weĩ", "weĩ", "weĩ"],
	"jwieng": ["weĩ", "weĩ", "weĩ", "weĩ", "weĩ", "weĩ"],
	"weng": ["weĩ", "weĩ", "weĩ", "weĩ", "weĩ", "weĩ"],
	"uwng": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"owng": ["oũ", "oũ", "oũ", "oũ", "oũ", "oũ"],
	"juwng": ["yuũ", "oũ", "yuũ", "yuũ", "yuũ", "yuũ"],
	"jowng": ["yoũ", "oũ", "yoũ", "yoũ", "yoũ", "yoũ"],
	"ap": ["apu", "apu", "apu", "apu", "apu", "apu"],
	"op": ["apu", "apu", "apu", "apu", "apu", "apu"],
	"jop": ["apu", "apu", "apu", "apu", "apu", "apu"],
	"eap": ["apu", "apu", "apu", "apu", "apu", "apu"],
	"aep": ["apu", "apu", "apu", "apu", "apu", "apu"],
	"jep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"jiep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"ep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"jaep": ["epu", "epu", "epu", "epu", "epu", "epu"],
	"ip": ["ipu", "ipu", "ipu", "ipu", "ipu", "ipu"],
	"jip": ["ipu", "ipu", "ipu", "ipu", "ipu", "ipu"],
	"at": ["atu", "atu", "atu", "atu", "atu", "atu"],
	"aet": ["atu", "atu", "atu", "atu", "atu", "atu"],
	"eat": ["atu", "atu", "atu", "atu", "atu", "atu"],
	"jet": ["etu", "etu", "etu", "etu", "etu", "etu"],
	"jiet": ["etu", "etu", "etu", "etu", "etu", "etu"],
	"et": ["etu", "etu", "etu", "etu", "etu", "etu"],
	"wat": ["atu", "atu", "atu", "atu", "watu", "watu"],
	"waet": ["atu", "atu", "atu", "atu", "watu", "watu"],
	"weat": ["atu", "atu", "atu", "atu", "watu", "watu"],
	"jot": ["atu", "atu", "atu", "atu", "etu", "etu"],
	"jwet": ["etu", "etu", "etu", "etu", "wetu", "wetu"],
	"jwiet": ["etu", "etu", "etu", "etu", "wetu", "wetu"],
	"wet": ["etu", "etu", "etu", "etu", "wetu", "wetu"],
	"ot": ["otu", "otu", "otu", "otu", "otu", "otu"],
	"wot": ["otu", "otu", "otu", "otu", "otu", "otu"],
	"jwot": ["wetu", "wetu", "wetu", "wetu", "wetu", "wetu"],
	"it": ["itu", "itu", "itu", "itu", "itu", "itu"],
	"jit": ["itu", "itu", "itu", "itu", "itu", "itu"],
	"wit": ["itu", "itu", "yutu", "yutu", "witu", "witu"],
	"jwit": ["itu", "itu", "yutu", "yutu", "witu", "witu"],
	"j+t": ["itu", "itu", "itu", "itu", "itu", "itu"],
	"jut": ["utu", "utu", "utu", "utu", "utu", "utu"],
	"ak": ["aku", "aku", "aku", "aku", "aku", "aku"],
	"aek": ["aku", "aku", "aku", "aku", "aku", "aku"],
	"eak": ["aku", "aku", "aku", "aku", "aku", "aku"],
	"aewk": ["aku", "aku", "aku", "aku", "aku", "aku"],
	"ok": ["oku", "oku", "oku", "oku", "oku", "oku"],
	"wok": ["oku", "oku", "oku", "oku", "oku", "waku"],
	"wak": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"waek": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"weak": ["waku", "waku", "waku", "waku", "waku", "waku"],
	"jak": ["yaku", "aku", "yaku", "yaku", "yaku", "yaku"],
	"jwak": ["wyaku", "wyaku", "wyaku", "wyaku", "wyaku", "waku"],
	"ik": ["yoku", "yoku", "yoku", "yoku", "yoku", "yoku"],
	"jaek": ["eki", "eki", "eki", "eki", "eki", "eki"],
	"jek": ["eki", "eki", "eki", "eki", "eki", "eki"],
	"jiek": ["eki", "eki", "eki", "eki", "eki", "eki"],
	"ek": ["eki", "eki", "eki", "eki", "eki", "eki"],
	"jwaek": ["weki", "weki", "weki", "weki", "weki", "weki"],
	"jwek": ["weki", "weki", "weki", "weki", "weki", "weki"],
	"jwiek": ["weki", "weki", "weki", "weki", "weki", "weki"],
	"wek": ["weki", "weki", "weki", "weki", "weki", "weki"],
	"wik": ["wyoku", "wyoku", "wyoku", "wyoku", "wyoku", "wyoku"],
	"uwk": ["oku", "oku", "oku", "oku", "oku", "woku"],
	"owk": ["oku", "oku", "oku", "oku", "oku", "woku"],
	"juwk": ["iku", "uku", "iku", "yuku", "wiku", "wiku"],
	"jowk": ["yoku", "yoku", "yoku", "yoku", "yoku", "yoku"],
}

const koFinals = {
	"a": ["a", "a", "a", "a", "a", "a", "a", "a"],
	"ae": ["a", "a", "a", "a", "a", "a", "a", "a"],
	"wa": ["a", "a", "a", "a", "wa", "a", "a", "wa"],
	"wae": ["a", "a", "a", "a", "a", "a", "a", "wa"],
	"ja": ["a", "a", "a", "a", "a", "a", "a", "a"],
	"jae": ["a", "a", "a", "a", "a", "a", "a", "a"],
	"jwa": ["a", "a", "a", "a", "a", "a", "a", "wa"],
	"u": ["o", "o", "o", "o", "o", "o", "o", "o"],
	"jo": ["eo", "eo", "eo", "eo", "yeo", "eo", "o", "eo"],
	"ju": ["u", "u", "u", "yu", "wi", "yu", "u", "u"],
	"oj": ["ae", "ae", "ae", "ae", "ae", "ae", "ae", "ae"],
	"aj": ["ae", "ae", "ae", "ae", "ae", "ae", "ae", "ae"],
	"eaj": ["ae", "ae", "ae", "ae", "ae", "ae", "ae", "ae"],
	"ea": ["ae", "ae", "ae", "ae", "ae", "ae", "ae", "ae"],
	"aej": ["ae", "ae", "ae", "ae", "ae", "ae", "ae", "ae"],
	"woj": ["ae", "ae", "oe", "ae", "oe", "ae", "ae", "ae"],
	"waj": ["ae", "ae", "oe", "ae", "oe", "ae", "ae", "ae"],
	"weaj": ["wae", "wae", "wae", "wae", "wae", "wae", "wae", "wae"],
	"wea": ["wae", "wae", "wae", "wae", "wae", "wae", "wae", "wae"],
	"waej": ["wae", "wae", "wae", "wae", "wae", "wae", "wae", "wae"],
	"jej": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"jiej": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"ej": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"joj": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"jwej": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"jwiej": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"jwoj": ["ye", "ye", "ye", "ye", "ye", "ye", "ye", "ye"],
	"wej": ["yu", "yu", "yu", "yu", "yu", "yu", "yu", "yu"],
	"je": ["i", "i", "i", "i", "a", "i", "a", "i"],
	"jie": ["i", "i", "i", "i", "a", "i", "a", "i"],
	"ij": ["i", "i", "i", "i", "a", "i", "a", "i"],
	"jij": ["i", "i", "i", "i", "a", "i", "a", "i"],
	"i": ["i", "i", "i", "i", "i", "i", "i", "i"],
	"j+j": ["i", "i", "i", "i", "i", "i", "i", "i"],
	"jwe": ["u", "u", "u", "u", "u", "u", "oe", "yu"],
	"jwie": ["u", "u", "u", "u", "u", "u", "oe", "yu"],
	"wij": ["u", "u", "u", "u", "u", "u", "oe", "yu"],
	"jwij": ["u", "u", "u", "u", "u", "u", "oe", "yu"],
	"jw+j": ["i", "i", "i", "i", "i", "i", "i", "i"],
	"aw": ["o", "o", "o", "o", "o", "o", "o", "o"],
	"aew": ["yo", "yo", "yo", "yo", "yo", "yo", "yo", "yo"],
	"jew": ["yo", "yo", "yo", "yo", "yo", "yo", "yo", "yo"],
	"jiew": ["yo", "yo", "yo", "yo", "yo", "yo", "yo", "yo"],
	"ew": ["yo", "yo", "yo", "yo", "yo", "yo", "yo", "yo"],
	"uw": ["u", "u", "u", "u", "u", "u", "u", "u"],
	"juw": ["yu", "yu", "yu", "yu", "yu", "yu", "u", "u"],
	"jiw": ["u", "u", "u", "u", "u", "u", "u", "u"],
	"am": ["am", "am", "am", "am", "am", "am", "am", "am"],
	"om": ["am", "am", "am", "am", "am", "am", "am", "am"],
	"jom": ["am", "am", "am", "am", "am", "am", "am", "am"],
	"eam": ["eom", "eom", "eom", "eom", "eom", "eom", "eom", "eom"],
	"aem": ["am", "am", "am", "am", "am", "am", "am", "am"],
	"jem": ["yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom"],
	"jiem": ["yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom"],
	"em": ["yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom"],
	"jaem": ["yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom", "yeom"],
	"im": ["im", "um", "im", "im", "im", "im", "am", "eum"],
	"jim": ["im", "um", "im", "im", "im", "im", "am", "eum"],
	"an": ["an", "an", "an", "an", "an", "an", "an", "an"],
	"aen": ["an", "an", "an", "an", "an", "an", "an", "an"],
	"ean": ["an", "an", "an", "an", "an", "an", "an", "an"],
	"jen": ["yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon"],
	"jien": ["yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon"],
	"en": ["yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon"],
	"wan": ["an", "an", "an", "an", "an", "an", "an", "wan"],
	"waen": ["an", "an", "an", "an", "an", "an", "an", "wan"],
	"wean": ["an", "an", "an", "an", "an", "an", "an", "wan"],
	"jon": ["yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon", "yeon"],
	"jwen": ["yeon", "yeon", "yeon", "yeon", "eon", "yeon", "yeon", "won"],
	"jwien": ["yeon", "yeon", "yeon", "yeon", "eon", "yeon", "yeon", "won"],
	"wen": ["won", "won", "won", "won", "won", "won", "won", "won"],
	"on": ["yun", "yun", "yun", "yun", "yun", "yun", "yun", "yun"],
	"won": ["on", "on", "on", "on", "on", "on", "on", "on"],
	"jwon": ["eon", "eon", "eon", "eon", "eon", "eon", "eon", "won"],
	"in": ["eun", "eun", "eun", "eun", "eun", "eun", "eun", "eun"],
	"jin": ["in", "in", "in", "in", "in", "in", "in", "in"],
	"win": ["un", "un", "un", "un", "un", "un", "un", "un"],
	"jwin": ["un", "un", "un", "un", "un", "un", "un", "un"],
	"j+n": ["eun", "eun", "eun", "eun", "eun", "eun", "eun", "eun"],
	"jun": ["un", "un", "un", "un", "un", "un", "un", "yun"],
	"ang": ["ang", "ang", "ang", "ang", "ang", "ang", "ang", "ang"],
	"aeng": ["aeng", "aeng", "aeng", "aeng", "aeng", "aeng", "aeng", "aeng"],
	"eang": ["aeng", "aeng", "aeng", "aeng", "aeng", "aeng", "aeng", "aeng"],
	"aewng": ["ang", "ang", "ang", "ang", "ang", "ang", "ang", "ang"],
	"ong": ["eung", "ung", "eung", "eung", "eung", "eung", "eung", "eung"],
	"wong": ["oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng"],
	"wang": ["wang", "wang", "wang", "wang", "wang", "wang", "wang", "wang"],
	"waeng": ["oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng"],
	"weang": ["oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng"],
	"jang": ["yang", "yang", "yang", "yang", "yang", "yang", "ang", "yang"],
	"jwang": ["ang", "ang", "ang", "ang", "ang", "ang", "ang", "wang"],
	"ing": ["eung", "ing", "eung", "eung", "eung", "eung", "eung", "eung"],
	"jaeng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"jeng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"jieng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"eng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"jwaeng": ["oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng"],
	"jweng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"jwieng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"weng": ["yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong", "yeong"],
	"wing": ["oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng", "oeng"],
	"uwng": ["ong", "ong", "ong", "ong", "ong", "ong", "ong", "ong"],
	"owng": ["ong", "ong", "ong", "ong", "ong", "ong", "ong", "ong"],
	"juwng": ["yung", "yung", "yung", "yung", "yung", "yung", "yung", "yung"],
	"jowng": ["yung", "yung", "yung", "yung", "yung", "yung", "yung", "yung"],
	"ap": ["ap", "ap", "ap", "ap", "ap", "ap", "ap", "ap"],
	"op": ["ap", "ap", "ap", "ap", "ap", "ap", "ap", "ap"],
	"jop": ["eop", "eop", "eop", "eop", "eop", "eop", "eop", "eop"],
	"eap": ["eop", "eop", "eop", "eop", "eop", "eop", "eop", "eop"],
	"aep": ["ap", "ap", "ap", "ap", "ap", "ap", "ap", "ap"],
	"jep": ["yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop"],
	"jiep": ["yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop"],
	"ep": ["yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop"],
	"jaep": ["yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop", "yeop"],
	"ip": ["ip", "ip", "ip", "ip", "ip", "ip", "ip", "eup"],
	"jip": ["ip", "ip", "ip", "ip", "ip", "ip", "ip", "eup"],
	"at": ["al", "al", "al", "al", "al", "al", "al", "al"],
	"aet": ["al", "al", "al", "al", "al", "al", "al", "al"],
	"eat": ["al", "al", "al", "al", "al", "al", "al", "al"],
	"jet": ["yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol"],
	"jiet": ["yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol"],
	"et": ["yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol"],
	"wat": ["al", "al", "al", "al", "al", "al", "al", "wal"],
	"waet": ["al", "al", "al", "al", "al", "al", "al", "wal"],
	"weat": ["al", "al", "al", "al", "al", "al", "al", "wal"],
	"jot": ["yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol"],
	"jwet": ["yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "wol"],
	"jwiet": ["yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "yeol", "wol"],
	"wet": ["weol", "weol", "weol", "weol", "weol", "weol", "weol", "weol"],
	"ot": ["ol", "ol", "ol", "ol", "ol", "ol", "ol", "ol"],
	"wot": ["ol", "ol", "ol", "ol", "ol", "ol", "ol", "ol"],
	"jwot": ["eol", "eol", "eol", "eol", "eol", "eol", "eol", "wol"],
	"it": ["il", "il", "il", "il", "il", "il", "il", "il"],
	"jit": ["il", "il", "il", "il", "il", "il", "il", "il"],
	"wit": ["ul", "ul", "ul", "ul", "ul", "ul", "ul", "yul"],
	"jwit": ["ul", "ul", "ul", "ul", "ul", "ul", "ul", "ul"],
	"j+t": ["eul", "eul", "eul", "eul", "eul", "eul", "eul", "eul"],
	"jut": ["ul", "ul", "ul", "ul", "ul", "ul", "ul", "yul"],
	"ak": ["ak", "ak", "ak", "ak", "ak", "ak", "ak", "ak"],
	"aek": ["aek", "aek", "aek", "aek", "aek", "aek", "aek", "aek"],
	"eak": ["aek", "aek", "aek", "aek", "aek", "aek", "aek", "aek"],
	"aewk": ["ak", "ak", "ak", "ak", "ak", "ak", "ak", "ak"],
	"ok": ["euk", "uk", "euk", "euk", "euk", "euk", "euk", "euk"],
	"wok": ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok"],
	"wak": ["wak", "wak", "wak", "wak", "wak", "wak", "wak", "wak"],
	"waek": ["aek", "aek", "aek", "aek", "aek", "aek", "aek", "aek"],
	"weak": ["oek", "oek", "oek", "oek", "oek", "oek", "oek", "oek"],
	"jak": ["yak", "yak", "yak", "yak", "yak", "yak", "yak", "yak"],
	"jwak": ["yak", "yak", "yak", "yak", "yak", "yak", "yak", "yak"],
	"ik": ["ik", "ik", "ik", "ik", "ik", "ik", "ik", "euk"],
	"jaek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"jek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"jiek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"ek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"jwaek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"jwek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"jwiek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"wek": ["yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok", "yeok"],
	"wik": ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok"],
	"uwk": ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok"],
	"owk": ["ok", "ok", "ok", "ok", "ok", "ok", "ok", "ok"],
	"juwk": ["yuk", "ok", "yuk", "yuk", "yuk", "yuk", "yuk", "yuk"],
	"jowk": ["yuk", "ok", "yuk", "yuk", "yuk", "yuk", "yuk", "yuk"],
}

const goInitials = {
	"p": "h",
	"tr": "t",
	"dr": "d",
	"nr": "n",
	"l": "r",
	"ts": "s",
	"tsr": "s",
	"tsy": "s",
	"dz": "z",
	"dzr": "z",
	"dzy": "z",
	"ny": "n",
	"sr": "s",
	"sy": "s",
	"zy": "z",
	"ng": "g",
	"x": "k",
	"h": "g",
	"'": ""
}

const kanInitials = {
	"p": "h",
	"b": "h",
	"m": "b",
	"tr": "t",
	"d": "d",
	"dr": "t",
	"n": "d",
	"nr": "d",
	"l": "r",
	"ts": "s",
	"tsr": "s",
	"tsy": "s",
	"dz": "s",
	"dzr": "s",
	"dzy": "s",
	"nr": "z",
	"sr": "s",
	"sy": "s",
	"z": "s",
	"zy": "s",
	"g": "k",
	"ng": "g",
	"x": "k",
	"h": "k",
	"'": ""
}

const koInitials = {
	"p": "b", "ph": "p", "b": "b", "m": "m",
	"t": "d", "th": "t", "d": "d", "n": "n", "l": "r",
	"tr": "d", "trh": "t", "dr": "d", "nr": "n",
	"ts": "j", "tsh": "ch", "dz": "j", "s": "s", "z": "s",
	"tsr": "j", "tsrh": "ch", "dzr": "s", "sr": "s", "zr": "s",
	"tsy": "j", "tsyh": "ch", "dzy": "s", "sy": "s", "zy": "s", "ny": "X",
	"k": "g", "kh": "g", "g": "g", "ng": "X",
	"'": "X", "x": "h", "h": "h"
}

const P = ["p", "b", "m"];
const T = ["t", "d"];
const S = ["s", "z"];
const K = ["k", "g"];

function determineClass(consonant) {
	let i;
	switch (true) {
		case (P.includes(consonant)):
			i = 1;
			break;
		case (T.includes(consonant)):
			i = 2;
			break;
		case (S.includes(consonant)):
			i = 3;
			break;
		case (K.includes(consonant)):
			i = 4;
			break;
		case (consonant == ""):
			i = 5;
			break;
		default:
			i = 0;
	}
	return i;
}

function determineMCClass(consonant) {
	let i;
	switch (true) {
		case (["p", "ph", "b", "m"].includes(consonant)):
			i = 1;
			break;
		case (["t", "th", "d", "n", "l"].includes(consonant)):
			i = 2;
			break;
		case (["tr", "trh", "dr", "nr"].includes(consonant)):
			i = 3;
			break;
		case (["ts", "tsh", "dz", "s", "z"].includes(consonant)):
			i = 4;
			break;
		case (["tsr", "tsrh", "dzr", "sr", "zr"].includes(consonant)):
			i = 5;
			break;
		case (["tsy", "tsyh", "dzy", "ny", "sy", "zy", "y"].includes(consonant)):
			i = 6;
			break;
		case (["k", "kh", "g", "ng", "'", "x", "h"].includes(consonant)):
			i = 7;
			break;
		default:
			i = 0;
	}
	return i;
}

function go(init, fin) {
	init = init.replace(/^(.+)h$/, "$1");
	(Object.keys(goInitials).includes(init)) && (init = goInitials[init]);
	i = determineClass(init);
	fin = goFinals[fin][i];
	return [init, fin];
}

function kan(init, fin) {
	init = init.replace(/^(.+)h$/, "$1");
	(Object.keys(kanInitials).includes(init)) && (init = kanInitials[init]);
	if (fin.match("ng")) {
		if (init == "b") init = "m";
		if (init == "d") init = "n";
	}
	i = determineClass(init);
	fin = kanFinals[fin][i];
	return [init, fin];
}

function ko(init, fin) {
	i = determineMCClass(init);
	init = koInitials[init];
	fin = koFinals[fin][i];
	return [init, fin];
}

function beautifyBaxter(s) {
	return s.replaceAll("+", "ɨ").replaceAll("ae", "æ").replaceAll("ea", "ɛ");
}

let initSelect = document.querySelector("#initial");
let finSelect = document.querySelector("#final");
let convertButton = document.querySelector("#convert");
let goCell = document.querySelector("#result-go");
let kanCell = document.querySelector("#result-kan");
let koCell = document.querySelector("#result-ko");

convertButton.addEventListener("click", () => {
	let goOn = go(initSelect.value, finSelect.value).join("");
	goCell.innerHTML = formKana(kanaize(modernize(goOn), false), kanaize(goOn, false));
	let kanOn = kan(initSelect.value, finSelect.value).join("");
	kanCell.innerHTML = formKana(kanaize(modernize(kanOn), false), kanaize(kanOn, false));
	let eumdok = ko(initSelect.value, finSelect.value).join("");
	koCell.innerText = hangulize(eumdok);
})

function formKana(modern, old) {
	return `${modern} <sup>← ${old}</sup>`;
}

for (init of initials) {
	let o = document.createElement("option");
	o.value = o.text = init;
	initSelect.add(o);
}

for (fin of Object.keys(goFinals)) {
	let o = document.createElement("option");
	o.value = fin;
	o.text = beautifyBaxter(fin);
	finSelect.add(o);
}