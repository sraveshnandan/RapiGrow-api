import { Category } from "../database/models"

const GetAllCategories = async (req: any, res: any) => {
    try {

        const allCategories = await Category.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All categories fetched successfully.",
            categories: allCategories
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export { GetAllCategories }