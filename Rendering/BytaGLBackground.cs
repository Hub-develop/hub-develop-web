using Microsoft.JSInterop;

namespace HubDevelop.Web.Rendering;

/// <summary>
/// Byta.GL（用户自研 3D/WebGL 渲染库，NuGet: <c>Byta.GL</c>）的接入桩。
///
/// 现状（2026-10-24 核实）：Byta.GL 的<b>浏览器 WebGL2 后端</b>已在
/// <c>Hub-Game-develop/Byta</c> 的 main 分支就绪（新增 <c>Byta.Browser</c> 工程 +
/// <c>byta-gl.v9.js</c> + <c>samples/Byta.Sample.Web</c> 完整示例，GLSL ES 3.00，
/// 经 <c>BytaBrowserRuntime.InitializeAsync(canvasId)</c> 把整个 GL 门面切到 WebGL2）；
/// 但 NuGet 还停在 0.1.1（仅原生 macOS-arm64 Mesa/Apple GL 绑定，浏览器用不了），
/// 且 <c>Byta.Browser</c> 标了 <c>IsPackable=false</c>，只能源码 ProjectReference、不能 NuGet 引用。
///
/// 已与用户确认：<b>等 Byta.GL 0.2.0（含浏览器后端）发到 NuGet 后，再用 &lt;PackageReference&gt; 接入</b>。
/// 在此之前本渲染器保持禁用，由 <see cref="WebGLAurora"/>（真 WebGL GLSL 极光）兜底。
///
/// 0.2.0 发包后的启用步骤（已核实真实 API，可直接照做）：
///   1. csproj 加 &lt;PackageReference Include="Byta.GL" Version="0.2.0" /&gt;（含 Byta.Browser）；
///   2. 把下方 <c>Available</c> 改为 <c>true</c>，并在 Background.razor 换成 <c>new BytaGLBackground()</c>；
///   3. StartAsync 内：<c>await BytaBrowserRuntime.InitializeAsync(canvasId)</c> 创建 WebGL2 上下文，
///      之后用主包 API（GlBuffer / GlVertexArray / GlProgram.FromSource / GlDraw / GlState）驱动渲染；
///   4. 发布时必须用 target 把 <c>byta-gl.v9.js</c> 复制到 <c>wwwroot/_framework/</c>
///      （JS 模块相对 _framework 解析，否则 JSHost.ImportAsync 找不到文件）；
///   5. AOT 需在 CI 装 wasm-tools workload（Byta.Browser 用 JSImport，AOT 兼容）。
/// 参考：https://github.com/Hub-Game-develop/Byta （samples/Byta.Sample.Web）
/// </summary>
public sealed class BytaGLBackground : IBackgroundRenderer
{
    // WebGL 后端就绪前保持 false，交由 WebGLAurora 兜底。
    private const bool Available = false;

    public async Task StartAsync(string canvasId, IJSRuntime js, CancellationToken ct = default)
    {
        if (!Available)
            return;

        // —— 以下为 Byta.GL WebGL 后端就绪后的接入示意（当前不执行）——
        // using var ctx = Byta.GL.WebGL.Context.Create(canvasId);
        // while (!ct.IsCancellationRequested)
        // {
        //     ctx.Clear();
        //     ctx.Draw(scene);
        //     await ctx.PresentAsync();
        // }
    }
}
