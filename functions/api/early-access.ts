type Env = {
  DB?: D1Database;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
    const email = String(data?.email || "").slice(0, 200);
    const company = String(data?.company || "").slice(0, 200);
    const role = String(data?.role || "").slice(0, 200);

    if (!email || !company || !role) {
      return Response.json({ error: "email, company, and role required" }, { status: 400 });
    }

    if (env.DB) {
      await env.DB.exec(`CREATE TABLE IF NOT EXISTS early_access (
        id TEXT PRIMARY KEY,
        createdAt TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT NOT NULL,
        role TEXT NOT NULL
      );`);
      await env.DB.prepare("INSERT INTO early_access (id, createdAt, email, company, role) VALUES (?, ?, ?, ?, ?)")
        .bind(crypto.randomUUID(), new Date().toISOString(), email, company, role)
        .run();
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }
};
