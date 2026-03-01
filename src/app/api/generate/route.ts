import { NextRequest, NextResponse } from "next/server";
import { runSkill } from "@/lib/skill-runner";
import { emailOptimizerSkill } from "@/lib/skills/email-optimizer";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const body = await req.json();
    const subjectLine = body.subjectLine?.trim();

    if (!subjectLine || subjectLine.length > 200) {
      return NextResponse.json(
        { error: "Subject line is required (max 200 chars)" },
        { status: 400 }
      );
    }

    // Check if user has a Pro subscription token
    const isPro = body.proToken && body.proToken === "valid"; // TODO: verify via Stripe

    if (!isPro) {
      const { allowed, remaining } = checkRateLimit(ip);
      if (!allowed) {
        return NextResponse.json(
          {
            error: "Free limit reached (3/day). Upgrade to Pro for unlimited.",
            upgrade: true,
          },
          { status: 429 }
        );
      }
      // Return remaining in header
      const result = await generate(subjectLine);
      const response = NextResponse.json(result);
      response.headers.set("X-RateLimit-Remaining", String(remaining));
      return response;
    }

    const result = await generate(subjectLine);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions. Try again." },
      { status: 500 }
    );
  }
}

async function generate(subjectLine: string) {
  const raw = await runSkill(
    emailOptimizerSkill,
    `Optimize this email subject line: "${subjectLine}"`
  );

  try {
    return JSON.parse(raw);
  } catch {
    // If Haiku doesn't return perfect JSON, wrap it
    return { original: subjectLine, suggestions: [], raw };
  }
}
