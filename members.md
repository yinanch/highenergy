---
layout: page
title: 研究团队
---

{% for category in site.member_categories %}
  <section class="member-category">
    <h2>{{ category }}</h2>
    <div class="member-grid">
      {% assign members = site.data.members | where: "category", category %}
      {% for member in members %}
        <div class="member-card">
          <img src="/assets/images/members/{{ member.photo }}" alt="{{ member.name }}">
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <p>在校时间: {{ member.period }}</p>
            {% if member.homepage %}
              <p><a href="{{ member.homepage }}" target="_blank">个人主页</a></p>
            {% endif %}
          </div>
        </div>
      {% endfor %}
    </div>
  </section>
{% endfor %}