using Microsoft.JSInterop;

namespace HubDevelop.Web.Rendering;

/// <summary>
/// 真实可在浏览器运行的 WebGL 极光背景（GLSL fragment shader）。
/// 通过 JS 互操作调用 <c>wwwroot/app.js</c> 中的 <c>hubdevelop.initAurora</c>。
/// 这是当前的默认实现，效果与旧站「光阴流转」一致，只是换成了真 WebGL 渲染。
/// </summary>
public sealed class WebGLAurora : IBackgroundRenderer
{
    public async Task StartAsync(string canvasId, IJSRuntime js, CancellationToken ct = default)
    {
        await js.InvokeAsync<string>("hubdevelop.initAurora", ct, canvasId);
    }
}
