export async function handler(event) {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbxq5A67NsDOBNIYdl814jS--LvrZObFH96bbMlh1nJY135BDjTTuybtGzFks0oxhSwg-A/exec";
  
    // 프리플라이트 대응
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    }
  
    try {
      const resp = await fetch(GAS_URL, {
        method: event.httpMethod, // GET/POST
        headers: { "Content-Type": "application/json" },
        body: event.httpMethod === "GET" ? undefined : event.body,
      });
  
      const text = await resp.text();
  
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": resp.headers.get("content-type") || "application/json; charset=utf-8",
        },
        body: text,
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ ok: false, message: err.message }),
      };
    }
  }