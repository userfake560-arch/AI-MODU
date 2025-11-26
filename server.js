const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// N8N Webhook URL - Replace with your actual n8n webhook URL
// หลังจากสร้าง webhook ใน n8n ให้อัปเดต URL ที่นี่
// ถ้า webhook ไม่ทำงาน ลองเปลี่ยน path เป็นอย่างอื่น เช่น 'test-webhook'
const N8N_WEBHOOK_URL = 'https://n8n.phukhieo.ac.th/webhook/ai-chatbot';

// Serve the chatbot UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ai-chatbot.html'));
});

// Proxy endpoint to n8n webhook
app.post('/n8nwebhook', async (req, res) => {
    try {
        console.log('Forwarding request to n8n:', req.body);
        
        // Forward the request to n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        
        if (!response.ok) {
            throw new Error(`n8n responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('n8n response:', data);
        
        // Return the response from n8n
        res.json(data);
    } catch (error) {
        console.error('Error forwarding to n8n:', error);
        res.status(500).json({
            output: 'Sorry, I encountered an error while processing your request. Please try again later.',
            status: 'error'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Make sure your n8n workflow is running and accessible at: ${N8N_WEBHOOK_URL}`);
});