console.log('Simple Chrome Translator：扩展执行');


/**
 * 封装ajax
 */
const MyHttp = {
    get: (url, success) => {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                success(xhr.responseText);
            }
        };
        xhr.send();
    },
}



/**
 * 封装对话框
 */
const MyDialog = {
    show: (str) => {
        alert(str)
    }
}



// 添加使用默认搜索引擎搜索
chrome.contextMenus.create({
    title: '翻译: 【%s】', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: async function (params) {

        await MyHttp.get(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${params.selectionText}`, (res) => {
            let obj = JSON.parse(res)
            let result = obj.translateResult[0][0]['tgt'];
            console.log(result);

            MyDialog.show('翻译：' + params.selectionText + '\n' + '结果：' + result);
        });

    }
});


// 添加图标的点击事件
chrome.browserAction.onClicked.addListener(function (tab) {
    MyDialog.show('Simple Chrome Translator');
});