import { Router } from "express";
import { books } from "../data/books.js";

export const booksRouter = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: The Hobbit
 *         author:
 *           type: string
 *           example: J.R.R. Tolkien
 *         publishedYear:
 *           type: integer
 *           example: 1937
 *         genre:
 *           type: string
 *           example: Fantasy
 */

/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: List all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: An array of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
booksRouter.get("/", (req, res) => {
  res.json(books);
});

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     summary: Get a single book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric id of the book
 *     responses:
 *       200:
 *         description: The matching book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
booksRouter.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});
