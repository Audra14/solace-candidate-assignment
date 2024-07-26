"use client";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Advocate } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  const [colDefs, setColDefs] = useState([
    { field: "firstName" },
    { field: "lastName" },
    { field: "city" },
    { field: "degree" },
    { field: "specialties" },
    { field: "yearsOfExperience" },
    { field: "phoneNumber" },
  ]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
          rowData={advocates}
          columnDefs={colDefs}
      />
    </div>
  )

  // const onChange = (e) => {
  //   const searchTerm = e.target.value;

  //   document.getElementById("search-term").innerHTML = searchTerm;

  //   console.log("filtering advocates...");
  //   const filteredAdvocates = advocates.filter((advocate: Advocate) => {
  //     return (
  //       advocate.firstName.includes(searchTerm) ||
  //       advocate.lastName.includes(searchTerm) ||
  //       advocate.city.includes(searchTerm) ||
  //       advocate.degree.includes(searchTerm) ||
  //       advocate.specialties.includes(searchTerm) ||
  //       advocate.yearsOfExperience.includes(searchTerm)
  //     );
  //   });

  //   setFilteredAdvocates(filteredAdvocates);
  // };

  // const onClick = () => {
  //   console.log(advocates);
  //   setFilteredAdvocates(advocates);
  // };

  // return (
  //   <main style={{ margin: "24px" }}>
  //     <h1>Solace Advocates</h1>
  //     <br />
  //     <br />
  //     <div>
  //       <p>Search</p>
  //       <p>
  //         Searching for: <span id="search-term"></span>
  //       </p>
  //       <input style={{ border: "1px solid black" }} onChange={onChange} />
  //       <button onClick={onClick}>Reset Search</button>
  //     </div>
  //     <br />
  //     <br />
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>First Name</th>
  //           <th>Last Name</th>
  //           <th>City</th>
  //           <th>Degree</th>
  //           <th>Specialties</th>
  //           <th>Years of Experience</th>
  //           <th>Phone Number</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {filteredAdvocates.map((advocate: Advocate) => {
  //           return (
  //             <tr>
  //               <td>{advocate.firstName}</td>
  //               <td>{advocate.lastName}</td>
  //               <td>{advocate.city}</td>
  //               <td>{advocate.degree}</td>
  //               <td>
  //                 {advocate.specialties.map((s) => (
  //                   <div>{s}</div>
  //                 ))}
  //               </td>
  //               <td>{advocate.yearsOfExperience}</td>
  //               <td>{advocate.phoneNumber}</td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </main>
  // );
}