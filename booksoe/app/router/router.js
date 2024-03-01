import { Router } from "express";
import authorRoutes from "./routes/author.js";
import bookRoutes from "./routes/book.js";
import categoryRoutes from "./routes/category.js";
import publisherRoutes from "./routes/publisher.js";

const router = Router();

router.use("/author", authorRoutes);
router.use("/book", bookRoutes);
router.use("/category", categoryRoutes);
router.use("/publisher", publisherRoutes);

export default router;