"use client";

import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Advocate, AdvocateDisplay } from "@/types";
import { useEffect, useState } from "react";
import { ColDef } from 'ag-grid-community';

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateDisplay[]>([]);

  const colDefs = [
    { field: "advocate", filter: true, flex: 1 },
    { field: "specialties", filter: true, flex: 2 },
    { field: "yearsOfExperience", filter: true, flex: 1 },
    { field: "city", filter: true, flex: 1 },
    { field: "phoneNumber", filter: true, flex: 1 },
  ]

  const pageSize = 5
  const totalRows = 15

  function mapAdvocates(a: Advocate): AdvocateDisplay {
    return {
      advocate: a.firstName + " " + a.lastName + ", " + a.degree, 
      city: a.city,  
      phoneNumber: a.phoneNumber,
      yearsOfExperience: a.yearsOfExperience, 
      specialties: a.specialties,
    }
  }

  useEffect(() => {
    try {
      fetch(`/api/advocates?pageSize=${totalRows}`).then((response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data.map(mapAdvocates));
        });
      });
    } catch(e){
      console.log("Failed to fetch advocates ", e)
    }
    
  }, []);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
          rowData={advocates}
          columnDefs={colDefs as ColDef<AdvocateDisplay>[]}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[5, 10, 15]}
      />
    </div>
  )

}