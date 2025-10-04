

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.2h1YrOD-.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CHxu8AZh.js","_app/immutable/chunks/BAqvAkuI.js"];
export const stylesheets = ["_app/immutable/assets/0.CoOnU0Zq.css"];
export const fonts = [];
