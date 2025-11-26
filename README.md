# AI Chatbot with n8n Workflow

A modern AI chatbot interface connected to an n8n workflow powered by Google Gemini.

## Features

- Modern, responsive chat UI with Tailwind CSS
- Chat history management with local storage
- Session-based conversations
- Typing indicators
- File upload support (UI only)
- Error handling and connection status
- Thai/English language support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up n8n Workflow

1. Import the `enhanced-workflow.json` file into your n8n instance
2. Make sure you have Google Gemini API credentials configured
3. Activate the workflow
4. Note the webhook URL (it should be something like `http://localhost:5678/webhook/ai-chatbot`)

### 3. Configure the Server

Edit the `N8N_WEBHOOK_URL` in `server.js` to match your n8n webhook URL:

```javascript
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/ai-chatbot';
```

### 4. Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

### 5. Access the Chatbot

Open your browser and navigate to `http://localhost:3000`

## Workflow Architecture

The n8n workflow consists of the following nodes:

1. **Webhook Trigger**: Receives chat messages from the frontend
2. **Extract Request Data**: Extracts message and session ID from the request
3. **Validate Input**: Checks if the message is not empty
4. **Manage Session History**: Maintains conversation context using n8n globals
5. **AI Agent**: Processes the message with conversation history
6. **Google Gemini Model**: The actual AI model that generates responses
7. **Format Response**: Formats the AI response for the frontend
8. **Webhook Response**: Sends the response back to the frontend

## Customization

### Changing the AI Model

To use a different AI model, replace the "Google Gemini Model" node with another language model node and connect it to the "AI Agent" node.

### Modifying the System Prompt

Edit the system message in the "AI Agent" node to change how the AI behaves:

```
You are a helpful AI assistant. You respond in the same language as the user (Thai or English). Be concise but thorough.
```

### Adjusting Session History Length

In the "Manage Session History" node, change the value in this line to keep more or fewer messages:

```javascript
if (sessionHistory.length > 10) {
  sessionHistory = sessionHistory.slice(-10);
}
```

## File Structure

```
├── ai-chatbot.html      # Main chatbot UI
├── server.js            # Express server to connect UI with n8n
├── package.json         # Node.js dependencies
├── enhanced-workflow.json # n8n workflow definition
└── README.md            # This file
```

## Troubleshooting

### Connection Issues

1. Make sure your n8n instance is running
2. Verify the webhook URL in `server.js` matches your n8n webhook URL
3. Check that the n8n workflow is active

### AI Not Responding

1. Verify your Google Gemini API credentials are correctly configured in n8n
2. Check the n8n execution history for any errors
3. Make sure you have sufficient API quota

### UI Not Loading

1. Make sure the Express server is running on the correct port
2. Check for any JavaScript errors in the browser console
3. Verify all files are in the same directory

## License

MIT"# AI-MODU" 
