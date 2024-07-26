import DbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export async function POST(request: Request) {
  try {
    await DbConnect();
    const { email, password } = await request.json();
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return Response.json({ message: 'Invalid Credentials' }, {
        status: 400,
      });
    }
    const passwordHash = await bcrypt.compare(password, findUser.password);
    if (!passwordHash) {
      return Response.json({ message: 'Invalid Credentials' }, {
        status: 400,
      });
    }
    const token = jwt.sign({ id: findUser._id }, JWT_SECRET_KEY);
    cookies().set('token', token);
    return Response.json({
      user: {
        email: findUser.email,
        name: findUser.name,
        teams: findUser.teams
      }
    });
  } catch (error) {
    return Response.json({ message: (error as Error).message }, {
      status: 500,
    });
  }
}