import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users';
import { ProductTable } from './products';

export const UserToProductTable = t.pgTable('users_to_products', {
  userId: t
    .uuid('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  productId: t
    .uuid('product_id')
    .notNull()
    .references(() => ProductTable.id, { onDelete: 'cascade' }),
},table => [t.primaryKey({columns:[table.userId,table.productId]})]);

export const UserToProductRelations = relations(UserToProductTable, ({ one }) => ({
  user: one(UserTable, { references: [UserTable.id], fields: [UserToProductTable.userId] }),
  product: one(ProductTable, { references: [ProductTable.id], fields: [UserToProductTable.productId] }),
}));
