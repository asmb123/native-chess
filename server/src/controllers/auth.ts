import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId: string, username: string) => {
    return jwt.sign(
        { id: userId, username },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1h" }
    );
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "Username already taken" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser._id.toString(), newUser.username);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: { id: newUser._id, username: newUser.username },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = generateToken(user._id.toString(), user.username);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
