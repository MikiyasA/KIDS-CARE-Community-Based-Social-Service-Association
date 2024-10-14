export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { fullName, email, phone, subject, message } = req.body;
  
      const googleScriptURL = 'https://script.google.com/macros/s/AKfycbwLGTpxpsL8Qo2H8sL3TH4lTSil4WuD40qtt6JIezV_0YHU4PQ9FqmpzB_e8HHn-6DBKA/exec';
  
      const response = await fetch(googleScriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          subject,
          message,
        }),
      });
  
      const result = await response.json();
  
      if (result.result === 'success') {
        res.status(200).json({ result: 'success' });
      } else {
        res.status(500).json({ result: 'error' });
      }
    } else {
      res.status(405).json({ message: 'Only POST requests allowed' });
    }
  }
  