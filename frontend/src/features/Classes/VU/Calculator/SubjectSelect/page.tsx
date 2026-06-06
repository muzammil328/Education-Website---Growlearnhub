// 'use client'
// import React, { useState } from "react";

// const SubjectSelect = ({ bookData, setSelectedSubject, selectedSubject }: any) => {
//     const [searchQuery, setSearchQuery] = useState<string>("");

//     // Filter the subjects based on the search query
//     const filteredSubjects = bookData.filter((subject:any) =>
//         subject.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="my-4">
//             <label htmlFor="subject-select" className="mr-2 text-gray-400 mb-2">
//                 Select Subject:
//             </label>
//             <input
//                 id="subject-select"
//                 type="text"
//                 value={selectedSubject}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search subjects..."
//                 className="border p-2 w-full rounded-md"
//             />
//             {searchQuery && filteredSubjects.length > 0 && (
//                 <ul className="border border-t-0 rounded-md mt-1 max-h-40 overflow-y-auto">
//                     {filteredSubjects.map((subject: any) => (
//                         <li
//                             key={subject.name}
//                             className="p-2 cursor-pointer hover:bg-gray-200"
//                             onClick={() => {
//                                 setSelectedSubject(subject.name);
//                                 setSearchQuery(""); // Clear search query after selecting
//                             }}
//                         >
//                             {subject.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default SubjectSelect;
import React from 'react';

export default function SubjectSelect() {
  return <div>page</div>;
}
