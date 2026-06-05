import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

async function getOrCreateUser(ctx: any, identity: any) {
  const existingUser = await ctx.db
    .query("users")
    .withIndex("by_email", (q: any) => q.eq("email", identity.email))
    .first();

  if (existingUser) {
    return existingUser;
  }

  const userId = await ctx.db.insert("users", {
    username: (identity.givenName ? identity.givenName + " " : "") + (identity.familyName || identity.name || "User"),
    email: identity.email,
    image: identity.pictureUrl,
    createdAt: Date.now(),
  });

  return await ctx.db.get(userId);
}

export const createTeam = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await getOrCreateUser(ctx, identity);

    const teamId = await ctx.db.insert("teams", {
      name: args.name,
      description: args.description,
      createdAt: Date.now(),
      creatorId: user._id,
    });

    await ctx.db.patch(user._id, { teamId, role: "owner" });

    return teamId;
  },
});

export const getTeams = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!user) {
      return [];
    }

    const teams = await ctx.db
      .query("teams")
      .withIndex("by_creator", (q) => q.eq("creatorId", user._id))
      .collect();

    return teams;
  },
});

export const searchTeams = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teams")
      .withSearchIndex("search_name", (q) =>
        q.search("name", args.query)
      )
      .collect();
  },
});

export const createChannel = mutation({
  args: {
    teamId: v.id("teams"),
    name: v.string(),
    type: v.union(v.literal("public"), v.literal("private")),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await getOrCreateUser(ctx, identity);

    await ctx.db.insert("channels", {
      teamId: args.teamId,
      name: args.name,
      type: args.type,
      description: args.description,
      createdAt: Date.now(),
      creatorId: user._id,
    });

    return true;
  },
});

export const getChannels = query({
  args: { teamId: v.id("teams") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("channels")
      .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
      .collect();
  },
});

export const getChannel = query({
  args: { id: v.id("channels") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const sendMessage = mutation({
  args: {
    channelId: v.id("channels"),
    content: v.string(),
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await getOrCreateUser(ctx, identity);

    await ctx.db.insert("messages", {
      channelId: args.channelId,
      teamId: args.teamId,
      userId: user._id,
      content: args.content,
      createdAt: Date.now(),
    });

    return true;
  },
});

export const getMessages = query({
  args: {
    channelId: v.id("channels"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel_time", (q) =>
        q.eq("channelId", args.channelId)
      )
      .take(limit);

    return messages.reverse();
  },
});

export const getMessagesByTeam = query({
  args: { teamId: v.id("teams"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 100;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
      .take(limit);

    return messages.reverse();
  },
});

export const createInviteToken = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await getOrCreateUser(ctx, identity);

    const token = Math.random().toString(36).substring(2) + Date.now();

    await ctx.db.insert("inviteTokens", {
      token,
      teamId: args.teamId,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      createdBy: user._id,
    });

    return token;
  },
});

export const getInviteUrl = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const inviteToken = await ctx.db
      .query("inviteTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!inviteToken || inviteToken.expiresAt < Date.now()) {
      return null;
    }

    const team = await ctx.db.get(inviteToken.teamId);
    const channel = await ctx.db
      .query("channels")
      .withIndex("by_team", (q) => q.eq("teamId", inviteToken.teamId))
      .first();

    if (!channel) {
      return null;
    }

    return {
      teamId: inviteToken.teamId,
      channelId: channel._id,
      teamName: team?.name,
      channelName: channel.name,
    };
  },
});

export const getTeam = query({
  args: { id: v.id("teams") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) {
      return null;
    }

    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
  },
});

export const getTeamMembers = query({
  args: { teamId: v.id("teams") },
  handler: async (ctx, args) => {
    const allUsers = await ctx.db.query("users").collect();
    return allUsers.filter((m: any) => m.teamId === args.teamId);
  },
});
