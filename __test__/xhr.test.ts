import { describe, it, expect, vi } from 'vitest';
// import { newXMLHttpRequest } from './your-file'; // 假设你的文件路径是这样
import { JSDOM } from 'jsdom';

// 创建一个全局的 window 对象
globalThis.window = new JSDOM('').window;

describe('XMLHttpRequest Test', () => {
  it('should log the response when readyState is 4 and status is 200', async () => {
    // 模拟 XMLHttpRequest
    const mockXhr = new globalThis.window.XMLHttpRequest();
    vi.spyOn(globalThis.window, 'XMLHttpRequest').mockImplementation(() => mockXhr);

    // 模拟控制台.log
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation();

    // 模拟 onreadystatechange
    const onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log('%c [  ]-7', 'font-size:13px; background:#51dc8c; color:#95ffd0;', mockXhr.responseText);
      }
    };

    // 设置初始状态
    mockXhr.open = vi.fn().mockImplementation(() => {});
    mockXhr.send = vi.fn().mockImplementation(() => {});

    // 调用函数
    const xhr = new XMLHttpRequest();
    mockXhr.open('GET', '/public/json');
    mockXhr.onreadystatechange = onreadystatechange;
    mockXhr.send();

    // 模拟状态改变
    // mockXhr.readyState = 4;
    // mockXhr.status = 200;
    // mockXhr.responseText = 'Sample response text';
    // mockXhr.dispatchEvent(new globalThis.window.Event('readystatechange'));

    // 验证是否调用了 console.log 并且传入了正确的参数
    // expect(consoleLogSpy).toHaveBeenCalledWith(
    //   '%c [  ]-7',
    //   'font-size:13px; background:#51dc8c; color:#95ffd0;',
    //   'Sample response text'
    // );
  });
});