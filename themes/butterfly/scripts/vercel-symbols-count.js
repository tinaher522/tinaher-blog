hexo.extend.filter.register('before_post_render', function(data){
  // 确保 symbolCount 函数存在
  if (typeof symbolCount !== 'function') {
    hexo.log.warn('symbolCount 未定义，创建模拟函数');
    hexo.extend.helper.register('symbolCount', function(content) {
      return content ? content.length : 0;
    });
  }
});

hexo.extend.helper.register('total_symbols', function(site){
  // 计算全站字符总数
  let total = 0;
  site.posts.forEach(post => {
    if (typeof symbolCount === 'function') {
      total += symbolCount(post.content);
    } else {
      total += post.content?.length || 0;
    }
  });
  return total;
});
