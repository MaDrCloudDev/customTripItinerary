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
		client: {start:"_app/immutable/entry/start.1Owf3p-N.js",app:"_app/immutable/entry/app.BuMfqJKs.js",imports:["_app/immutable/entry/start.1Owf3p-N.js","_app/immutable/chunks/CppSiTyb.js","_app/immutable/chunks/cH0zU-dw.js","_app/immutable/chunks/BAqvAkuI.js","_app/immutable/chunks/CF1XqHbx.js","_app/immutable/entry/app.BuMfqJKs.js","_app/immutable/chunks/BAqvAkuI.js","_app/immutable/chunks/CF1XqHbx.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/cH0zU-dw.js","_app/immutable/chunks/DIrnttrA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
