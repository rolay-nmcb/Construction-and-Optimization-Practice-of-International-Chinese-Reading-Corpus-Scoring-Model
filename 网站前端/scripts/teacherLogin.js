document.getElementById('studentLogin').addEventListener('submit', async event => {
    // 防止表单的默认提交行为
    event.preventDefault(); 

    // 获取用户输入的用户名和密码
    const telephone = document.getElementById('telephone').value;
    const password = document.getElementById('password').value;
    const role = 1;

    try {
        // 发送 AJAX 请求到后端登录接口
        const response = await fetch('/studentLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telephone: telephone,
                password: password,
                role: role
            })
        });

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`服务器响应错误: ${response.status}`);
        }

        // 解析响应 JSON 数据
        const data = await response.json();

        if (data.code === 0) {
            // 登录成功，处理成功逻辑
            alert('登录成功！');

            // 从响应头中提取令牌（如果后端返回了令牌）
            const token = response.headers.get('session');
            if (token) {
                // 将令牌存储到 localStorage 或其他适当位置
                localStorage.setItem('session', token);
            }

            // 把姓名和头像存储到 localStorage
            localStorage.setItem('username', data.result.username);
            localStorage.setItem('avatar', data.result.avatar);

            // 例如，重定向到首页
            window.location.href = '/teacherIndex';
        }else if (data.code === 2003 || data.code == 2004 || data.code === 9041) {
            // 会话过期或未授权，重定向到登录页面
            alert(`${data.message}`);
            window.location.href = 'index.html';
        } else {
            // 登录失败，显示错误信息
            alert(`登录失败：${data.message}`);
        }
    } catch (error) {
        // 处理网络错误或其他异常
        console.error('网络错误:', error);
        alert('网络错误，请稍后再试。');
    }
});

