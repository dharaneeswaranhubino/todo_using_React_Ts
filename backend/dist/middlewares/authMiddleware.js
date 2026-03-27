export const authMiddleware = (req, res, next) => {
    const password = req.headers['password'];
    if (!password) {
        res.status(400).send("Password Required");
    }
    else if (password != "dharanI007") {
        res.send("password mismatched");
    }
};
//# sourceMappingURL=authMiddleware.js.map