/**
 * Manual sync script to sync Clerk organization roles to database
 * This script is for one-time use to sync current invited users
 *
 * Usage: node scripts/sync-clerk-roles.mjs
 */

import { prisma } from "../lib/prisma.js";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function syncRoles() {
  console.log("Starting Clerk role sync...");

  try {
    // Get all users from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    console.log(`Found ${users.length} users in database`);

    let updatedCount = 0;

    for (const user of users) {
      try {
        // Get user from Clerk to check organization memberships
        const clerkUser = await clerk.users.getUser(user.id);

        if (clerkUser && clerkUser.organizationMemberships) {
          // Check if user has admin or owner role in any organization
          const hasAdminRole = clerkUser.organizationMemberships.some(
            (membership) =>
              membership.role === "org:admin" ||
              membership.role === "org:owner",
          );

          const newRole = hasAdminRole ? "ADMIN" : "BUYER";

          // Update role if different
          if (user.role !== newRole) {
            await prisma.user.update({
              where: { id: user.id },
              data: { role: newRole },
            });

            console.log(`✓ Updated ${user.email}: ${user.role} -> ${newRole}`);
            updatedCount++;
          } else {
            console.log(`- No change needed for ${user.email} (${user.role})`);
          }
        } else {
          console.log(`- No organization memberships for ${user.email}`);
        }
      } catch (error) {
        console.error(`✗ Error processing ${user.email}:`, error.message);
      }
    }

    console.log(`\nSync complete. Updated ${updatedCount} users.`);
  } catch (error) {
    console.error("Sync failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

syncRoles();
