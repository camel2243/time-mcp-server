# Building a Remote MCP Server on Cloudflare (Without Auth)

This example allows you to deploy a remote MCP server that provides the current time for any given timezone, without requiring authentication, on Cloudflare Workers.

## Get started:

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless)

This will deploy your MCP server to a URL like: `https://time.mcp.camel.dev/sse`

Alternatively, you can use the command line below to get the remote MCP Server created on your local machine:

```bash
npm create cloudflare@latest -- my-mcp-server --template=cloudflare/ai/demos/remote-mcp-authless
```

## MCP Tool: Query Time by Timezone

This MCP server provides a single tool:

### `getTime`

- **Description:** Returns the current time for a given IANA timezone string (e.g., `Asia/Taipei`, `America/New_York`).
- **Parameters:**
  - `timezone` (string): The IANA timezone identifier.
- **Response:**
  - `Current time in <timezone>: <formatted time>`

#### Example Usage

```json
{
  "tool": "getTime",
  "input": { "timezone": "Asia/Taipei" }
}
```

**Response:**

```
Current time in Asia/Taipei: 2025/06/14, 21:30:12
```

## Connect to Cloudflare AI Playground

You can connect to your MCP server from the Cloudflare AI Playground, which is a remote MCP client:

1. Go to https://playground.ai.cloudflare.com/
2. Enter your deployed MCP server URL (`https://time.mcp.camel.dev/sse`)
3. You can now use your MCP tools directly from the playground!

## Connect Claude Desktop to your MCP server

You can also connect to your remote MCP server from local MCP clients, by using the [mcp-remote proxy](https://www.npmjs.com/package/mcp-remote).

To connect to your MCP server from Claude Desktop, follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config.

Update with this configuration:

```json
{
  "mcpServers": {
    "time-agent": {
      "command": "npx",
      "args": ["mcp-remote", "https://time.mcp.camel.dev/sse"]
    }
  }
}
```

Restart Claude and you should see the tool become available.

## VS Code MCP Example

VS Code now natively supports MCP servers. To connect to your time MCP server, add the following to your VS Code `settings.json`:

```jsonc
"mcp": {
  "servers": {
    "time-mcp-server": {
      "url": "https://time.mcp.camel.dev/sse"
    }
  }
}
```

This will allow you to use the `getTime` tool directly from within VS Code.
