---
layout: page
title: 组内风尚
---

<div class="news-container">
  {% for post in site.posts %}
    <article class="news-article">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <div class="post-meta">
        <span class="post-date">{{ post.date | date: site.date_format }}</span>
        {% if post.wechat %}
          <a href="{{ post.wechat }}" class="wechat-link">微信公众号</a>
        {% endif %}
      </div>
      <div class="post-excerpt">
        {{ post.excerpt | default: post.content | strip_html | truncate: 200 }}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">阅读更多</a>
    </article>
  {% endfor %}
</div>