# KES HUB Admin Architecture

## Purpose
- Replace the current static/admin-lite approach with a secure, server-authorized admin surface.
- Keep the existing product model as the base and extend it with structured gadget fields.
- Make routine catalog and content changes possible without code edits.

## Core principles
- Single role model only: `USER` and `ADMIN`.
- Server-side authorization on every admin page and API route.
- Clerk remains the only auth system.
- Prisma remains the source of truth for business data.
- Admin actions are auditable.

## Build order
1. Brand and layout refresh
2. Role model and admin gating
3. Product CRUD expansion
4. Category / brand taxonomy management
5. Promotions and campaigns
6. Orders, refunds, returns
7. Customer and store management
8. Content management
9. Reports and audit log
10. Swap / trade-in tooling

## Admin domains
- Products
- Promotions
- Swap Requests
- Orders
- Customers
- Stores
- Content
- Reports & Analytics
- Security
- Settings

## Data approach
- Extend the existing product model instead of introducing a parallel entity.
- Add dedicated models for campaigns, audit logs, admin accounts, and swap/trade-in flows.
- Keep destructive operations behind soft-delete or recycle-bin behavior where possible.

## Security approach
- Every admin route checks `role === "ADMIN"` on the server.
- Add rate limiting for admin auth flows.
- Log failed attempts and privileged changes.
- Keep Clerk as the only credential store.

## UI approach
- Shared admin layout and navigation.
- Forms backed by API routes, not direct client state mutation.
- Bulk operations and CSV tools on listing screens.
- Reusable table/actions components for CRUD-heavy screens.

## Production criteria
- No hardcoded brand text left behind.
- No client-only admin protection.
- Catalog, campaign, and content changes can be done from the admin UI.
- Audit trail covers every privileged action.
