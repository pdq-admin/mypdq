// 获取DOM元素
const postForm = document.getElementById('postForm');
const postList = document.getElementById('postList');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

// 从localStorage加载帖子
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// 渲染帖子列表
function renderPosts() {
  postList.innerHTML = '';
  posts.forEach((post, index) => {
    const postItem = document.createElement('div');
    postItem.className = 'post-item';
    postItem.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>${new Date(post.timestamp).toLocaleString()}</small>
    `;
    postList.appendChild(postItem);
  });
}

// 处理表单提交
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // 获取表单数据
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  
  // 表单验证
  if (!title || !content) {
    alert('请填写标题和内容');
    return;
  }

  // 创建新帖子
  const newPost = {
    title,
    content,
    timestamp: new Date().toISOString()
  };

  // 添加到帖子列表
  posts.unshift(newPost);
  
  // 保存到localStorage
  localStorage.setItem('posts', JSON.stringify(posts));
  
  // 清空表单
  postForm.reset();
  
  // 重新渲染帖子列表
  renderPosts();
});

// 初始化时渲染帖子
renderPosts();

// 添加科幻效果
const container = document.querySelector('.container');
container.style.opacity = 0;

let opacity = 0;
const fadeIn = setInterval(() => {
  opacity += 0.05;
  container.style.opacity = opacity;
  if (opacity >= 1) clearInterval(fadeIn);
}, 50);
