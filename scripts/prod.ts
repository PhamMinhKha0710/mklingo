
import "dotenv/config";
import { execSync } from "child_process";

// DATABASE_URL hoặc NEON_DATABASE_URL (Neon + Vercel thường dùng NEON_*)
const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
const isCI = process.env.CI === "true";

const main = async () => {
  console.log("🚀 Production deployment script\n");

  // 1. Validate environment - phải load env trước khi chạy (như tutorial)
  if (!dbUrl) {
    console.error("❌ Missing DATABASE_URL or NEON_DATABASE_URL");
    console.error("   Thêm vào .env hoặc .env.production");
    process.exit(1);
  }
  if (!dbUrl.includes("localhost") && !isCI) {
    const isProd = dbUrl.includes("neon.tech") || dbUrl.includes("supabase") || dbUrl.includes(".com");
    if (isProd) {
      console.log("⚠️  WARNING: You are about to modify PRODUCTION database");
      console.log("   Database:", dbUrl.replace(/:[^:@]+@/, ":****@"));
      console.log("   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n");
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  try {
    // 2. Push schema (migrations)
    console.log("📦 Pushing schema to database...");
    execSync("npx drizzle-kit push", {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: dbUrl },
    });
    console.log("✅ Schema pushed\n");

    // 3. Run seed
    console.log("🌱 Seeding database...");
    execSync("npx tsx ./scripts/seed.ts", {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: dbUrl },
    });
    console.log("✅ Seed completed\n");

    console.log("🎉 Production deployment finished!");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }

  process.exit(0);
};

main();
