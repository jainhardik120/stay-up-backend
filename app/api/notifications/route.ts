import DbConnect from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await DbConnect();

    const { message, type } = await request.json();

    if (!message) {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    const newNotification = new Notification({
      message,
      type: type || 'info'
    });

    await newNotification.save();

    return NextResponse.json({
      message: 'Notification created successfully',
      notification: newNotification
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await DbConnect();

    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(10);

    return NextResponse.json({ notifications });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}