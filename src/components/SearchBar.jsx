export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="ابحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}