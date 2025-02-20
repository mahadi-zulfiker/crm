import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const db = await connectMongoDB();
    const applications = db.collection("applications");

    // Parse form data correctly
    const formData = await req.formData();
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const coverLetter = formData.get("coverLetter");
    const jobId = formData.get("jobId");
    const position = formData.get("position"); // New field for position
    const resume = formData.get("resume"); // File object

    if (!fullName || !email || !phone || !resume || !jobId || !position) {
      return NextResponse.json({ error: "All required fields must be filled!" }, { status: 400 });
    }

    // Handle Resume Upload (For Now, Just Save Filename)
    const resumeFileName = resume.name; // Store only file name for now

    const newApplication = {
      fullName,
      email,
      phone,
      position, // Include position
      resume: resumeFileName,
      coverLetter,
      jobId,
      appliedAt: new Date(),
    };

    await applications.insertOne(newApplication);

    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Application Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}
