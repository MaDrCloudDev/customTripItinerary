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
		client: {start:"_app/immutable/entry/start.BhVaneir.js",app:"_app/immutable/entry/app.lG0U_APF.js",imports:["_app/immutable/entry/start.BhVaneir.js","_app/immutable/chunks/BcYMhb6F.js","_app/immutable/chunks/cH0zU-dw.js","_app/immutable/chunks/BAqvAkuI.js","_app/immutable/chunks/CF1XqHbx.js","_app/immutable/entry/app.lG0U_APF.js","_app/immutable/chunks/BAqvAkuI.js","_app/immutable/chunks/CF1XqHbx.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/cH0zU-dw.js","_app/immutable/chunks/DIrnttrA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
			},
			{
				id: "/api/generate-pdf",
				pattern: /^\/api\/generate-pdf\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/generate-pdf/_server.ts.js'))
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
