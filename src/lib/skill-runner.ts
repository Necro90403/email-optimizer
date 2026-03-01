import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export interface SkillConfig {
  name: string;
  systemPrompt: string;
  model?: string;
  maxTokens?: number;
}

export async function runSkill(
  config: SkillConfig,
  userInput: string
): Promise<string> {
  const anthropic = getClient();
  const response = await anthropic.messages.create({
    model: config.model || "claude-haiku-4-5-20251001",
    max_tokens: config.maxTokens || 1024,
    system: config.systemPrompt,
    messages: [{ role: "user", content: userInput }],
  });

  const block = response.content[0];
  if (block.type === "text") {
    return block.text;
  }
  throw new Error("Unexpected response type");
}
