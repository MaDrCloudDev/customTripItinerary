export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","itinerary-cross-reference.txt","itinerary.pdf","itinerary.txt","page-1-text.txt","page-1.png","page-2-text.txt","page-2.png","page-3-text.txt","page-3.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".pdf":"application/pdf"},
	_: {
		client: {start:"_app/immutable/entry/start.D2l50_b9.js",app:"_app/immutable/entry/app.gaOGN4h1.js",imports:["_app/immutable/entry/start.D2l50_b9.js","_app/immutable/chunks/jTZTk8zg.js","_app/immutable/chunks/Bt2j_Q_7.js","_app/immutable/chunks/CCUIAySP.js","_app/immutable/entry/app.gaOGN4h1.js","_app/immutable/chunks/CCUIAySP.js","_app/immutable/chunks/Bt2j_Q_7.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/669sLwSO.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
