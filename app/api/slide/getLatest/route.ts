import DbConnect from "@/lib/dbConnect";
import GoogleSlide from "@/models/GoogleSlide";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await DbConnect();

    const latestSlide = await GoogleSlide.findOne().sort({ createdAt: -1 });
    console.log(latestSlide);
    if (!latestSlide) {
      return NextResponse.json({ message: 'No slides found' }, { status: 404 });
    }

    return NextResponse.json({
      slide: {
        title: latestSlide.title,
        googleSlideId: latestSlide.googleSlideId,
        createdAt: latestSlide.createdAt
      }
    });

  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}