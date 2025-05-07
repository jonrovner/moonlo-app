import OpenAI from 'openai';
import Constants from 'expo-constants';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || Constants.expoConfig?.extra?.openaiApiKey,
});

export async function analyzeAstrologicalCompatibility(
  user1: { name: string; sun: string; moon: string; asc: string },
  user2: { name: string; sun: string; moon: string; asc: string }
) {
  try {
    const prompt = `Analyze the astrological compatibility between ${user1.name} and ${user2.name} based on their signs:
    
    ${user1.name}:
    - Sun: ${user1.sun}
    - Moon: ${user1.moon}
    - Ascendant: ${user1.asc}
    
    ${user2.name}:
    - Sun: ${user2.sun}
    - Moon: ${user2.moon}
    - Ascendant: ${user2.asc}
    
    Please provide a detailed analysis of their compatibility, focusing on:
    1. Overall compatibility
    2. Emotional connection (Moon signs)
    3. Personality dynamics (Sun signs)
    4. Potential challenges and strengths in the relationship
    5. Suggested dating activities that would align with their astrological profiles and enhance their connection
    
    Keep the analysis positive and constructive, while being honest about potential challenges. Use their names throughout the analysis to make it more personal. For the dating activities section, provide 3-5 specific suggestions that would appeal to both ${user1.name} and ${user2.name}'s astrological traits and help them bond.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert astrologer with deep knowledge of zodiac signs and their interactions. Provide detailed, accurate, and constructive compatibility analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "Unable to generate compatibility analysis.";
  } catch (error) {
    console.error("Error analyzing compatibility:", error);
    return "Sorry, there was an error analyzing the compatibility. Please try again later.";
  }
} 