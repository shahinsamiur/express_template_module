import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL_SUPABASE, {
  ssl: { rejectUnauthorized: false },
});

const testDBConnection = async () => {
  try {
    await sql`select 1`;
    console.log("✅ Database connected successfully (Supabase)");
  } catch (error) {
    console.error("❌ Database connection failed");
    console.log(process.env.DATABASE_URL);
    console.error(error.message);
    process.exit(1);
  }
};

export { sql, testDBConnection };
