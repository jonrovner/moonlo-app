import OpenAI from 'openai';
import Constants from 'expo-constants';

const openai = new OpenAI({
  apiKey: Constants.expoConfig?.extra?.openaiApiKey,
});

export async function analyzeAstrologicalCompatibility(
  user1: { sun: string; moon: string; asc: string },
  user2: { sun: string; moon: string; asc: string }
) {
  try {
    const prompt = `Analyze the astrological compatibility between two people based on their signs:
    
    Person 1:
    - Sun: ${user1.sun}
    - Moon: ${user1.moon}
    - Ascendant: ${user1.asc}
    
    Person 2:
    - Sun: ${user2.sun}
    - Moon: ${user2.moon}
    - Ascendant: ${user2.asc}
    
    Please provide a detailed analysis of their compatibility, focusing on:
    1. Overall compatibility
    2. Emotional connection (Moon signs)
    3. Personality dynamics (Sun signs)
    4. First impressions and physical attraction (Ascendant)
    5. Potential challenges and strengths in the relationship
    
    Keep the analysis positive and constructive, while being honest about potential challenges.`;

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