import DbConnect from "@/lib/dbConnect";
import GoogleSlide from "@/models/GoogleSlide";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await DbConnect();

    const { title, googleSlideId } = await request.json();

    // Validate input
    if (!title || !googleSlideId) {
      return NextResponse.json({ message: 'Title and Google Slide ID are required' }, { status: 400 });
    }

    // Check if a slide with this ID already exists
    const existingSlide = await GoogleSlide.findOne({ googleSlideId });
    if (existingSlide) {
      return NextResponse.json({ message: 'A slide with this ID already exists' }, { status: 409 });
    }

    // Create new slide
    const newSlide = new GoogleSlide({
      title,
      googleSlideId
    });

    // Save to database
    await newSlide.save();

    return NextResponse.json({
      message: 'Slide created successfully',
      slide: {
        title: newSlide.title,
        googleSlideId: newSlide.googleSlideId,
        createdAt: newSlide.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating slide:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}