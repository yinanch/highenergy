// 加载导航栏到每个页面
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container">
                    <a class="navbar-brand d-flex align-items-center" href="index.html">
                        <img src="images/logo.jpeg" width="40" class="me-2">
                        <span>高能时域天文课题组</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="index.html">主页</a></li>
                            <li class="nav-item"><a class="nav-link" href="members.html">组内成员</a></li>
                            <li class="nav-item"><a class="nav-link" href="recent_achievements.html">最新成果</a></li>
                            <li class="nav-item"><a class="nav-link" href="past_achievements.html">往日成就</a></li>
                            <li class="nav-item"><a class="nav-link" href="news.html">组内风尚</a></li>
                            <li class="nav-item"><a class="nav-link" href="readings.html">推荐读物</a></li>
                            <li class="nav-item"><a class="nav-link" href="readings.html">招生信息</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
});