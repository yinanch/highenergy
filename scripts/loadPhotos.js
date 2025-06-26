// 加载图片数据
document.addEventListener('DOMContentLoaded', function() {
    const photosContainer = document.getElementById('photosContainer');
    const photoCountElement = document.getElementById('photoCount');
    
    if (photosContainer) {
        fetch('data/photos.json')
            .then(response => response.json())
            .then(data => {
                // 更新图片数量显示
                if (photoCountElement) {
                    photoCountElement.textContent = `${data.length} 张图片`;
                }
                
                // 按日期倒序排列（最新在前）
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // 渲染图片
                photosContainer.innerHTML = data.map(photo => createPhotoCard(photo)).join('');
            })
            .catch(error => console.error('加载图片数据失败:', error));
    }
});

// 创建图片卡片
function createPhotoCard(photo) {
    return `
        <div class="col">
            <div class="card h-100 photo-card">
                <div class="photo-container">
                    <img src="${photo.image}" class="card-img-top" alt="${photo.title}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${photo.title}</h5>
                    <p class="card-text">${photo.description}</p>
                </div>
                <div class="card-footer bg-white">
                    <small class="text-muted">${formatDate(photo.date)}</small>
                </div>
            </div>
        </div>
    `;
}

// 格式化日期为YYYY年MM月DD日
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, '0')}月${date.getDate().toString().padStart(2, '0')}日`;
}