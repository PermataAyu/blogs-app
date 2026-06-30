import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  apiToken: text("api_token"),
  passwordHash: text("password_hash").notNull().default("")
})

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").references(() => users.id)
})

export const userRelations = relations(users, ({many}) => ({
  blogs: many(blogs)
}))

export const blogRelations = relations(blogs, ({one}) => ({
  users: one(users, {
    fields: [blogs.userId],
    references: [users.id]
  })
}))