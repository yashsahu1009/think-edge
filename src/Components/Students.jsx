 import React from "react";

const students = [
  {
    id: 1,
    company: "Microsoft",
    role: "Intern",
    name: "Kartik Agarwal",
    branch: "CSE",
    degree: "BTech",
    batch: "Alpha Student",
    stipend: "Rs 1lakh+/month Stipend",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    company: "Google",
    role: "Intern",
    name: "Rojal Sapkota",
    branch: "CSE",
    degree: "BS (USA)",
    batch: "Alpha Student",
    stipend: "Rs 6lakh/month CTC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    company: "Samsung",
    role: "SDE",
    name: "Arif Nowfel",
    branch: "CSE",
    degree: "BSc (Bangladesh)",
    batch: "Alpha Student",
    stipend: "Stipend - Confidential",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    company: "Amazon",
    role: "Intern",
    name: "Anusha Reddy",
    branch: "CSE",
    degree: "BTech",
    batch: "Alpha Student",
    stipend: "Rs 1lakh+/month Stipend",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const StudentCard = ({ student }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-400 rounded-2xl p-4 shadow-lg w-72 text-white">
      <div className="flex flex-col items-center">
        {/* Student Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
          <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
        </div>

        {/* Company & Role */}
        <h3 className="bg-gray-800 rounded-full px-4 py-1 mt-3 text-sm font-semibold">
          {student.company} ({student.role})
        </h3>

        {/* Student Info */}
        <div className="bg-white text-black p-2 rounded-lg mt-3 w-full text-sm">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p><strong>Degree:</strong> {student.degree}</p>
          <p><strong>Batch:</strong> {student.batch}</p>
        </div>

        {/* Stipend & Company Logo */}
        <p className="mt-2 text-xs font-semibold">{student.stipend}</p>
        <img src={student.logo} alt={student.company} className="w-24 mt-2" />
      </div>
    </div>
  );
};

const SelectedStudents = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Our Selected Students</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default SelectedStudents;
