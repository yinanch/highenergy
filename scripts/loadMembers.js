// 加载成员数据并渲染页面
document.addEventListener('DOMContentLoaded', function() {
    const membersContainer = document.getElementById('membersContainer');
    if (!membersContainer) return;
    
    // 显示加载状态
    membersContainer.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">加载中...</span>
            </div>
            <p class="mt-3">正在加载成员信息...</p>
        </div>
    `;
    
    // 获取成员数据
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应异常');
            }
            return response.json();
        })
        .then(data => {
            renderMembers(data);
            setupSearch();
        })
        .catch(error => {
            console.error('加载成员数据失败:', error);
            membersContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">加载失败</h4>
                    <p>无法加载成员数据，请稍后再试。</p>
                    <hr>
                    <p class="mb-0">${error.message}</p>
                </div>
            `;
        });
});

// 渲染成员数据
function renderMembers(categories) {
    const membersContainer = document.getElementById('membersContainer');
    let htmlContent = '';
    
    // 遍历每个类别
    categories.forEach(category => {
        // 添加类别标题
        htmlContent += `
            <div class="member-category">
                <h2>
                    <span class="category-icon">${getCategoryIcon(category.category)}</span>
                    ${category.category}
                </h2>
            </div>
        `;
        
        // 添加成员卡片
        htmlContent += '<div class="row g-4 mb-5">';
        
        category.members.forEach(member => {
            htmlContent += `
                <div class="col-lg-4 col-md-6">
                    <div class="member-card">
                        <img src="${member.photo}" alt="${member.name}" class="member-photo">
                        <div class="member-info">
                            <h3 class="member-name">${member.name}</h3>
                            <div class="member-period">${member.title} | ${member.period}</div>
                            ${member.homepage ? `<a href="${member.homepage}" class="member-link" target="_blank">个人主页</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        htmlContent += '</div>'; // 结束行
    });
    
    membersContainer.innerHTML = htmlContent;
}

// 获取类别图标
function getCategoryIcon(category) {
    const icons = {
        "导师": "👨‍🏫",
        "博士后": "🎓",
        "博士研究生": "👨‍🔬",
        "硕士研究生": "👩‍🔬",
        "本科生": "👨‍🎓",
        "毕业生": "🎉"
    };
    return icons[category] || "👤";
}

// 设置搜索功能
function setupSearch() {
    const searchInput = document.getElementById('memberSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const memberCards = document.querySelectorAll('.member-card');
        
        memberCards.forEach(card => {
            const name = card.querySelector('.member-name').textContent.toLowerCase();
            const title = card.querySelector('.member-title').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || title.includes(searchTerm) || bio.includes(searchTerm)) {
                card.closest('.col-lg-4').style.display = '';
            } else {
                card.closest('.col-lg-4').style.display = 'none';
            }
        });
    });
}