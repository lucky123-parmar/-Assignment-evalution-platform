
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.evaluateCode = async (req, res) => {
  try {
    const { code } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze the following code and provide feedback on its quality, correctness, and adherence to best practices. Additionally, offer suggestions for improvement, including code snippets where applicable.

    ${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ feedback: text });
  } catch (error) {
    console.error('Error evaluating code:', error);
    res.status(500).json({ error: 'Failed to evaluate code' });
  }
};
