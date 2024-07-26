import DbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export async function POST(request: Request) {
  try {
    await DbConnect();
    const { email, password, name } = await request.json();
    console.log(email, password, name);
    const findUser = await User.findOne({ email });
    if (findUser) {
      return Response.json({ message: 'User already exists' }, {
        status: 400,
      });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const savedUser = await (new User({
      email,
      password: passwordHash,
      name,
    })).save();
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET_KEY);
    cookies().set('token', token);
    return Response.json({
      user: {
        email: savedUser.email,
        name: savedUser.name,
        teams: []
      }
    })
  } catch (error) {
    return Response.json({ message: (error as Error).message }, {
      status: 500,
    });
  }
}