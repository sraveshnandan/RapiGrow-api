import { Branch, Customer, DeliveryPartner, Order } from "../database/models";

const CreateOrder = async (req: any, res: any) => {
    try {
        const { userId } = req.user;
        const { items, branchId, totalPrice } = req.body;
        const customer = await Customer.findById(userId);
        const branchData = await Branch.findById(branchId);

        if (!customer) {
            return res.status(404).json({
                message: "User Account not found."
            })
        }

        const neworder = new Order({
            orderId: "a",
            customer: userId,
            items: items.map((item: any) => ({
                id: item.id,
                item: item.item,
                count: item.count
            })),
            branch: branchData?._id,
            totalPrice,
            deliveryLocation: {
                lat: customer.live_location?.lat,
                lng: customer.live_location?.lng,
                address: customer.address || "No address available."
            },
            pickUpLocation: {
                lat: branchData?.location?.lat,
                lng: branchData?.location?.lng,
                address: branchData?.address
            }

        })

        const savedOrder = await neworder.save();

        return res.status(201).json({
            message: "Order Placed successfully.",
            order: savedOrder
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}


const UpdateOrderStatus = async (req: any, res: any) => {
    try {
        const { orderId } = req.params;
        const { status, deliveryPersonLocation } = req.body;
        const { userId } = req.user;


        let order = await Order.findOne({ orderId });
        const deliveryPartner = await DeliveryPartner.findById(userId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found."
            })
        }
        if (!deliveryPartner) {
            return res.status(404).json({
                message: "Delivery Partner not found."
            })
        }

        if (!order) {
            return res.status(404).json({
                message: "Order not found."
            })
        }

        if (['cancelled', 'delivered'].includes(order?.status!)) {
            return res.status(404).json({
                message: "Order can't be updated."
            })
        }


        if (order.deliveryPartner!.toString() !== userId) {
            return res.status(403).json({
                message: "UnAuthorised"
            })
        }



        order.status = status as any;
        order.deliveryPersonLocation = {
            ...deliveryPersonLocation
        }


        await order.save();


        return res.status(200).json({
            message: "Order updated successfully.",
            order
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const GetOrders = async (req: any, res: any) => {
    try {
        const { status, customerId, deliveryPartnerId, branchId } = req.query;
        let query: any = {};

      

        // Building query based on filters
        if (status) {
            query.status = status;
        }
        if (customerId) {
            query.customer = customerId;
        }
        if (deliveryPartnerId) {
            query.deliveryPartner = deliveryPartnerId;
            query.branch = branchId;
        }
        // Await the query result
        const orders = await Order.find(query).populate("customer branch items.item deliveryPartner");

        // Send the populated orders as response
        return res.status(200).json({
            message: "Orders fetched successfully.",
            orders
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const GetOrderById = async (req: any, res: any) => {
    try {

        const { orderId } = req.param;
        const order = Order.findById(orderId).populate("customer branch items.item deliveryPartner");
        if (!order) {
            return res.status(404).json({
                message: "Order not found."
            })
        }
        return res.status(200).json({
            message: "orders fetched successfully.",
            order
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}


const ConfirmOrder = async (req: any, res: any) => {
    try {

        const { orderId } = req.params;
        const { userId } = req.user
        const { deliveryPersonLocation } = req.body;

        const deliveryPartner = await DeliveryPartner.findById(userId);
        if (!deliveryPartner) {
            return res.status(404).json({
                message: "No delivery partner found."
            })
        }

        let order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({
                message: "No Order found."
            })
        }
        if (order.status !== "available") {
            return res.status(404).json({
                message: "Order is no available."
            })
        }

        order.deliveryPartner = userId;
        order.deliveryPersonLocation = {
            lat: deliveryPersonLocation?.lat!,
            lng: deliveryPersonLocation?.lng!,
            address: deliveryPartner.address || "No provided."
        }
        order.status = "confermed"

        await order.save();

        return res.status(200).json({
            message: "Order Confirmed Successfully.",
            order
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export { CreateOrder, ConfirmOrder, UpdateOrderStatus, GetOrders, GetOrderById }