'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin token exists in local storage
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);

    // Listen for storage events (login/logout)
    const handleStorageChange = () => {
      const token = localStorage.getItem('adminToken');
      setIsAdmin(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!isAdmin) return null;

  return (
    <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-gray-900">
      Admin
    </Link>
  );
}