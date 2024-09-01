const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestOrder() {
  try {
    const order = await prisma.order1.create({
      data: {
        product: 'Test Product',
        quantity: 1,
        price: 10.0,
      },
    });
    console.log('Order created:', order);
  } catch (error) {
    console.error('Failed to create order:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestOrder();
