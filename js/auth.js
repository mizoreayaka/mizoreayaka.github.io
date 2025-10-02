// 简单的用户数据库（实际项目中不要这样存储密码！）
const validUsers = {
    'sxy123': '1234',
};

// 检查登录状态
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // 如果在内容页面但未登录，跳转到登录页
    if (currentPage === 'home.html' && !isLoggedIn) {
        window.location.href = 'load.html';
        return false;
    }
    
    // 如果在登录页面但已登录，跳转到内容页
    if (currentPage === 'load.html' && isLoggedIn) {
        window.location.href = 'home.html';
        return true;
    }
    
    return !!isLoggedIn;
}

// 登录函数
function login(username, password) {
    // 清除之前的错误状态
    clearErrors();
    
    let isValid = true;
    
    // 验证用户名
    if (!username) {
        showError('username', '请输入用户名');
        isValid = false;
    }
    
    // 验证密码
    if (!password) {
        showError('password', '请输入密码');
        isValid = false;
    }
    
    if (!isValid) return false;
    
    // 检查用户名和密码是否匹配
    if (validUsers[username] && validUsers[username] === password) {
        // 登录成功
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'home.html';
        return true;
    } else {
        // 登录失败
        showError('general', '用户名或密码错误');
        showError('username', '');
        showError('password', '');
        
        // 输入框变红
        document.getElementById('username').classList.add('error');
        document.getElementById('password').classList.add('error');
        return false;
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'load.html';
}

// 显示错误信息
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    const inputElement = document.getElementById(fieldId);
    if (inputElement) {
        if (message) {
            inputElement.classList.add('error');
        } else {
            inputElement.classList.remove('error');
        }
    }
}

// 清除所有错误状态
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach(input => {
        input.classList.remove('error');
    });
}

// 页面加载时检查认证状态
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // 如果是登录页面，设置表单提交事件
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            login(username, password);
        });
    }
    
    // 如果在内容页面，显示用户名
    const usernameElement = document.getElementById('displayUsername');
    const username = localStorage.getItem('username');
    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
});
