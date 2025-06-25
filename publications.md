---
layout: page
title: 研究成果
---

<section class="publications-section">
  <h2>最新成果</h2>
  <p>课题组近期发表的重要研究成果：</p>
  
  <ul class="publication-list">
    {% assign recent_pubs = site.data.publications | sort: "date" | reverse %}
    {% for pub in recent_pubs limit:10 %}
      <li class="publication-item {% if pub.highlight %}highlight{% endif %}">
        <strong>{{ pub.title }}</strong><br>
        <span class="authors">{{ pub.authors }}</span><br>
        <span class="pub-date">{{ pub.date | date: site.date_format }}</span><br>
        <a href="{{ pub.link }}" target="_blank">阅读全文</a>
      </li>
    {% endfor %}
  </ul>
</section>

<section class="publications-section">
  <h2>往日成就</h2>
  <p>课题组历史研究成果：</p>
  
  <ul class="publication-list">
    {% for pub in recent_pubs offset:10 %}
      <li class="publication-item">
        <strong>{{ pub.title }}</strong><br>
        <span class="authors">{{ pub.authors }}</span><br>
        <span class="pub-date">{{ pub.date | date: site.date_format }}</span><br>
        <a href="{{ pub.link }}" target="_blank">阅读全文</a>
      </li>
    {% endfor %}
  </ul>
</section>