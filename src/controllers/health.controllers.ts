
const getServerHealth = async (req: any, res: any) => {
    try {

        const data = req.body

        res.status(200).json({
            message: "All systems are operational."
        })
    } catch (error) {

    }
}


export {
    getServerHealth
}
