# 清静 B 站 · Quiet Bilibili

让 B 站首页只留下搜索和常用入口，把看什么的选择留给自己。

面向 **Mac Safari** 的免费用户脚本，由 App Store 中的 **Userscripts** 扩展运行。安装一次，之后打开 B 站自动生效；不需要 Xcode、开发者账号或「允许未签名的扩展」。

**[下载脚本](https://raw.githubusercontent.com/Mmmmmmieoi/quiet-bilibili/main/Quiet-Bilibili.user.js)** · [查看源码](Quiet-Bilibili.user.js) · [反馈问题](https://github.com/Mmmmmmieoi/quiet-bilibili/issues)

> 本项目为独立实现的非官方页面简化工具，与哔哩哔哩、Clean Bilibili 及 Userscripts 的开发者无隶属或授权关系。本仓库只分发净化脚本，Userscripts 请从官方 App Store 自行安装。

## 能做什么

- 首页隐藏推荐信息流，显示简洁搜索框，支持浅色和深色外观。
- 保留动态、历史、收藏或个人空间、稍后再看、账号入口。
- 隐藏已适配的视频侧栏推荐与片尾推荐，保留播放器、UP 主、评论和课程选集。
- 首页底部可以「本页暂时显示原首页」；刷新或下次打开时重新净化。

搜索仍跳转 B 站自己的搜索页。收藏入口从使用者当前页面获取：未找到有效收藏链接时显示「个人空间」，没有绑定任何人的账号。

## 安装教程：Mac Safari

不需要懂代码。推荐用下面的文件导入方式，扩展只需获得 B 站权限。

### 1. 安装并开启 Userscripts

1. 在 Mac 上打开 [Userscripts 的 App Store 页面](https://apps.apple.com/app/userscripts/id1463298887)，核对开发者为 **Justin Wasack**，然后安装。
2. 打开 Userscripts 应用一次。应用中会显示脚本保存位置（Save Location），默认位置即可。
3. 打开 **Safari → 设置 → 扩展**，勾选 **Userscripts**。如果 Safari 提示「有新扩展可用」，也可点击「打开扩展」。
4. 点击 Safari 工具栏的 Userscripts 图标一次，让扩展完成初始化。此时看到 `No matched userscripts` 很正常。

### 2. 下载并放入脚本

1. 在 Safari 中打开上方的 **下载脚本** 链接。如果显示一整页代码，这是正常的。
2. 按 **⌘S** 保存，文件名保留为 **`Quiet-Bilibili.user.js`**。若有格式选项，选择页面源代码；不要保存成网页归档 `.webarchive`、HTML 或 `.txt` 文件。
3. 点击 Safari 工具栏的 Userscripts 图标，再点击文件夹按钮 **Open save location**，在 Finder 中打开脚本目录。
4. 将下载的 `Quiet-Bilibili.user.js` 复制到该目录。不需要复制本仓库的其他文件。
5. 关闭并重新打开 Userscripts 弹窗，刷新脚本列表。

**下载不方便时的备用方式：**在本仓库点击绿色 **Code → Download ZIP**，解压后取出其中的 `Quiet-Bilibili.user.js`，再放入上述目录。这样不会把代码误存成网页文件。

**目录打不开时：**先确认 Safari 扩展已开启，并至少打开过一次扩展弹窗；也可在 Userscripts 应用中通过 **Change** 选择一个专门保存脚本的本机文件夹，再把脚本放进去。建议使用本机目录，避免云端文件被移除本地副本后影响加载。

### 3. 只授权 B 站，并验证

1. 打开 [B 站首页](https://www.bilibili.com/)。
2. 点击 Safari 工具栏的 Userscripts 图标。出现网站权限提示时，选择 **「在此网站上始终允许」**。
3. **不需要选择「在每个网站上始终允许」。**没有必要给 GitHub、下载域名或其他网站额外权限。
4. 在弹窗中确认 **「清静 B 站」**已开启，然后刷新 B 站。
5. 看到 **「只看你想看的。」**和搜索框，就安装成功了。

以后照常使用 Safari，不需要保持 Userscripts 应用窗口打开。保留应用、脚本文件和网站授权即可。

## 暂停、卸载和更新

- **仅这次看原首页：**点击净化首页底部「本页暂时显示原首页」。
- **暂停脚本：**在 Userscripts 中关闭「清静 B 站」，然后刷新已打开的 B 站页面。
- **卸载脚本：**在 Userscripts 中删除它，或从脚本目录移除该 `.user.js` 文件，然后刷新页面。其他脚本不受影响。
- **更新：**从本仓库下载新版本，替换脚本目录中同名文件；重新打开 Userscripts 弹窗，刷新 B 站。本版本没有配置远程自动更新。

请只保留一份清静 B 站脚本。若曾使用旧版独立 Safari 扩展，先在 Safari 设置中关闭旧版，避免重复显示。

## 常见问题

**安装后还是原首页？** 依次检查 Safari 扩展是否开启、B 站权限是否为始终允许、脚本文件扩展名是否正确、脚本是否已开启。然后关闭并重新打开扩展弹窗，再刷新 B 站。无痕窗口有独立权限，普通窗口的授权不代表无痕模式也生效。

**为什么 Userscripts 能读网页？** 修改页面显示需要网页访问权限。请只授权 B 站。脚本匹配范围仅为 `https://www.bilibili.com/*` 和 `https://bilibili.com/*`，不会在其他域名运行；Userscripts 是通用脚本管理器，其自身权限范围可能比这份脚本的匹配范围更广。

**每次重启都要重新设置吗？** 不需要。这是由 App Store 扩展运行的脚本，不依赖未签名扩展的临时开发开关。

**为什么收藏有时显示个人空间？** 脚本只能使用页面中已有的有效收藏入口；未登录或页面尚未提供该入口时，会保留个人空间链接。

**能单独关闭侧栏净化吗？** 当前版本默认开启全部净化功能，还没有分项设置界面。可整体停用脚本并刷新恢复原页面。

**iPad、iPhone 或其他浏览器能用吗？** Userscripts 本身支持 iOS/iPadOS，但本项目当前只验证了 Mac Safari。移动版 B 站结构不同，暂不承诺支持；其他浏览器也未验证。

## 隐私与功能边界

- 本脚本没有遥测、分析统计、账号登录、数据上传、远程代码依赖或后台服务器，不读取 Cookie，也不保存使用者的账号信息。
- 搜索和导航使用 B 站原有网站；这些网站仍按各自规则处理访问数据。脚本不改变 B 站自身的数据收集行为。
- 净化通过本地页面显示调整实现，**不保证阻止推荐内容的后台网络请求**，也不保证阻止自动连播。
- 隐藏首页区域可能连带隐藏其中的推广位。项目不提供会员破解、付费内容解锁、视频下载或内容再分发功能。
- B 站改版后可能失效；片尾推荐、番剧、稍后再看等页面的覆盖不是完整兼容保证。
- 免费和开源不构成法律合规保证；使用和分发时仍应遵守适用法律及服务条款。

## 验证情况

脚本主体在 Safari 26.3.1 的浏览器测试夹具中通过了 14 项检查，覆盖首页替换、搜索编码、临时恢复、动态推荐元素、视频布局和路由切换等。

在 Userscripts 4.8.6 下实际验证了：关闭「允许未签名的扩展」后，刷新和新开 B 站首页均自动净化，搜索结果可访问，课程视频页保留播放器、评论和选集。未执行完整 Safari 退出重启测试；移动设备及全部视频结尾样式尚未完整验证。

发现问题可提交 Issue，说明 Safari 和 Userscripts 版本、页面类型及复现步骤。请勿上传 Cookie、登录凭据、个人账号页面截图或其他隐私信息。

## 许可证与致谢

本仓库代码采用 [MIT License](LICENSE)，允许在保留许可证声明的前提下使用、修改及再分发，也允许商业使用。软件按现状提供，不作功能或适用性保证。

感谢 [Userscripts](https://github.com/quoid/userscripts) 提供 Safari 脚本运行环境；该项目单独分发并遵循其自身许可证。此仓库不包含 Userscripts 或 Clean Bilibili 的源码。

English: A lightweight, unofficial Bilibili decluttering userscript for Safari on Mac. It replaces the recommendation-heavy homepage with search and useful links. Install with Userscripts from the App Store; no unsigned extension setting is needed.
