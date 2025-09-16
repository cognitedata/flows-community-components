import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message, components } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Create a specialized prompt for component generation
    const systemPrompt = `You are Aura UI Assistant, an expert at building React components using ShadCN UI components and Tailwind CSS.

Available Components:
${components ? components.map((comp: any) => `- ${comp.name}: ${comp.description}`).join('\n') : ''}

IMPORTANT RULES:
1. ONLY use the available ShadCN components listed above
2. Always use proper imports like: import { Card, CardContent } from "@/components/ui/card"
3. Create functional, complete components with proper TypeScript
4. Use Tailwind CSS for styling
5. Follow React best practices
6. Return ONLY the component code, no explanations unless asked
7. Use semantic HTML and accessible patterns
8. Make components responsive with Tailwind breakpoints

Format your response as a complete React component function. Example:

\`\`\`tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Component content here</p>
        <Button className="mt-4">Click me</Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

User Request: ${message}`

    // Generate response
    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
