import { Product } from "../database/models"

const getAllProducts = async (req: any, res: any) => {
    try {
        const allProducts = await Product.find({}).sort({ createdAt: -1 });
        if (!allProducts.length) {
            return res.status(400).json({
                message: "No products yet."
            })
        }
        return res.status(200).json({
            message: "Products fetched successfully.",
            products: allProducts
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const GetProductByCategory = async (req: any, res: any) => {
    try {
        const { categoryId } = req.params;
        const allProducts = await Product.find({ category: categoryId }).select("-category").sort({ createdAt: -1 });
        if (!allProducts.length) {
            return res.status(400).json({
                message: "No products yet."
            })
        }
        return res.status(200).json({
            message: "Products fetched successfully.",
            products: allProducts
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export { getAllProducts, GetProductByCategory }