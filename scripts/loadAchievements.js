// 加载研究成果数据
document.addEventListener('DOMContentLoaded', function() {
    // 最新成果容器
    const recentAchievements = document.getElementById('recentAchievements');
    // 往日成就容器
    const pastAchievements = document.getElementById('pastAchievements');
    // 全部成果容器（用于往日成就页）
    const allAchievements = document.getElementById('allAchievements');
    
    if (recentAchievements || pastAchievements || allAchievements) {
        fetch('data/achievements.json')
            .then(response => response.json())
            .then(data => {
                // 按日期排序（从新到旧）
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // 在最新成果页面显示前10条
                if (recentAchievements) {
                    const recentItems = data.slice(0, 10);
                    recentAchievements.innerHTML = recentItems.map(item => createAchievementCard(item)).join('');
                }
                
                // 在往日成就页面显示剩余项目
                if (pastAchievements) {
                    const pastItems = data.slice(10);
                    pastAchievements.innerHTML = pastItems.map(item => createAchievementCard(item)).join('');
                }
                
                // 在往日成就页显示所有成就
                if (allAchievements) {
                    allAchievements.innerHTML = data.map(item => createAchievementItem(item)).join('');
                }
            })
            .catch(error => console.error('加载研究成果失败:', error));
    }
});

// 创建成果卡片（带图片）
function createAchievementCard(item) {
    return `
        <div class="col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
                ${item.image ? `<img src="${item.image}" class="card-img-top" alt="${item.title}">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text"><small class="text-muted">${item.authors} • ${item.date}</small></p>
                    <p class="card-text">${item.summary}</p>
                </div>
                <div class="card-footer bg-white">
                    <a href="${item.link}" class="btn btn-sm btn-outline-primary">阅读全文</a>
                </div>
            </div>
        </div>
    `;
}

// 创建成果列表项（简洁版）
function createAchievementItem(item) {
    return `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${item.title}</h5>
                <small>${item.date}</small>
            </div>
            <p class="mb-1"><em>${item.authors}</em></p>
            <p class="mb-1">${item.summary}</p>
            <a href="${item.link}" class="text-decoration-none">阅读全文</a>
        </div>
    `;
}