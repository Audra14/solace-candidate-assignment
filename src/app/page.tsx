"use client";

import React from 'react'
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Advocate, AdvocateDisplay } from "../types";
import { useEffect, useState } from "react";
import { ColDef } from 'ag-grid-community';

const colDefs: ColDef<AdvocateDisplay>[] = [
  { field: "advocate", filter: true, flex: 1 },
  { field: "specialties", filter: true, flex: 2 },
  { field: "yearsOfExperience", filter: true, flex: 1 },
  { field: "city", filter: true, flex: 1 },
  { field: "phoneNumber", filter: true, flex: 1 },
]

const pageSize = 5
const totalRows = 15
const pageSizeOptions = [5, 10, 15]

function mapAdvocates(a: Advocate): AdvocateDisplay {
  return {
    advocate: a.firstName + " " + a.lastName + ", " + a.degree, 
    city: a.city,  
    phoneNumber: a.phoneNumber,
    yearsOfExperience: a.yearsOfExperience, 
    specialties: a.specialties,
  }
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [advocates, setAdvocates] = useState<AdvocateDisplay[]>([]);

  useEffect(() => {
    setIsLoading(true)
    try {
      fetch(`/api/advocates?pageSize=${totalRows}`).then((response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data.map(mapAdvocates));
          setIsLoading(false)
        });
      });
    } catch(e){
      console.error("Failed to fetch advocates ", e)
    }
    
  }, []);

  return (
    <main>
      { isLoading ? "One moment please..." : 
      <div className="ag-theme-quartz h-[500px]">
        <AgGridReact
            rowData={advocates}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={pageSize}
            paginationPageSizeSelector={pageSizeOptions}
        />
      </div>
    }
    </main>
  )

}