import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "../../../../../server"; // Replace "@/server" with the correct path to the appRouter module

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({}),
    });

export { handler as GET, handler as POST };