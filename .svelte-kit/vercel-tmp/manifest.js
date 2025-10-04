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
		client: {start:"_app/immutable/entry/start.BnNzJR7l.js",app:"_app/immutable/entry/app.DnBvK2dP.js",imports:["_app/immutable/entry/start.BnNzJR7l.js","_app/immutable/chunks/B5vrdIYq.js","_app/immutable/chunks/gB_4Sxzp.js","_app/immutable/chunks/CXNMLG1-.js","_app/immutable/chunks/BVBRj0ai.js","_app/immutable/entry/app.DnBvK2dP.js","_app/immutable/chunks/DCuf6nfq.js","_app/immutable/chunks/CXNMLG1-.js","_app/immutable/chunks/BVBRj0ai.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/gB_4Sxzp.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
			},
			{
				id: "/api/generate-pdf",
				pattern: /^\/api\/generate-pdf\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/generate-pdf/_server.ts.js'))
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
