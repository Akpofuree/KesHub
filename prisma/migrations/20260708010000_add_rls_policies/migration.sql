-- Enable RLS on user-owned and session-owned tables
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WishlistItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Address" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Rating" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Store" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Cart" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CartItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductHistory" ENABLE ROW LEVEL SECURITY;

-- Helper expression used in policies:
-- admins are users whose Clerk userId maps to a row in "User" with role = 'ADMIN'

-- Order
CREATE POLICY order_select_own ON "Order"
FOR SELECT
USING ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY order_select_store ON "Order"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "OrderItem"
    INNER JOIN "Product" ON "Product"."id" = "OrderItem"."productId"
    WHERE "OrderItem"."orderId" = "Order"."id"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY order_select_admin ON "Order"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY order_insert_own ON "Order"
FOR INSERT
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY order_update_own ON "Order"
FOR UPDATE
USING ("userId" = current_setting('app.current_user_id', true))
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY order_update_store ON "Order"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "OrderItem"
    INNER JOIN "Product" ON "Product"."id" = "OrderItem"."productId"
    WHERE "OrderItem"."orderId" = "Order"."id"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "OrderItem"
    INNER JOIN "Product" ON "Product"."id" = "OrderItem"."productId"
    WHERE "OrderItem"."orderId" = "Order"."id"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY order_update_admin ON "Order"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY order_delete_own ON "Order"
FOR DELETE
USING ("userId" = current_setting('app.current_user_id', true));

-- OrderItem
CREATE POLICY orderitem_select_own ON "OrderItem"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "Order"
    WHERE "Order"."id" = "OrderItem"."orderId"
      AND "Order"."userId" = current_setting('app.current_user_id', true)
  )
);

CREATE POLICY orderitem_select_store ON "OrderItem"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "OrderItem"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY orderitem_select_admin ON "OrderItem"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY orderitem_insert_own ON "OrderItem"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Order"
    WHERE "Order"."id" = "OrderItem"."orderId"
      AND "Order"."userId" = current_setting('app.current_user_id', true)
  )
);

CREATE POLICY orderitem_insert_store ON "OrderItem"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "OrderItem"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY orderitem_insert_admin ON "OrderItem"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY orderitem_update_own ON "OrderItem"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "Order"
    WHERE "Order"."id" = "OrderItem"."orderId"
      AND "Order"."userId" = current_setting('app.current_user_id', true)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Order"
    WHERE "Order"."id" = "OrderItem"."orderId"
      AND "Order"."userId" = current_setting('app.current_user_id', true)
  )
);

CREATE POLICY orderitem_update_store ON "OrderItem"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "OrderItem"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "OrderItem"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY orderitem_update_admin ON "OrderItem"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY orderitem_delete_own ON "OrderItem"
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM "Order"
    WHERE "Order"."id" = "OrderItem"."orderId"
      AND "Order"."userId" = current_setting('app.current_user_id', true)
  )
);

CREATE POLICY orderitem_delete_store ON "OrderItem"
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "OrderItem"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY orderitem_delete_admin ON "OrderItem"
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

-- WishlistItem
CREATE POLICY wishlist_select_own ON "WishlistItem"
FOR SELECT
USING ("sessionId" = current_setting('app.current_session_id', true));

CREATE POLICY wishlist_insert_own ON "WishlistItem"
FOR INSERT
WITH CHECK ("sessionId" = current_setting('app.current_session_id', true));

CREATE POLICY wishlist_update_own ON "WishlistItem"
FOR UPDATE
USING ("sessionId" = current_setting('app.current_session_id', true))
WITH CHECK ("sessionId" = current_setting('app.current_session_id', true));

CREATE POLICY wishlist_delete_own ON "WishlistItem"
FOR DELETE
USING ("sessionId" = current_setting('app.current_session_id', true));

-- Address
CREATE POLICY address_select_own ON "Address"
FOR SELECT
USING ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY address_insert_own ON "Address"
FOR INSERT
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY address_update_own ON "Address"
FOR UPDATE
USING ("userId" = current_setting('app.current_user_id', true))
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY address_delete_own ON "Address"
FOR DELETE
USING ("userId" = current_setting('app.current_user_id', true));

-- Rating
CREATE POLICY rating_select_own ON "Rating"
FOR SELECT
USING ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY rating_select_store ON "Rating"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "Rating"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY rating_select_admin ON "Rating"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY rating_insert_own ON "Rating"
FOR INSERT
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY rating_update_own ON "Rating"
FOR UPDATE
USING ("userId" = current_setting('app.current_user_id', true))
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY rating_update_store ON "Rating"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "Rating"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "Rating"."productId"
      AND "Product"."storeId" = current_setting('app.current_store_id', true)
  )
);

CREATE POLICY rating_update_admin ON "Rating"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY rating_delete_own ON "Rating"
FOR DELETE
USING ("userId" = current_setting('app.current_user_id', true));

-- Store
CREATE POLICY store_select_own ON "Store"
FOR SELECT
USING ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY store_select_public ON "Store"
FOR SELECT
USING ("status" = 'approved' AND "isActive" = true);

CREATE POLICY store_select_own_store ON "Store"
FOR SELECT
USING ("id" = current_setting('app.current_store_id', true));

CREATE POLICY store_select_admin ON "Store"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY store_insert_own ON "Store"
FOR INSERT
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY store_update_own ON "Store"
FOR UPDATE
USING ("userId" = current_setting('app.current_user_id', true))
WITH CHECK ("userId" = current_setting('app.current_user_id', true));

CREATE POLICY store_update_admin ON "Store"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User"."id" = current_setting('app.current_user_id', true)
      AND "User"."role" = 'ADMIN'
  )
);

CREATE POLICY store_delete_own ON "Store"
FOR DELETE
USING ("userId" = current_setting('app.current_user_id', true));

-- Cart
CREATE POLICY cart_select_own ON "Cart"
FOR SELECT
USING ("sessionId" = current_setting('app.current_session_id', true));

CREATE POLICY cart_insert_own ON "Cart"
FOR INSERT
WITH CHECK ("sessionId" = current_setting('app.current_session_id', true));

CREATE POLICY cart_update_own ON "Cart"
FOR UPDATE
USING ("sessionId" = current_setting('app.current_session_id', true))
WITH CHECK ("sessionId" = current_setting('app.current_session_id', true));

CREATE POLICY cart_delete_own ON "Cart"
FOR DELETE
USING ("sessionId" = current_setting('app.current_session_id', true));

-- CartItem
CREATE POLICY cartitem_select_own ON "CartItem"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "Cart"
    WHERE "Cart"."id" = "CartItem"."cartId"
      AND "Cart"."sessionId" = current_setting('app.current_session_id', true)
  )
);

CREATE POLICY cartitem_insert_own ON "CartItem"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Cart"
    WHERE "Cart"."id" = "CartItem"."cartId"
      AND "Cart"."sessionId" = current_setting('app.current_session_id', true)
  )
);

CREATE POLICY cartitem_update_own ON "CartItem"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM "Cart"
    WHERE "Cart"."id" = "CartItem"."cartId"
      AND "Cart"."sessionId" = current_setting('app.current_session_id', true)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM "Cart"
    WHERE "Cart"."id" = "CartItem"."cartId"
      AND "Cart"."sessionId" = current_setting('app.current_session_id', true)
  )
);

CREATE POLICY cartitem_delete_own ON "CartItem"
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM "Cart"
    WHERE "Cart"."id" = "CartItem"."cartId"
      AND "Cart"."sessionId" = current_setting('app.current_session_id', true)
  )
);

-- ProductHistory
CREATE POLICY producthistory_select_own ON "ProductHistory"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM "Product"
    WHERE "Product"."id" = "ProductHistory"."productId"
  )
);
