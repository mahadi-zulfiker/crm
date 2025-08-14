import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Destructure all fields
    const {
      title,
      company,
      location,
      jobType,
      category,
      description,
      salary,
      jobReference,
      vacancy,
      featured,
      vendor,
      status,
      rating,
      payment,
      deadline,
      workType,
      salaryMin,
      salaryMax,
      currency,
      requirements,
      responsibilities,
      benefits,
      applicationDeadline,
      experienceLevel,
      educationLevel,
      skills,
      department,
      isRemote,
      isUrgent,
      contactEmail,
      contactPhone,
      email,
      clientName,
    } = body;

    // Basic required fields validation
    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !category ||
      !description ||
      !jobReference ||
      !vacancy
    ) {
      return NextResponse.json(
        { message: "Please fill out all required fields!" },
        { status: 400 }
      );
    }

    const parsedVacancy = parseInt(vacancy, 10);
    if (isNaN(parsedVacancy) || parsedVacancy < 1) {
      return NextResponse.json(
        { message: "Vacancy must be a positive number." },
        { status: 400 }
      );
    }

    const db = await connectMongoDB();

    const result = await db.collection("jobs").insertOne({
      title,
      company,
      location,
      jobType,
      category,
      description,
      salary: salary ? Number(salary) : null,
      jobReference,
      vacancy: parsedVacancy,
      featured: Boolean(featured),
      vendor: vendor || "",
      status: status || "draft",
      rating: rating || 0,
      payment: payment || "0",
      deadline: deadline ? new Date(deadline) : null,
      workType: workType || "",
      salaryMin: salaryMin || "",
      salaryMax: salaryMax || "",
      currency: currency || "USD",
      requirements: requirements || "",
      responsibilities: responsibilities || "",
      benefits: benefits || "",
      applicationDeadline: applicationDeadline
        ? new Date(applicationDeadline)
        : null,
      experienceLevel: experienceLevel || "",
      educationLevel: educationLevel || "",
      skills: skills || "",
      department: department || "",
      isRemote: Boolean(isRemote),
      isUrgent: Boolean(isUrgent),
      contactEmail: contactEmail || "",
      contactPhone: contactPhone || "",
      email: email || "",
      clientName: clientName || "",
      postedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Job posted successfully!", jobId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
