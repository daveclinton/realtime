import { NextResponse } from "next/server";

interface NebiusRequest {
  width: number;
  height: number;
  num_inference_steps: number;
  negative_prompt: string;
  seed: number;
  response_extension: string;
  response_format: string;
  prompt: string;
  model: string;
}

interface NebiusResponse {
  data: { url: string }[];
  id: string;
}

export async function POST(req: Request) {
  const apiUrl = "https://api.studio.nebius.ai/v1/images/generations";
  const apiKey = process.env.NEXT_PUBLIC_NEBIUS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const body: NebiusRequest = await req.json();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "API request failed" },
        { status: response.status }
      );
    }

    const data: NebiusResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
