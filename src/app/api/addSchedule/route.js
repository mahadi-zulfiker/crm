// File: src/app/api/addSchedule/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const db = await connectMongoDB();
    const {
      candidateId,
      jobId,
      clientId,
      date,
      time,
      duration,
      type,
      location,
      meetingLink,
      interviewer,
      interviewerEmail,
      notes,
      agenda,
    } = await req.json();

    console.log({ candidateId, jobId, clientId, date, time, interviewer });

    // ✅ Basic validation
    if (!candidateId || !jobId || !clientId || !date || !time || !interviewer) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert IDs
    const candidateObjectId = new ObjectId(candidateId);

    // ✅ Prepare schedule data to embed inside the application document
    const scheduleData = {
      date,
      time,
      duration: parseInt(duration, 10),
      type,
      location: location || null,
      meetingLink: meetingLink || null,
      interviewer,
      interviewerEmail: interviewerEmail || null,
      notes: notes || null,
      agenda: agenda || null,
      updatedAt: new Date(),
    };

    // ✅ Update the application document with status + schedule details
    const result = await db.collection("applications").updateOne(
      { _id: candidateObjectId },
      {
        $set: {
          status: "interview-scheduled",
          interviewSchedule: scheduleData, // saved in same document
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Interview scheduled and stored in application document",
    });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
