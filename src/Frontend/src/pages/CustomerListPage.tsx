import { useEffect, useState } from 'react';

type Customer = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  iban: string;
  category?: {
    code: string;
    description: string;
  };
};

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch('/api/customers/list')
      .then(async res => {
        console.log('Response status:', res.status);
        if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
        return res.json();
      })
      .then(setCustomers)
      .catch(err => console.error('Errore fetch customers', err));
  }, []);

  console.log('cursomers: ', customers)

  return (
    <>
      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <i>Nessun cliente trovato</i>
      ) : (
        <ul>
          {customers.map(c => (
            <li key={c.id}>
              <b>{c.name}</b> - {c.email} [{c.category?.code}]
            </li>
          ))}
        </ul>
      )}
    </>
  );
}