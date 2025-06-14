import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Time Agent",
		description: "An agent that provides the current time for a given timezone.",
		version: "1.0.0",
	});

	async init() {
		// Tool: getTime - Query the local time for a given timezone
		this.server.tool(
			"getTime",
			{ timezone: z.string() },
			async ({ timezone }) => {
				try {
					// Use Intl.DateTimeFormat to get the local time for the specified timezone
					const now = new Date();
					const formatter = new Intl.DateTimeFormat("en-US", {
						timeZone: timezone,
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: false,
					});
					const formatted = formatter.format(now);
					return {
						content: [
							{ type: "text", text: `Current time in ${timezone}: ${formatted}` },
						],
					};
				} catch (e) {
					return {
						content: [
							{ type: "text", text: `Invalid timezone: ${timezone}` },
						],
					};
				}
			}
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
