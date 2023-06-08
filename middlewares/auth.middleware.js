import jwt from "jsonwebtoken";

const { verify } = jwt;
export const checkAuthorization = (req, res, next) =>{
    const token = req.header("Authorization").trim();
    if(!token) return res.status(400).json({message: "You must log in first"})
    try {
        const tokenArray = token.split(" ");
        let user = verify(tokenArray[1], (process.env.JWT_SECRET).trim())
        console.log("User", user)
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid Token", error: error.message})
    }
}