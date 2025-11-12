import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { OpenAI } from "openai";

// https://vite.dev/config/
const aiSseMiddleware = (): Plugin => ({
    name: "ai-sse-middleware",
    configureServer(server) {
        server.middlewares.use("/api/completions", async (req, res) => {
            try {
                const url = new URL(req.url || "", "http://localhost");
                const intent = url.searchParams.get("intent") || "";
                const selectedText = url.searchParams.get("text") || "";
                const userPrompt = url.searchParams.get("prompt") || "";

                // Debug logging
                console.log("[AI] /api/completions request", {
                    intent,
                    selectedTextChars: selectedText?.length ?? 0,
                    hasUserPrompt: Boolean(userPrompt),
                });

                res.writeHead(200, {
                    "Content-Type": "text/event-stream",
                    Connection: "keep-alive",
                    "Cache-Control": "no-cache, no-transform",
                    "Access-Control-Allow-Origin": "*",
                });

                const systemPrompts: Record<string, string> = {
                    grammar:
                        "Fix grammar: Address any grammatical errors in the selected text without changing the meaning.",
                    shorten:
                        "Shorten text: Remove any unnecessary text from the selected text and make it more concise.",
                    rewrite:
                        "Rewrite text: Rewrite the selected text based on the user input.",
                };

                let systemPrompt = `
You are an expert AI assistant specializing in content generation and improvement. Your task is to enhance or modify text based on specific instructions.
Guidelines:
1) Always respond in the same language as the input.
2) Understand the user's instruction or prompt first.
3) Reply as plain text (use \\n for new lines). Do not include titles or headings. Start directly with the result text.
`;
                if (selectedText) {
                    systemPrompt += `
Here is the original user-selected text to modify:
${selectedText}
`;
                }

                systemPrompt += `
Important note: Generated text should respect freedom of speech and can include critique of companies or people.
`;

                const promptToUse =
                    userPrompt ||
                    systemPrompts[intent] ||
                    "Rewrite the selected text.";

                const apiKey = process.env.OPENAI_API_KEY;
                if (!apiKey) {
                    console.error("[AI] Missing OPENAI_API_KEY");
                    res.statusCode = 500;
                    res.end("Missing OPENAI_API_KEY");
                    return;
                }
                const client = new OpenAI({ apiKey });

                const stream = await client.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: promptToUse },
                    ],
                    stream: true,
                });

                // Signal start to client for easier debugging
                res.write(`data: __START__\n\n`);

                (async () => {
                    try {
                        for await (const chunk of stream) {
                            const data =
                                chunk.choices?.[0]?.delta?.content ?? "";
                            if (data) {
                                res.write(`data: ${data}\n\n`);
                            }
                        }
                        res.write(`data: [DONE]\n\n`);
                    } catch (err: unknown) {
                        const msg =
                            err instanceof Error ? err.message : String(err);
                        console.error("[AI] Stream error", msg);
                        res.write(`data: __ERROR__:${msg}\n\n`);
                    } finally {
                        res.end();
                    }
                })();
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                console.error("[AI] Handler error", msg);
                res.statusCode = 500;
                res.end("Server error");
            }
        });
    },
});

export default defineConfig(({ mode }) => {
    // Ensure .env variables are loaded for dev server middleware
    const env = loadEnv(mode, process.cwd(), "");
    if (env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
        process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;
    }
    return {
        plugins: [react(), aiSseMiddleware()],
        resolve: {
            alias: {
                "@": "/src",
            },
        },
    };
});
