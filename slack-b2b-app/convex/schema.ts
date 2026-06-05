import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  teams: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    creatorId: v.optional(v.id("users")),
  })
    .index("by_creator", ["creatorId"])
    .searchIndex("search_name", {
      searchField: "name",
    }),
  
  channels: defineTable({
    teamId: v.id("teams"),
    name: v.string(),
    type: v.union(v.literal("public"), v.literal("private")),
    description: v.optional(v.string()),
    createdAt: v.number(),
    creatorId: v.optional(v.id("users")),
  })
    .index("by_team", ["teamId"])
    .index("by_name", ["teamId", "name"]),
  
  users: defineTable({
    username: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    createdAt: v.number(),
    teamId: v.optional(v.id("teams")),
    role: v.optional(v.union(v.literal("owner"), v.literal("admin"), v.literal("member"))),
  })
    .index("by_email", ["email"])
    .searchIndex("search_username", {
      searchField: "username",
    }),
  
  messages: defineTable({
    channelId: v.id("channels"),
    teamId: v.id("teams"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
    mentions: v.optional(v.array(v.id("users"))),
    reactions: v.optional(v.array(v.object({
      userId: v.id("users"),
      emoji: v.string(),
      createdAt: v.number(),
    }))),
  })
    .index("by_channel", ["channelId"])
    .index("by_channel_time", ["channelId", "createdAt"])
    .index("by_team", ["teamId"]),
  
  inviteTokens: defineTable({
    token: v.string(),
    teamId: v.id("teams"),
    expiresAt: v.number(),
    createdBy: v.id("users"),
  })
    .index("by_token", ["token"])
    .index("by_team", ["teamId"])
    .index("by_expires", ["expiresAt"]),
});
