import jwt from "jsonwebtoken";


const auth = (req, res, next) => {

    const token = req.header("x-auth-token");
    console.log("token", token);
    if(!token) res.status(401).json({ message: "No Token, authorization denied." });

    try {

        const decodedToken = jwt.verify(token, process.env.JwtSecret);
        console.log("decoded", decodedToken);
        req.user = decodedToken.user;
        next();

    } catch (err) {
        console.log("something wrong with token", err);
        res.status(401).json({ message: "Token Invalid." })
    }
}

export default auth;