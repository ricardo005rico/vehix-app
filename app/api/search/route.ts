import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { profile } = await req.json()

  // 1. Claude genera la query de búsqueda
  const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      messages: [{
        role: "user",
        content: `Eres un experto en autos chilenos. Basado en este perfil de usuario genera 3 queries de búsqueda para encontrar autos en Chile:
        - Estado civil: ${profile.estadoCivil}
        - Hijos: ${profile.hijos}
        - Estilo de vida: ${profile.estiloVida}
        - Presupuesto: $${profile.presupuesto.toLocaleString("es-CL")} CLP
        - Combustible: ${profile.combustible}
        - Para quién: ${profile.paraQuien}
        - Km diarios: ${profile.kmDiarios}
        - Prioridad: ${profile.prioridad}
        
        Responde SOLO con un JSON array de 3 strings con las queries. Ejemplo: ["query1", "query2", "query3"]`
      }]
    })
  })

  const claudeData = await claudeRes.json()
  const queries = JSON.parse(claudeData.content[0].text)

  // 2. Serper busca en Google
  const serperRes = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: queries[0] + " chileautos yapo",
      gl: "cl",
      hl: "es",
      num: 6
    })
  })

  const serperData = await serperRes.json()

  return NextResponse.json({
    queries,
    results: serperData.organic || []
  })
}