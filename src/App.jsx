sximport { useState, useEffect } from "react";

const ADMIN_PASSWORD = "pdxfresh2026";

const INITIAL_STORES = [
  { id: 1, name: "New Seasons Market", type: "Local Grocer", neighborhood: "Multiple Locations", color: "#3d6b4f", accent: "#d4edda", emoji: "🌿" },
  { id: 2, name: "Whole Foods", type: "Natural Grocer", neighborhood: "Pearl District", color: "#1a6b3c", accent: "#d4f0e0", emoji: "🍃" },
  { id: 3, name: "Market of Choice", type: "Oregon Local", neighborhood: "NW Portland", color: "#8b4513", accent: "#fdebd0", emoji: "🧺" },
  { id: 4, name: "Green Zebra", type: "Neighborhood Market", neighborhood: "Multiple Locations", color: "#4a7c3f", accent: "#e8f5e2", emoji: "🦓" },
  { id: 5, name: "Grocery Outlet", type: "Discount Grocer", neighborhood: "Multiple Locations", color: "#c0392b", accent: "#fde8e6", emoji: "🏷️" },
  { id: 6, name: "World Foods", type: "International Market", neighborhood: "830 NW Everett St", color: "#7b5ea7", accent: "#ede7f6", emoji: "🌍" },
  { id: 7, name: "Trader Joe's", type: "Specialty Grocer", neighborhood: "Multiple Locations", color: "#c07a2f", accent: "#fef3e2", emoji: "🔔" },
  { id: 8, name: "Barbur World Foods", type: "International Market", neighborhood: "SW Barbur Blvd", color: "#2874a6", accent: "#d6eaf8", emoji: "🌏" },
  { id: 9, name: "Providers Fine Foods", type: "Specialty Grocer", neighborhood: "NE Portland", color: "#5d4037", accent: "#efebe9", emoji: "✨" },
  { id: 10, name: "Food Front Co-op", type: "Community Co-op", neighborhood: "NW Portland", color: "#00695c", accent: "#e0f2f1", emoji: "🌾" },
];

const INITIAL_DEALS = [
  { id: 101, storeId: 1, item: "Organic Strawberries", category: "Produce", price: "3.99", unit: "1 lb", orig: "5.99", tag: "Oregon Grown" },
  { id: 102, storeId: 1, item: "Wild Coho Salmon", category: "Seafood", price: "11.99", unit: "lb", orig: "16.99", tag: "Local Catch" },
  { id: 103, storeId: 1, item: "Lacinato Kale", category: "Produce", price: "1.49", unit: "bunch", orig: "2.49", tag: "Willamette Valley" },
  { id: 104, storeId: 1, item: "Tillamook Cheddar", category: "Dairy", price: "5.99", unit: "10 oz", orig: "7.49", tag: "Oregon Made" },
  { id: 105, storeId: 1, item: "Sourdough Loaf", category: "Bakery", price: "4.50", unit: "loaf", orig: "6.00", tag: "House Baked" },
  { id: 201, storeId: 2, item: "Organic Blueberries", category: "Produce", price: "4.99", unit: "pint", orig: "6.99", tag: "Organic" },
  { id: 202, storeId: 2, item: "365 Greek Yogurt", category: "Dairy", price: "3.49", unit: "32 oz", orig: "4.99", tag: "Store Brand" },
  { id: 203, storeId: 2, item: "Atlantic Salmon Fillet", category: "Seafood", price: "12.99", unit: "lb", orig: "17.99", tag: "Fresh Cut" },
  { id: 204, storeId: 2, item: "Baby Arugula", category: "Produce", price: "2.99", unit: "5 oz", orig: "4.49", tag: "Organic" },
  { id: 205, storeId: 2, item: "Almond Butter", category: "Pantry", price: "7.99", unit: "16 oz", orig: "10.99", tag: "365 Brand" },
  { id: 301, storeId: 3, item: "Rainier Cherries", category: "Produce", price: "3.99", unit: "lb", orig: "5.99", tag: "Pacific NW" },
  { id: 302, storeId: 3, item: "Oregon Brie", category: "Dairy", price: "6.49", unit: "8 oz", orig: "8.99", tag: "Local Creamery" },
  { id: 303, storeId: 3, item: "Heirloom Tomatoes", category: "Produce", price: "3.49", unit: "lb", orig: "5.49", tag: "Heirloom" },
  { id: 304, storeId: 3, item: "Rotisserie Chicken", category: "Deli", price: "8.99", unit: "each", orig: "11.99", tag: "Fresh Daily" },
  { id: 305, storeId: 3, item: "Willamette Pinot Noir", category: "Wine", price: "16.99", unit: "bottle", orig: "22.99", tag: "Willamette" },
  { id: 401, storeId: 4, item: "Local Honey", category: "Pantry", price: "7.99", unit: "12 oz", orig: "10.99", tag: "Portland Bees" },
  { id: 402, storeId: 4, item: "Snap Peas", category: "Produce", price: "2.49", unit: "lb", orig: "3.99", tag: "Local Farm" },
  { id: 403, storeId: 4, item: "Oat Milk", category: "Dairy", price: "3.99", unit: "32 oz", orig: "5.49", tag: "Organic" },
  { id: 404, storeId: 4, item: "Kombucha GT's", category: "Drinks", price: "2.99", unit: "16 oz", orig: "4.49", tag: "Raw" },
  { id: 405, storeId: 4, item: "Bulk Granola", category: "Bulk", price: "3.49", unit: "lb", orig: "5.00", tag: "House Made" },
  { id: 501, storeId: 5, item: "Organic Apples", category: "Produce", price: "1.99", unit: "3 lb bag", orig: "4.99", tag: "Big Savings" },
  { id: 502, storeId: 5, item: "Pasta Variety Pack", category: "Pantry", price: "2.49", unit: "3 pack", orig: "6.99", tag: "Stock Up" },
  { id: 503, storeId: 5, item: "Frozen Broccoli", category: "Frozen", price: "1.29", unit: "12 oz", orig: "2.99", tag: "Value" },
  { id: 504, storeId: 5, item: "Greek Yogurt 4pk", category: "Dairy", price: "2.99", unit: "4 pack", orig: "6.49", tag: "Clearance" },
  { id: 505, storeId: 5, item: "Sparkling Water 12pk", category: "Drinks", price: "3.99", unit: "12 pack", orig: "8.99", tag: "Big Deal" },
  { id: 601, storeId: 6, item: "Persian Cucumbers", category: "Produce", price: "2.49", unit: "lb", orig: "3.99", tag: "Fresh" },
  { id: 602, storeId: 6, item: "Mango (Ataulfo)", category: "Produce", price: "0.79", unit: "each", orig: "1.49", tag: "Honey Mango" },
  { id: 603, storeId: 6, item: "Fresh Turmeric Root", category: "Produce", price: "1.99", unit: "lb", orig: "3.49", tag: "Specialty" },
  { id: 604, storeId: 6, item: "Basmati Rice", category: "Pantry", price: "8.99", unit: "10 lb", orig: "13.99", tag: "Long Grain" },
  { id: 605, storeId: 6, item: "Halloumi Cheese", category: "Dairy", price: "5.49", unit: "8 oz", orig: "7.99", tag: "Imported" },
  { id: 701, storeId: 7, item: "Mandarin Oranges", category: "Produce", price: "3.99", unit: "3 lb bag", orig: "5.49", tag: "Seasonal" },
  { id: 702, storeId: 7, item: "Everything Bagel Seasoning", category: "Pantry", price: "1.99", unit: "2.3 oz", orig: "2.99", tag: "TJ's Fave" },
  { id: 703, storeId: 7, item: "Cauliflower Gnocchi", category: "Frozen", price: "2.69", unit: "12 oz", orig: "3.99", tag: "Fan Favorite" },
  { id: 704, storeId: 7, item: "Unexpected Cheddar", category: "Dairy", price: "3.99", unit: "8 oz", orig: "5.49", tag: "TJ's Exclusive" },
  { id: 705, storeId: 7, item: "Cold Brew Coffee", category: "Drinks", price: "2.99", unit: "32 oz", orig: "4.49", tag: "Smooth" },
  { id: 801, storeId: 8, item: "Fresh Fenugreek", category: "Produce", price: "1.49", unit: "bunch", orig: "2.49", tag: "Specialty" },
  { id: 802, storeId: 8, item: "Lamb Shoulder", category: "Meat", price: "7.99", unit: "lb", orig: "11.99", tag: "Halal" },
  { id: 803, storeId: 8, item: "Dried Limes", category: "Pantry", price: "2.99", unit: "4 oz", orig: "4.99", tag: "Persian" },
  { id: 804, storeId: 8, item: "Fresh Pita Bread", category: "Bakery", price: "2.49", unit: "pack", orig: "3.99", tag: "Fresh Baked" },
  { id: 805, storeId: 8, item: "Pomegranate Molasses", category: "Pantry", price: "3.99", unit: "10 oz", orig: "5.99", tag: "Imported" },
  { id: 901, storeId: 9, item: "Burrata Cheese", category: "Dairy", price: "6.99", unit: "4 oz", orig: "9.99", tag: "Fresh Daily" },
  { id: 902, storeId: 9, item: "Micro Greens Mix", category: "Produce", price: "4.99", unit: "2 oz", orig: "6.99", tag: "Local Farm" },
  { id: 903, storeId: 9, item: "Imported Prosciutto", category: "Deli", price: "9.99", unit: "4 oz", orig: "13.99", tag: "San Daniele" },
  { id: 904, storeId: 9, item: "Truffle Salt", category: "Pantry", price: "7.99", unit: "2 oz", orig: "11.99", tag: "Italian" },
  { id: 905, storeId: 9, item: "Sourdough Crackers", category: "Pantry", price: "3.99", unit: "5 oz", orig: "5.49", tag: "Artisan" },
  { id: 1001, storeId: 10, item: "Bulk Quinoa", category: "Bulk", price: "3.99", unit: "lb", orig: "5.50", tag: "Organic" },
  { id: 1002, storeId: 10, item: "Free-Range Eggs", category: "Dairy", price: "5.49", unit: "dozen", orig: "7.99", tag: "Pasture Raised" },
  { id: 1003, storeId: 10, item: "Tempeh", category: "Protein", price: "3.29", unit: "8 oz", orig: "4.49", tag: "Local Made" },
  { id: 1004, storeId: 10, item: "Bulk Oats", category: "Bulk", price: "1.29", unit: "lb", orig: "2.00", tag: "Organic" },
  { id: 1005, storeId: 10, item: "Organic Spinach", category: "Produce", price: "2.99", unit: "5 oz", orig: "4.49", tag: "Organic" },
];

const CATEGORIES = ["All", "Produce", "Seafood", "Dairy", "Bakery", "Bulk", "Deli", "Meat", "Protein", "Drinks", "Pantry", "Frozen", "Wine"];

function pctOff(price, orig) {
  return Math.round((1 - parseFloat(price) / parseFloat(orig)) * 100);
}

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
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
    if (!form.item || !form.price || !form.orig || !form.unit) { showToast("Please fill in all required fields"); return; }
    if (editingId) {
      setDeals(prev => prev.map(d => d.id === editingId ? { ...d, ...form, storeId: selectedStore } : d));
      showToast("Deal updated!"); setEditingId(null);
    } else {
      setDeals(prev => [...prev, { ...form, id: Date.now(), storeId: selectedStore }]);
      showToast("Deal added!");
    }
    clearForm();
  };

  const handleEdit = (deal) => {
    setForm({ item: deal.item, category: deal.category, price: deal.price, unit: deal.unit, orig: deal.orig, tag: deal.tag });
    setEditingId(deal.id); setTab("add");
  };

  const handleDelete = (id) => { setDeals(prev => prev.filter(d => d.id !== id)); showToast("Deal removed"); };
  const handleClearStore = () => { if (window.confirm(`Clear ALL deals for ${storeName}?`)) { setDeals(prev => prev.filter(d => d.storeId !== selectedStore)); showToast(`Cleared ${storeName}`); }};
  const handleReset = () => { if (window.confirm("Reset ALL deals to defaults?")) { setDeals(INITIAL_DEALS); showToast("Reset to defaults"); }};

  return (
    <div style={{ minHeight: "100vh", background: "#f0ede8", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .adm-header { background: #1a1a2e; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #e8a838; }
        .adm-title { font-family: 'Lora', serif; font-size: 18px; font-weight: 700; color: #fff; }
        .adm-title span { color: #e8a838; }
        .adm-exit { font-size: 12px; font-weight: 600; color: #8899aa; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); padding: 6px 14px; border-radius: 20px; cursor: pointer; }
        .adm-body { padding: 20px 16px 80px; max-width: 600px; margin: 0 auto; }
        .adm-section { background: #fff; border-radius: 14px; border: 1px solid #e0dbd3; margin-bottom: 16px; overflow: hidden; }
        .adm-section-header { padding: 14px 16px; background: #faf7f2; border-bottom: 1px solid #e0dbd3; font-family: 'Lora', serif; font-size: 14px; font-weight: 700; color: #1a1a2e; }
        .adm-section-body { padding: 16px; }
        .adm-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 6px; margin-top: 12px; }
        .adm-label:first-child { margin-top: 0; }
        .adm-input { width: 100%; padding: 10px 13px; border: 1.5px solid #ddd; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a1a2e; background: #faf8f5; outline: none; }
        .adm-input:focus { border-color: #3d6b4f; }
        .adm-select { width: 100%; padding: 10px 13px; border: 1.5px solid #ddd; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a1a2e; background: #faf8f5; outline: none; }
        .adm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .adm-btn-primary { width: 100%; padding: 13px; background: #1a1a2e; color: #e8a838; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 16px; }
        .adm-btn-secondary { padding: 7px 14px; background: none; border: 1.5px solid #ddd; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #888; cursor: pointer; }
        .adm-btn-danger { padding: 7px 14px; background: none; border: 1.5px solid #f5c6c6; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #c0392b; cursor: pointer; }
        .adm-tabs { display: flex; border-bottom: 1px solid #e0dbd3; }
        .adm-tab { flex: 1; padding: 12px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; text-align: center; cursor: pointer; color: #aaa; border: none; background: none; border-bottom: 2px solid transparent; text-transform: uppercase; letter-spacing: 0.5px; }
        .adm-tab.active { color: #1a1a2e; border-bottom-color: #e8a838; }
        .deal-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f5f0e8; }
        .deal-row:last-child { border-bottom: none; }
        .deal-row-name { font-size: 13px; font-weight: 600; color: #1a1a2e; }
        .deal-row-meta { font-size: 11px; color: #aaa; margin-top: 2px; }
        .deal-row-actions { display: flex; gap: 6px; }
        .store-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .store-option { padding: 10px 12px; border-radius: 10px; border: 1.5px solid #ddd; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 8px; }
        .store-option.active { border-color: var(--sc); background: var(--sc); color: #fff; }
        .store-option-name { font-size: 12px; font-weight: 600; }
        .store-option-count { font-size: 10px; opacity: 0.7; margin-top: 1px; }
        .adm-toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #1a1a2e; color: #e8dcc8; padding: 10px 20px; border-radius: 24px; font-size: 13px; font-weight: 500; z-index: 300; white-space: nowrap; }
        .adm-stats { display: flex; gap: 12px; margin-bottom: 16px; }
        .adm-stat-card { flex: 1; background: #fff; border-radius: 12px; padding: 14px; border: 1px solid #e0dbd3; text-align: center; }
        .adm-stat-num { font-family: 'Lora', serif; font-size: 24px; font-weight: 700; color: #1a1a2e; }
        .adm-stat-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #aaa; margin-top: 2px; }
      `}</style>
      <div className="adm-header">
        <div className="adm-title">PDX <span>Fresh</span> — Admin</div>
        <div className="adm-exit" onClick={onExit}>← Back to App</div>
      </div>
      <div className="adm-body">
        <div className="adm-stats">
          <div className="adm-stat-card"><div className="adm-stat-num">{deals.length}</div><div className="adm-stat-label">Total Deals</div></div>
          <div className="adm-stat-card"><div className="adm-stat-num">{INITIAL_STORES.length}</div><div className="adm-stat-label">Stores</div></div>
          <div className="adm-stat-card"><div className="adm-stat-num">{storeDeals.length}</div><div className="adm-stat-label">This Store</div></div>
        </div>
        <div className="adm-section">
          <div className="adm-section-header">Select Store to Edit</div>
          <div className="adm-section-body">
            <div className="store-grid">
              {INITIAL_STORES.map(s => (
                <div key={s.id} className={`store-option ${selectedStore === s.id ? "active" : ""}`} style={{ "--sc": s.color }} onClick={() => { setSelectedStore(s.id); clearForm(); setEditingId(null); }}>
                  <span style={{ fontSize: 16 }}>{s.emoji}</span>
                  <div>
                    <div className="store-option-name" style={{ color: selectedStore === s.id ? "#fff" : "#1a1a2e" }}>{s.name}</div>
                    <div className="store-option-count">{deals.filter(d => d.storeId === s.id).length} deals</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="adm-section">
          <div className="adm-tabs">
            <button className={`adm-tab ${tab === "add" ? "active" : ""}`} onClick={() => { setTab("add"); clearForm(); setEditingId(null); }}>{editingId ? "✏️ Editing" : "➕ Add Deal"}</button>
            <button className={`adm-tab ${tab === "manage" ? "active" : ""}`} onClick={() => setTab("manage")}>📋 Manage ({storeDeals.length})</button>
          </div>
          {tab === "add" && (
            <div className="adm-section-body">
              <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Adding deal for: <strong style={{ color: INITIAL_STORES.find(s => s.id === selectedStore)?.color }}>{storeName}</strong></div>
              <div className="adm-label">Item Name *</div>
              <input className="adm-input" placeholder="e.g. Organic Strawberries" value={form.item} onChange={e => setForm(f => ({ ...f, item: e.target.value }))} />
              <div className="adm-label">Category *</div>
              <select className="adm-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="adm-row">
                <div><div className="adm-label">Sale Price * (no $)</div><input className="adm-input" placeholder="3.99" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                <div><div className="adm-label">Regular Price * (no $)</div><input className="adm-input" placeholder="5.99" value={form.orig} onChange={e => setForm(f => ({ ...f, orig: e.target.value }))} /></div>
              </div>
              <div className="adm-row">
                <div><div className="adm-label">Unit *</div><input className="adm-input" placeholder="lb, bunch, each..." value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} /></div>
                <div><div className="adm-label">Tag (optional)</div><input className="adm-input" placeholder="Oregon Grown..." value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} /></div>
              </div>
              {form.price && form.orig && parseFloat(form.price) < parseFloat(form.orig) && (
                <div style={{ marginTop: 12, padding: "8px 12px", background: "#e8f5e2", borderRadius: 8, fontSize: 12, color: "#3d6b4f", fontWeight: 600 }}>✓ {pctOff(form.price, form.orig)}% savings — looks good!</div>
              )}
              <button className="adm-btn-primary" onClick={handleSave}>{editingId ? "✓ Update Deal" : "＋ Add Deal"}</button>
              {editingId && <button className="adm-btn-secondary" style={{ width: "100%", marginTop: 8 }} onClick={() => { clearForm(); setEditingId(null); }}>Cancel Edit</button>}
            </div>
          )}
          {tab === "manage" && (
            <div className="adm-section-body">
              {storeDeals.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 0", color: "#bbb", fontSize: 13 }}>No deals yet for {storeName}.</div>
              ) : (
                <>
                  {storeDeals.map(deal => (
                    <div key={deal.id} className="deal-row">
                      <div style={{ flex: 1 }}>
                        <div className="deal-row-name">{deal.item}</div>
                        <div className="deal-row-meta">{deal.category} · {deal.unit} · {pctOff(deal.price, deal.orig)}% off</div>
                      </div>
                      <div style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 700, marginRight: 10 }}>${deal.price}</div>
                      <div className="deal-row-actions">
                        <button className="adm-btn-secondary" onClick={() => handleEdit(deal)}>Edit</button>
                        <button className="adm-btn-danger" onClick={() => handleDelete(deal.id)}>✕</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f0ebe4", display: "flex", justifyContent: "flex-end" }}>
                    <button className="adm-btn-danger" onClick={handleClearStore}>Clear all {storeName} deals</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="adm-section">
          <div className="adm-section-header" style={{ color: "#c0392b" }}>⚠️ Danger Zone</div>
          <div className="adm-section-body">
            <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Reset everything back to the original sample deals.</div>
            <button className="adm-btn-danger" onClick={handleReset}>Reset all deals to defaults</button>
          </div>
        </div>
      </div>
      {toast && <div className="adm-toast">✓ {toast}</div>}
    </div>
  );
}

function AdminLogin({ onSuccess }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = () => { if (pw === ADMIN_PASSWORD) { onSuccess(); } else { setError(true); setTimeout(() => setError(false), 1500); }};
  return (
    <div style={{ minHeight: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=DM+Sans:wght@400;600&display=swap');`}</style>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🌲</div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>PDX <span style={{ color: "#e8a838" }}>Fresh</span></div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6677aa", marginBottom: 32 }}>Admin Panel</div>
      <input type="password" placeholder="Enter password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
        style={{ width: "100%", maxWidth: 280, padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${error ? "#e05555" : "rgba(255,255,255,0.15)"}`, background: "rgba(255,255,255,0.07)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", textAlign: "center" }} />
      {error && <div style={{ color: "#e05555", fontSize: 12, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>Incorrect password</div>}
      <button onClick={handleSubmit} style={{ marginTop: 14, width: "100%", maxWidth: 280, padding: "13px", background: "#e8a838", color: "#1a1a2e", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
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

  const handleLogoTap = () => {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 5) { setAdminMode(true); setTapCount(0); }
    setTimeout(() => setTapCount(0), 3000);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const addToList = (deal) => {
    if (!addedIds.has(deal.id)) {
      setShoppingList(prev => [...prev, deal]);
      setAddedIds(prev => new Set([...prev, deal.id]));
      showToast(`${deal.item} added`);
    }
  };

  const removeFromList = (id) => {
    setShoppingList(prev => prev.filter(d => d.id !== id));
    setAddedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const allDeals = deals.map(d => ({
    ...d,
    storeName: INITIAL_STORES.find(s => s.id === d.storeId)?.name || "",
    storeColor: INITIAL_STORES.find(s => s.id === d.storeId)?.color || "#888",
    storeAccent: INITIAL_STORES.find(s => s.id === d.storeId)?.accent || "#eee",
    storeEmoji: INITIAL_STORES.find(s => s.id === d.storeId)?.emoji || "🏪",
  }));

  const filteredDeals = allDeals.filter(d => {
    const matchStore = !selectedStore || d.storeName === selectedStore;
    const matchCat = selectedCategory === "All" || d.category === selectedCategory;
    const matchSearch = !searchQuery || d.item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStore && matchCat && matchSearch;
  });

  const listByStore = shoppingList.reduce((acc, d) => {
    if (!acc[d.storeName]) acc[d.storeName] = [];
    acc[d.storeName].push(d);
    return acc;
  }, {});

  const totalSavings = shoppingList.reduce((sum, d) => sum + (parseFloat(d.orig) - parseFloat(d.price)), 0);

  if (adminMode && !adminAuthed) return <AdminLogin onSuccess={() => setAdminAuthed(true)} />;
  if (adminMode && adminAuthed) return <AdminPanel deals={deals} setDeals={setDeals} onExit={() => { setAdminMode(false); setAdminAuthed(false); }} />;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .app-header { background: #1a1a2e; padding: 0 20px; position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #e8a838; }
        .logo-wrap { display: flex; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; user-select: none; }
        .logo-icon { width: 32px; height: 32px; background: #e8a838; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .logo-text { font-family: 'Lora', serif; font-size: 20px; font-weight: 700; color: #fff; }
        .logo-text span { color: #e8a838; }
        .loc-tag { font-family: 'DM Sans', sans-serif; font-size: 11px; color: #8899aa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 20px; letter-spacing: 0.4px; }
        .hero { background: linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%); padding: 24px 20px 28px; position: relative; overflow: hidden; }
        .hero::after { content: ''; position: absolute; right: -20px; top: -20px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(232,168,56,0.15) 0%, transparent 70%); border-radius: 50%; }
        .hero-eyebrow { font-size: 10px; font-weight: 600; color: #e8a838; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; }
        .hero-headline { font-family: 'Lora', serif; font-size: 26px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 4px; }
        .hero-headline em { color: #e8a838; font-style: normal; }
        .hero-sub { font-size: 13px; color: #8899bb; margin-bottom: 16px; }
        .hero-stats { display: flex; gap: 20px; }
        .hero-stat-num { font-family: 'Lora', serif; font-size: 20px; font-weight: 700; color: #e8a838; }
        .hero-stat-label { font-size: 10px; color: #6677aa; text-transform: uppercase; letter-spacing: 0.5px; }
        .tab-bar { display: flex; background: #fff; border-bottom: 1px solid #e8e0d4; }
        .tab-btn { flex: 1; padding: 13px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #aaa; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab-btn.active { color: #1a1a2e; border-bottom-color: #e8a838; }
        .search-wrap { padding: 12px 16px; background: #fff; border-bottom: 1px solid #ede8df; }
        .search-inner { display: flex; align-items: center; gap: 10px; background: #f5f0e8; border: 1.5px solid #e0d8cc; border-radius: 10px; padding: 9px 14px; }
        .search-input { flex: 1; border: none; background: none; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1a1a2e; outline: none; }
        .search-input::placeholder { color: #b0a898; }
        .store-scroll { display: flex; gap: 8px; padding: 12px 16px; overflow-x: auto; background: #faf7f2; border-bottom: 1px solid #ede8df; scrollbar-width: none; }
        .store-scroll::-webkit-scrollbar { display: none; }
        .store-pill { display: flex; align-items: center; gap: 6px; padding: 7px 13px; border-radius: 24px; border: 1.5px solid #ddd; background: #fff; cursor: pointer; white-space: nowrap; transition: all 0.15s; font-size: 12px; font-weight: 500; color: #555; flex-shrink: 0; }
        .store-pill.active { border-color: var(--sc); background: var(--sc); color: #fff; }
        .store-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--sc); flex-shrink: 0; }
        .store-pill.active .store-dot { background: rgba(255,255,255,0.5); }
        .cat-scroll { display: flex; gap: 7px; padding: 10px 16px; overflow-x: auto; background: #f5f0e8; scrollbar-width: none; border-bottom: 1px solid #e8e0d4; }
        .cat-scroll::-webkit-scrollbar { display: none; }
        .cat-pill { padding: 5px 13px; border-radius: 20px; border: 1px solid #d8d0c4; background: #fff; cursor: pointer; font-size: 11px; font-weight: 600; color: #666; white-space: nowrap; transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.3px; flex-shrink: 0; }
        .cat-pill.active { background: #1a1a2e; color: #e8a838; border-color: #1a1a2e; }
        .results-header { padding: 12px 16px 4px; display: flex; justify-content: space-between; align-items: baseline; }
        .results-label { font-family: 'Lora', serif; font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .results-count { font-size: 12px; color: #999; }
        .deals-grid { padding: 8px 12px 110px; display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 10px; }
        .deal-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #ede8df; transition: all 0.2s; opacity: 0; animation: cardIn 0.3s ease forwards; }
        .deal-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(26,26,46,0.1); }
        @keyframes cardIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .card-accent-bar { height: 4px; }
        .card-body { padding: 11px 12px 8px; }
        .card-tag { display: inline-block; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 7px; border-radius: 4px; margin-bottom: 7px; }
        .card-name { font-family: 'Lora', serif; font-size: 14px; font-weight: 700; color: #1a1a2e; line-height: 1.3; margin-bottom: 3px; }
        .card-store { font-size: 10px; color: #aaa; margin-bottom: 8px; display: flex; align-items: center; gap: 4px; }
        .card-price { font-family: 'Lora', serif; font-size: 22px; font-weight: 700; color: #1a1a2e; line-height: 1; }
        .card-unit { font-size: 10px; color: #aaa; margin-top: 1px; }
        .card-orig { font-size: 11px; color: #ccc; text-decoration: line-through; margin-top: 2px; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; padding: 7px 12px 10px; border-top: 1px solid #f5f0e8; margin-top: 7px; }
        .card-savings { font-size: 11px; font-weight: 700; color: #3d6b4f; }
        .add-btn { width: 30px; height: 30px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 17px; transition: all 0.15s; }
        .add-btn.default { background: #1a1a2e; color: #e8a838; }
        .add-btn.added { background: #3d6b4f; color: #fff; font-size: 14px; }
        .fab { position: fixed; bottom: 24px; right: 20px; background: #1a1a2e; color: #fff; border: none; border-radius: 30px; padding: 14px 20px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 24px rgba(26,26,46,0.45); z-index: 50; animation: fabIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes fabIn { from { opacity: 0; transform: scale(0.8) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .fab-badge { background: #e8a838; color: #1a1a2e; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; }
        .list-view { padding: 16px 16px 110px; }
        .list-empty { text-align: center; padding: 60px 20px; }
        .list-empty-icon { font-size: 52px; margin-bottom: 16px; }
        .list-empty-title { font-family: 'Lora', serif; font-size: 22px; color: #888; margin-bottom: 8px; }
        .list-empty-sub { font-size: 14px; color: #bbb; }
        .list-heading { font-family: 'Lora', serif; font-size: 22px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
        .list-subheading { font-size: 13px; color: #999; margin-bottom: 20px; }
        .list-store-group { margin-bottom: 20px; }
        .list-store-label { display: flex; align-items: center; gap: 8px; padding: 8px 0 10px; border-bottom: 2px solid var(--sc); margin-bottom: 8px; }
        .list-store-label-name { font-family: 'Lora', serif; font-size: 15px; font-weight: 700; color: #1a1a2e; }
        .list-store-label-count { font-size: 11px; color: #aaa; margin-left: auto; }
        .list-item { display: flex; align-items: center; justify-content: space-between; background: #fff; border-radius: 10px; padding: 11px 14px; margin-bottom: 7px; border: 1px solid #ede8df; }
        .list-item-name { font-size: 14px; font-weight: 600; color: #1a1a2e; }
        .list-item-meta { font-size: 11px; color: #aaa; margin-top: 2px; }
        .list-item-price { font-family: 'Lora', serif; font-size: 17px; font-weight: 700; color: #1a1a2e; margin-right: 10px; }
        .remove-btn { background: none; border: none; color: #ddd; cursor: pointer; font-size: 20px; padding: 2px 4px; transition: color 0.15s; }
        .remove-btn:hover { color: #e05555; }
        .savings-card { background: linear-gradient(135deg, #1a1a2e, #0f3460); border-radius: 14px; padding: 18px 20px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center; }
        .savings-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6677aa; margin-bottom: 4px; }
        .savings-amount { font-family: 'Lora', serif; font-size: 28px; font-weight: 700; color: #e8a838; }
        .savings-sub { font-size: 11px; color: #4455aa; }
        .toast { position: fixed; bottom: 82px; left: 50%; transform: translateX(-50%); background: #1a1a2e; color: #e8dcc8; padding: 10px 20px; border-radius: 24px; font-size: 13px; font-weight: 500; z-index: 200; box-shadow: 0 4px 20px rgba(0,0,0,0.25); animation: toastIn 0.2s ease; white-space: nowrap; border: 1px solid rgba(232,168,56,0.3); }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .no-results { text-align: center; padding: 48px 20px; font-size: 14px; color: #bbb; }
      `}</style>

      <div className="app-header">
        <div className="logo-wrap" onClick={handleLogoTap}>
          <div className="logo-icon">🌲</div>
          <div className="logo-text">PDX <span>Fresh</span></div>
        </div>
        <div className="loc-tag">📍 Portland, OR</div>
      </div>

      <div className="hero">
        <div className="hero-eyebrow">Weekly Deals — April 2026</div>
        <div className="hero-headline">Shop local.<br /><em>Save more.</em></div>
        <div className="hero-sub">Fresh deals from Portland's best local stores</div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hero-stat-num">{deals.length}</div><div className="hero-stat-label">Deals</div></div>
          <div className="hero-stat"><div className="hero-stat-num">{INITIAL_STORES.length}</div><div className="hero-stat-label">Stores</div></div>
          <div className="hero-stat"><div className="hero-stat-num">PDX</div><div className="hero-stat-label">Local Only</div></div>
        </div>
      </div>

      <div className="tab-bar">
        <button className={`tab-btn ${view === "browse" ? "active" : ""}`} onClick={() => setView("browse")}>Browse Deals</button>
        <button className={`tab-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>My List {shoppingList.length > 0 ? `(${shoppingList.length})` : ""}</button>
      </div>

      {view === "browse" && (
        <>
          <div className="search-wrap">
            <div className="search-inner">
              <span style={{ fontSize: 14, opacity: 0.5 }}>🔍</span>
              <input className="search-input" placeholder="Search strawberries, salmon, oats..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              {searchQuery && <span style={{ cursor: "pointer", color: "#bbb", fontSize: 18 }} onClick={() => setSearchQuery("")}>×</span>}
            </div>
          </div>
          <div className="store-scroll">
            <div className="store-pill" style={{ "--sc": "#1a1a2e" }} onClick={() => setSelectedStore(null)}>
              <div className="store-dot" style={{ background: selectedStore ? "#ccc" : "#1a1a2e" }} />
              <span style={{ fontWeight: !selectedStore ? 700 : 500 }}>All Stores</span>
            </div>
            {INITIAL_STORES.map(s => (
              <div key={s.id} className={`store-pill ${selectedStore === s.name ? "active" : ""}`} style={{ "--sc": s.color }} onClick={() => setSelectedStore(selectedStore === s.name ? null : s.name)}>
                <div className="store-dot" />{s.emoji} {s.name}
              </div>
            ))}
          </div>
          <div className="cat-scroll">
            {CATEGORIES.map(c => (
              <div key={c} className={`cat-pill ${selectedCategory === c ? "active" : ""}`} onClick={() => setSelectedCategory(c)}>{c}</div>
            ))}
          </div>
          <div className="results-header">
            <div className="results-label">{selectedStore || (selectedCategory !== "All" ? selectedCategory : "All Deals")}</div>
            <div className="results-count">{filteredDeals.length} deal{filteredDeals.length !== 1 ? "s" : ""}</div>
          </div>
          {filteredDeals.length === 0 ? (
            <div className="no-results">No deals found. Try a different search or filter.</div>
          ) : (
            <div className="deals-grid">
              {filteredDeals.map((deal, i) => {
                const store = INITIAL_STORES.find(s => s.id === deal.storeId);
                const isAdded = addedIds.has(deal.id);
                return (
                  <div key={deal.id} className="deal-card" style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
                    <div className="card-accent-bar" style={{ background: store?.color }} />
                    <div className="card-body">
                      <div className="card-tag" style={{ background: store?.accent, color: store?.color }}>{deal.tag || deal.category}</div>
                      <div className="card-name">{deal.item}</div>
                      <div className="card-store"><span>{store?.emoji}</span>{deal.storeName}</div>
                      <div className="card-price">${deal.price}</div>
                      <div className="card-unit">per {deal.unit}</div>
                      <div className="card-orig">was ${deal.orig}</div>
                    </div>
                    <div className="card-footer">
                      <span className="card-savings">↓ {pctOff(deal.price, deal.orig)}% off</span>
                      <button className={`add-btn ${isAdded ? "added" : "default"}`} onClick={() => addToList(deal)}>
                        {isAdded ? "✓" : "+"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {shoppingList.length > 0 && (
            <button className="fab" onClick={() => setView("list")}>
              🛒 My List <span className="fab-badge">{shoppingList.length}</span>
            </button>
          )}
        </>
      )}

      {view === "list" && (
        <div className="list-view">
          {shoppingList.length === 0 ? (
            <div className="list-empty">
              <div className="list-empty-icon">🛒</div>
              <div className="list-empty-title">Your list is empty</div>
              <div className="list-empty-sub">Browse deals and tap + to add items</div>
            </div>
          ) : (
            <>
              <div className="list-heading">Shopping List</div>
              <div className="list-subheading">Organized by store for efficient shopping</div>
              {Object.entries(listByStore).map(([storeName, items]) => {
                const store = INITIAL_STORES.find(s => s.name === storeName);
                return (
                  <div key={storeName} className="list-store-group">
                    <div className="list-store-label" style={{ "--sc": store?.color }}>
                      <span style={{ fontSize: 16 }}>{store?.emoji}</span>
                      <span className="list-store-label-name">{storeName}</span>
                      <span className="list-store-label-count">{items.length} item{items.length > 1 ? "s" : ""}</span>
                    </div>
                    {items.map(item => (
                      <div key={item.id} className="list-item">
                        <div style={{ flex: 1 }}>
                          <div className="list-item-name">{item.item}</div>
                          <div className="list-item-meta">{item.unit} · <span style={{ color: "#3d6b4f", fontWeight: 700 }}>{pctOff(item.price, item.orig)}% off</span></div>
                        </div>
                        <div className="list-item-price">${item.price}</div>
                        <button className="remove-btn" onClick={() => removeFromList(item.id)}>×</button>
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="savings-card">
                <div>
                  <div className="savings-label">Est. Total Savings</div>
                  <div className="savings-amount">${totalSavings.toFixed(2)}</div>
                  <div className="savings-sub">vs. regular prices</div>
                </div>
                <span style={{ fontSize: 40 }}>🎉</span>
              </div>
            </>
          )}
        </div>
      )}

      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}
