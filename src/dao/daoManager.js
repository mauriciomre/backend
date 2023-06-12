export const getMessagesManager = async () => {
    const modelMessage =
        process.env.SELECTEDBDD == 1
            ? await import("./MongoDB/models/Message.js")
            : await import("./Postgresql/models/Message.js");
    return modelMessage;
};

export const getProductsManager = async () => {
    const modelProduct =
        process.env.SELECTEDBDD == 1
            ? await import("./MongoDB/services/productServices.js")
            : await import("./Postgresql/models/Product.js");
    return modelProduct;
};

export const getCartsManager = async () => {
    const modelCart =
        process.env.SELECTEDBDD == 1
            ? await import("./MongoDB/services/cartServices.js")
            : await import("./Postgresql/models/Cart.js");
    return modelCart;
};

export const getUsersManager = async () => {
    const modelUser =
        process.env.SELECTEDBDD == 1
            ? await import("./MongoDB/services/userServices.js")
            : await import("./Postgresql/models/User.js");
    return modelUser;
};
