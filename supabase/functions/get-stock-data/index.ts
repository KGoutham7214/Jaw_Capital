import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get("symbol");

    if (!symbol) {
      return new Response(
        JSON.stringify({ error: "Symbol parameter is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const apiKey = Deno.env.get("ALPHA_VANTAGE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const quoteResponse = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    );

    if (!quoteResponse.ok) {
      throw new Error(`Alpha Vantage API error: ${quoteResponse.statusText}`);
    }

    const quoteData = await quoteResponse.json();
    const quote = quoteData["Global Quote"];

    if (!quote || Object.keys(quote).length === 0) {
      return new Response(
        JSON.stringify({ error: "No data available for this symbol" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const overviewResponse = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
    );

    let marketCap = 0;
    if (overviewResponse.ok) {
      const overviewData = await overviewResponse.json();
      marketCap = parseFloat(overviewData.MarketCapitalization || "0");
    }

    const price = parseFloat(quote["05. price"]);
    const previousClose = parseFloat(quote["08. previous close"]);
    const change = price - previousClose;
    const changePercent = (change / previousClose) * 100;
    const volume = parseFloat(quote["06. volume"] || "0");

    const avgVolume = volume > 0 ? volume * 0.85 : 0;

    const data = {
      symbol: quote["01. symbol"],
      price: price,
      change: change,
      changePercent: changePercent,
      volume: volume,
      avgVolume: avgVolume,
      marketCap: marketCap,
      previousClose: previousClose,
      high: parseFloat(quote["03. high"]),
      low: parseFloat(quote["04. low"]),
    };

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});