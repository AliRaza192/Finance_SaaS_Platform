// import { Hono, MiddlewareHandler } from "hono";
// import { db } from "@/db/drizzle";
// import { accounts, insertAccountSchema } from "@/db/schema";
// import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// import { createId } from "@paralleldrive/cuid2";
// import { eq, and, inArray } from "drizzle-orm";
// import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";

// const app = new Hono()
//   .get("/", clerkMiddleware(), async (c) => {
//     const auth = getAuth(c);
//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const data = await db
//       .select({
//         id: accounts.id,
//         name: accounts.name,
//       })
//       .from(accounts)
//       .where(eq(accounts.userId, auth.userId));

//     return c.json({ data });
//   })

//   .post(
//     "/",
//     clerkMiddleware(),
//     zValidator(
//       "json",
//       insertAccountSchema.pick({
//         name: true,
//       })
//     ),
//     async (c) => {
//       const auth = getAuth(c);
//       const values = c.req.valid("json");

//       if (!auth?.userId) {
//         return c.json({ error: "Unauthorized" }, 401);
//       }

//       const [data] = await db
//         .insert(accounts)
//         .values({
//           id: createId(),
//           userId: auth.userId,
//           ...values,
//         })
//         .returning();

//       return c.json({ data });
//     }
//   );

//   .post(
//     "bulk-delete",
//     clerkMiddleware(),
//     zValidator(
//       "json",
//       z.object({
//         ids: z.array(z.string()),
//       }),
//     ),

//     async (c) => {
//       const auth = getAuth(c),
//       const values = c.req.valid("json");

//       if(!auth?.userId) {
//         return c.json({error: "Unauthorized"}, 401);
//       }

//       const data = await db
//       .delete(accounts)
//       .where(
//         and(
//           eq(accounts.userId, auth.userId),
//           inArray(accounts.id, values.ids)
//         )
//       )

//       .returning({
//         id: accounts.id,
//       })

//       return c.json({data})


//     }
//   )

// export default app;
// function post(arg0: string, arg1: MiddlewareHandler, arg2: MiddlewareHandler<import("hono").Env, string, { in: { json: { ids: string[]; }; }; out: { json: { ids: string[]; }; }; }>, arg3: (c: any) => Promise<any>) {
//   throw new Error("Function not implemented.");
// }

import { Hono, MiddlewareHandler } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";
import { eq, and, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({ data });
  })

  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    }
  )
  
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        });

      return c.json({ data });
    }
  );

export default app;









