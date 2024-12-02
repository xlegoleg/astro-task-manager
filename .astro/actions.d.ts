declare module "astro:actions" {
	type Actions = typeof import("/Users/olegkurganov/Desktop/dev/my/astro-task-manager/src/actions")["server"];

	export const actions: Actions;

	export { defineAction } from 'astro/dist/actions/runtime/virtual/server'
}