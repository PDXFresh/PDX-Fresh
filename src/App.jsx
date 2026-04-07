import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "pdxfresh2026";

const INITIAL_STORES = [
  { id: 1, name: "New Seasons Market", type: "Local Grocer", neighborhood: "Multiple Locations", color: "#4a7c59", accent: "#eaf4ee", emoji: "🌿" },
  { id: 2, name: "Whole Foods", type: "Natural Grocer", neighborhood: "Pearl District", color: "#2d6a4f", accent: "#e8f5ee", emoji: "🍃" },
  { id: 3, name: "Market of Choice", type: "Oregon Local", neighborhood: "NW Portland", color: "#8b5e3c", accent: "#f5ece4", emoji: "🧺" },
  { id: 4, name: "Green Zebra", type: "Neighborhood Market", neighborhood: "Multiple Locations", color: "#5a7a3a", accent: "#eef4e6", emoji: "🦓" },
  { id: 5, name: "Grocery Outlet", type: "Discount Grocer", neighborhood: "Multiple Locations", color: "#b5451b", accent: "#faeee9", emoji: "🏷️" },
  { id: 6, name: "World Foods", type: "International Market", neighborhood: "830 NW Everett St", color: "#6b5b95", accent: "#f0edf8", emoji: "🌍" },
  { id: 7, name: "Trader Joe's", type: "Specialty Grocer", neighborhood: "Multiple Locations", color: "#c17f24", accent: "#faf2e4", emoji: "🔔" },
  { id: 8, name: "Barbur World Foods", type: "International Market", neighborhood: "SW Barbur Blvd", color: "#2e6b8a", accent: "#e6f2f8", emoji: "🌏" },
  { id: 9, name: "Providers Fine Foods", type: "Specialty Grocer", neighborhood: "NE Portland", color: "#7a4f3a", accent: "#f4ede8", emoji: "✨" },
  { id: 10, name: "Food Front Co-op", type: "Community Co-op", neighborhood: "NW Portland", color: "#3d7a6b", accent: "#e6f4f1", emoji: "🌾" },
];

const INITIAL_DEALS = [
  { id: 101, storeId: 1, item: "Organic Strawberries", category: "Produce", price: "3.99", unit: "1 lb", orig: "5.99", tag: "Oregon Grown", photo: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80" },
  { id: 102, storeId: 1, item: "Wild Coho Salmon", category: "Seafood", price: "11.99", unit: "lb", orig: "16.99", tag: "Local Catch", photo: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80" },
  { id: 103, storeId: 1, item: "Lacinato Kale", category: "Produce", price: "1.49", unit: "bunch", orig: "2.49", tag: "Willamette Valley", photo: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400&q=80" },
  { id: 104, storeId: 1, item: "Tillamook Cheddar", category: "Dairy", price: "5.99", unit: "10 oz", orig: "7.49", tag: "Oregon Made", photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80" },
  { id: 105, storeId: 1, item: "Sourdough Loaf", category: "Bakery", price: "4.50", unit: "loaf", orig: "6.00", tag: "House Baked", photo: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80" },
  { id: 201, storeId: 2, item: "Organic Blueberries", category: "Produce", price: "4.99", unit: "pint", orig: "6.99", tag: "Organic", photo: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80" },
  { id: 202, storeId: 2, item: "365 Greek Yogurt", category: "Dairy", price: "3.49", unit: "32 oz", orig: "4.99", tag: "Store Brand", photo: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
  { id: 203, storeId: 2, item: "Atlantic Salmon Fillet", category: "Seafood", price: "12.99", unit: "lb", orig: "17.99", tag: "Fresh Cut", photo: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" },
  { id: 204, storeId: 2, item: "Baby Arugula", category: "Produce", price: "2.99", unit: "5 oz", orig: "4.49", tag: "Organic", photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: 205, storeId: 2, item: "Almond Butter", category: "Pantry", price: "7.99", unit: "16 oz", orig: "10.99", tag: "365 Brand", photo: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80" },
  { id: 301, storeId: 3, item: "Rainier Cherries", category: "Produce", price: "3.99", unit: "lb", orig: "5.99", tag: "Pacific NW", photo: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&q=80" },
  { id: 302, storeId: 3, item: "Oregon Brie", category: "Dairy", price: "6.49", unit: "8 oz", orig: "8.99", tag: "Local Creamery", photo: "https://images.unsplash.com/photo-1589881133825-bfb2a5a3e4b7?w=400&q=80" },
  { id: 303, storeId: 3, item: "Heirloom Tomatoes", category: "Produce", price: "3.49", unit: "lb", orig: "5.49", tag: "Heirloom", photo: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80" },
  { id: 304, storeId: 3, item: "Rotisserie Chicken", category: "Deli", price: "8.99", unit: "each", orig: "11.99", tag: "Fresh Daily", photo: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=400&q=80" },
  { id: 305, storeId: 3, item: "Willamette Pinot Noir", category: "Wine", price: "16.99", unit: "bottle", orig: "22.99", tag: "Willamette", photo: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80" },
  { id: 401, storeId: 4, item: "Local Honey", category: "Pantry", price: "7.99", unit: "12 oz", orig: "10.99", tag: "Portland Bees", photo: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80" },
  { id: 402, storeId: 4, item: "Snap Peas", category: "Produce", price: "2.49", unit: "lb", orig: "3.99", tag: "Local Farm", photo: "https://images.unsplash.com/photo-1587049332298-1c42e83937a7?w=400&q=80" },
  { id: 403, storeId: 4, item: "Oat Milk", category: "Dairy", price: "3.99", unit: "32 oz", orig: "5.49", tag: "Organic", photo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: 404, storeId: 4, item: "Kombucha GT's", category: "Drinks", price: "2.99", unit: "16 oz", orig: "4.49", tag: "Raw", photo: "https://images.unsplash.com/photo-1601924287811-e34de5d17476?w=400&q=80" },
  { id: 405, storeId: 4, item: "Bulk Granola", category: "Bulk", price: "3.49", unit: "lb", orig: "5.00", tag: "House Made", photo: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&q=80" },
  { id: 501, storeId: 5, item: "Organic Apples", category: "Produce", price: "1.99", unit: "3 lb bag", orig: "4.99", tag: "Big Savings", photo: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80" },
  { id: 502, storeId: 5, item: "Pasta Variety Pack", category: "Pantry", price: "2.49", unit: "3 pack", orig: "6.99", tag: "Stock Up", photo: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80" },
  { id: 503, storeId: 5, item: "Frozen Broccoli", category: "Frozen", price: "1.29", unit: "12 oz", orig: "2.99", tag: "Value", photo: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80" },
  { id: 504, storeId: 5, item: "Greek Yogurt 4pk", category: "Dairy", price: "2.99", unit: "4 pack", orig: "6.49", tag: "Clearance", photo: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
  { id: 505, storeId: 5, item: "Sparkling Water 12pk", category: "Drinks", price: "3.99", unit: "12 pack", orig: "8.99", tag: "Big Deal", photo: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80" },
  { id: 601, storeId: 6, item: "Persian Cucumbers", category: "Produce", price: "2.49", unit: "lb", orig: "3.99", tag: "Fresh", photo: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=80" },
  { id: 602, storeId: 6, item: "Mango (Ataulfo)", category: "Produce", price: "0.79", unit: "each", orig: "1.49", tag: "Honey Mango", photo: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80" },
  { id: 603, storeId: 6, item: "Fresh Turmeric Root", category: "Produce", price: "1.99", unit: "lb", orig: "3.49", tag: "Specialty", photo: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80" },
  { id: 604, storeId: 6, item: "Basmati Rice", category: "Pantry", price: "8.99", unit: "10 lb", orig: "13.99", tag: "Long Grain", photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80" },
  { id: 605, storeId: 6, item: "Halloumi Cheese", category: "Dairy", price: "5.49", unit: "8 oz", orig: "7.99", tag: "Imported", photo: "https://images.unsplash.com/photo-1589881133825-bfb2a5a3e4b7?w=400&q=80" },
  { id: 701, storeId: 7, item: "Mandarin Oranges", category: "Produce", price: "3.99", unit: "3 lb bag", orig: "5.49", tag: "Seasonal", photo: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&q=80" },
  { id: 702, storeId: 7, item: "Everything Bagel Seasoning", category: "Pantry", price: "1.99", unit: "2.3 oz", orig: "2.99", tag: "TJ's Fave", photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { id: 703, storeId: 7, item: "Cauliflower Gnocchi", category: "Frozen", price: "2.69", unit: "12 oz", orig: "3.99", tag: "Fan Favorite", photo: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
  { id: 704, storeId: 7, item: "Unexpected Cheddar", category: "Dairy", price: "3.99", unit: "8 oz", orig: "5.49", tag: "TJ's Exclusive", photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80" },
  { id: 705, storeId: 7, item: "Cold Brew Coffee", category: "Drinks", price: "2.99", unit: "32 oz", orig: "4.49", tag: "Smooth", photo: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
  { id: 801, storeId: 8, item: "Fresh Fenugreek", category: "Produce", price: "1.49", unit: "bunch", orig: "2.49", tag: "Specialty", photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { id: 802, storeId: 8, item: "Lamb Shoulder", category: "Meat", price: "7.99", unit: "lb", orig: "11.99", tag: "Halal", photo: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&q=80" },
  { id: 803, storeId: 8, item: "Dried Limes", category: "Pantry", price: "2.99", unit: "4 oz", orig: "4.99", tag: "Persian", photo: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80" },
  { id: 804, storeId: 8, item: "Fresh Pita Bread", category: "Bakery", price: "2.49", unit: "pack", orig: "3.99", tag: "Fresh Baked", photo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
  { id: 805, storeId: 8, item: "Pomegranate Molasses", category: "Pantry", price: "3.99", unit: "10 oz", orig: "5.99", tag: "Imported", photo: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80" },
  { id: 901, storeId: 9, item: "Burrata Cheese", category: "Dairy", price: "6.99", unit: "4 oz", orig: "9.99", tag: "Fresh Daily", photo: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80" },
  { id: 902, storeId: 9, item: "Micro Greens Mix", category: "Produce", price: "4.99", unit: "2 oz", orig: "6.99", tag: "Local Farm", photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: 903, storeId: 9, item: "Imported Prosciutto", category: "Deli", price: "9.99", unit: "4 oz", orig: "13.99", tag: "San Daniele", photo: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&q=80" },
  { id: 904, storeId: 9, item: "Truffle Salt", category: "Pantry", price: "7.99", unit: "2 oz", orig: "11.99", tag: "Italian", photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { id: 905, storeId: 9, item: "Sourdough Crackers", category: "Pantry", price: "3.99", unit: "5 oz", orig: "5.49", tag: "Artisan", photo: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80" },
  { id: 1001, storeId: 10, item: "Bulk Quinoa", category: "Bulk", price: "3.99", unit: "lb", orig: "5.50", tag: "Organic", photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80" },
  { id: 1002, storeId: 10, item: "Free-Range Eggs", category: "Dairy", price: "5.49", unit: "dozen", orig: "7.99", tag: "Pasture Raised", photo: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80" },
  { id: 1003, storeId: 10, item: "Tempeh", category: "Protein", price: "3.29", unit: "8 oz", orig: "4.49", tag: "Local Made", photo: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=400&q=80" },
  { id: 1004, storeId: 10, item: "Bulk Oats", category: "Bulk", price: "1.29", unit: "lb", orig: "2.00", tag: "Organic", photo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80" },
  { id: 1005, storeId: 10, item: "Organic Spinach", category: "Produce", price: "2.99", unit: "5 oz", orig: "4.49", tag: "Organic", photo: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },
];

const CATEGORIES = ["All", "Produce", "Seafood", "Dairy", "Bakery", "Bulk", "Deli", "Meat", "Protein", "Drinks", "Pantry", "Frozen", "Wine"];

function pctOff(price, orig) {
  return Math.round((1 - parseFloat(price) / parseFloat(orig)) * 100);
}

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const update = (v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [val, update];
}

function AdminPanel({ deals, setDeals, onExit }) {
  const [selectedStore, setSelectedStore] = useState(INITIAL_STORES[0].id);
  const [form, setForm] = useState({ item: "", category: "Produce", price: "", unit: "", orig: "", tag: "" });
  const [editingId, setEditingId] = useState(null);
  const [tab, setTab] = useState("add");
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };
  const storeName = INITIAL_STORES.find(s => s.id === selectedStore)?.name;
  const storeDeals = deals.filter(d => d.storeId === selectedStore);
  const clearForm = () => setForm({ item: "", category: "Produce", price: "", unit: "", orig: "", tag: "" });
  const handleSave = () => {
    if (!form.item || !form.price || !form.orig || !form.unit) { showToast("Fill in all required fields"); return; }
    if (editingId) { setDeals(prev => prev.map(d => d.id === editingId ? { ...d, ...form, storeId: selectedStore } : d)); showToast("Updated!"); setEditingId(null); }
    else { setDeals(prev => [...prev, { ...form, id: Date.now(), storeId: selectedStore }]); showToast("Added!"); }
    clearForm();
  };
  const handleEdit = (deal) => { setForm({ item: deal.item, category: deal.category, price: deal.price, unit: deal.unit, orig: deal.orig, tag: deal.tag }); setEditingId(deal.id); setTab("add"); };
  const handleDelete = (id) => { setDeals(prev => prev.filter(d => d.id !== id)); showToast("Removed"); };
  const handleClearStore = () => { if (window.confirm(`Clear all ${storeName} deals?`)) { setDeals(prev => prev.filter(d => d.storeId !== selectedStore)); showToast("Cleared"); } };
  const handleReset = () => { if (window.confirm("Reset all deals?")) { setDeals(INITIAL_DEALS); showToast("Reset"); } };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ed", fontFamily: "'Nunito Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@600;700&family=Nunito+Sans:wght@300;400;600;700&display=swap');
        .ah{background:#2c4a2e;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;}
        .at{font-family:'Bitter',serif;font-size:18px;font-weight:700;color:#f0ebe3;}.at span{color:#a8d5a2;}
        .ax{font-size:12px;font-weight:700;color:#a8d5a2;background:rgba(168,213,162,0.15);border:1px solid rgba(168,213,162,0.3);padding:6px 14px;border-radius:20px;cursor:pointer;}
        .ab{padding:18px 16px 80px;max-width:560px;margin:0 auto;}
        .ac{background:#fff;border-radius:16px;border:1px solid #e8e0d5;margin-bottom:14px;overflow:hidden;}
        .ach{padding:13px 16px;background:#faf7f2;border-bottom:1px solid #e8e0d5;font-family:'Bitter',serif;font-size:13px;font-weight:700;color:#2c4a2e;}
        .acb{padding:16px;}
        .al{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#9a8a78;margin-bottom:5px;margin-top:11px;}
        .al:first-child{margin-top:0;}
        .ai{width:100%;padding:9px 12px;border:1.5px solid #ddd6cc;border-radius:8px;font-family:'Nunito Sans',sans-serif;font-size:14px;color:#2c2c2c;background:#fdfaf7;outline:none;}
        .ai:focus{border-color:#4a7c59;}
        .as{width:100%;padding:9px 12px;border:1.5px solid #ddd6cc;border-radius:8px;font-family:'Nunito Sans',sans-serif;font-size:14px;color:#2c2c2c;background:#fdfaf7;outline:none;}
        .ar{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .ap{width:100%;padding:12px;background:#2c4a2e;color:#a8d5a2;border:none;border-radius:10px;font-family:'Nunito Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:14px;}
        .ase{padding:6px 13px;background:none;border:1.5px solid #ddd;border-radius:8px;font-family:'Nunito Sans',sans-serif;font-size:12px;font-weight:600;color:#888;cursor:pointer;}
        .ad{padding:6px 13px;background:none;border:1.5px solid #f0c4b4;border-radius:8px;font-family:'Nunito Sans',sans-serif;font-size:12px;font-weight:600;color:#b5451b;cursor:pointer;}
        .atb{display:flex;border-bottom:1px solid #e8e0d5;}
        .atab{flex:1;padding:11px;font-family:'Nunito Sans',sans-serif;font-size:11px;font-weight:700;text-align:center;cursor:pointer;color:#aaa;border:none;background:none;border-bottom:2px solid transparent;text-transform:uppercase;letter-spacing:0.5px;}
        .atab.on{color:#2c4a2e;border-bottom-color:#4a7c59;}
        .adr{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid #f5f0e8;}
        .adr:last-child{border-bottom:none;}
        .asg{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .aso{padding:9px 11px;border-radius:10px;border:1.5px solid #ddd;cursor:pointer;display:flex;align-items:center;gap:7px;transition:all 0.15s;}
        .aso.on{border-color:var(--sc);background:var(--sc);}
        .atoast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#2c4a2e;color:#f0ebe3;padding:9px 18px;border-radius:20px;font-family:'Nunito Sans',sans-serif;font-size:13px;font-weight:600;z-index:300;white-space:nowrap;}
        .astats{display:flex;gap:10px;margin-bottom:14px;}
        .asc{flex:1;background:#fff;border-radius:12px;padding:12px;border:1px solid #e8e0d5;text-align:center;}
        .asn{font-family:'Bitter',serif;font-size:22px;font-weight:700;color:#2c4a2e;}
        .asl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#aaa;margin-top:2px;}
      `}</style>
      <div className="ah">
        <div className="at">PDX <span>Fresh</span> — Admin</div>
        <div className="ax" onClick={onExit}>← Back</div>
      </div>
      <div className="ab">
        <div className="astats">
          <div className="asc"><div className="asn">{deals.length}</div><div className="asl">Deals</div></div>
          <div className="asc"><div className="asn">{INITIAL_STORES.length}</div><div className="asl">Stores</div></div>
          <div className="asc"><div className="asn">{storeDeals.length}</div><div className="asl">This Store</div></div>
        </div>
        <div className="ac">
          <div className="ach">Select Store</div>
          <div className="acb">
            <div className="asg">
              {INITIAL_STORES.map(s => (
                <div key={s.id} className={`aso ${selectedStore === s.id ? "on" : ""}`} style={{ "--sc": s.color }} onClick={() => { setSelectedStore(s.id); clearForm(); setEditingId(null); }}>
                  <span style={{ fontSize: 15 }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: selectedStore === s.id ? "#fff" : "#2c2c2c" }}>{s.name}</div>
                    <div style={{ fontSize: 10, opacity: 0.6, color: selectedStore === s.id ? "#fff" : "#888" }}>{deals.filter(d => d.storeId === s.id).length} deals</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ac">
          <div className="atb">
            <button className={`atab ${tab === "add" ? "on" : ""}`} onClick={() => { setTab("add"); clearForm(); setEditingId(null); }}>{editingId ? "✏️ Editing" : "＋ Add Deal"}</button>
            <button className={`atab ${tab === "manage" ? "on" : ""}`} onClick={() => setTab("manage")}>Manage ({storeDeals.length})</button>
          </div>
          {tab === "add" && (
            <div className="acb">
              <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Store: <strong style={{ color: INITIAL_STORES.find(s => s.id === selectedStore)?.color }}>{storeName}</strong></div>
              <div className="al">Item Name *</div>
              <input className="ai" placeholder="e.g. Organic Strawberries" value={form.item} onChange={e => setForm(f => ({ ...f, item: e.target.value }))} />
              <div className="al">Category *</div>
              <select className="as" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="ar">
                <div><div className="al">Sale Price *</div><input className="ai" placeholder="3.99" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                <div><div className="al">Regular Price *</div><input className="ai" placeholder="5.99" value={form.orig} onChange={e => setForm(f => ({ ...f, orig: e.target.value }))} /></div>
              </div>
              <div className="ar">
                <div><div className="al">Unit *</div><input className="ai" placeholder="lb, bunch..." value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} /></div>
                <div><div className="al">Tag</div><input className="ai" placeholder="Oregon Grown..." value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} /></div>
              </div>
              {form.price && form.orig && parseFloat(form.price) < parseFloat(form.orig) && (
                <div style={{ marginTop: 10, padding: "7px 11px", background: "#eaf4ee", borderRadius: 7, fontSize: 12, color: "#4a7c59", fontWeight: 700 }}>✓ {pctOff(form.price, form.orig)}% off — looks good!</div>
              )}
              <button className="ap" onClick={handleSave}>{editingId ? "✓ Update Deal" : "＋ Add Deal"}</button>
              {editingId && <button className="ase" style={{ width: "100%", marginTop: 8 }} onClick={() => { clearForm(); setEditingId(null); }}>Cancel</button>}
            </div>
          )}
          {tab === "manage" && (
            <div className="acb">
              {storeDeals.length === 0 ? <div style={{ textAlign: "center", padding: "20px 0", color: "#bbb", fontSize: 13 }}>No deals for {storeName} yet.</div> : (
                <>
                  {storeDeals.map(deal => (
                    <div key={deal.id} className="adr">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#2c2c2c" }}>{deal.item}</div>
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{deal.category} · {deal.unit} · {pctOff(deal.price, deal.orig)}% off</div>
                      </div>
                      <div style={{ fontFamily: "'Bitter',serif", fontSize: 15, fontWeight: 700, color: "#2c4a2e", marginRight: 10 }}>${deal.price}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="ase" onClick={() => handleEdit(deal)}>Edit</button>
                        <button className="ad" onClick={() => handleDelete(deal.id)}>✕</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f0ebe4", display: "flex", justifyContent: "flex-end" }}>
                    <button className="ad" onClick={handleClearStore}>Clear all {storeName} deals</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="ac">
          <div className="ach" style={{ color: "#b5451b" }}>⚠️ Danger Zone</div>
          <div className="acb">
            <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>Reset everything back to sample deals.</div>
            <button className="ad" onClick={handleReset}>Reset all deals to defaults</button>
          </div>
        </div>
      </div>
      {toast && <div className="atoast">✓ {toast}</div>}
    </div>
  );
}

function AdminLogin({ onSuccess }) {
  const [pw, setPw] = useState(""); const [err, setErr] = useState(false);
  const go = () => { if (pw === ADMIN_PASSWORD) onSuccess(); else { setErr(true); setTimeout(() => setErr(false), 1500); } };
  return (
    <div style={{ minHeight: "100vh", background: "#2c4a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Nunito+Sans:wght@400;600&display=swap');`}</style>
      <div style={{ fontSize: 52, marginBottom: 14 }}>🌿</div>
      <div style={{ fontFamily: "'Bitter',serif", fontSize: 26, fontWeight: 700, color: "#f0ebe3", marginBottom: 4 }}>PDX <span style={{ color: "#a8d5a2" }}>Fresh</span></div>
      <div style={{ fontFamily: "'Nunito Sans',sans-serif", fontSize: 13, color: "#7aaa82", marginBottom: 30 }}>Admin Panel</div>
      <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && go()}
        style={{ width: "100%", maxWidth: 260, padding: "11px 16px", borderRadius: 10, border: `1.5px solid ${err ? "#e07755" : "rgba(255,255,255,0.2)"}`, background: "rgba(255,255,255,0.1)", color: "#f0ebe3", fontFamily: "'Nunito Sans',sans-serif", fontSize: 15, outline: "none", textAlign: "center" }} />
      {err && <div style={{ color: "#e07755", fontSize: 12, marginTop: 8, fontFamily: "'Nunito Sans',sans-serif" }}>Incorrect password</div>}
      <button onClick={go} style={{ marginTop: 12, width: "100%", maxWidth: 260, padding: "12px", background: "#a8d5a2", color: "#2c4a2e", border: "none", borderRadius: 10, fontFamily: "'Nunito Sans',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
    </div>
  );
}

export default function App() {
  const [deals, setDeals] = useLocalStorage("pdxfresh_deals", INITIAL_DEALS);
  const [view, setView] = useState("browse");
  const [adminMode, setAdminMode] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [addedIds, setAddedIds] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [tapCount, setTapCount] = useState(0);

  const handleLogoTap = () => { const n = tapCount + 1; setTapCount(n); if (n >= 5) { setAdminMode(true); setTapCount(0); } setTimeout(() => setTapCount(0), 3000); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const addToList = (deal) => { if (!addedIds.has(deal.id)) { setShoppingList(p => [...p, deal]); setAddedIds(p => new Set([...p, deal.id])); showToast(`${deal.item} added`); } };
  const removeFromList = (id) => { setShoppingList(p => p.filter(d => d.id !== id)); setAddedIds(p => { const n = new Set(p); n.delete(id); return n; }); };

  const allDeals = deals.map(d => ({ ...d, storeName: INITIAL_STORES.find(s => s.id === d.storeId)?.name || "", storeColor: INITIAL_STORES.find(s => s.id === d.storeId)?.color || "#888", storeAccent: INITIAL_STORES.find(s => s.id === d.storeId)?.accent || "#eee", storeEmoji: INITIAL_STORES.find(s => s.id === d.storeId)?.emoji || "🏪" }));
  const filteredDeals = allDeals.filter(d => (!selectedStore || d.storeName === selectedStore) && (selectedCategory === "All" || d.category === selectedCategory) && (!searchQuery || d.item.toLowerCase().includes(searchQuery.toLowerCase())));
  const listByStore = shoppingList.reduce((acc, d) => { if (!acc[d.storeName]) acc[d.storeName] = []; acc[d.storeName].push(d); return acc; }, {});
  const totalSavings = shoppingList.reduce((sum, d) => sum + (parseFloat(d.orig) - parseFloat(d.price)), 0);

  if (adminMode && !adminAuthed) return <AdminLogin onSuccess={() => setAdminAuthed(true)} />;
  if (adminMode && adminAuthed) return <AdminPanel deals={deals} setDeals={setDeals} onExit={() => { setAdminMode(false); setAdminAuthed(false); }} />;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ed" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;0,700;1,400&family=Nunito+Sans:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hdr { background: #2c4a2e; padding: 0 18px; position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #a8d5a2; }
        .logo { display: flex; align-items: center; gap: 9px; padding: 13px 0; cursor: pointer; user-select: none; }
        .logo-text { font-family: 'Bitter', serif; font-size: 20px; font-weight: 700; color: #f0ebe3; }
        .logo-text em { color: #a8d5a2; font-style: italic; }
        .loc { font-family: 'Nunito Sans', sans-serif; font-size: 11px; color: #7aaa82; background: rgba(168,213,162,0.12); border: 1px solid rgba(168,213,162,0.25); padding: 4px 10px; border-radius: 20px; }
        .hero { position: relative; padding: 0 18px 26px; overflow: hidden; min-height: 220px; }
        .hero-bg { position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80'); background-size: cover; background-position: center 40%; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(28,52,30,0.88) 0%, rgba(28,52,30,0.75) 50%, rgba(28,52,30,0.65) 100%); }
        .hero-content { position: relative; z-index: 1; }
        .hero-stripe { height: 3px; background: linear-gradient(90deg, #a8d5a2, #c8e6b0, #d4a96a, #8b5e3c); margin-bottom: 20px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(168,213,162,0.2); border: 1px solid rgba(168,213,162,0.4); border-radius: 20px; padding: 4px 12px; margin-bottom: 11px; backdrop-filter: blur(4px); }
        .hero-dot { width: 6px; height: 6px; background: #a8d5a2; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        .hero-badge-txt { font-family: 'Nunito Sans', sans-serif; font-size: 10px; font-weight: 700; color: #a8d5a2; text-transform: uppercase; letter-spacing: 1px; }
        .hero-title { font-family: 'Bitter', serif; font-size: 28px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 6px; text-shadow: 0 2px 12px rgba(0,0,0,0.3); }
        .hero-title em { color: #a8d5a2; font-style: italic; }
        .hero-sub { font-family: 'Nunito Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); margin-bottom: 18px; line-height: 1.5; text-shadow: 0 1px 6px rgba(0,0,0,0.3); }
        .hero-chips { display: flex; gap: 10px; }
        .hchip { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; backdrop-filter: blur(4px); }
        .hchip-n { font-family: 'Bitter', serif; font-size: 16px; font-weight: 700; color: #a8d5a2; }
        .hchip-l { font-family: 'Nunito Sans', sans-serif; font-size: 10px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.5px; }
        .tabs { display: flex; background: #fff; border-bottom: 1px solid #e8e0d5; }
        .tab { flex: 1; padding: 12px 8px; font-family: 'Nunito Sans', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #b0a090; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab.on { color: #2c4a2e; border-bottom-color: #4a7c59; }
        .sbar { padding: 12px 16px; background: #fff; border-bottom: 1px solid #ede5d8; }
        .sbox { display: flex; align-items: center; gap: 9px; background: #f7f3ed; border: 1.5px solid #ddd6cc; border-radius: 10px; padding: 9px 13px; }
        .sbox:focus-within { border-color: #4a7c59; }
        .sinp { flex: 1; border: none; background: none; font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #2c2c2c; outline: none; }
        .sinp::placeholder { color: #bbb0a0; }
        .strow { display: flex; gap: 8px; padding: 12px 14px; overflow-x: auto; background: #faf7f2; border-bottom: 1px solid #ede5d8; scrollbar-width: none; }
        .strow::-webkit-scrollbar { display: none; }
        .stchip { display: flex; align-items: center; gap: 6px; padding: 7px 13px; border-radius: 24px; border: 1.5px solid #ddd6cc; background: #fff; cursor: pointer; white-space: nowrap; transition: all 0.15s; font-family: 'Nunito Sans', sans-serif; font-size: 12px; font-weight: 600; color: #666; flex-shrink: 0; }
        .stchip.on { border-color: var(--sc); background: var(--sc); color: #fff; }
        .sdot { width: 7px; height: 7px; border-radius: 50%; background: var(--sc); flex-shrink: 0; }
        .stchip.on .sdot { background: rgba(255,255,255,0.5); }
        .catrow { display: flex; gap: 7px; padding: 10px 14px; overflow-x: auto; background: #f7f3ed; scrollbar-width: none; border-bottom: 1px solid #e8e0d5; }
        .catrow::-webkit-scrollbar { display: none; }
        .cchip { padding: 5px 13px; border-radius: 20px; border: 1px solid #ddd6cc; background: #fff; cursor: pointer; font-family: 'Nunito Sans', sans-serif; font-size: 11px; font-weight: 700; color: #7a6a5a; white-space: nowrap; transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.3px; flex-shrink: 0; }
        .cchip.on { background: #2c4a2e; color: #a8d5a2; border-color: #2c4a2e; }
        .rhdr { padding: 12px 16px 4px; display: flex; justify-content: space-between; align-items: baseline; }
        .rtitle { font-family: 'Bitter', serif; font-size: 17px; font-weight: 700; color: #2c2c2c; }
        .rcount { font-family: 'Nunito Sans', sans-serif; font-size: 12px; color: #b0a090; }
        .grid { padding: 8px 12px 110px; display: grid; grid-template-columns: repeat(auto-fill, minmax(158px, 1fr)); gap: 10px; }
        .card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e8e0d5; transition: all 0.2s; opacity: 0; animation: cin 0.3s ease forwards; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(44,74,46,0.1); }
        @keyframes cin { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .cphoto { width: 100%; height: 110px; object-fit: cover; display: block; background: #f0ebe3; }
        .cphoto-wrap { position: relative; }
        .cstripe { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; }
        .cbody { padding: 10px 12px 6px; }
        .ctag { display: inline-block; font-family: 'Nunito Sans', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 4px; margin-bottom: 6px; }
        .cname { font-family: 'Bitter', serif; font-size: 14px; font-weight: 700; color: #2c2c2c; line-height: 1.25; margin-bottom: 2px; }
        .cstore { font-family: 'Nunito Sans', sans-serif; font-size: 10px; color: #b0a090; margin-bottom: 7px; display: flex; align-items: center; gap: 4px; }
        .cprice { font-family: 'Bitter', serif; font-size: 22px; font-weight: 700; color: #2c4a2e; line-height: 1; }
        .cunit { font-family: 'Nunito Sans', sans-serif; font-size: 10px; color: #b0a090; margin-top: 1px; }
        .corig { font-family: 'Nunito Sans', sans-serif; font-size: 11px; color: #ccc; text-decoration: line-through; margin-top: 2px; }
        .cfoot { display: flex; align-items: center; justify-content: space-between; padding: 7px 12px 10px; border-top: 1px solid #f5f0e8; margin-top: 7px; }
        .cpct { font-family: 'Nunito Sans', sans-serif; font-size: 11px; font-weight: 700; color: #4a7c59; }
        .abtn { width: 30px; height: 30px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.15s; }
        .abtn.off { background: #2c4a2e; color: #a8d5a2; }
        .abtn.on { background: #4a7c59; color: #fff; font-size: 14px; }
        .fab { position: fixed; bottom: 24px; right: 18px; background: #2c4a2e; color: #f0ebe3; border: none; border-radius: 28px; padding: 13px 20px; font-family: 'Nunito Sans', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 24px rgba(44,74,46,0.4); z-index: 50; animation: fabIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes fabIn { from{opacity:0;transform:scale(0.8) translateY(10px);}to{opacity:1;transform:scale(1) translateY(0);} }
        .fabb { background: #a8d5a2; color: #2c4a2e; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; }
        .lview { padding: 16px 16px 110px; }
        .lempty { text-align: center; padding: 60px 20px; }
        .lempty-i { font-size: 52px; margin-bottom: 14px; }
        .lempty-t { font-family: 'Bitter', serif; font-size: 22px; color: #b0a090; margin-bottom: 8px; }
        .lempty-s { font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #ccc; }
        .lh { font-family: 'Bitter', serif; font-size: 22px; font-weight: 700; color: #2c2c2c; margin-bottom: 3px; }
        .lsh { font-family: 'Nunito Sans', sans-serif; font-size: 13px; color: #b0a090; margin-bottom: 20px; }
        .lgrp { margin-bottom: 20px; }
        .lsthdr { display: flex; align-items: center; gap: 8px; padding: 8px 0 10px; border-bottom: 2px solid var(--sc); margin-bottom: 8px; }
        .lstname { font-family: 'Bitter', serif; font-size: 15px; font-weight: 700; color: #2c2c2c; }
        .litem { display: flex; align-items: center; justify-content: space-between; background: #fff; border-radius: 10px; padding: 11px 14px; margin-bottom: 7px; border: 1px solid #e8e0d5; }
        .liname { font-family: 'Nunito Sans', sans-serif; font-size: 14px; font-weight: 700; color: #2c2c2c; }
        .limeta { font-family: 'Nunito Sans', sans-serif; font-size: 11px; color: #b0a090; margin-top: 2px; }
        .lprice { font-family: 'Bitter', serif; font-size: 17px; font-weight: 700; color: #2c4a2e; margin-right: 10px; }
        .rmbtn { background: none; border: none; color: #ddd; cursor: pointer; font-size: 20px; padding: 2px 4px; transition: color 0.15s; }
        .rmbtn:hover { color: #b5451b; }
        .savebox { background: #2c4a2e; border-radius: 14px; padding: 18px 20px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center; }
        .savelbl { font-family: 'Nunito Sans', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #7aaa82; margin-bottom: 4px; }
        .saveamt { font-family: 'Bitter', serif; font-size: 30px; font-weight: 700; color: #a8d5a2; }
        .savesub { font-family: 'Nunito Sans', sans-serif; font-size: 11px; color: #5a8a62; }
        .toast { position: fixed; bottom: 82px; left: 50%; transform: translateX(-50%); background: #2c4a2e; color: #f0ebe3; padding: 9px 18px; border-radius: 22px; font-family: 'Nunito Sans', sans-serif; font-size: 13px; font-weight: 600; z-index: 200; box-shadow: 0 4px 20px rgba(44,74,46,0.3); animation: tin 0.2s ease; white-space: nowrap; border: 1px solid rgba(168,213,162,0.3); }
        @keyframes tin { from{opacity:0;transform:translateX(-50%) translateY(8px);}to{opacity:1;transform:translateX(-50%) translateY(0);} }
        .nores { text-align: center; padding: 48px 20px; font-family: 'Nunito Sans', sans-serif; font-size: 14px; color: #b0a090; }
      `}</style>

      <div className="hdr">
        <div className="logo" onClick={handleLogoTap}>
          <span style={{ fontSize: 22 }}>🌿</span>
          <div className="logo-text">PDX <em>Fresh</em></div>
        </div>
        <div className="loc">📍 Portland, OR</div>
      </div>

      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-stripe" />
          <div className="hero-badge"><div className="hero-dot" /><span className="hero-badge-txt">Updated Weekly</span></div>
          <div className="hero-title">Your local<br /><em>farmers market,</em><br />in your pocket.</div>
          <div className="hero-sub">Fresh deals from Portland's best independent grocers — all in one place.</div>
          <div className="hero-chips">
            <div className="hchip"><span className="hchip-n">{deals.length}</span><span className="hchip-l">Deals</span></div>
            <div className="hchip"><span className="hchip-n">{INITIAL_STORES.length}</span><span className="hchip-l">Stores</span></div>
            <div className="hchip"><span className="hchip-n">PDX</span><span className="hchip-l">Local Only</span></div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${view === "browse" ? "on" : ""}`} onClick={() => setView("browse")}>Browse Deals</button>
        <button className={`tab ${view === "list" ? "on" : ""}`} onClick={() => setView("list")}>My List {shoppingList.length > 0 ? `(${shoppingList.length})` : ""}</button>
      </div>

      {view === "browse" && (
        <>
          <div className="sbar">
            <div className="sbox">
              <span style={{ fontSize: 14, opacity: 0.4 }}>🔍</span>
              <input className="sinp" placeholder="Search strawberries, salmon, oats..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              {searchQuery && <span style={{ cursor: "pointer", color: "#ccc", fontSize: 18 }} onClick={() => setSearchQuery("")}>×</span>}
            </div>
          </div>
          <div className="strow">
            <div className="stchip" style={{ "--sc": "#2c4a2e" }} onClick={() => setSelectedStore(null)}>
              <div className="sdot" style={{ background: selectedStore ? "#ccc" : "#2c4a2e" }} />
              <span style={{ fontWeight: !selectedStore ? 700 : 600 }}>All Stores</span>
            </div>
            {INITIAL_STORES.map(s => (
              <div key={s.id} className={`stchip ${selectedStore === s.name ? "on" : ""}`} style={{ "--sc": s.color }} onClick={() => setSelectedStore(selectedStore === s.name ? null : s.name)}>
                <div className="sdot" />{s.emoji} {s.name}
              </div>
            ))}
          </div>
          <div className="catrow">
            {CATEGORIES.map(c => <div key={c} className={`cchip ${selectedCategory === c ? "on" : ""}`} onClick={() => setSelectedCategory(c)}>{c}</div>)}
          </div>
          <div className="rhdr">
            <div className="rtitle">{selectedStore || (selectedCategory !== "All" ? selectedCategory : "All Deals")}</div>
            <div className="rcount">{filteredDeals.length} deal{filteredDeals.length !== 1 ? "s" : ""} this week</div>
          </div>
          {filteredDeals.length === 0 ? <div className="nores">No deals found — try a different search.</div> : (
            <div className="grid">
              {filteredDeals.map((deal, i) => {
                const store = INITIAL_STORES.find(s => s.id === deal.storeId);
                const isAdded = addedIds.has(deal.id);
                return (
                  <div key={deal.id} className="card" style={{ animationDelay: `${Math.min(i * 25, 280)}ms` }}>
                    <div className="cphoto-wrap">
                      <img className="cphoto" src={deal.photo} alt={deal.item} loading="lazy" />
                      <div className="cstripe" style={{ background: store?.color }} />
                    </div>
                    <div className="cbody">
                      <div className="ctag" style={{ background: store?.accent, color: store?.color }}>{deal.tag || deal.category}</div>
                      <div className="cname">{deal.item}</div>
                      <div className="cstore"><span>{store?.emoji}</span>{deal.storeName}</div>
                      <div className="cprice">${deal.price}</div>
                      <div className="cunit">per {deal.unit}</div>
                      <div className="corig">was ${deal.orig}</div>
                    </div>
                    <div className="cfoot">
                      <span className="cpct">↓ {pctOff(deal.price, deal.orig)}% off</span>
                      <button className={`abtn ${isAdded ? "on" : "off"}`} onClick={() => addToList(deal)}>{isAdded ? "✓" : "+"}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {shoppingList.length > 0 && (
            <button className="fab" onClick={() => setView("list")}>🛒 My List <span className="fabb">{shoppingList.length}</span></button>
          )}
        </>
      )}

      {view === "list" && (
        <div className="lview">
          {shoppingList.length === 0 ? (
            <div className="lempty">
              <div className="lempty-i">🧺</div>
              <div className="lempty-t">Your basket is empty</div>
              <div className="lempty-s">Browse deals and tap + to add items</div>
            </div>
          ) : (
            <>
              <div className="lh">Shopping List</div>
              <div className="lsh">Organized by store for easy shopping</div>
              {Object.entries(listByStore).map(([storeName, items]) => {
                const store = INITIAL_STORES.find(s => s.name === storeName);
                return (
                  <div key={storeName} className="lgrp">
                    <div className="lsthdr" style={{ "--sc": store?.color }}>
                      <span style={{ fontSize: 16 }}>{store?.emoji}</span>
                      <span className="lstname">{storeName}</span>
                      <span style={{ fontFamily: "'Nunito Sans',sans-serif", fontSize: 11, color: "#b0a090", marginLeft: "auto" }}>{items.length} item{items.length > 1 ? "s" : ""}</span>
                    </div>
                    {items.map(item => (
                      <div key={item.id} className="litem">
                        <div style={{ flex: 1 }}>
                          <div className="liname">{item.item}</div>
                          <div className="limeta">{item.unit} · <span style={{ color: "#4a7c59", fontWeight: 700 }}>{pctOff(item.price, item.orig)}% off</span></div>
                        </div>
                        <div className="lprice">${item.price}</div>
                        <button className="rmbtn" onClick={() => removeFromList(item.id)}>×</button>
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="savebox">
                <div>
                  <div className="savelbl">Est. Total Savings</div>
                  <div className="saveamt">${totalSavings.toFixed(2)}</div>
                  <div className="savesub">vs. regular prices</div>
                </div>
                <span style={{ fontSize: 42 }}>🌿</span>
              </div>
            </>
          )}
        </div>
      )}

      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}
