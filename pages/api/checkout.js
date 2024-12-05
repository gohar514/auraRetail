// pages/api/checkout.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      email,
      FullName,
      
      country,
      province,
      city,
      
      address,
      apartment,
      mobile,
      secondNumber,
      postalCode,
      paymentMethod,
      totalAmount,
      totalQuantity,
      cartItems,
    } = req.body;

    try {
      // Create an order
      const order = await prisma.order.create({
        data: {
          email,
          FullName,
      
          country,
          province,
          city,
          
          address,
          apartment,
          mobile,
          secondNumber,
          postalCode,
          paymentMethod,
          totalAmount: parseFloat(totalAmount),
          totalQuantity: parseInt(totalQuantity),
          cartItems: {
            create: cartItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      res.status(200).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error("Error creating order: ", error);
      res.status(500).json({ message: 'Failed to create order', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


