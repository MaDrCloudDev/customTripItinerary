export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.B9mquKs3.js",app:"_app/immutable/entry/app.Dp3a-9uB.js",imports:["_app/immutable/entry/start.B9mquKs3.js","_app/immutable/chunks/C4BicxbQ.js","_app/immutable/chunks/w7k2o7ad.js","_app/immutable/chunks/DWW9Et8p.js","_app/immutable/chunks/YMEhMpS5.js","_app/immutable/entry/app.Dp3a-9uB.js","_app/immutable/chunks/DWW9Et8p.js","_app/immutable/chunks/YMEhMpS5.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/w7k2o7ad.js","_app/immutable/chunks/Dyn_yrbk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
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

export const prerendered = new Set([]);

export const base_path = "";
