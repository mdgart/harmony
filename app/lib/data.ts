import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  Tasks,
  Events,
  Announcements,
  Announcement,
  Groups,
  GroupLeader,
  GroupMember,
  Group,
  Event,
  Task,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import axiosWithAuth from './axiosWithAuth';

const ITEMS_PER_PAGE = 6;

export async function fetchTasks() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  
  try {
      try {
        const response = await axiosWithAuth.get<Tasks>(process.env.HARMONY_URL+'/api/tasks', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.code === 200 && response.data.message === 'Got tasks') {
          return response.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Failed to authenticate user:', error);
        return null;
      } 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks data.');
  }
}

export async function fetchEvents() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  
  try {
      try {
        const response = await axiosWithAuth.get<Events>(process.env.HARMONY_URL+'/api/trips', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.code === 200 && response.data.message === 'Got Experiences') {
          return response.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Failed to authenticate user:', error);
        return null;
      } 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events data.');
  }
}


export async function fetchAnnouncements() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  
  try {
      try {
        const response = await axiosWithAuth.get<Announcements>(process.env.HARMONY_URL+'/api/announcements', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.code === 200 && response.data.message === 'Got Announcements') {
          return response.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Failed to authenticate user:', error);
        return null;
      } 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events data.');
  }
}

export async function fetchFilteredAnnouncements(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    try {
      const response = await axiosWithAuth.get<Announcements>(process.env.HARMONY_URL+'/api/announcements', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      if (response.data.code === 200 && response.data.message === 'Got Posts') {
        return response.data.data;
      } else {
        console.log('Failed to fetch announcements');
        return null;
      }
    } catch (error) {
      console.error('Failed to authenticate user:', error);
      return null;
    } 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events data.');
  }
}

export async function fetchAnnouncementById(id: string) {
  noStore();
  try {
    
    try {
      const response = await axiosWithAuth.get<Announcements>(process.env.HARMONY_URL+'/api/announcements/'+id, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.code === 200 && response.data.message === 'Got Post') {
        return {
          "id": (response.data.data as any).id,
          "title": (response.data.data as any).title,
          "content": (response.data.data as any).content,
          "is_published": (response.data.data as any).is_published,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Failed to authenticate user:', error);
      return null;
    }

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch announcement.');
  }
}


// Tutorial Function 
// TODO: delete when not used
export async function fetchRevenue() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
