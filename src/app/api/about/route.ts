import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { About } from "@/models/About";

// GET - Public route to fetch about page
export async function GET() {
  try {
    await connectDB();
    const about = await About.getAboutPage();

    return NextResponse.json(about);
  } catch (error) {
    console.error("Failed to fetch about page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update about page (auth will be handled in middleware)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const about = await About.getAboutPage();

    // Update the about page directly
    const updatedAbout = await About.findByIdAndUpdate(
      about._id,
      {
        ...body,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error("Failed to update about page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
