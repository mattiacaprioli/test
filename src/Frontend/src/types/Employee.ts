export interface Department {
    code: string;
    description: string;
  }
  
  export interface Employee {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    department: Department | null;
  }
  