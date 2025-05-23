import * as t from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from "next-auth/adapters"
import { UserTable } from './users';


export const accountsTable = t.pgTable(
    "account",
    {
      userId: t.uuid("userId")
        .notNull()
        .references(() => UserTable.id, { onDelete: "cascade" }),
      type: t.text("type").$type<AdapterAccountType>().notNull(),
      provider: t.text("provider").notNull(),
      providerAccountId: t.text("providerAccountId").notNull(),
      refresh_token: t.text("refresh_token"),
      access_token: t.text("access_token"),
      expires_at: t.integer("expires_at"),
      token_type: t.text("token_type"),
      scope: t.text("scope"),
      id_token: t.text("id_token"),
      session_state: t.text("session_state"),
    },
    (account) => [
      {
        compoundKey: t.primaryKey({
          columns: [account.provider, account.providerAccountId],
        }),
      },
    ]
  )