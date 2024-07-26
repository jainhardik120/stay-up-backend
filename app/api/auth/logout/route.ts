import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    cookies().delete('token');
    return Response.json({ message: 'Logged out successfully' });
  } catch (error) {
    return Response.json({ message: (error as Error).message }, {
      status: 500,
    });
  }
}