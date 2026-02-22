export const adList = [
  {
    open: true,
    slot: "/6355419/Travel/Europe/France/Paris1",
    id: "ad1",
  },
  {
    open: true,
    slot: "/6355419/Travel/Europe/France/Paris2",
    id: "ad2",
  },
  {
    open: true,
    slot: "/6355419/Travel/Europe/France/Paris3",
    id: "ad3",
  },
  {
    open: true,
    slot: "/6355419/Travel/Europe/France/Paris30",
    id: "ad4",
  },
];

export const sizesAll = [
  // "fluid",
  [300, 250], // 中矩形 - 收益最高，最通用，全设备填充率第一
  [336, 280], // 大矩形 - 桌面端收益高于300x250
  [728, 90], // 领布告 - 桌面端页眉，品牌广告主首选
  [300, 600], // 半页广告 - eCPM极高，用户停留时间长
  [320, 100], // 大型移动横幅 - 移动端主力，比320x50收益高30%
  [160, 600], // 宽摩天大楼 - CTR稳定，侧边栏表现优异
  [970, 90], // 大屏幕布告 - 高影响力横幅，品牌曝光
  [970, 250], // 大屏幕布告 - 超大尺寸，品牌广告
  [320, 50], // 移动横幅 - 移动端覆盖面广，保底主力
  [250, 250], // 方形 - 适应性强的通用尺寸
  [468, 60], // 全横幅 - 传统尺寸，仍有填充
  [200, 200], // 小方形 - 小区域专用
  [120, 600], // 摩天大楼 - 窄侧边栏，填充率相对较低
];

/**
 * 渲染普通页内广告
 * @description 使用规则：在app.vue或者需要引入的页面中引入
 * - 在app.vue中引入useRenderComAd()方法
 * - 写入对应的div盒子 <div :id="adList[0].id" class="flex justify-center items-center min-h-75 w-full"></div>
 */
export const useRenderComAd = () => {
  onMounted(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      const adListRes = adList
        .filter((item) => item.open)
        .map((item) => {
          const { slot, id } = item;
          return window?.googletag
            .defineSlot(slot, sizesAll, id)
            ?.addService(window?.googletag?.pubads())
            ?.setTargeting("comAd");
        });
      // 配置尺寸映射
      const mapping = window?.googletag
        ?.sizeMapping()
        // 超大桌面 (1440px 及以上) - 使用最大的品牌广告尺寸
        ?.addSize(
          [1440, 0],
          [
            // "fluid",
            [300, 250],
            [336, 280],
            [728, 90],
            [300, 600],
            [970, 90],
            [970, 250],
            [160, 600],
          ],
        )
        // 大桌面 (1024-1440) - 标准桌面尺寸
        ?.addSize(
          [1024, 0],
          [
            // "fluid",
            [300, 250],
            [336, 280],
            [728, 90],
            [300, 600],
            [970, 90],
            [160, 600],
          ],
        )
        // 小桌面/大平板 (768-1024) - 移除超大尺寸
        ?.addSize(
          [768, 0],
          [
            // "fluid",
            [300, 250],
            [336, 280],
            [728, 90],
            [300, 600],
            [160, 600],
          ],
        )
        // 小平板/大手机 (425-768) - 矩形为主
        ?.addSize(
          [425, 0],
          [
            // "fluid",
            [300, 250],
            [336, 280],
            [320, 100],
            [320, 50],
          ],
        )
        // 大手机 (375-425) - 标准移动尺寸
        ?.addSize(
          [375, 0],
          [
            // "fluid",
            [300, 250],
            [320, 100],
            [320, 50],
          ],
        )
        // 中手机 (320-375) - 主流手机尺寸
        ?.addSize(
          [320, 0],
          [
            // "fluid",
            [300, 250],
            [320, 100],
            [320, 50],
          ],
        )
        // 小手机 (0-320) - 最小屏幕，确保填充
        ?.addSize(
          [0, 0],
          [
            // "fluid",
            [300, 250],
            [250, 250],
            [320, 50],
          ],
        )
        ?.build();
      adListRes.forEach((item) => item.defineSizeMapping(mapping));
      // 配置懒加载
      window?.googletag?.setConfig({
        lazyLoad: {
          fetchMarginPercent: 0,
          renderMarginPercent: 0,
          mobileScaling: 1.0,
        },
        singleRequest: false,
        centering: true,
      });
      window?.googletag?.enableServices();
      adListRes.forEach((item) => item && window?.googletag?.display(item));
    });
  });
};
