// 全局变量存储读物数据
let readingsData = {
    books: [],
    papers: []
};

// 渲染书籍卡片
function renderBooks(books) {
    const container = document.getElementById('booksContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (books.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><p>暂无书籍数据</p></div>';
        return;
    }
    
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="book-card h-100">
                <div class="book-cover bg-light">
                    <i class="fas fa-book-open text-primary"></i>
                </div>
                <div class="book-info">
                    <span class="badge bg-primary category-badge">书籍</span>
                    <h5 class="fw-bold">${book.title}</h5>
                    <p class="text-muted">${book.author} · ${book.year}</p>
                    <p class="mb-3">${book.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${book.publisher}</small>
                        <a href="${book.link}" class="btn btn-sm btn-read">阅读</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 渲染文献列表
function renderPapers(papers) {
    const container = document.getElementById('papersContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (papers.length === 0) {
        container.innerHTML = '<div class="text-center py-5"><p>暂无文献数据</p></div>';
        return;
    }
    
    papers.forEach(paper => {
        const item = document.createElement('div');
        item.className = 'literature-item';
        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="fw-bold mb-1">${paper.title}</h5>
                    <p class="mb-1"><em>${paper.authors}</em></p>
                    <p class="mb-1">${paper.journal} <strong>${paper.volume}</strong>, ${paper.pages} (${paper.year})</p>
                    <p class="mb-2">${paper.description}</p>
                </div>
                <div>
                    <span class="badge bg-secondary">文献</span>
                </div>
            </div>
            <a href="${paper.link}" class="btn btn-read mt-2">阅读全文</a>
        `;
        container.appendChild(item);
    });
}

// 检查是否有结果显示
function checkResults() {
    const booksContainer = document.getElementById('booksContainer');
    const papersContainer = document.getElementById('papersContainer');
    const noResults = document.getElementById('noResults');
    
    const booksVisible = booksContainer.children.length > 0 && 
        !booksContainer.children[0].innerText.includes('暂无书籍数据');
        
    const papersVisible = papersContainer.children.length > 0 && 
        !papersContainer.children[0].innerText.includes('暂无文献数据');
        
    if (!booksVisible && !papersVisible) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// 过滤和渲染读物
function filterAndRender(category = 'all') {
    let filteredBooks = [...readingsData.books];
    let filteredPapers = [...readingsData.papers];
    
    // 应用分类筛选
    if (category === 'books') {
        filteredPapers = [];
    } else if (category === 'papers') {
        filteredBooks = [];
    }
    
    // 应用搜索
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
        
        filteredPapers = filteredPapers.filter(paper => 
            paper.title.toLowerCase().includes(searchTerm) || 
            paper.authors.toLowerCase().includes(searchTerm) ||
            paper.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // 渲染结果
    renderBooks(filteredBooks);
    renderPapers(filteredPapers);
    
    // 检查是否有结果显示
    checkResults();
}

// 初始化页面功能
function initPage() {
    // 加载数据
    fetch('../data/readings.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            readingsData = data;
            
            // 初始渲染
            renderBooks(data.books);
            renderPapers(data.papers);
            
            // 设置分类按钮事件
            const categoryBtns = document.querySelectorAll('.category-btn');
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 更新按钮状态
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 过滤和渲染
                    const category = this.getAttribute('data-category');
                    filterAndRender(category);
                });
            });
            
            // 搜索功能
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', () => {
                const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
                filterAndRender(activeCategory);
            });
            
            // 返回顶部按钮功能
            const backToTopBtn = document.querySelector('.back-to-top');
            if (backToTopBtn) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 300) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                });
                
                backToTopBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        })
        .catch(error => {
            console.error('加载推荐读物数据失败:', error);
            // 显示错误信息
            const booksContainer = document.getElementById('booksContainer');
            const papersContainer = document.getElementById('papersContainer');
            
            if (booksContainer) {
                booksContainer.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                        <h3>数据加载失败</h3>
                        <p>无法加载书籍数据，请稍后再试。</p>
                    </div>
                `;
            }
            
            if (papersContainer) {
                papersContainer.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                        <h3>数据加载失败</h3>
                        <p>无法加载文献数据，请稍后再试。</p>
                    </div>
                `;
            }
        });
}

// 当文档加载完成后初始化页面
document.addEventListener('DOMContentLoaded', initPage);