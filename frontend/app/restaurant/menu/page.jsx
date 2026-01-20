"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function MenuManagement() {
    const [menu, setMenu] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // id of item being edited
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        name: "", description: "", price: "", vegType: "Veg", spiceLevel: "Medium", capacity: "Single", image: "", category: "", available: true
    });

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = () => {
        fetch(`${API_BASE_URL}/menu`)
            .then(res => res.json())
            .then(setMenu);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `${API_BASE_URL}/menu/${isEditing}` : `${API_BASE_URL}/menu`;

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        // Reset form preserving default available: true
        setFormData({ name: "", description: "", price: "", vegType: "Veg", spiceLevel: "Medium", capacity: "Single", image: "", category: "", available: true });
        setIsEditing(null);
        fetchMenu();
    };

    const handleEdit = (item) => {
        setIsEditing(item._id);
        // Ensure available is set (handle legacy items missing the field)
        setFormData({ ...item, available: item.available !== undefined ? item.available : true });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`${API_BASE_URL}/menu/${id}`, { method: "DELETE" });
        fetchMenu();
    };

    const handleToggleAvailability = async (item) => {
        try {
            const updatedItem = { ...item, available: !item.available };
            // Optimistic update
            setMenu(menu.map(m => m._id === item._id ? updatedItem : m));

            await fetch(`${API_BASE_URL}/menu/${item._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem)
            });
        } catch (error) {
            console.error("Failed to toggle availability", error);
            fetchMenu(); // Revert on error
        }
    };

    // Filter menu based on search term
    const filteredMenu = menu.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-8 pb-8 shadow-xl text-white mb-8">
                <div className="flex justify-between items-center mb-2">
                    <button onClick={() => window.history.back()} className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold hover:bg-white/30 transition">
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold">Menu Management</h1>
                    <div className="w-16"></div> {/* Spacer */}
                </div>
            </div>

            <div className="px-6 max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                            <span className="text-sm font-medium text-gray-600">Available</span>
                            <input
                                type="checkbox"
                                checked={formData.available}
                                onChange={e => setFormData({ ...formData, available: e.target.checked })}
                                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-gray-300"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Item Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-200" required />
                        <input type="number" placeholder="Price (₹)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-200" required />
                    </div>

                    {/* Innovative Selection UI */}
                    <div className="space-y-6">
                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { name: "Starters", icon: "🍟" },
                                    { name: "Main Course", icon: "🥘" },
                                    { name: "Desserts", icon: "🍰" },
                                    { name: "Beverages", icon: "🥤" }
                                ].map((cat) => (
                                    <button
                                        type="button"
                                        key={cat.name}
                                        onClick={() => setFormData({ ...formData, category: cat.name })}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all active:scale-95 ${formData.category === cat.name
                                                ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200'
                                                : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200 hover:bg-orange-50'
                                            }`}
                                    >
                                        <span className="text-2xl">{cat.icon}</span>
                                        <span className="text-xs font-bold">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Veg / Non-Veg Toggle */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, vegType: "Veg" })}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${formData.vegType === "Veg"
                                            ? 'bg-white text-green-600 shadow-sm border border-green-100'
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <span>🥬</span> Veg
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, vegType: "Non-Veg" })}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${formData.vegType === "Non-Veg"
                                            ? 'bg-white text-red-600 shadow-sm border border-red-100'
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <span>🍗</span> Non-Veg
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Spice Level */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Spice Level</label>
                                <div className="flex gap-2">
                                    {[
                                        { level: "Mild", icon: "🌶️", color: "text-green-500" },
                                        { level: "Medium", icon: "🌶️🌶️", color: "text-orange-500" },
                                        { level: "Spicy", icon: "🌶️🌶️🌶️", color: "text-red-500" }
                                    ].map((spice) => (
                                        <button
                                            type="button"
                                            key={spice.level}
                                            onClick={() => setFormData({ ...formData, spiceLevel: spice.level })}
                                            className={`flex-1 py-2 px-2 rounded-xl border text-xs font-bold transition-all ${formData.spiceLevel === spice.level
                                                    ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-200'
                                                    : 'bg-white border-gray-100 text-gray-400'
                                                }`}
                                        >
                                            <div className="text-lg mb-1">{spice.icon}</div>
                                            <span className={formData.spiceLevel === spice.level ? 'text-gray-800' : ''}>{spice.level}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Serving Capacity */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Serves</label>
                                <div className="flex flex-wrap gap-2">
                                    {["Single", "2 People", "3-4 People"].map((cap) => (
                                        <button
                                            type="button"
                                            key={cap}
                                            onClick={() => setFormData({ ...formData, capacity: cap })}
                                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${formData.capacity === cap
                                                    ? 'bg-gray-800 text-white border-gray-800'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {cap}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <input type="text" placeholder="Image URL (e.g., https://...)" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-200" />
                    </div>

                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-200" rows="2"></textarea>

                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md shadow-orange-200">
                            {isEditing ? 'Update Item' : 'Add Item'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(null); setFormData({ name: "", description: "", price: "", vegType: "Veg", spiceLevel: "Medium", capacity: "Single", image: "", category: "", available: true }); }} className="px-6 bg-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-300">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 rounded-xl bg-white shadow-sm border border-gray-100 outline-none focus:ring-2 focus:ring-orange-200"
                    />
                </div>

                {/* List Section */}
                <div className="space-y-4">
                    {filteredMenu.length === 0 && <p className="text-center text-gray-400 py-8">No items found.</p>}
                    {filteredMenu.map(item => (
                        <div key={item._id} className={`bg-white p-4 rounded-xl shadow-sm flex justify-between items-center group border-l-4 ${item.available ? 'border-green-500' : 'border-gray-300 opacity-75'}`}>
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative">
                                    <img src={item.image} className={`w-full h-full object-cover ${!item.available && 'grayscale'}`} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                                    {!item.available && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[10px] font-bold">UNAVAILABLE</div>}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500">₹{item.price} • {item.vegType}</p>
                                        {!item.available && <span className="text-xs bg-gray-200 text-gray-600 px-2 rounded-full">Unavailable</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                {/* Direct Availability Toggle */}
                                <button
                                    onClick={() => handleToggleAvailability(item)}
                                    className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${item.available ? 'bg-green-500' : 'bg-gray-300'}`}
                                    title="Toggle Availability"
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${item.available ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </button>

                                <div className="w-px h-6 bg-gray-200 mx-2"></div> {/* Divider */}

                                <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-200 transition">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
