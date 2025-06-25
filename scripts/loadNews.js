// 加载新闻数据
document.addEventListener('DOMContentLoaded', function() {
    // 加载新闻预览（主页）
    const newsPreview = document.getElementById('newsPreview');
    // 加载完整新闻列表（新闻页）
    const newsList = document.getElementById('newsList');
    
    if (newsPreview || newsList) {
        fetch('data/news.json')
            .then(response => response.json())
            .then(data => {
                // 按日期排序
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // 主页只显示3条最新新闻
                if (newsPreview) {
                    const previewItems = data.slice(0, 3);
                    newsPreview.innerHTML = previewItems.map(item => createNewsCard(item)).join('');
                }
                
                // 新闻页显示所有新闻
                if (newsList) {
                    newsList.innerHTML = data.map(item => createNewsItem(item)).join('');
                }
            })
            .catch(error => console.error('加载新闻数据失败:', error));
    }
});

// 创建新闻卡片（主页用）
function createNewsCard(item) {
    return `
        <div class="col">
            <div class="card h-100 shadow-sm">
                <div class="card-header bg-light">
                    <span class="badge bg-primary">新闻</span>
                    <small class="text-muted float-end">${item.date}</small>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.summary}</p>
                </div>
                <div class="card-footer bg-white">
                    <a href="${item.link}" class="btn btn-sm btn-outline-primary">阅读更多</a>
                </div>
            </div>
        </div>
    `;
}

// 创建新闻列表项（新闻页用）
function createNewsItem(item) {
    return `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${item.title}</h5>
                <small>${item.date}</small>
            </div>
            <p class="mb-1">${item.summary}</p>
            <a href="${item.link}" class="text-decoration-none">阅读更多</a>
        </div>
    `;
}