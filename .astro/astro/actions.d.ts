declare module "astro:actions" {
	type Actions = typeof import("/Users/olegkurganov/Desktop/dev/my/astro-task-manager/src/actions")["server"];

	export const actions: Actions;
}