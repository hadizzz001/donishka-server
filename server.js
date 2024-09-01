const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Create an order in the Order1 collection
app.post('/orders', async (req, res) => {
    const { items, inputs } = req.body;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  
    try {
      const order = await prisma.order.create({
        data: {
            user: items,
            info: inputs,
            createdAt: formattedDate,
        },
      });
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
  });
  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
