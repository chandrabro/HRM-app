import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

type AITextType = 'clock-in' | 'clock-out';

const getPrompt = (type: AITextType, workStatus: string): string => {
    if (type === 'clock-in') {
        if (!workStatus.trim()) {
            return "An employee just clocked in. Provide a short, single-sentence motivational quote for their workday. Be encouraging and positive. Do not add any prefix or use quotation marks.";
        }
        return `An employee just clocked in with the status: "${workStatus}". Provide a short, single-sentence motivational quote for their workday based on their task. Be encouraging and positive. Do not add any prefix or use quotation marks.`;
    }
    // clock-out
    if (!workStatus.trim()) {
        return `An employee just clocked out. Provide a short, single-sentence positive and encouraging sign-off message. For example: "Great work! Enjoy your evening." Do not add any prefix or use quotation marks.`;
    }
    return `An employee just clocked out with a summary of their work: "${workStatus}". Provide a short, single-sentence positive and encouraging sign-off message based on their accomplishments. For example: "Sounds like a productive day! Well done." Do not add any prefix or use quotation marks.`;
};

const getFallbackText = (type: AITextType): string => {
    return type === 'clock-in'
        ? "Embrace the challenges and make today amazing!"
        : "Great work today! Enjoy your well-deserved rest.";
};


export const getAIText = async (type: AITextType, workStatus: string): Promise<string> => {
  try {
    const prompt = getPrompt(type, workStatus);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error(`Error fetching AI text for ${type} from Gemini:`, error);
    return getFallbackText(type);
  }
};
