export default function AdminDashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Panel</h1>
                <p className="text-gray-500 mb-8">System configuration and User management.</p>
                <div className="space-x-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">Manage Users</button>
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold">System Logs</button>
                </div>
            </div>
        </div>
    );
}
