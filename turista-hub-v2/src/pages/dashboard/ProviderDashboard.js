import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Listings from './Listings';
import AddListing from './AddListing';
import Bookings from './Bookings';
import '../../styles/providerDash.css';
import Overviews from "./Overviews";
import EditListingPage from "./EditListingPage";



const ProviderDashboard = () => {


  
  // const {data:tours , loading , error} = useFetchA(`${BASE_URL}/${type}`)



  const [activeTab, setActiveTab] = useState("overviews");

  const [listings, setListings] = useState([
    { title: "Service 1", category: "Category A", price: 100, unit: "hour", rating: 4.5 },
    { title: "Service 2", category: "Category B", price: 200, unit: "day", rating: 3.8 },
  ]);

  const [bookings] = useState([
    { listingTitle: "Service 1", dateRange: "2025-06-01 to 2025-06-03", clientName: "Ahmed" },
    { listingTitle: "Service 2", dateRange: "2025-07-10 to 2025-07-12", clientName: "Sara" },
  ]);

  // الحالة للاحتفاظ برقم العنصر المراد تعديله
  const [editingIndex, setEditingIndex] = useState(null);

  // دالة لإضافة listing جديد
  const handleAddListing = (newListing) => {
    setListings(prev => [...prev, newListing]);
    setActiveTab("listings"); // يرجع تلقائياً لقائمة الـ Listings
  };

  // دالة عند الضغط على زر تعديل
  const handleEditListing = (index) => {
    setEditingIndex(index);
    setActiveTab("edit"); // ننتقل لتاب التعديل
  };

  // دالة لتحديث listing بعد التعديل
  const handleUpdateListing = (updatedListing) => {
    setListings(prev =>
      prev.map((item, i) => (i === editingIndex ? updatedListing : item))
    );
    setEditingIndex(null);
    setActiveTab("listings"); // نرجع لقائمة الـ Listings بعد التعديل
  };

  // دالة لحذف listing
  const handleDelete = (index) => {
    const filtered = listings.filter((_, i) => i !== index);
    setListings(filtered);
    // إذا كان العنصر المحذوف هو الذي في وضع تعديل، نلغي التعديل
    if (editingIndex === index) {
      setEditingIndex(null);
      setActiveTab("listings");
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "overviews":
        return <Overviews listings={listings} bookings={bookings} />;
      case "listings":
        return (
          <Listings 
            listings={listings} 
            onEdit={handleEditListing} 
            onDelete={handleDelete} 
          />
        );
      case "add":
        return <AddListing onAdd={handleAddListing} />;
      case "edit":
        // تأكد أنه عندنا عنصر للتعديل
        if (editingIndex === null) return <p>No listing selected for editing.</p>;

        return (
          <EditListingPage
            listing={listings[editingIndex]}
            onUpdate={handleUpdateListing}
            onCancel={() => {
              setEditingIndex(null);
              setActiveTab("listings");
            }}
          />
        );
      case "bookings":
        return <Bookings bookings={bookings} />;
      default:
        return <Overviews listings={listings} bookings={bookings} />;
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold tex">Provider Dashboard</h1>

      <ul className="nav nav-tabs mb-4 tex">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "overviews" ? "active" : ""}`}
            onClick={() => setActiveTab("overviews")}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "listings" ? "active" : ""}`}
            onClick={() => setActiveTab("listings")}
          >
            My Listings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Listing
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default ProviderDashboard;
