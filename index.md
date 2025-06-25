---
layout: home
title: 首页
---

<!-- 首页特有内容 -->
<div class="home-logo">
    <!-- 使用相对路径确保图片正确加载 -->
    <img src="{{ '/assets/images/logo.jpg' | relative_url }}" alt="中国科大高能时域天文课题组 Logo">
</div>

欢迎访问中国科大高能时域天文课题组官方网站！

<!-- 最新新闻部分 -->
<section class="recent-news">
    <h2>最新动态</h2>
    <ul>
        {% comment %} 动态获取最新3条新闻 {% endcomment %}
        {% assign recent_news = site.posts | limit: 3 %}
        {% for post in recent_news %}
        <li>
            <!-- 使用动态链接 -->
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            
            <!-- 动态日期格式 -->
            <span class="post-date">{{ post.date | date: "%Y年%m月%d日" }}</span>
            
            <!-- 动态微信公众号链接 -->
            {% if post.wechat %}
            <a href="{{ post.wechat }}" class="wechat-link">[微信]</a>
            {% endif %}
        </li>
        {% endfor %}
    </ul>
</section>