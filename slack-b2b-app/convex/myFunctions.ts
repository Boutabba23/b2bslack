import { query, mutation } from "./_generated/server";

export const ping = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return { status: "ok", user: identity?.name ?? null };
  },
});

export const placeholder = mutation({
  args: {},
  handler: async () => {
    return true;
  },
});
