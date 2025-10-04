export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Cc9b1QR2.js",app:"_app/immutable/entry/app.jugeelcA.js",imports:["_app/immutable/entry/start.Cc9b1QR2.js","_app/immutable/chunks/i2Frs4pt.js","_app/immutable/chunks/gB_4Sxzp.js","_app/immutable/chunks/CXNMLG1-.js","_app/immutable/chunks/BVBRj0ai.js","_app/immutable/entry/app.jugeelcA.js","_app/immutable/chunks/DCuf6nfq.js","_app/immutable/chunks/CXNMLG1-.js","_app/immutable/chunks/BVBRj0ai.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/gB_4Sxzp.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
