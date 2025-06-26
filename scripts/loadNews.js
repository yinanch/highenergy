// 更新新闻加载脚本以支持学术交流页面
document.addEventListener('DOMContentLoaded', function() {
    // 加载新闻预览（主页）
    const newsPreview = document.getElementById('newsPreview');
    // 加载完整新闻列表（学术交流页）
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
                
                // 学术交流页显示所有新闻
                if (newsList) {
                    newsList.innerHTML = data.map(item => createNewsItem(item)).join('');
                    
                    // 更新结果计数
                    document.getElementById('resultCount').textContent = `共 ${data.length} 条记录`;
                }
            })
            .catch(error => {
                console.error('加载新闻数据失败:', error);
                if (newsList) {
                    newsList.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-exclamation-triangle me-2"></i>加载新闻数据失败，请稍后再试
                        </div>
                    `;
                }
            });
    }
});

// 创建新闻卡片（主页用）
function createNewsCard(item) {
    return `
        <div class="col">
            <div class="card h-100 shadow-sm">
                <div class="card-header bg-light">
                    <span class="badge bg-primary">${item.category || '新闻'}</span>
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

// 创建新闻列表项（学术交流页用）
function createNewsItem(item) {
    // 为不同类别设置不同的徽章颜色
    const categoryColors = {
        'research': 'primary',
        'seminar': 'success',
        'conference': 'info',
        'award': 'warning'
    };
    
    const categoryNames = {
        'research': '研究进展',
        'seminar': '学术讲座',
        'conference': '学术会议',
        'award': '获奖信息'
    };
    
    const category = item.category || 'research';
    const badgeColor = categoryColors[category] || 'primary';
    const categoryName = categoryNames[category] || '新闻';
    
    return `
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-${badgeColor}">${categoryName}</span>
                    <small class="text-muted">${item.date}</small>
                </div>
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.summary}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a href="${item.link}" class="btn btn-sm btn-outline-primary">
                        <i class="fas fa-book-reader me-1"></i>阅读全文
                    </a>
                </div>
            </div>
        </div>
    `;
}