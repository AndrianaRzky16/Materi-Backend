import { Router } from "express";
import Author from "../../service/author.js";

const router = Router();

router.get("/authors", async (req, res) => {
  const authors = await Author.get();
  res.json(authors);
});
router.get("/authors/:id", async (req, res) => {
  try {
    const authors = await Author.findById(req.params.id);
    res.json(authors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
router.post("/authors", (req, res) => {});

export default router;
