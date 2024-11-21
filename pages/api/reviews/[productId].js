

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { productId } = req.query;
  
  // Handle POST request to create a review
  if (req.method === 'POST') {
    const { name, rating, description } = req.body;
    
    // Validation
    if (!name || !rating) {
      return res.status(400).json({ error: "Name and rating are required." });
    }

    try {
      const newReview = await prisma.review.create({
        data: {
          name,
          rating,
          description,
          productId: parseInt(productId),
        },
      });
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Error creating review." });
    }
  }
  
  // Handle GET request to fetch reviews for a specific product
  else if (req.method === 'GET') {
    try {
      const reviews = await prisma.review.findMany({
        where: { productId: parseInt(productId) },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Error fetching reviews." });
    }
  } 
  else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method not allowed." });
  }
}
