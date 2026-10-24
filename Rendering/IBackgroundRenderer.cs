using Microsoft.JSInterop;

namespace HubDevelop.Web.Rendering;

/// <summary>
/// 核心站点背景渲染器抽象。
/// 目前由 <see cref="WebGLAurora"/> 提供可在浏览器直接运行的实际极光效果；
/// <see cref="BytaGLBackground"/> 是 Byta.GL（用户自研 3D/WebGL 库）的接入桩，
/// 等其 WebGL 后端发布到浏览器可用形态后即可一键切换。
/// </summary>
public interface IBackgroundRenderer
{
    /// <summary>
    /// 在给定的 canvas 上启动背景渲染。
    /// </summary>
    /// <param name="canvasId">目标 &lt;canvas&gt; 的 id。</param>
    /// <param name="js">Blazor 的 JS 互操作运行时。</param>
    /// <param name="ct">取消令牌。</param>
    Task StartAsync(string canvasId, IJSRuntime js, CancellationToken ct = default);
}
