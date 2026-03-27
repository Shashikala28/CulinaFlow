import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

if (!process.env.GROQ_API_KEY) {
  console.error("WARNING: GROQ API KEY is not set. AI features will not work.");
}

// Helper function to clean JSON response
const cleanJSON = (text) => {
  if (!text) return "";

  if (text.startsWith("```json")) {
    text = text.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  } else if (text.startsWith("```")) {
    text = text.replace(/^```\n?/, "").replace(/\n?```$/, "");
  }

  return text.trim();
};

// Helper function to safely parse JSON
const safeParse = (text, fallback) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON Parse Error. Raw response:", text);
    return fallback;
  }
};

// Generate Recipe
export const generateRecipe = async (
  ingredients,
  dietaryRestrictions = [],
  cuisineType = "any",
  servings = 4,
  cookingTime = "medium",
) => {
  const dietaryInfo =
    dietaryRestrictions.length > 0
      ? `Dietary restrictions: ${dietaryRestrictions.join(", ")}`
      : "No dietary restrictions";

  const timeGuide = {
    quick: "under 30 minutes",
    medium: "30-60 minutes",
    long: "over 60 minutes",
  };

  const prompt = `
Generate a detailed recipe with the following requirements:

Ingredients available: ${ingredients.join(", ")}
${dietaryInfo}
Cuisine type: ${cuisineType}
Servings: ${servings}
Cooking time: ${timeGuide[cookingTime] || "any"}

IMPORTANT:
- instructions MUST be an array of STRINGS
- Return ONLY valid JSON (no markdown, no explanation)

{
  "name": "Recipe name",
  "description": "Brief description",
  "ingredients": [
    { "name": "item", "quantity": "1", "unit": "cup" }
  ],
  "instructions": ["Step 1", "Step 2"],
  "prepTime": 10,
  "cookTime": 20,
  "servings": 4,
  "cuisineType": "Indian",
  "difficulty": "easy",
  "dietaryTags": ["Vegetarian"],
  "nutrition": {
    "calories": 300,
    "protein": 10,
    "carbs": 40,
    "fats": 8,
    "fiber": 5
  },
  "cookingTips": ["Tip 1", "Tip 2"]
}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices?.[0]?.message?.content || "";
    text = cleanJSON(text);

    let parsed = safeParse(text, {
      name: "Generated Recipe",
      description: "AI generated recipe",
      ingredients: [],
      instructions: ["Failed to parse AI response. Please try again."],
      prepTime: 10,
      cookTime: 20,
      servings: 4,
    });

    // Ensure required fields exist
    parsed.nutrition = parsed.nutrition || {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    };

    parsed.cookingTips = parsed.cookingTips || ["No cooking tips available"];

    parsed.cuisineType = parsed.cuisineType || "Unknown";
    parsed.difficulty = parsed.difficulty || "medium";
    parsed.dietaryTags = parsed.dietaryTags || [];

    // 🔥 FIX: normalize instructions
    if (Array.isArray(parsed.instructions)) {
      parsed.instructions = parsed.instructions.map((step) => {
        if (typeof step === "string") return step;
        if (typeof step === "object" && step.text) return step.text;
        return JSON.stringify(step);
      });
    } else {
      parsed.instructions = ["Instructions not available"];
    }

    return parsed;
  } catch (error) {
    console.error("Groq API error:", error);
    throw new Error("Failed to generate recipe");
  }
};

// Pantry Suggestions
export const generatePantrySuggestions = async (
  pantryItems,
  expiringItems = [],
) => {
  const ingredients = pantryItems.map((item) => item.name).join(", ");

  const expiringText =
    expiringItems.length > 0
      ? `\nPriority ingredients: ${expiringItems.join(", ")}`
      : "";

  const prompt = `Based on: ${ingredients}${expiringText}

Return ONLY JSON array. No explanation. No markdown.
["Idea 1", "Idea 2", "Idea 3"]
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices?.[0]?.message?.content || "";
    text = cleanJSON(text);

    return safeParse(text, ["Try a simple mixed dish"]);
  } catch (error) {
    console.error("Groq API error:", error);
    return ["Try a simple mixed dish"];
  }
};

// Cooking Tips
export const generateCookingTips = async (recipe) => {
  const prompt = `For recipe "${recipe.name}"

Return ONLY JSON array. No explanation. No markdown.
["Tip 1", "Tip 2", "Tip 3"]
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices?.[0]?.message?.content || "";
    text = cleanJSON(text);

    return safeParse(text, ["Cook with love and patience!"]);
  } catch (error) {
    console.error("Groq API error:", error);
    return ["Cook with love and patience!"];
  }
};
