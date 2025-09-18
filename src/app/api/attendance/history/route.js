import { NextResponse } from "next/server";

// Mock attendance history data
const mockAttendanceHistory = [
  { id: 1, employeeId: "1", date: "2023-06-01", status: "present" },
  { id: 2, employeeId: "1", date: "2023-06-02", status: "present" },
  { id: 3, employeeId: "1", date: "2023-06-05", status: "present" },
  { id: 4, employeeId: "1", date: "2023-06-06", status: "absent" },
  { id: 5, employeeId: "1", date: "2023-06-07", status: "present" },
  { id: 6, employeeId: "1", date: "2023-06-08", status: "present" },
  { id: 7, employeeId: "1", date: "2023-06-09", status: "leave" },
  { id: 8, employeeId: "1", date: "2023-05-29", status: "present" },
  { id: 9, employeeId: "1", date: "2023-05-30", status: "present" },
  { id: 10, employeeId: "1", date: "2023-05-31", status: "present" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get("employeeId");

  // Filter data based on employeeId
  let filteredData = mockAttendanceHistory;

  if (employeeId) {
    filteredData = filteredData.filter(
      (record) => record.employeeId === employeeId
    );
  }

  // Sort by date descending
  filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return NextResponse.json({
    success: true,
    data: filteredData,
  });
}
