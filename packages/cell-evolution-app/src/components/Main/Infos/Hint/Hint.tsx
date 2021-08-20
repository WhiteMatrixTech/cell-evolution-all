import cn from 'classnames';
import { useState } from 'react';
import Tour from 'reactour';

import styles from './Hint.less';

interface HintProps {
  className?: string;
}

const steps = [
  {
    selector: '.day',
    navDotAriaLabel: '存活日',
    content: '存活日代表着游戏内已经存活的天数,尽可能多的存活可以拿到更高分数。',
  },
  {
    selector: '.cell',
    navDotAriaLabel: '细胞数',
    content: '细胞数代表着你现有的细胞数量,尽可能多的培育细胞可以拿到更高分数。',
  },
  {
    selector: '.env',
    navDotAriaLabel: '外部环境',
    content: '外部环境会随着存活日增加而增加,高危的环境会对生命周期造成威胁。',
  },
  {
    selector: '.reproduction',
    navDotAriaLabel: '繁殖性',
    content: '繁殖性决定每次繁殖的数量。',
  },
  {
    selector: '.adaptability',
    navDotAriaLabel: '适应性',
    content: '适应性决定了变异的成功率。',
  },
  {
    selector: '.survivability',
    navDotAriaLabel: '生存性',
    content: '生存性决定了细胞抗击外部环境的抵抗力。',
  },
  {
    selector: '.lifeCycle',
    navDotAriaLabel: '生命周期',
    content: '生命周期决定了细胞的生存日,在生命周期结束前尝试休眠吧。',
  },
  {
    selector: '.reproduce',
    navDotAriaLabel: '繁殖',
    content: '繁殖可以增加细胞数量。',
  },
  {
    selector: '.evolute',
    navDotAriaLabel: '进化',
    content: '进化可以在特定条件下增强繁殖性适应性与生存性。',
  },
  {
    selector: '.vary',
    navDotAriaLabel: '变异',
    content: '变异也可以在特定条件下增强繁殖性适应性与生存性,据说变异有三种模式。',
  },
  {
    selector: '.dormant',
    navDotAriaLabel: '休眠',
    content: `休眠可以恢复生命周期,恢复数量与生存性和外部环境有关。
尽可能的运用自己的策略来发展出独一无二的细胞,总计逾千种称号会体现在游戏中。`,
  },
  {
    selector: '.apoptosis',
    navDotAriaLabel: '凋亡',
    content: `细胞凋亡是生物学上的术语，在自然界中也是非常重要的发现。有些细胞牺牲是有利于有机体的维持和更新，他们完成自己的使命后，自己悄悄退出。在这里我们通过这个功能给了世界修补者更多发挥的空间。当你选择凋亡的时候，细胞的生命周期会即刻归零，繁殖性，适应性以及生存性中最高的属性会有部分融合进世界dna。牺牲自我，成就世界。`,
  },
  {
    selector: '.inherit',
    navDotAriaLabel: '遗传',
    content: `遗传细胞可以在开始的时候，遗传一定世界dna的属性作为初始属性，有几率遗传到比较好的属性，也有几率遗传下来的属性较低。不过如果想要冲击高分的玩家，可以尽可能的遗传到较高的三个初始属性，作为开局。而想要修补世界的玩家，则可以针对性的选择遗传开局。这样也增加了世界与个体细胞的联动，激励大家更多的去融合进世界，冲击更高的世界分数,这样也对自己后面的游戏更容易争取初期优势。`,
  },
  {
    selector: '.infos',
    navDotAriaLabel: '世界数据和细胞资料',
    content: (
      <p>
        世界数据可以获得当前族群的所有数据
        <br />
        <br />
        细胞资料可以任意读取之前进行DNA融合的细胞资料。
      </p>
    ),
  },
  {
    navDotAriaLabel: '宇宙之美',
    content: (
      <p style={{ textAlign: 'center' }}>
        浩瀚的宇宙中有无数的世界, 能否进化到你想要的世界需要团队精神与合作意识。
        <br />
        <br />
        各种宇宙的意识形态以及达成的条件都有所不同,这是一个多元化的世界。
        <br />
        虫族世界需要充沛的细胞,而精神世界则不会有过多的细胞存在。
        <br />
        <br />
        每个玩家都有5^99的选择，也是1.57e+69次可能, 无数玩家汇聚成世界,无数次的偶然,几率,变异,凋亡,
        这是真正的从1到无限可能,经过无数次的变化, 最终世界收束成它最后的模样。
        <br />
        我认为这是一种数学之美,也是真正的科幻之美!
      </p>
    ),
  },
];

export function Hint(props: HintProps) {
  const { className } = props;

  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <>
      <div className={cn(styles.Hint, className)} onClick={() => setIsTourOpen(true)}>
        <div className={styles.icon}></div>
        <div className={styles.text}>玩法说明</div>
      </div>
      <Tour
        className={styles.tour}
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        badgeContent={(cur: number) => steps[cur - 1].navDotAriaLabel}
      />
    </>
  );
}
