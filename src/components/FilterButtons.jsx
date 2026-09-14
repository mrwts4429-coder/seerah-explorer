export default function FilterButtons({ selectedCategory, setSelectedCategory }) {
    const categories = ['الكل', 'ما قبل البعثة', 'العهد المكي', 'العهد المدني - بناء الدولة والمواجهات الأولى', 'العهد المدني - الفتوح والوفود والوفاة'];
    return (
        <div className="filter-buttons">
            {categories.map((category) => (
                <button
                    key={category}
                    className={selectedCategory === category ? 'active' : ''}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
