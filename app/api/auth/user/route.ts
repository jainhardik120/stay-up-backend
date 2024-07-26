import DbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';


export async function GET(request: Request) {
  try {
    await DbConnect();
    const token = cookies().get('token');
    if (!token || !token.value || token.value === "") {
      return Response.json({ message: 'Not logged in' }, {
        status: 400,
      });
    }
    const decodedToken: any = jwt.verify(token.value, process.env.JWT_SECRET_KEY || "");
    const findUser = await User.findOne({ _id: decodedToken.id });
    if (!findUser) {
      cookies().delete('token');
      return Response.json({ message: 'Not logged in' }, {
        status: 400,
      });
    }
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