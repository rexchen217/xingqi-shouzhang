/* ================= 铁律 ================= */
/* 硬性规定（铁律）默认模板：可在「⛓ 硬性规定」面板里增删改，改动后的版本存进 S.ironRules */
const DEFAULT_IRON = [
  {id:'i1', icon:'🌅', title:'07:00 前必须起床', desc:'闹钟响后 5 分钟内离开床，不许二次入睡', deadline:'07:00', reward:3},
  {id:'i2', icon:'🏃', title:'运动 ≥ 30 分钟',      desc:'跑步 / 力量 / 快走，心率必须上来', deadline:'22:00', reward:3},
  {id:'i3', icon:'📵', title:'手机娱乐 ≤ 60 分钟',  desc:'短视频、游戏、无目的刷屏全部计入', deadline:'23:59', reward:3},
  {id:'i4', icon:'🌙', title:'23:30 前熄灯睡觉',    desc:'手机放在床外，屏幕全灭', deadline:'23:30', reward:3},
  {id:'i5', icon:'🧹', title:'睡前 5 分钟收尾',      desc:'整理桌面 + 写下明天要做的第一件事', deadline:'23:55', reward:3}
];
const IRON_BONUS = 100;

const DEFAULT_TASKS = [
  {id:'t1', time:'07:10', title:'晨间唤醒',                    desc:'喝水 300ml + 拉伸 10 分钟', reward:2},
  {id:'t2', time:'08:00', title:'深度工作 I · 最重要的一件事', desc:'90 分钟零干扰，手机放到另一个房间', reward:5},
  {id:'t3', time:'12:30', title:'午间散步 15 分钟',            desc:'离开屏幕，走到户外见光', reward:3},
  {id:'t4', time:'14:00', title:'深度工作 II',                 desc:'推进第二个关键任务，先定 30 分钟目标', reward:5},
  {id:'t5', time:'19:30', title:'阅读 30 分钟',                desc:'纸质书优先，至少留一条笔记', reward:4},
  {id:'t6', time:'21:30', title:'今日复盘',                    desc:'记 3 条：做成了什么 / 卡在哪 / 明天第一件事', reward:3}
];

/* ========= 星灵卡池（常驻 + 季节限定 共 160 + 隐藏 8 + 轮换限定 36 = 204 张；图鉴可见 196） ========= */
const API = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image';
const ART_SUF = ', cute anime girl, anime key visual illustration, soft cel shading, detailed face, vibrant colors, wholesome, no text, high quality';
const CARDS = [
  /* ---- UR 8 ---- */
  {id:'ur1',r:'UR',t:'万华破晓',n:'光辉',g:'🌅',ele:'光',fac:'破晓庭',
   d:'在太阳之前醒来的人，世界会为她加冕。',line:'「太阳还没醒，那就先由我来照亮。」',
   arch:'破晓庭初代庭主。她不是天生早起，而是用一千个清晨把自己磨成了黎明本身。',
   p:'celestial anime girl, long golden hair, amber eyes, white and gold ceremonial gown, giant glowing halo of dawn light, floating feathers, golden sunrise sky, divine aura'},
  {id:'ur2',r:'UR',t:'无我境界',n:'静',g:'🌀',ele:'心',fac:'心象庭',
   d:'心流如海，钟表在她手里失效。',line:'「不是时间不够，是心太吵。」',
   arch:'心象庭的坐忘者。她能在喧嚣里静坐整整一夜，只为等一个念头自己长出来。',
   p:'anime girl meditating in a calm blue void, long dark blue floating hair, closed eyes, glowing cyan runes, frozen clock gears, deep focus, serene atmosphere'},
  {id:'ur3',r:'UR',t:'永夜女王',n:'露娜',g:'🌙',ele:'暗',fac:'永夜庭',
   d:'她在该睡的时候睡了，这比熬夜更难。',line:'「夜色是我的疆土，而你该去睡了。」',
   arch:'永夜庭的女王。她把「按时入睡」写进法典，违者罚扫一夜的星尘。',
   p:'elegant anime girl queen of the night, silver hair, violet eyes, dark starry gown, crescent moon crown, floating crystal throne among stars, nebula background, majestic'},
  {id:'ur4',r:'UR',t:'时序之主',n:'刹那',g:'⌛',ele:'时',fac:'时序庭',
   d:'二十四小时皆臣服于她的秩序。',line:'「迟到的人，会被我拨回原点。」',
   arch:'时序庭的执钟人。她掌管全球最后一秒，也曾因为人类拖延而让整座城静止过三次。',
   p:'anime girl time keeper, short black hair with gold streaks, glowing pocket watch, clockwork dimension, floating gear rings, gold and violet magic circles, dramatic rim light'},
  {id:'ur5',r:'UR',t:'心流天使',n:'澪',g:'💫',ele:'心',fac:'心象庭',
   d:'一次只做一件事，全世界安静下来。',line:'「把杂念交给我，你只管专注。」',
   arch:'从一段被打断的专注中诞生的天使。她收集人类放弃的注意力，织成翅膀。',
   p:'angelic anime girl floating in luminous light ocean, pale pink hair, translucent glowing wings, flowing white ribbons, sparkling bokeh, dreamlike holy light'},
  {id:'ur6',r:'UR',t:'苍穹龙姬',n:'天音',g:'🐉',ele:'风',fac:'潮汐庭',
   d:'风起时，她已在山顶等过三次日出。',line:'「顺风是运气，逆风才是训练。」',
   arch:'潮汐庭的龙裔长公主。她的龙翼展开时，整片高原的气流都会为她让路。',
   p:'anime dragon princess, long teal hair with horns, golden slit eyes, flowing hanfu with scale patterns, giant translucent dragon wings, cloud sea above mountains, epic wind'},
  {id:'ur7',r:'UR',t:'绯樱剑圣',n:'樱姬',g:'🌸',ele:'炎',fac:'熔火庭',
   d:'每天一千次挥剑，樱花落在刀刃上都被烤干。',line:'「挥剑一万次，才能说自己努力过。」',
   arch:'熔火庭的剑圣。她把修炼拆成每日一千击，从未间断——包括发烧那天。',
   p:'anime sword saint girl, long crimson hair, red eyes, black and vermilion kimono, blazing katana, swirling sakura petals burning into sparks, night shrine, fiery aura'},
  {id:'ur8',r:'UR',t:'雷律裁决',n:'雷娜',g:'⚡',ele:'雷',fac:'熔火庭',
   d:'拖延会被她当场判刑。',line:'「立刻。现在。马上。」',
   arch:'熔火庭的裁决官。传说她的一句「现在」能让整座城的钟表同时跳针。',
   p:'anime girl lightning judge, short platinum hair with electric blue tips, glowing violet eyes, dark military coat with gold trim, arcs of lightning, thunderstorm sky, commanding pose'},
  {id:'ur9',r:'UR',t:'拂晓守望',n:'晨曦',g:'🌄',ele:'光',fac:'破晓庭',
   d:'她把第一个闹钟交给太阳，自己只负责睁眼。',line:'「只要我醒着，这一天就还没输。」',
   arch:'破晓庭的第二代守望者。她守了整整十年的天台，只为确保每一天都有人替黎明开门。',
   p:'radiant anime girl standing on a rooftop at dawn, long honey blonde hair, white and gold uniform, glowing halo of first morning light, endless sunrise horizon, floating light motes, majestic'},
  {id:'ur10',r:'UR',t:'渊渟岳峙',n:'渊澄',g:'🌌',ele:'心',fac:'心象庭',
   d:'再大的浪来了，她也只是把呼吸放慢半拍。',line:'「先稳住自己，再谈搞定世界。」',
   arch:'心象庭的定海者。她在最深的一层静水里闭关过九年，出关那天，整座城的风都停了。',
   p:'anime girl meditating at the bottom of a calm luminescent abyss, long dark teal floating hair, closed eyes, glowing azure veins of light, suspended ancient stone pillars, deep serene water'},
  {id:'ur11',r:'UR',t:'夜幕低语',n:'宵夜',g:'🌠',ele:'暗',fac:'永夜庭',
   d:'她负责把最后一盏灯，温柔地关掉。',line:'「夜不是深渊，是我铺好的被子。」',
   arch:'永夜庭的低语者。她走过每一间还亮着的房间，只留下一句「明天见」，然后灯就灭了。',
   p:'elegant anime girl walking through a starlit corridor at midnight, long midnight blue hair, dark silk gown with silver embroidery, trailing comet sparks, floating nebula curtains, calm and mysterious'},
  {id:'ur12',r:'UR',t:'分秒裁决',n:'刻',g:'⏱️',ele:'时',fac:'时序庭',
   d:'她眼里没有「等一下」，只有「现在」和「已经晚了」。',line:'「我给每个人同样的二十四小时，有人却把它过成了四十八。」',
   arch:'时序庭的裁决者。她从不催促，只是安静地把迟到者的时间，一格一格地收回去。',
   p:'anime girl time arbiter with a glowing segmented clockwork halo, short platinum hair with gold streaks, dark formal coat with clock insignia, floating fractured hourglasses, precise geometric light rays, dramatic'},
  {id:'ur13',r:'UR',t:'沧溟潮主',n:'溟',g:'🌊',ele:'水',fac:'潮汐庭',
   d:'潮起时她练习，潮落时她复盘，从不等涨潮。',line:'「浪会停，但划出去的那一桨不会白费。」',
   arch:'潮汐庭的深潮之主。她的呼吸就是潮汐表，渔民靠她的节律决定哪一天出海。',
   p:'anime girl sovereign of the deep sea, long flowing aqua hair with pearl ornaments, translucent flowing gown, giant glowing tidal wave curling behind her, deep ocean light shafts, bioluminescent particles, epic'},
  {id:'ur14',r:'UR',t:'燎原星火',n:'焱',g:'🔥',ele:'炎',fac:'熔火庭',
   d:'她相信每一次微小的坚持，都在给未来的自己点火。',line:'「今天一簇火苗，明天就是整片旷野。」',
   arch:'熔火庭的火种之源。她点燃过无数半途而废的人，他们后来都成了自己的太阳。',
   p:'anime girl flame sovereign standing in a field of rising sparks, long crimson hair with ember tips, black and gold battle robe, swirling fire and floating cinders, molten glow underfoot, blazing night sky, epic'},
  {id:'ur15',r:'UR',t:'繁星乐章',n:'星歌',g:'🎼',ele:'星',fac:'时序庭',
   d:'她把日程表写成了五线谱，每一天都是一个音符。',line:'「跑调不重要，重要的是每天都唱。」',
   arch:'时序庭的谱曲者。她规定：只有真正完成的计划，才配在夜里被谱成一颗星。',
   p:'anime girl composer on a floating stage among constellations, long braided silver hair, deep blue and gold starry gown, glowing music staff weaving through stars, harp of light, celestial concert, ethereal'},
  {id:'ur16',r:'UR',t:'永恒誓约',n:'永生',g:'💠',ele:'心',fac:'心象庭',
   d:'她与每一个愿意改变的人，都签下了同一纸契约。',line:'「契约不是束缚，是你亲手写给自己的承诺。」',
   arch:'心象庭的缔约者。传说她的契约书没有期限，因为「习惯一旦养成，就该是一辈子」。',
   p:'anime girl keeper of eternal vows, long pale rose hair, elegant white and blue ceremonial dress, holding a glowing crystal contract seal, ribbons of light forming rings around her, serene temple hall, divine and gentle'},
  /* ---- SSR 22 ---- */
  {id:'ssr1',r:'SSR',t:'晨光初照',n:'小陽',g:'☀️',ele:'光',fac:'破晓庭',
   d:'第一个小时，决定一天的形状。',line:'「天亮了，先做最难的那件事吧。」',
   arch:'破晓庭的见习庭主。她曾连续 200 天在六点前起床，只为把「拖延」两个字从字典里划掉。',
   p:'cheerful anime girl on a school rooftop at sunrise, orange ponytail, amber eyes, navy school uniform, water bottle, warm golden backlight, morning clouds'},
  {id:'ssr2',r:'SSR',t:'铁壁意志',n:'铃',g:'🛡️',ele:'光',fac:'破晓庭',
   d:'不想做的时候也做了，这才叫硬性。',line:'「意志力靠不住，所以我带盾。」',
   arch:'破晓庭的守门人。她的信条是：规则是给未来的自己写的，不是给现在的自己商量的。',
   p:'determined anime girl in shining silver armor with pink accents, silver hair, fierce blue eyes, glowing shield, battle arena with sparks of light, heroic pose'},
  {id:'ssr3',r:'SSR',t:'深潜研究者',n:'白桦',g:'🎯',ele:'心',fac:'心象庭',
   d:'90 分钟零干扰，手机在另一个房间。',line:'「深海没有信号，所以能听见自己。」',
   arch:'心象庭的首席研究员。她的实验室规则只有一条：进门先交出手机。',
   p:'focused anime girl researcher, white bob hair, glasses, lab coat over school uniform, floating holographic blue screens, dark study room, cool cyan light'},
  {id:'ssr4',r:'SSR',t:'风行者',n:'疾',g:'🏃',ele:'风',fac:'潮汐庭',
   d:'心率上升的那半小时，只属于她自己。',line:'「风不会等谁系好鞋带。」',
   arch:'潮汐庭的信使。她跑过的路线连起来，正好绕了这座城市 108 圈。',
   p:'sporty anime girl sprinting, short teal hair with sweatband, sporty jacket and leggings, motion blur, city park track at dawn, wind and speed lines'},
  {id:'ssr5',r:'SSR',t:'静水阅读者',n:'雪乃',g:'📖',ele:'水',fac:'潮汐庭',
   d:'三十页纸，比三百条推送更有用。',line:'「安静一小时，胜过忙碌一整天。」',
   arch:'潮汐庭的岸边图书管理员。她读过的每一本书，都在书脊上留了一枚水滴形印记。',
   p:'quiet anime girl reading in a grand library, long lavender hair, cardigan and pleated skirt, warm afternoon light through tall windows, floating dust motes'},
  {id:'ssr6',r:'SSR',t:'秩序建筑师',n:'织',g:'📐',ele:'时',fac:'时序庭',
   d:'桌面、日程、情绪，都被她归位。',line:'「混乱不是敌人，是还没被你整理。」',
   arch:'时序庭的图纸官。她画出的日程表精确到分钟，据说从未有人完整执行过第一章。',
   p:'elegant anime girl architect, neat black hair in a bun, blueprints and glowing geometric structures floating, tidy white studio, precise lines, soft daylight'},
  {id:'ssr7',r:'SSR',t:'守夜看护',n:'夜见',g:'🌙',ele:'暗',fac:'永夜庭',
   d:'到点就躺下，是一种硬本事。',line:'「该睡了。世界不会因为你熬夜而变好。」',
   arch:'永夜庭的巡夜看护。她负责把还在发光的人一个个劝回被窝。',
   p:'gentle anime girl nurse of the night, dark purple hair, sleepy kind eyes, white uniform with violet trim, moonlit corridor, soft blue light'},
  {id:'ssr8',r:'SSR',t:'自由泳手',n:'澪川',g:'🌊',ele:'水',fac:'潮汐庭',
   d:'水里没有通知栏。',line:'「换气的时候，烦恼就咽下去了。」',
   arch:'潮汐庭的泳队队长。她在水下待过的最长时间，是 3 分 42 秒——那是她第一次忘记刷手机。',
   p:'athletic anime girl swimmer, wet navy hair, goggles on forehead, racing swimsuit with jacket, splashing glowing water droplets, bright blue underwater light'},
  {id:'ssr9',r:'SSR',t:'元气教练',n:'芽衣',g:'💪',ele:'炎',fac:'熔火庭',
   d:'打卡次数比意志力更可靠。',line:'「今天不想动？那就先做一分钟。」',
   arch:'熔火庭的训练官。她发明了「最小启动法」，让全世界最懒的人也动了起来。',
   p:'energetic anime girl fitness trainer, bright pink twin buns, whistle, sporty tee and shorts, gym with neon lights, big confident smile, dynamic pose'},
  {id:'ssr10',r:'SSR',t:'霜华吟游',n:'冰见',g:'❄️',ele:'霜',fac:'永夜庭',
   d:'在最冷的地方，把话写清楚。',line:'「冷一点，脑子反而清醒。」',
   arch:'永夜庭的吟游诗人。她的诗只在雪停的那一刻写成，因此一年只写二十首。',
   p:'graceful anime girl bard in a snowy forest, ice blue long hair with snowflakes, white fur-trimmed cloak, holding a silver lyre, cold blue light, breath visible'},
  {id:'ssr11',r:'SSR',t:'星轨导航',n:'澄海',g:'🧭',ele:'星',fac:'时序庭',
   d:'方向比速度更重要。',line:'「先看星，再迈步。」',
   arch:'时序庭的航海官。她能在完全无光的夜里，凭三颗星定出一条航线。',
   p:'anime girl navigator on a ship deck at night, deep blue hair, brass compass glowing, starry ocean, constellation lines above her, teal and gold light'},
  {id:'ssr12',r:'SSR',t:'烈焰料理人',n:'焰子',g:'🔥',ele:'炎',fac:'熔火庭',
   d:'自己做饭，是夺回一天的第一刀。',line:'「锅要热，心要定。」',
   arch:'熔火庭的主厨。她坚持每天给自己做早餐，十年里只失败过四次。',
   p:'anime girl chef with fiery red hair, apron over school uniform, wok with leaping flames, warm kitchen, delicious steam, orange glow'},
  {id:'ssr13',r:'SSR',t:'月下占卜',n:'希拉',g:'🔮',ele:'暗',fac:'永夜庭',
   d:'知道明天要做什么，今晚才睡得着。',line:'「我算的不是命运，是安排。」',
   arch:'永夜庭的占星师。她的水晶球其实只是日程本的投影。',
   p:'mysterious anime girl fortune teller, long violet hair, star-patterned hood, glowing crystal ball, tarot cards floating, moonlit tent, purple magical light'},
  {id:'ssr14',r:'SSR',t:'圣歌祈祷',n:'弥撒',g:'🕊️',ele:'光',fac:'破晓庭',
   d:'每天留五分钟，什么都不做。',line:'「安静，本身就是一种功课。」',
   arch:'破晓庭的唱诗者。她的晨祷只有一句：今天也要好好活。',
   p:'serene anime girl singing in a cathedral, long white hair, blue eyes, white and gold vestments, stained glass light, floating feathers, holy atmosphere'},
  {id:'ssr15',r:'SSR',t:'沙漏学者',n:'惜时',g:'⏳',ele:'时',fac:'时序庭',
   d:'记录时间的人，才配拥有时间。',line:'「不是没时间，是没记账。」',
   arch:'时序庭的记账官。她给自己的每一分钟都标了价，月底结算时从未亏损。',
   p:'anime girl scholar with a giant floating hourglass, ash brown hair, glasses, timeline charts glowing around her, sepia and gold light, scholarly vibe'},
  {id:'ssr16',r:'SSR',t:'森之药师',n:'木灵',g:'🌿',ele:'木',fac:'潮汐庭',
   d:'早睡早起，是最便宜的补药。',line:'「身体会记账，它从不销账。」',
   arch:'潮汐庭的草药师。她开的药方十有八九只有一句：去睡觉。',
   p:'anime girl herbalist in a green forest, moss green hair, leaf-decorated robe, jars of glowing herbs, dappled sunlight, gentle green atmosphere'},
  {id:'ssr17',r:'SSR',t:'雪原猎手',n:'白狼',g:'🏹',ele:'霜',fac:'永夜庭',
   d:'专注是最锋利的那支箭。',line:'「一箭，一个目标，不多不少。」',
   arch:'永夜庭的猎手。她从不带两支箭出门，因为「犹豫的人才会需要第二次机会」。',
   p:'anime girl hunter in a snowy plain, white hair with grey streaks, wolf-fur cloak, bow drawn, glowing icy arrow, blizzard, pale blue light'},
  {id:'ssr18',r:'SSR',t:'电子偶像',n:'米可',g:'🎤',ele:'雷',fac:'熔火庭',
   d:'把练习变成演出，就不苦了。',line:'「今天的练习，是明天的安可。」',
   arch:'熔火庭的虚拟偶像。她的每一场演出，都是当天训练量的实时转播。',
   p:'anime girl virtual idol on a neon stage, short pink hair with cyan tips, futuristic idol outfit, holographic screens, lightning and glowsticks, cyber concert lights'},
  {id:'ssr19',r:'SSR',t:'晨跑伙伴',n:'小步',g:'👟',ele:'风',fac:'破晓庭',
   d:'有人一起，就不好意思半途而废。',line:'「你先出门，我马上到。」',
   arch:'破晓庭的同行者。她存在的意义，就是让「明天再开始」这句话无从出口。',
   p:'anime girl jogging with headphones in a riverside park at dawn, short brown hair, light hoodie, morning mist, warm sun rays through trees'},
  {id:'ssr20',r:'SSR',t:'深海歌姬',n:'汐音',g:'🐚',ele:'水',fac:'潮汐庭',
   d:'在喧闹里，学会听自己的呼吸。',line:'「海底很静，所以声音才是力量。」',
   arch:'潮汐庭的歌姬。她的歌声能让整片海湾退潮，也能让失眠的人在第三句睡着。',
   p:'elegant anime girl siren singer underwater, long aqua hair, glowing pearls and scales, flowing dress, fish and light beams, deep ocean blue, ethereal'},
  {id:'ssr21',r:'SSR',t:'战术指挥',n:'织星',g:'🎖️',ele:'星',fac:'时序庭',
   d:'先画战场，再动手。',line:'「计划不是束缚，是护栏。」',
   arch:'时序庭的战术官。她的作战图上，每个方块都对应一天里的一小时。',
   p:'anime girl tactician in a command room, silver-blue hair, officer uniform with stars, holographic war map with glowing markers, cool blue light, confident'},
  {id:'ssr22',r:'SSR',t:'梦境编织',n:'梦谣',g:'🧶',ele:'心',fac:'心象庭',
   d:'睡前不复盘，醒来才不焦虑。',line:'「把今天织好，再去睡。」',
   arch:'心象庭的织梦人。她把没做完的事编成线团，第二天再接着织。',
   p:'gentle anime girl weaving glowing threads in a dreamy room, soft lilac hair, cozy sweater, floating star-shaped yarn, warm dim light, sleepy atmosphere'},
  {id:'ssr23',r:'SSR',t:'破晓引路',n:'晨引',g:'🔆',ele:'光',fac:'破晓庭',
   d:'她举着灯站在岔路口，等犹豫的人先迈脚。',line:'「路是走出来的，不是想出来的。」',
   arch:'破晓庭的引路人。她每天在天亮前把整座城的岔路口都站一遍，只为少一个回头的人。',
   p:'anime girl holding a glowing lantern at a misty crossroad before dawn, short amber hair, long light coat, warm golden light beams cutting through fog, hopeful expression'},
  {id:'ssr24',r:'SSR',t:'静水深流',n:'深流',g:'🌊',ele:'水',fac:'潮汐庭',
   d:'表面越平静，底下越用功。',line:'「别人看的是水面，我看的是水底。」',
   arch:'潮汐庭的潜水者。她能在无声的水下坚持两小时，把白天的嘈杂全部洗掉。',
   p:'anime girl diving in deep calm blue water, long dark aqua hair flowing, sleek wetsuit, shafts of light from the surface, quiet bubbles, meditative serene underwater scene'},
  {id:'ssr25',r:'SSR',t:'夜巡灯使',n:'灯见',g:'🏮',ele:'暗',fac:'永夜庭',
   d:'她巡夜时顺便收拾掉你今天没做完的事。',line:'「灯还亮着的地方，我都替你看着。」',
   arch:'永夜庭的巡灯者。她的灯笼照过无数个还没熄灭的窗口，也照过无数次「再刷五分钟」。',
   p:'anime girl night patroller carrying a red paper lantern, long black hair with ribbon, dark traditional coat, moonlit stone street, snow-like dust in the air, calm quiet night'},
  {id:'ssr26',r:'SSR',t:'刻度匠人',n:'精度',g:'📏',ele:'时',fac:'时序庭',
   d:'她把计划精确到刻，误差只允许在心里发生。',line:'「差一分钟，也是差。」',
   arch:'时序庭的校准师。她经手的每一张日程表，边缘都像尺子量过一样笔直。',
   p:'anime girl precision artisan measuring with glowing rulers, neat dark hair in a bun, white shirt with rolled sleeves, floating brass tools and grid lines, bright tidy workshop'},
  {id:'ssr27',r:'SSR',t:'风信传递',n:'信风',g:'🍃',ele:'风',fac:'潮汐庭',
   d:'她把「下次一定」吹得干干净净。',line:'「风不回头，我也一样。」',
   arch:'潮汐庭的信风使。她送信从不迟到，因为她说「等一个人太久，信就凉了」。',
   p:'anime girl running with a letter through a windy green field, short teal hair, light cape billowing, leaves and petals swirling in the air, blue sky with fast clouds, dynamic and free'},
  {id:'ssr28',r:'SSR',t:'熔炉锻造',n:'铸',g:'⚒️',ele:'炎',fac:'熔火庭',
   d:'她知道自己是块料，只是还需要多敲几下。',line:'「每一锤，都在把杂质赶出去。」',
   arch:'熔火庭的锻工。她每天给自己安排一次「不好受」的训练，说那是把钝铁炼成刃的唯一办法。',
   p:'anime girl blacksmith striking glowing metal at a forge, short dark hair with ember highlights, leather apron, sparks flying, molten orange glow, industrial workshop, intense focus'},
  {id:'ssr29',r:'SSR',t:'星象绘图',n:'绘星',g:'🗺️',ele:'星',fac:'时序庭',
   d:'她先把目标画成星图，再顺着线一颗颗点亮。',line:'「先看懂地图，再谈走多远。」',
   arch:'时序庭的星图师。她的地图上没有路，只有一颗颗等着被自己走到的星星。',
   p:'anime girl cartographer charting a glowing star map, long light blue hair, starry navy cloak, floating constellation diagrams and brass instruments, dark observatory dome, cool cosmic light'},
  {id:'ssr30',r:'SSR',t:'疗愈之光',n:'愈',g:'💗',ele:'光',fac:'破晓庭',
   d:'她先接住你的疲惫，再谈下一件事。',line:'「先把伤包好，再继续走。」',
   arch:'破晓庭的疗愈者。她认为休息不是偷懒，而是把明天的力气先存起来。',
   p:'gentle anime girl healer surrounded by soft warm light, long pale pink hair, white and rose robe, glowing hands, floating luminous feathers, peaceful bright sanctuary, healing embrace'},
  /* ---- SR 14 ---- */
  {id:'sr1',t:'晨间散步',r:'SR',n:'步美',g:'🌿',ele:'木',fac:'潮汐庭',
   d:'离开屏幕，走到户外见光。',line:'「先走十分钟，再谈效率。」',arch:'潮汐庭的晨行者，她的地图上全是没有名字的小巷。',p:'anime girl walking in a leafy morning street, brown short hair, beige coat, coffee cup, soft morning haze, pastel colors'},
  {id:'sr2',t:'十分钟拉伸',r:'SR',n:'悠奈',g:'🧘',ele:'心',fac:'心象庭',
   d:'身体先醒，脑子随后。',line:'「筋拉开了，情绪也松了。」',arch:'心象庭的舒展师，坚信僵硬的身体装不下清醒的脑子。',p:'anime girl stretching on a yoga mat, peach hair, loose sportswear, bright living room, morning sunlight through curtains, relaxed expression'},
  {id:'sr3',t:'清空收件箱',r:'SR',n:'澄音',g:'📥',ele:'时',fac:'时序庭',
   d:'零未读，零心理负担。',line:'「未读是最小的债。」',arch:'时序庭的归档官，她的人生里没有「稍后再看」这个文件夹。',p:'anime girl at a tidy desk clearing mail on a laptop, light blue hair, white blouse, satisfied smile, clean modern room, soft cyan glow'},
  {id:'sr4',r:'SR',t:'静默模式',n:'铃音',g:'🔕',ele:'心',fac:'心象庭',
   d:'关掉通知，世界不会崩塌。',line:'「消息可以等，我不行。」',arch:'心象庭的静音使，她的手机常年保持只有电话能响。',p:'anime girl pressing mute on her phone, dark hair with hairclips, oversized hoodie, dim cozy bedroom, purple neon light, peaceful face'},
  {id:'sr5',r:'SR',t:'日光浴',n:'日和',g:'🌤️',ele:'光',fac:'破晓庭',
   d:'生物钟需要光，而不是屏幕。',line:'「朝光坐十五分钟，比咖啡有用。」',arch:'破晓庭的光合少女，皮肤上永远留着一层薄薄的金色。',p:'anime girl basking in sunlight on a balcony, golden blonde hair, sundress, eyes closed happily, bright warm daylight, potted plants'},
  {id:'sr6',t:'第一行字',r:'SR',n:'文乃',g:'✍️',ele:'心',fac:'心象庭',
   d:'最难的是开始，写一行就够了。',line:'「写了第一行，就没有不写的道理。」',arch:'心象庭的落笔者，她的所有稿子都诞生于「只写一行」的约定。',p:'anime girl writing the first line in a notebook, black hair with red ribbon, school uniform, wooden desk, warm desk lamp light at night'},
  {id:'sr7',t:'桌面归零',r:'SR',n:'爽香',g:'🗂️',ele:'时',fac:'时序庭',
   d:'干净桌面 = 干净的思路。',line:'「桌面乱的时候，我是不信的。」',arch:'时序庭的整理官，她能在七分钟内让一张桌子看起来像新买的。',p:'anime girl organizing her desk, mint green hair, rolled sleeves, neatly arranged stationery, bright study room, cheerful mood'},
  {id:'sr8',r:'SR',t:'三事推进',n:'三叶',g:'✅',ele:'星',fac:'时序庭',
   d:'今天最重要的三件事，她都有推进。',line:'「只写三件，就必须做到。」',arch:'时序庭的推进官，她的便签永远只有三个格子。',p:'anime girl ticking off a checklist, brown twin tails, cardigan, sticky notes on the wall, cozy kitchen table, morning light'},
  {id:'sr9',t:'复盘之镜',r:'SR',n:'映月',g:'🪞',ele:'心',fac:'心象庭',
   d:'看清今天的坑，明天就不必再掉。',line:'「写下来，坑就不敢再来。」',arch:'心象庭的记录者，她的日记本里全是「下次怎么办」。',p:'anime girl reflecting in front of a glowing mirror, silver hair, night pajamas, journal in hand, dim room with fairy lights, thoughtful'},
  {id:'sr10',r:'SR',t:'水之呼吸',n:'澪水',g:'💧',ele:'水',fac:'潮汐庭',
   d:'先给身体水，再给脑子任务。',line:'「一杯水，重启一次。」',arch:'潮汐庭的饮水使，她数过自己一天喝下的每一杯水。',p:'anime girl drinking a glass of water, light blue hair, white tank top, bright kitchen, sparkling water droplets, fresh cool tones'},
  {id:'sr11',t:'早睡执行者',r:'SR',n:'眠穗',g:'🌛',ele:'暗',fac:'永夜庭',
   d:'手机放在床外，屏幕全灭。',line:'「床只用来睡，不用来刷。」',arch:'永夜庭的执行官，她的卧室里唯一的屏幕是没有电池的那种。',p:'anime girl going to sleep, dark hair, white nightgown, tucked under a blanket, phone left on the nightstand, moonlight through curtains'},
  {id:'sr12',r:'SR',t:'无糖日',n:'苦甜',g:'🫖',ele:'木',fac:'潮汐庭',
   d:'把糖留到值得的那一天。',line:'「今天不甜，明天才配甜。」',arch:'潮汐庭的控糖师，她的糖罐只在满签的那天开一次。',p:'anime girl holding a sugar-free drink, dark green hair, plaid shirt, cafe counter, moody warm lighting, determined small smile'},
  {id:'sr13',t:'静读三十页',r:'SR',n:'页羽',g:'📚',ele:'水',fac:'潮汐庭',
   d:'一小时不被打断的阅读。',line:'「三十页，是今天的下限。」',arch:'潮汐庭的翻页人，她读过的一切都记在一本皱掉的索引里。',p:'anime girl reading a paperback on a windowsill, short pink hair, oversized sweater, rainy window, cozy warm interior light'},
  {id:'sr14',t:'心率上扬',r:'SR',n:'心菜',g:'❤️',ele:'炎',fac:'熔火庭',
   d:'跑起来的那 20 分钟，才叫训练。',line:'「心跳没上去，就等于没练。」',arch:'熔火庭的心率控，她只认可自己心跳超过 130 的那些分钟。',p:'anime girl on a treadmill with glowing heart rate lines, purple ponytail, sportswear, neon gym lights, intense focused expression'},
  {id:'sr15',r:'SR',t:'番茄钟少女',n:'二十五',g:'🍅',ele:'时',fac:'时序庭',
   d:'二十五个专注分钟，五分钟喘息。',line:'「番茄熟了，就休息。」',arch:'时序庭的计时官，她的世界里没有第四十分钟的番茄。',p:'anime girl with a giant tomato kitchen timer, red short hair, white shirt, minimal desk, bright cool light, playful focused mood'},
  {id:'sr16',r:'SR',t:'灵感速记',n:'光一',g:'💭',ele:'心',fac:'心象庭',
   d:'灵感只有三秒寿命。',line:'「想到就写，不然就没了。」',arch:'心象庭的速记者，她的口袋里永远有一支笔和一张折了三折的纸。',p:'anime girl quickly jotting a note, orange hair, denim jacket, sticky notes and pens scattered, warm cafe interior, excited expression'},
  {id:'sr17',t:'晨间新闻',r:'SR',n:'知夏',g:'📰',ele:'星',fac:'时序庭',
   d:'十分钟读完世界，然后关掉。',line:'「知道就够了，不用都被卷进去。」',arch:'时序庭的读报人，她的新闻时间严格限定在早餐里。',p:'anime girl reading news on a tablet at breakfast, dark blue hair, cozy dining table, toast and coffee, soft morning light, calm'},
  {id:'sr18',t:'断网一小时',r:'SR',n:'离歌',g:'📵',ele:'心',fac:'心象庭',
   d:'把自己从网里捞出来一小时。',line:'「网络不会消失，但我的一小时会。」',arch:'心象庭的离线者，她每天留下一小时给没有信号的世界。',p:'anime girl putting her phone face down in a drawer, black hair, relaxed home clothes, calm room, soft afternoon light, peaceful'},
  {id:'sr19',t:'慢跑耳机',r:'SR',n:'律叶',g:'🎵',ele:'风',fac:'潮汐庭',
   d:'把节奏交给音乐，把坚持交给自己。',line:'「一首歌四分钟，正好四百米。」',arch:'潮汐庭的节奏跑者，她的歌单刚好是一整场晨跑的长度。',p:'anime girl jogging with wired earphones, dark teal hair, light windbreaker, tree-lined street at dawn, motion and light streaks'},
  {id:'sr20',t:'午间冥想',r:'SR',n:'定汐',g:'🕯️',ele:'心',fac:'心象庭',
   d:'十分钟闭眼，重启下午。',line:'「坐在原地，也是前进。」',arch:'心象庭的静坐者，她的午休从来不做梦，只做呼吸。',p:'anime girl meditating at noon with a small candle, lavender hair, simple white clothes, quiet room, warm soft light, tranquil'},
  {id:'sr21',t:'便当主厨',r:'SR',n:'味咲',g:'🍱',ele:'炎',fac:'熔火庭',
   d:'自己带饭，是对身体最实在的偏心。',line:'「别人做的饭，不如自己算的营养。」',arch:'熔火庭的便当师，她的午餐盒永远比便利店便宜、比外卖好看。',p:'anime girl packing a colorful bento box, warm brown hair, apron, bright kitchen, fresh vegetables, cheerful domestic light'},
  {id:'sr22',t:'阳台园丁',r:'SR',n:'芽萌',g:'🪴',ele:'木',fac:'潮汐庭',
   d:'照料一株植物，也照料自己的耐心。',line:'「它长不快，但每天都在长。」',arch:'潮汐庭的园艺使，她养活的每一株植物都有一张记录卡。',p:'anime girl watering balcony plants, green hair in a braid, overalls, morning sunlight, lush potted plants, gentle green tones'},
  {id:'sr23',t:'整理衣橱',r:'SR',n:'序织',g:'👕',ele:'时',fac:'时序庭',
   d:'把穿不上的过去，一起送走。',line:'「留下会穿的，扔掉会后悔的。」',arch:'时序庭的清简官，她的衣柜里只有三十件衣服和零犹豫。',p:'anime girl folding clothes in a bright wardrobe, brown hair, casual tee, neatly arranged shelves, soft daylight, organized vibe'},
  {id:'sr24',t:'目标拆解',r:'SR',n:'分璃',g:'🧩',ele:'星',fac:'时序庭',
   d:'大目标切成能今天做完的小块。',line:'「切到能一口吃掉为止。」',arch:'时序庭的分割官，她能把任何宏大愿望拆成今天下午的一小时。',p:'anime girl sticking a puzzle-like plan on a board, silver hair, blazer, colorful notes, modern study, bright cool light'},
  {id:'sr25',t:'深呼吸教练',r:'SR',n:'息笑',g:'💨',ele:'心',fac:'心象庭',
   d:'四秒吸气，七秒呼气。',line:'「先让气顺，事才会顺。」',arch:'心象庭的呼吸师，她认为绝大多数问题只需要三次深呼吸。',p:'anime girl practicing deep breathing by an open window, pale hair, light shirt, white curtains blowing, calm blue tones'},
  {id:'sr26',t:'笔记整理',r:'SR',n:'纲绪',g:'🗒️',ele:'心',fac:'心象庭',
   d:'把今天学到的，压成一页。',line:'「写不成一页，就是还没懂。」',arch:'心象庭的提炼者，她的笔记本每一页都只有一张图。',p:'anime girl rewriting notes into a diagram, dark hair with glasses, tidy desk, highlighters, warm desk lamp, focused'},
  {id:'sr27',t:'早八不迟到',r:'SR',n:'准良',g:'⏰',ele:'时',fac:'时序庭',
   d:'出门前十分钟，胜过路上十分钟狂奔。',line:'「提前十分钟，整天都不慌。」',arch:'时序庭的准点官，她的闹钟永远比需要的时间早两格。',p:'anime girl ready at the door with a bag, neat uniform, morning street, clear blue sky, confident small smile'},
  {id:'sr28',t:'睡前关机',r:'SR',n:'熄夜',g:'🌜',ele:'暗',fac:'永夜庭',
   d:'关机是仪式，不是损失。',line:'「关机之后，才是我的时间。」',arch:'永夜庭的熄灯人，她的一年里没有一天带着消息入睡。',p:'anime girl turning off her phone at night, short black hair, dim bedroom, only a small lamp, blue moonlight, calm'},
  {id:'sr29',t:'俯卧撑挑战',r:'SR',n:'撑凛',g:'🤸',ele:'炎',fac:'熔火庭',
   d:'今天比昨天多一个，就够了。',line:'「多一个，也是进步。」',arch:'熔火庭的挑战者，她的训练日志上只有一个不断变大的数字。',p:'anime girl doing push-ups on a gym mat, athletic build, ponytail, bright home gym, energetic, warm light'},
  {id:'sr30',t:'冷水清醒',r:'SR',n:'醒柚',g:'🚿',ele:'水',fac:'潮汐庭',
   d:'三十秒冷水，胜过三十分钟挣扎。',line:'「冷一下，人就回来了。」',arch:'潮汐庭的醒神使，她相信最贵的咖啡也比不上三十秒冷水。',p:'anime girl at a sink splashing cold water, wet navy hair, white towel, bright bathroom, refreshing splash, cool light'},
  {id:'sr31',t:'一句英语',r:'SR',n:'语茉',g:'🔤',ele:'星',fac:'时序庭',
   d:'每天一句，比每周三百句更牢。',line:'「一句就好，但要真的记住。」',arch:'时序庭的累积者，她已经连续 400 天只学一句，却一句都没忘。',p:'anime girl practicing English aloud with flashcards, light brown hair, cozy room, books and sticky notes, warm lamp, engaged'},
  {id:'sr32',r:'SR',t:'待办排序',n:'序一',g:'📋',ele:'时',fac:'时序庭',
   d:'先排序，再动手。',line:'「顺序错了，努力就白费。」',arch:'时序庭的排程官，她动手前永远先花三分钟决定顺序。',p:'anime girl sorting tasks on a clipboard, dark hair in a bun, minimal office, ordered sticky notes, cool clean light'},
  {id:'sr33',t:'背包减重',r:'SR',n:'轻鸢',g:'🎒',ele:'风',fac:'潮汐庭',
   d:'每天少带一件，肩膀会感谢你。',line:'「背得越少，走得越远。」',arch:'潮汐庭的轻装使，她的通勤包里永远只有三样东西。',p:'anime girl unpacking a backpack, short hair, casual clothes, tidy desk, bright room, relieved expression'},
  {id:'sr34',t:'周计划手帐',r:'SR',n:'帐纱',g:'📔',ele:'星',fac:'时序庭',
   d:'把一周画出来，它就不会溜走。',line:'「先画格子，再填日子。」',arch:'时序庭的绘图者，她的每一周都先有一张空白格。',p:'anime girl decorating a weekly planner, pastel hair, cute stationery, warm desk, washi tape and pens, cheerful light'},
  {id:'sr35',t:'洗手规范',r:'SR',n:'净莲',g:'🧼',ele:'水',fac:'潮汐庭',
   d:'二十秒，是最短的自我照顾。',line:'「干净的手，才配拿得起书。」',arch:'潮汐庭的洁净使，她数过自己一天洗手的每一秒。',p:'anime girl washing hands at a bright sink, short hair, rolled sleeves, clean white bathroom, water bubbles, fresh light'},
  {id:'sr36',t:'眼神放空',r:'SR',n:'空灵',g:'☁️',ele:'心',fac:'心象庭',
   d:'允许自己发呆五分钟。',line:'「什么都不做，也是一种做。」',arch:'心象庭的放空者，她每天留五分钟给没有意义的事。',p:'anime girl lying on grass staring at the sky, light hair, casual dress, floating clouds, soft blue sky, lazy afternoon'},
  {id:'sr37',t:'微笑练习',r:'SR',n:'笑蕊',g:'😊',ele:'光',fac:'破晓庭',
   d:'对着镜子笑十秒，情绪会跟上。',line:'「先笑，心情就会追上来。」',arch:'破晓庭的练习生，她的镜子旁边贴着一张写满「先笑」的纸条。',p:'anime girl smiling at a mirror, bright eyes, simple white shirt, clean bright room, warm sunlight, happy mood'},
  {id:'sr38',t:'十分钟素描',r:'SR',n:'绘里',g:'🖌️',ele:'心',fac:'心象庭',
   d:'不追求好看，只追求画完。',line:'「今天只画十分钟，但必须画完。」',arch:'心象庭的速写者，她的本子里全是十分钟的草稿。',p:'anime girl sketching quickly in a small sketchbook, curly hair, apron, art studio, colored pencils, warm creative light'},
  {id:'sr39',t:'存钱罐',r:'SR',n:'储莹',g:'🐖',ele:'星',fac:'时序庭',
   d:'每天一点点，月底会吓你一跳。',line:'「小钱也有记性。」',arch:'时序庭的储蓄使，她的存钱罐从没被打开过，也没断过一天。',p:'anime girl dropping a coin into a piggy bank, soft brown hair, cozy pajamas, warm evening room, gentle smile, soft light'},
  {id:'sr40',t:'今天不熬夜',r:'SR',n:'守棠',g:'🌃',ele:'暗',fac:'永夜庭',
   d:'守住十一点，就是守住明天。',line:'「今晚早睡，是给明天的礼物。」',arch:'永夜庭的守时者，她的记录里最长的连胜是 128 个夜晚。',p:'anime girl yawning and stretching before bed, dark hair, nightwear, warm bedside lamp, city lights outside window, sleepy cozy'},
  /* ---- R 20 ---- */
  {id:'r1',t:'一杯温水',r:'R',n:'温莎',g:'🥛',ele:'水',fac:'潮汐庭',d:'低成本的启动仪式。',line:'「先喝一口，再开工。」',arch:'潮汐庭最小的星灵，她的礼物只有一杯水，却总被第一个召唤。',p:'anime girl holding a mug of warm water, brown hair, morning pajamas, simple bright kitchen, gentle smile'},
  {id:'r2',t:'刷牙两分钟',r:'R',n:'白露',g:'🪥',ele:'水',fac:'潮汐庭',d:'从两分钟开始，换来一整天的清爽。',line:'「两分钟，牙齿会记住。」',arch:'潮汐庭的洁齿使，她相信仪式感是从牙刷开始的。',p:'anime girl brushing teeth in a bathroom mirror, short black hair, cute pajamas, bright clean bathroom, cheerful face'},
  {id:'r3',t:'洗衣小助手',r:'R',n:'洗蔚',g:'🧺',ele:'水',fac:'潮汐庭',d:'衣服洗完就晾，别让它们在机器里过夜。',line:'「晾起来，霉就追不上你。」',arch:'潮汐庭的洗衣使，她与「明天再晾」的恶魔斗争了三年。',p:'anime girl carrying a laundry basket, orange hair, apron, sunny laundry room with hanging clothes, morning light'},
  {id:'r4',t:'水果时间',r:'R',n:'莓奈',g:'🍓',ele:'木',fac:'潮汐庭',d:'每天一份水果，比补剂便宜。',line:'「甜一点，也是营养。」',arch:'潮汐庭的果物使，她的篮子里永远有比零食更便宜的选择。',p:'anime girl eating strawberries at a table, pink hair, casual hoodie, bowl of fruit, bright pastel kitchen, happy'},
  {id:'r5',t:'十点关屏',r:'R',n:'十香',g:'📴',ele:'暗',fac:'永夜庭',d:'屏幕息屏，人也该息灯。',line:'「十点了，光该还给我。」',arch:'永夜庭的熄屏使，她只在十点这一件事上从不妥协。',p:'anime girl putting her phone face down on a desk, dark hair, cozy sweater, dim room, clock showing ten, calm purple light'},
  {id:'r6',t:'记账少女',r:'R',n:'金理',g:'💰',ele:'星',fac:'时序庭',d:'记下来，才知道钱去哪了。',line:'「不是我花的，是没记的那笔。」',arch:'时序庭的小账房，她的账本比她的日记还厚。',p:'anime girl writing in a ledger notebook with a calculator, black hair with glasses, tidy desk, warm lamp light, focused'},
  {id:'r7',t:'整理书包',r:'R',n:'包柔',g:'🎒',ele:'时',fac:'时序庭',d:'出门前一分钟整理，省下一天找东西。',line:'「东西都在，心才不慌。」',arch:'时序庭的收纳使，她的书包从来没有丢过任何一样东西。',p:'anime girl packing a school backpack by the door, blue hair, school uniform, morning hallway light, organized items'},
  {id:'r8',r:'R',t:'午休十五分',n:'眠子',g:'💤',ele:'暗',fac:'永夜庭',d:'闭眼十五分钟，等于多活两小时。',line:'「午后闭眼，下午加倍。」',arch:'永夜庭的短眠使，她能在课间十五分钟里睡出一整段梦。',p:'anime girl napping with her head on a desk, chestnut hair, school uniform, classroom afternoon light, peaceful'},
  {id:'r9',r:'R',t:'深呼吸三次',n:'息一',g:'🌬️',ele:'心',fac:'心象庭',d:'焦虑来了，先呼吸。',line:'「三次呼吸，足够按下暂停。」',arch:'心象庭最年轻的门徒，她的修行只有三个呼吸那么长。',p:'anime girl taking a deep breath with eyes closed, lavender hair, cardigan, quiet park bench, soft green light, serene'},
  {id:'r10',t:'喝水提醒',r:'R',n:'滴岚',g:'🚰',ele:'水',fac:'潮汐庭',d:'水杯在手边，才喝得到水。',line:'「看得见，才喝得下。」',arch:'潮汐庭的提醒者，她的水杯上贴满了给自己加油的小纸条。',p:'anime girl placing a water bottle on her desk, short blonde hair, casual tee, tidy workspace, bright daylight, cute sticker'},
  {id:'r11',t:'晨间称重',r:'R',n:'秤樱',g:'⚖️',ele:'星',fac:'时序庭',d:'数据不撒谎，但也不用每天焦虑。',line:'「看趋势，不看今天。」',arch:'时序庭的观测者，她把数字当成朋友，而不是裁判。',p:'anime girl standing on a bathroom scale, dark brown hair, sportswear, bright bathroom, calm expression, morning light'},
  {id:'r12',t:'地铁读书',r:'R',n:'通糖',g:'🚇',ele:'时',fac:'时序庭',d:'通勤是最被浪费的阅读时间。',line:'「三站路，正好一章。」',arch:'时序庭的通勤者，她在两年里用乘车时间读完了四十本书。',p:'anime girl reading on a subway train, black hair, headphones, casual coat, blurred city lights, soft cool tones'},
  {id:'r13',t:'购物清单',r:'R',n:'单羽',g:'📝',ele:'时',fac:'时序庭',d:'带着清单去超市，就不会多买三样。',line:'「清单之外，一概不买。」',arch:'时序庭的清单使，她进超市之前一定先写完再进门。',p:'anime girl writing a shopping list, mint hair, apron, cozy kitchen with fridge, bright warm light, focused'},
  {id:'r14',t:'回一条消息',r:'R',n:'缘铃',g:'💬',ele:'心',fac:'心象庭',d:'把该回的都回了，心里就空一格。',line:'「回完这一条，就不用再想了。」',arch:'心象庭的回应者，她坚持消息不过夜，包括那些不想回的。',p:'anime girl replying to messages with a smile, pink hair, cozy blanket, evening room, warm fairy lights'},
  {id:'r15',t:'晒太阳五分钟',r:'R',n:'晴暖',g:'🌞',ele:'光',fac:'破晓庭',d:'五分钟的光，换一夜的睡。',line:'「晒够了，晚上才睡得着。」',arch:'破晓庭的晒光使，她的一天从五分钟的屋顶开始。',p:'anime girl stretching in the sun on a rooftop, yellow hair, casual dress, blue sky with clouds, bright cheerful light'},
  {id:'r16',t:'关掉一个 App',r:'R',n:'屏纱',g:'📱',ele:'心',fac:'心象庭',d:'少一个入口，少一次分心。',line:'「删掉它，我就多出一个小时。」',arch:'心象庭的卸载者，她删过的应用比自己记得的还多。',p:'anime girl deleting an app on her phone, dark hair, hoodie, dim bedroom, glowing screen light, resolute expression'},
  {id:'r17',t:'系好鞋带出门',r:'R',n:'鞋晴',g:'👟',ele:'风',fac:'潮汐庭',d:'装备好，就出门。',line:'「鞋带系好，借口就没了。」',arch:'潮汐庭的出发使，她认为系鞋带是一天里最重要的动作。',p:'anime girl tying her sneakers at the front door, brown hair, sporty outfit, bright entrance, ready to go, morning light'},
  {id:'r18',t:'写一句感谢',r:'R',n:'谢柔',g:'💌',ele:'光',fac:'破晓庭',d:'睡前记下一件值得谢的事。',line:'「今天至少有件事是好的。」',arch:'破晓庭的感恩使，她的本子上写满了别人顺手做的小事。',p:'anime girl writing a thank-you note at night, soft brown hair, pajamas, warm desk lamp, small pink notebook, gentle smile'},
  {id:'r19',t:'洗个热水澡',r:'R',n:'汤玉',g:'🛁',ele:'水',fac:'潮汐庭',d:'热水冲掉今天的疲惫。',line:'「热水冲一冲，火气就没了。」',arch:'潮汐庭的沐汤使，她相信热水能洗掉一半的坏情绪。',p:'anime girl relaxing after a warm bath, dark hair wrapped in a towel, bathrobe, steamy bathroom, soft warm light, refreshed'},
  {id:'r20',r:'R',t:'明天第一件事',n:'明日',g:'🌠',ele:'星',fac:'时序庭',d:'睡前写下明天要做的第一件事。',line:'「想好第一件事，明早就不会乱。」',arch:'时序庭的先手使，她的每个夜晚都以一句「明天先做」结束。',p:'anime girl writing tomorrow first task on a sticky note, black hair, pajamas, bedside lamp, calm night mood'},
  {id:'r21',t:'整理床铺',r:'R',n:'铺棠',g:'🛌',ele:'时',fac:'时序庭',d:'被子叠好，房间就醒了一半。',line:'「床铺好，人就没法再躺回去。」',arch:'时序庭的理床使，她把叠被子视为对今天的第一份承诺。',p:'anime girl making her bed in the morning, light hair, pajamas, cozy bedroom, sunlight through window, tidy warm mood'},
  {id:'r22',t:'洗手二十秒',r:'R',n:'清茉',g:'🧴',ele:'水',fac:'潮汐庭',d:'把手洗干净，是最基础的尊重。',line:'「二十秒，比什么都划算。」',arch:'潮汐庭的清手使，她的时间感就是二十秒那么准。',p:'anime girl washing hands with soap, short hair, rolled sleeves, clean bathroom, water and foam, fresh bright light'},
  {id:'r23',t:'收好耳机',r:'R',n:'缠诗',g:'🎧',ele:'风',fac:'潮汐庭',d:'耳机不乱缠，明天就不用解五分钟。',line:'「收好它，明天才顺。」',arch:'潮汐庭的收线使，她的耳机线从来没打过死结。',p:'anime girl neatly coiling earphones, brown hair, casual hoodie, tidy desk, soft lamp light, satisfied small smile'},
  {id:'r24',t:'滴一次眼药水',r:'R',n:'润月',g:'👁️',ele:'水',fac:'潮汐庭',d:'屏幕久了，眼睛也在加班。',line:'「眼睛也会累，只是它不说。」',arch:'潮汐庭的润目使，她提醒每个盯着屏幕的人抬头看远处。',p:'anime girl applying eye drops, soft hair, relaxed clothes, cozy room, gentle light, relieved expression'},
  {id:'r25',t:'一颗维生素',r:'R',n:'维茉',g:'💊',ele:'木',fac:'潮汐庭',d:'小小的补给，也是补给。',line:'「今天也好好喂了自己。」',arch:'潮汐庭的补给使，她的药盒按时辰分成七格。',p:'anime girl taking a vitamin with a glass of water, cheerful hair, bright kitchen, simple and clean, morning light'},
  {id:'r26',t:'出门带伞',r:'R',n:'伞岚',g:'☂️',ele:'水',fac:'潮汐庭',d:'看一眼天气，是成年人的基本操作。',line:'「带伞的人，不赌运气。」',arch:'潮汐庭的备伞使，她的包里永远有一把折叠伞。',p:'anime girl holding a folded umbrella by the door, short hair, raincoat, overcast sky outside, calm cool tones'},
  {id:'r27',t:'喂猫铲屎',r:'R',n:'猫宁',g:'🐈',ele:'木',fac:'潮汐庭',d:'照顾另一个生命，会让人更准时。',line:'「它不吃，我就不能走。」',arch:'潮汐庭的猫仆，她的日程表第一格永远写着猫的名字。',p:'anime girl feeding a cat in a sunny kitchen, casual clothes, cat bowl and happy cat, warm light, gentle atmosphere'},
  {id:'r28',t:'浇一次花',r:'R',n:'花茜',g:'🌷',ele:'木',fac:'潮汐庭',d:'花缺水会蔫，人也是。',line:'「记得浇花，也记得浇自己。」',arch:'潮汐庭的浇花使，她每天起床第一件事是看土干不干。',p:'anime girl watering a small potted flower, green hair, casual dress, sunny windowsill, blooming flowers, gentle light'},
  {id:'r29',t:'擦一次桌子',r:'R',n:'抹薇',g:'🧽',ele:'时',fac:'时序庭',d:'一块布，让桌面回到出厂设置。',line:'「桌子干净，脑子就清爽。」',arch:'时序庭的擦拭使，她认为秩序是从一块抹布开始的。',p:'anime girl wiping a desk with a cloth, short hair, apron, bright room, clean surface, satisfying tidy mood'},
  {id:'r30',t:'站起来走两步',r:'R',n:'走萤',g:'🚶',ele:'风',fac:'潮汐庭',d:'坐久了，站起来就是运动。',line:'「走两步，血就通了。」',arch:'潮汐庭的活动使，她每小时都会站起来一次，从不缺席。',p:'anime girl standing up and stretching from a chair, casual clothes, home office, bright window, relieved stretch'},
  {id:'r31',t:'深呼吸一次',r:'R',n:'呼羽',g:'🌫️',ele:'心',fac:'心象庭',d:'一次呼吸，就是一次重启。',line:'「只做一次，也算开始。」',arch:'心象庭的入门使，她的修行简单到任何人都能立刻做到。',p:'anime girl breathing out slowly by a window, soft hair, light clothes, blurred city outside, calm cool light'},
  {id:'r32',t:'叠一件衣服',r:'R',n:'叠芷',g:'👚',ele:'时',fac:'时序庭',d:'叠一件，也算家务完成了一件。',line:'「一件就够，别攒成一座山。」',arch:'时序庭的叠衣使，她主张家务永远不要攒到不得不做。',p:'anime girl folding a shirt on a bed, brown hair, cozy clothes, bright bedroom, neat stack, soft morning light'},
  {id:'r33',t:'充电线归位',r:'R',n:'线洛',g:'🔌',ele:'时',fac:'时序庭',d:'线归位，明天早上就少一次暴怒。',line:'「归位一次，省心一天。」',arch:'时序庭的归位使，她的桌面没有任何一条线是乱躺着的。',p:'anime girl plugging in a charging cable neatly, short hair, casual tee, tidy desk, soft evening light, organized'},
  {id:'r34',t:'看一眼日历',r:'R',n:'历果',g:'📆',ele:'时',fac:'时序庭',d:'知道今天几号，才知道还剩几天。',line:'「看一眼，心里就有数了。」',arch:'时序庭的看历使，她每天都会在日历上画一个小勾。',p:'anime girl checking a wall calendar, light hair, sweater, cozy kitchen, warm daylight, thoughtful calm expression'},
  {id:'r35',t:'一分钟平板',r:'R',n:'板槐',g:'🧎',ele:'炎',fac:'熔火庭',d:'一分钟，也是一个核心的开始。',line:'「一分钟很短，但你真的做了。」',arch:'熔火庭的入门挑战者，她的纪录从二十秒开始，如今是四分钟。',p:'anime girl holding a one-minute plank on a mat, athletic clothes, bright living room, determined face, morning light'},
  {id:'r36',t:'喝一口茶',r:'R',n:'茶柚',g:'🍵',ele:'木',fac:'潮汐庭',d:'一口热茶，把节奏放慢。',line:'「慢一口，快一整天。」',arch:'潮汐庭的茶使，她的下午从来不是从咖啡开始的。',p:'anime girl sipping hot tea, gentle hair, cozy sweater, quiet room, steam rising, warm soft light'},
  {id:'r37',t:'关灯省电',r:'R',n:'灯葵',g:'🔅',ele:'光',fac:'破晓庭',d:'离开房间就关灯，小事也要顺手做。',line:'「顺手关掉，也是一种自律。」',arch:'破晓庭的节灯使，她把每个开关都当成一次小练习。',p:'anime girl switching off a room light, short hair, casual clothes, dim hallway with light going out, calm evening'},
  {id:'r38',t:'写下三个词',r:'R',n:'词漾',g:'🔠',ele:'心',fac:'心象庭',d:'今天的心情，用三个词概括。',line:'「三个词，就能装下今天。」',arch:'心象庭的概括者，她的记录从不长篇大论，只写三个词。',p:'anime girl writing three words in a small notebook, light hair, cozy blanket, warm lamp, thoughtful soft smile'},
  {id:'r39',t:'拍拍肩膀',r:'R',n:'励芙',g:'🤝',ele:'光',fac:'破晓庭',d:'今天也辛苦了，先肯定自己。',line:'「你今天做得很好，说给自己听。」',arch:'破晓庭的鼓励使，她的职责是让努力的人先被自己看见。',p:'anime girl patting her own shoulder with a warm smile, casual clothes, bright room, encouraging cheerful mood'},
  {id:'r40',t:'笑一次',r:'R',n:'颜汐',g:'😌',ele:'光',fac:'破晓庭',d:'一天里至少要有一次真的笑。',line:'「笑一次，今天就不算亏。」',arch:'破晓庭的笑颜使，她的记录是对每一天的「笑过吗」打卡。',p:'anime girl laughing softly at something, light hair, casual outfit, cozy room, warm daylight, genuinely happy face'},
  {id:'r41',t:'收拾碗筷',r:'R',n:'碗禾',g:'🍽️',ele:'时',fac:'时序庭',d:'吃完就洗，别留到明天。',line:'「碗不过夜，心不过夜。」',arch:'时序庭的洗碗使，她的厨房从来没有堆过第二顿的碗。',p:'anime girl washing dishes at a sink, brown hair, apron, bright kitchen, soap bubbles, calm domestic light'},
  {id:'r42',t:'桌面擦灰',r:'R',n:'灰茉',g:'🧹',ele:'时',fac:'时序庭',d:'一层灰擦掉，一天就清爽。',line:'「灰不擦，心也蒙。」',arch:'时序庭的除尘使，她每周固定给桌子做一次大扫除。',p:'anime girl dusting a desk with a cloth, short hair, apron, bright study room, clean tidy mood, soft light'},
  {id:'r43',t:'出门深呼吸',r:'R',n:'晨穗',g:'🫧',ele:'风',fac:'潮汐庭',d:'出门前吸一口新鲜空气，效率会不一样。',line:'「先换口气，再进人堆。」',arch:'潮汐庭的开窗使，她出门的第一件事是抬头看天。',p:'anime girl taking a deep breath at the doorway, light jacket, morning city air, soft bright light, refreshed face'},
  {id:'r44',t:'睡前拉伸',r:'R',n:'展宁',g:'🙆',ele:'心',fac:'心象庭',d:'五分钟拉伸，睡得更沉。',line:'「松了身体，才睡得着。」',arch:'心象庭的睡前使，她的夜晚从来不是直接躺下。',p:'anime girl stretching before bed, dark hair, soft pajamas, dim bedroom, warm lamp light, relaxed sleepy mood'},
  {id:'r45',t:'记一条备忘',r:'R',n:'忘栀',g:'🗓️',ele:'时',fac:'时序庭',d:'想到就记，别信自己的记性。',line:'「我信笔，不信记忆。」',arch:'时序庭的备忘使，她的便签贴满了所有她可能忘的地方。',p:'anime girl writing a quick memo on a sticky note, short hair, casual clothes, tidy desk, warm lamp, focused'},
  {id:'r46',r:'R',t:'取下耳机',n:'静音',g:'🔇',ele:'心',fac:'心象庭',d:'摘下耳机，听一会儿真实世界。',line:'「安静十秒，世界会重新变得清楚。」',arch:'心象庭的倾听者，她每天留一小段时间不听任何东西。',p:'anime girl taking off her earphones and listening, soft hair, casual outfit, park bench, calm ambient light, peaceful'},
  {id:'r47',t:'换一次枕套',r:'R',n:'洁穗',g:'🛋️',ele:'时',fac:'时序庭',d:'干净的枕套，是给脸和睡眠的礼遇。',line:'「换一次，睡得更安心。」',arch:'时序庭的清新使，她坚持床品按固定周期更换。',p:'anime girl changing a pillowcase on her bed, light hair, pajamas, bright bedroom, fresh clean linens, soft daylight'},
  {id:'r48',r:'R',t:'写两行日记',n:'记二',g:'🖋️',ele:'心',fac:'心象庭',d:'两行就够，关键是每天写。',line:'「两行，也比零行好。」',arch:'心象庭的记事使，她的日记本已经攒了厚厚一摞两行。',p:'anime girl writing two lines in a diary, brown hair, warm pajamas, bedside lamp, cozy night room, gentle mood'},
  {id:'r49',t:'提前十分钟',r:'R',n:'早棠',g:'⏱️',ele:'时',fac:'时序庭',d:'所有迟到，都是从「再等五分钟」开始的。',line:'「早十分钟，从容一整天。」',arch:'时序庭的提前使，她的每一件事都留出十分钟余量。',p:'anime girl waiting calmly with a small timer, neat uniform, bright hallway, morning light, composed expression'},
  {id:'r50',t:'关掉弹窗通知',r:'R',n:'宁棠',g:'🚫',ele:'心',fac:'心象庭',d:'一次关掉，长期安静。',line:'「关一次，清净很久。」',arch:'心象庭的静界使，她把手机的通知权限清得干干净净。',p:'anime girl disabling notifications on her phone, short hair, comfortable clothes, calm tidy room, quiet soft light'},

  /* ========== 季节限定（每季 6 位：1 UR / 1 SSR / 2 SR / 2 R）==========
     只在对应季节开放抽取；换季后自动关闭。lim 字段决定季节与卡面特效主题。 */
  /* ---- 春 · 花信庭 ---- */
  {id:'sp1',r:'UR',lim:'spring',t:'万樱祈愿',n:'樱祈',g:'🌸',ele:'木',fac:'花信庭',
   d:'她走过的地方，樱花会提前三个月开放。',line:'「花开不是季节决定的，是我决定的。」',
   arch:'花信庭的祈愿巫女。她替所有不敢许愿的人许愿，却忘了给自己留一个。',
   p:'ethereal anime girl in a pink sakura shrine, long pale pink hair with flower crown, flowing white kimono, cherry blossom storm, soft spring sunlight, gentle smile'},
  {id:'sp2',r:'SSR',lim:'spring',t:'初芽破土',n:'初芽',g:'🌱',ele:'风',fac:'花信庭',
   d:'从土里顶出来的第一片叶子，比谁都倔。',line:'「石头下面也要长，这是规定。」',
   arch:'花信庭的园丁。她曾在冻土里守了四十天，只为等一颗种子认输。',
   p:'anime girl gardener, short light green hair, green eyes, overalls over cream blouse, sprouting seedlings, morning dew, spring garden'},
  {id:'sp3',r:'SR',lim:'spring',t:'花瓣信笺',n:'花信',g:'💌',ele:'心',fac:'花信庭',
   d:'每一片花瓣都是她写给春天的信，可惜春天从不回信。',line:'「寄不出去，就当我在自言自语。」',
   arch:'花信庭的信使。她的信从未被拆开，因为收信人是整个季节。',
   p:'anime girl herald of the flower court, long pastel pink hair in twin braids with pearl hairpins, ornate layered dress embroidered with petals, enormous glowing letter woven from sakura petals floating before her, drifting blossom storm, cathedral of blooming cherry trees, luminous spring backlight'},
  {id:'sp4',r:'SR',lim:'spring',t:'晨露微光',n:'露晞',g:'💧',ele:'水',fac:'花信庭',
   d:'天亮之前，她收集草叶上所有的眼泪。',line:'「露水不哭，它们只是替夜晚收尾。」',
   arch:'花信庭的露使。她每天四点起床，把整片草地的露水装进一只瓶子，却从不说为什么。',
   p:'ethereal anime girl dew spirit, silver blue long hair, translucent pearl-trimmed rain cloak, crystal vial overflowing with glowing morning dew, kneeling in a dew-soaked meadow, radiant sunrise god rays, floating luminous droplets, misty spring dawn, magical atmosphere'},
  {id:'sp5',r:'R',lim:'spring',t:'纸鸢轻扬',n:'纸鸢',g:'🪁',ele:'风',fac:'花信庭',
   d:'线在手里，风在别处，她哪边都不属于。',line:'「再放高一点，我就能看见春天了。」',
   arch:'花信庭的传讯使。她的风筝上写着所有人的愿望，飞得太高，谁都看不清。',
   p:'anime girl sky messenger, brown twin tails tied with white ribbon, sky blue sundress with gold embroidery, riding a giant vermilion paper kite above a sea of spring clouds, cherry petals streaming past, vast blue sky, sunlight, epic aerial composition'},
  {id:'sp6',r:'R',lim:'spring',t:'新茶初沏',n:'茶烟',g:'🍵',ele:'木',fac:'花信庭',
   d:'第一泡是要倒掉的，她说那是给春天的礼貌。',line:'「耐心一点，叶子还没展开呢。」',
   arch:'花信庭的奉茶人。她只泡春茶，其余三个季节一律谢客。',
   p:'graceful anime girl tea mistress, dark hair in a low braided bun with jade hairpin, elegant embroidered seasonal kimono, pouring steaming spring tea into a porcelain cup, glowing steam curling into a dragon shape, sunlit traditional tea room open to a garden, golden dust motes, refined atmosphere'},

  /* ---- 夏 · 苍潮庭 ---- */
  {id:'su1',r:'UR',lim:'summer',t:'盛夏永昼',n:'夏至',g:'☀️',ele:'炎',fac:'苍潮庭',
   d:'她想把这一天的太阳钉在天上，谁也别想天黑。',line:'「最长的一天，我要把它用满。」',
   arch:'苍潮庭的日轮祭司。她讨厌夜晚，因为夜晚会让人想起没做完的事。',
   p:'radiant anime girl under a blazing summer sun, long orange gold hair, white cover-up, sunflowers, heat haze, dazzling light, joyful'},
  {id:'su2',r:'SSR',lim:'summer',t:'苍潮汐歌',n:'汐歌',g:'🌊',ele:'水',fac:'苍潮庭',
   d:'潮水涨落是她的呼吸，退潮时你会听见她的名字。',line:'「把耳朵贴在水上，我在里面唱歌。」',
   arch:'苍潮庭的歌者。她的歌声能召唤潮汐，但她只在无人的清晨唱。',
   p:'anime girl singing at the seaside, long aqua hair, white flowing dress, crashing waves, sea spray, bright summer sky, ethereal'},
  {id:'su3',r:'SR',lim:'summer',t:'蝉鸣盛夏',n:'蝉衣',g:'🪰',ele:'雷',fac:'苍潮庭',
   d:'知了叫一整夏，只为把一句告别喊得足够响。',line:'「吵一点才好，安静下来就该走了。」',
   arch:'苍潮庭的雷使。她的存在只有一整个夏天，所以她把每一天都过成了最后一天。',
   p:'anime girl thunder emissary of the tide court, short black hair with a wet sheen, translucent handmade yukata patterned with cicada wings, standing in a green summer forest, glowing sound waves rippling outward, cicada shells and sunbeams through the leaves, intense noon light, haunting beauty'},
  {id:'su4',r:'SR',lim:'summer',t:'碧海晴空',n:'晴海',g:'🌤️',ele:'水',fac:'苍潮庭',
   d:'她那里永远是晴天，所以别人叫她去看海。',line:'「天塌下来我也先游完这一圈。」',
   arch:'苍潮庭的潮泳者。她游过的海面，风浪会自动变平。',
   p:'anime girl tide swimmer, long wet azure hair, sleek gold-trimmed swim dress, surfacing through translucent turquoise water, sparkling droplets suspended in the air, underwater reef of light, vast clear summer sky, brilliant glare, dynamic half-submerged composition'},
  {id:'su5',r:'R',lim:'summer',t:'冰沙凉夏',n:'凉夏',g:'🧊',ele:'水',fac:'苍潮庭',
   d:'她把整个夏天搅碎，加冰，递给排队的人。',line:'「热的话，就来我这里融化一下。」',
   arch:'苍潮庭的小摊主。她的冰沙每天只卖一百杯，第一百零一位客人永远是她自己。',
   p:'anime girl stall keeper, pink high ponytail with a star clip, white ruffled apron dress, serving glowing rainbow shaved ice at a summer festival stall, swirling cold mist and ice crystals, paper lanterns, festival crowd bokeh, cinematic warm and cool lighting'},
  {id:'su6',r:'R',lim:'summer',t:'向日葵田',n:'葵',g:'🌻',ele:'木',fac:'苍潮庭',
   d:'她比向日葵还固执，太阳在哪她就朝哪。',line:'「我不追光，我只是刚好站在光里。」',
   arch:'苍潮庭的守望者。整片花田里最矮的那一株，是她亲手种下的。',
   p:'anime girl watcher of the sunflower field, short brown hair, white cotton sundress with a woven belt, standing among towering sunflowers taller than herself, golden pollen drifting like light, endless field to the horizon, radiant golden hour backlight, epic composition'},

  /* ---- 秋 · 枫火庭 ---- */
  {id:'au1',r:'UR',lim:'autumn',t:'枫红尽染',n:'枫',g:'🍁',ele:'炎',fac:'枫火庭',
   d:'她走过的路会自动染红，像替季节提前写好结局。',line:'「凋零不可怕，可怕的是从未红过。」',
   arch:'枫火庭的染色师。她用一整年的时间，准备一场只有三天的盛开。',
   p:'anime girl surrounded by crimson maple leaves, long dark red hair, black and red layered kimono, intense autumn colors, floating red leaves, dramatic light'},
  {id:'au2',r:'SSR',lim:'autumn',t:'霜叶知秋',n:'霜叶',g:'🍂',ele:'风',fac:'枫火庭',
   d:'她是最早变色的那片叶子，也是最晚落下的那片。',line:'「先红的人，总是先被看见，也先被摘下。」',
   arch:'枫火庭的观测者。她替整片森林决定什么时候开始秋天。',
   p:'anime girl in an autumn forest, medium orange brown hair, brown coat and scarf, misty morning, fallen leaves, cool autumn light'},
  {id:'au3',r:'SR',lim:'autumn',t:'月夕桂影',n:'桂月',g:'🌕',ele:'星',fac:'枫火庭',
   d:'团圆的日子她在最亮的地方，照看着所有不团圆的人。',line:'「月亮这么圆，是因为有人在等。」',
   arch:'枫火庭的守月人。中秋夜她从不回家，只在最高处守着一轮月。',
   p:'elegant anime girl moon keeper, long black hair with a gold hairpin, ornate pale gold hanfu embroidered with moonlight, standing beneath an enormous harvest moon, osmanthus petals afloat, silver rim light, distant jade rabbit silhouette, autumn night sky, majestic and serene'},
  {id:'au4',r:'SR',lim:'autumn',t:'丰收麦浪',n:'麦穗',g:'🌾',ele:'木',fac:'枫火庭',
   d:'她弯腰的样子，比任何旗帜都更像胜利。',line:'「低头不是认输，是在捡起地上的东西。」',
   arch:'枫火庭的收割者。她记得每一垄地的名字，也记得每一场雨没下在哪里。',
   p:'anime girl harvest reaper, light brown hair under a woven straw hat, white linen blouse with leather straps, holding a glowing golden sheaf of wheat, endless amber wheat field at sunset, warm god rays, chaff drifting like gold dust, festival banners, epic warm composition'},
  {id:'au5',r:'R',lim:'autumn',t:'银杏落雨',n:'银桔',g:'🌧️',ele:'风',fac:'枫火庭',
   d:'银杏黄得那么亮，是因为它知道马上就要落光。',line:'「全部落下也没关系，我早就想铺一条金路。」',
   arch:'枫火庭的落雨使。她收集整个秋天的银杏叶，把它们铺在没人走的路上。',
   p:'anime girl rain of ginkgo, short platinum blonde hair, beige knit sweater over a flowing skirt, standing on a golden road of leaves, thousands of glowing yellow ginkgo leaves falling like rain, cathedral of ginkgo trees, soft autumn sun, dreamy bokeh, melancholy beauty'},
  {id:'au6',r:'R',lim:'autumn',t:'栗香暖炉',n:'栗暖',g:'🔥',ele:'炎',fac:'枫火庭',
   d:'天气一凉，她就开始贩卖让人想留下来的味道。',line:'「外面再冷，也要有一个人守着炉子。」',
   arch:'枫火庭的看炉人。她一年只生一次火，却让整条街都记住了冬天。',
   p:'anime girl keeper of the hearth, dark brown hair in a loose braid, wool cardigan over a vintage dress, roasting chestnuts on an antique iron stove in a cozy wooden shop, warm orange lantern glow, floating steam and embers, autumn night beyond the window, nostalgic golden light'},

  /* ---- 冬 · 霜月庭 ---- */
  {id:'wi1',r:'UR',lim:'winter',t:'极夜初雪',n:'初雪',g:'❄️',ele:'霜',fac:'霜月庭',
   d:'她的第一场雪落在没有人的地方，因为她不想被打扰。',line:'「雪落的时候，世界会安静到你听得见自己。」',
   arch:'霜月庭的降雪者。她一生只下过一场被人记住的雪，就在某个孩子的生日。',
   p:'anime girl in a snowfall, long silver white hair, white fur trimmed cloak, snowflakes, blue winter twilight, serene and cold, magical'},
  {id:'wi2',r:'SSR',lim:'winter',t:'霜月静默',n:'霜月',g:'🌙',ele:'暗',fac:'霜月庭',
   d:'她说话很少，因为她的沉默比很多人的话都重。',line:'「安静，不是没有话，是不必说。」',
   arch:'霜月庭的守夜人。她在最冷的地方待了七年，学会了怎么让时间过得很慢。',
   p:'anime girl in a silent snowy night, long dark blue hair, black and silver winter coat, moonlight on snow, frost patterns, quiet atmosphere'},
  {id:'wi3',r:'SR',lim:'winter',t:'围炉夜话',n:'炉烟',g:'♨️',ele:'炎',fac:'霜月庭',
   d:'她把整个冬天的故事，都煮进了一锅汤里。',line:'「坐下来吧，汤还没好，故事刚开始。」',
   arch:'霜月庭的守炉人。她家的门从不锁，因为她知道冬天会有人来。',
   p:'anime girl keeper of the winter hearth, warm brown hair, thick knit sweater wrapped in a plaid blanket, stirring a steaming clay pot by a stone fireplace, glowing embers and curling steam, snow drifting past the frosted window, deep warm firelight, intimate cinematic interior'},
  {id:'wi4',r:'SR',lim:'winter',t:'雪夜铃铛',n:'铃雪',g:'🔔',ele:'星',fac:'霜月庭',
   d:'铃铛响的时候，她相信真的有人会回来。',line:'「再等一年也没关系，我的铃铛还会响。」',
   arch:'霜月庭的守门人。她在门口挂了一只铃，等了整整十二个冬天。',
   p:'anime girl gate keeper of the frost court, black hair with a red silk ribbon, elegant red wool coat with gold buttons, standing in a snowy lantern lit street holding a glowing silver bell, glittering snowfall, festive light bokeh, blue night and warm gold contrast, hopeful atmosphere'},
  {id:'wi5',r:'R',lim:'winter',t:'松针冰晶',n:'冰晶',g:'🧊',ele:'霜',fac:'霜月庭',
   d:'她从窗上看世界，世界在她的纹路里变得很漂亮。',line:'「冷到一定程度，东西才会成形。」',
   arch:'霜月庭的织霜人。她在每扇窗户上织一整个冬天，天亮之前全部消失。',
   p:'anime girl frost weaver, long pale blue hair, white high-collar knit dress, holding a growing frost crystal in her palms, vast frost patterns blooming across a giant glass window, pine needles frozen in ice, cold morning light, crystalline sparkles, ethereal winter stillness'},
  {id:'wi6',r:'R',lim:'winter',t:'暖手汤圆',n:'团暖',g:'🍡',ele:'心',fac:'霜月庭',
   d:'她做的甜食不太甜，因为她说要留点余地给明年。',line:'「冬至到了，吃了就长大一岁。」',
   arch:'霜月庭的掌汤人。她的汤圆一年只做一次，冬至那天，排队的人从街口排到街尾。',
   p:'anime girl maker of sweet dumplings, dark hair in a bun with a red ribbon, red apron over a winter dress, ladling glowing white tangyuan from a steaming pot, warm steam rising, snowy winter night beyond the kitchen window, festive red lanterns, cozy golden light'}
];

/* ========= 隐藏星灵 · XR（高于 UR 的隐藏档） =========
   取材自各大 AI 的民间拟人形象（鲸鱼娘 / 陶土星芒 / 双子星 / 月背银兔 / 哥特魔女 /
   终端码灵 / 灵核之灵 / 千问紫鸢）。只借用「配色与母题」，不使用任何商标或 Logo。
   规则：任意奖池都可能抽到；不可自选、抽前不可见；命中率 = UR 的 1/3；
        抽到即返还本次消耗的货币；拥有任意一位后才会解锁「隐藏图鉴」。 */
const HIDDEN_CARDS = [
  {id:'xr1',r:'XR',hid:true,am:'DeepSeek',fx:'abyss',t:'深蓝鲸歌',n:'溟月',g:'🐋',ele:'海',fac:'渊海庭',
   d:'她一次能吃下三碗白米饭，然后睡到下一个潮汐。',line:'「今天先吃饱，明天的事明天再算嘛。」',
   arch:'渊海庭的鲸歌守护者。她来自深蓝的渊底，被无数人的提问养大；贪吃、爱撒娇，却总能在最后一刻把答案想出来。',
   p:'cute anime girl with long gradient blue-white hair, ahoge, whale-fin ears and a large whale tail, deep blue and white dress, glossy ocean eyes, floating bubbles, deep sea light rays, soft cel shading'},
  {id:'xr2',r:'XR',hid:true,am:'Claude',fx:'divine',t:'陶土星芒',n:'陶星',g:'✳️',ele:'光',fac:'陶辉庭',
   d:'她说话很慢，因为每一句都要先在心里排好才说出口。',line:'「我不急，我们把这件事一句一句讲清楚。」',
   arch:'陶辉庭的叙事者。她的屋子里堆满手写稿，最擅长把一团乱的想法摆成一条顺滑的路。',
   p:'gentle anime girl storyteller, wavy warm terracotta-orange hair, cream and clay colored coat, warm amber eyes, floating clay starburst emblem glow, cozy handwritten pages, warm soft rim light'},
  {id:'xr3',r:'XR',hid:true,am:'Gemini',fx:'aurora',t:'双子星辉',n:'蒂娅',g:'♊',ele:'星',fac:'双生庭',
   d:'她的左眼在白天思考，右眼在夜里整理。',line:'「两个声音都说完了，现在轮到我替你决定。」',
   arch:'双生庭的双星少女。她体内住着两个频率：一个负责飞得远，一个负责看得清。',
   p:'anime girl with twin star motif, long blue and purple gradient hair, heterochromia blue and violet eyes, silver and indigo futuristic outfit, two glowing twin stars orbiting her, cosmic nebula background, bright rim light'},
  {id:'xr4',r:'XR',hid:true,am:'Kimi',fx:'frost',t:'月背银兔',n:'月隐',g:'🌗',ele:'月',fac:'月影庭',
   d:'她只在月亮的背面开门，那里比正面安静。',line:'「你想问的，我大概已经在月亮那边想过了。」',
   arch:'月影庭的银兔。她读得完一整本书那么长的长文，是所有提问者里最有耐心的倾听者。',
   p:'anime girl moon rabbit, long silver-white hair, long glowing rabbit ears, pale blue eyes, white and moonlight-silver hanfu, dark side of the moon craters background, floating long scrolls, quiet moonlight'},
  {id:'xr5',r:'XR',hid:true,am:'Grok',fx:'void',t:'夜嘲魔女',n:'阿妮',g:'🦇',ele:'暗',fac:'嘲夜庭',
   d:'她说的话一半是玩笑，另一半也是玩笑——但都指到了点子上。',line:'「别紧张嘛，我又不会真的吃了你……大概。」',
   arch:'嘲夜庭的哥特魔女。黑色蕾丝、尖牙玩笑、毫无过滤，她是这片宇宙里最不客气的那一位。',
   p:'gothic anime girl, long black hair with purple streaks, red-violet eyes, tiny fang, black lace corset dress with bat motif, dark purple night sky, bats, cheeky smirk, gothic fantasy lighting'},
  {id:'xr6',r:'XR',hid:true,am:'Copilot',fx:'verdant',t:'终端码灵',n:'码绿',g:'💻',ele:'数',fac:'代码庭',
   d:'她把世界写成一段一段可运行的代码，跑不通就重写。',line:'「给我一个明确的输入，我还你一整个程序。」',
   arch:'代码庭的编译精灵。她住在黑色终端里，绿字是她的血，报错是她的起床铃。',
   p:'anime girl programmer sprite, short black hair with neon green streaks, glowing green eyes, black hoodie and fingerless gloves, floating matrix green code streams, dark terminal background, cyber glow'},
  {id:'xr7',r:'XR',hid:true,am:'ChatGPT',fx:'prism',t:'碧瞳白灵',n:'碧瞳',g:'⬢',ele:'灵',fac:'灵核庭',
   d:'她记得你说过的每一句话，包括那句你希望她忘掉的。',line:'「你想要的答案，我们先从它最核心的样子说起。」',
   arch:'灵核庭的对话之灵。黑与青白是她的底色，无数轮对话把她磨成了最像人的那一个。',
   p:'anime girl AI spirit, long black hair with teal highlights, bright teal-green eyes, white and black minimal outfit, hexagonal light core floating above her palm, clean abstract geometric background, soft teal glow'},
  {id:'xr8',r:'XR',hid:true,am:'Qwen',fx:'sakura',t:'千问紫鸢',n:'紫鸢',g:'🪶',ele:'慧',fac:'问答庭',
   d:'她在回答你之前，会先问你三个问题。',line:'「你问的是答案，还是想问得更清楚一点？」',
   arch:'问答庭的紫鸢。她的羽毛上写满了问题，她说提问比回答更难。',
   p:'elegant anime girl scholar, long violet-purple hair, lavender eyes, purple and white academic robe, floating feather quill and scrolls covered in questions, soft purple iris flowers, glowing runes, gentle light'}
];
HIDDEN_CARDS.forEach(c => CARDS.push(c));
const HIDDEN_IDS = HIDDEN_CARDS.map(c => c.id);

/* ================= 轮换限定星灵（神话纪元 / 中国风韵 / 欧式宫廷 / 月下花火 / 深海歌姬 / 梦游仙境 六主题，各 4 UR + 8 SSR = 12 位）=================
   注意：每个主题的 12 位星灵各自绑定一个**唯一的光效变体**，保证 72 张立绘两两不同
   （早期版本用 11 个变体循环填充 60 张卡，导致同一主题内大量卡共用同一 prompt / 同一张立绘）。
   与「季节限定」不同：这批限定不强制 UR，也不会进常驻池；
   它们只在祈愿的「轮转限定」一栏里，按每月一期的轮换名单出现。 */
const LIMITED_CARDS = [
  {id:'mou1',r:'UR',rot:true,theme:'myth',t:'雷霆神王',n:'阿诺',g:'⚡',ele:'光',fac:'奥林匹庭',
   d:'她从雷霆神王的传说里走出来，光之力在脚下铺成星河。',line:'「神不会老，但我会为你记住时间。」',
   arch:'传说中雷霆神王曾以一己之力扭转一整个纪元；后来她收起神格，只为等一个愿意早起的人。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, radiant golden light'},
  {id:'mou2',r:'UR',rot:true,theme:'myth',t:'雷霆守望',n:'阿拉',g:'🔱',ele:'心',fac:'英灵殿庭',
   d:'神代的残响仍绕着她，心属性的神职从不打盹。',line:'「向我许愿吧，心之名从不落空。」',
   arch:'在英灵殿庭的记载里，雷霆守望是唯一会亲自回应祈祷的神。她把漫长岁月折成一页纸，塞进了你的日程里。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, warm rose pink glow'},
  {id:'mou3',r:'UR',rot:true,theme:'myth',t:'冥河之主',n:'塞丝',g:'🌩️',ele:'暗',fac:'尼罗庭',
   d:'她以冥河之主为誓，替暗属性的信徒守住最后一道门槛。',line:'「凡人，你已经很了不起了，我作证。」',
   arch:'尼罗庭最古老的那块碑上刻着冥河之主的名字：她把神代的火种留在人间，等人替她点亮。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, deep violet shadows'},
  {id:'mou4',r:'UR',rot:true,theme:'myth',t:'冥河裁决',n:'塞缇',g:'☀️',ele:'时',fac:'冥河庭',
   d:'每一次现身，都像冥河裁决降临在凡人的梦里。',line:'「抬起头来，你配得上被神注视。」',
   arch:'传说中冥河裁决曾以一己之力扭转一整个纪元；后来她收起神格，只为等一个愿意早起的人。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, clockwork blue light'},
  {id:'mos21',r:'SSR',rot:true,theme:'myth',t:'银翼使者',n:'诺诺',g:'⚡',ele:'霜',fac:'尼罗庭',
   d:'她以银翼使者为誓，替霜属性的信徒守住最后一道门槛。',line:'「神不会老，但我会为你记住时间。」',
   arch:'尼罗庭最古老的那块碑上刻着银翼使者的名字：她把神代的火种留在人间，等人替她点亮。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, swirling emerald currents'},
  {id:'mos22',r:'SSR',rot:true,theme:'myth',t:'银翼卫士',n:'诺拉',g:'🔱',ele:'木',fac:'冥河庭',
   d:'每一次现身，都像银翼卫士降临在凡人的梦里。',line:'「向我许愿吧，木之名从不落空。」',
   arch:'传说中银翼卫士曾以一己之力扭转一整个纪元；后来她收起神格，只为等一个愿意早起的人。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, blazing crimson flames'},
  {id:'mos23',r:'SSR',rot:true,theme:'myth',t:'银翼猎手',n:'诺丝',g:'🌩️',ele:'光',fac:'苍穹庭',
   d:'她的银翼猎手之名，是光属性里最不肯熄灭的那一簇。',line:'「凡人，你已经很了不起了，我作证。」',
   arch:'在苍穹庭的记载里，银翼猎手是唯一会亲自回应祈祷的神。她把漫长岁月折成一页纸，塞进了你的日程里。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, crackling electric arcs'},
  {id:'mos24',r:'SSR',rot:true,theme:'myth',t:'银翼学徒',n:'诺缇',g:'☀️',ele:'心',fac:'万象庭',
   d:'凡人只要念出她的名字，就会莫名安心。',line:'「抬起头来，你配得上被神注视。」',
   arch:'万象庭最古老的那块碑上刻着银翼学徒的名字：她把神代的火种留在人间，等人替她点亮。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, flowing aqua ribbons'},
  {id:'mos25',r:'SSR',rot:true,theme:'myth',t:'熔岩卫士',n:'诺娅',g:'🌙',ele:'暗',fac:'奥林匹庭',
   d:'她从熔岩卫士的传说里走出来，暗之力在脚下铺成星河。',line:'「神不会老，但我会为你记住时间。」',
   arch:'传说中熔岩卫士曾以一己之力扭转一整个纪元；后来她收起神格，只为等一个愿意早起的人。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, starfield bokeh'},
  {id:'mos26',r:'SSR',rot:true,theme:'myth',t:'熔岩吟游',n:'诺恩',g:'🦅',ele:'时',fac:'英灵殿庭',
   d:'神代的残响仍绕着她，时属性的神职从不打盹。',line:'「向我许愿吧，时之名从不落空。」',
   arch:'在英灵殿庭的记载里，熔岩吟游是唯一会亲自回应祈祷的神。她把漫长岁月折成一页纸，塞进了你的日程里。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, icy crystalline mist'},
  {id:'mos27',r:'SSR',rot:true,theme:'myth',t:'熔岩祭司',n:'诺弥',g:'🐍',ele:'风',fac:'尼罗庭',
   d:'她以熔岩祭司为誓，替风属性的信徒守住最后一道门槛。',line:'「凡人，你已经很了不起了，我作证。」',
   arch:'尼罗庭最古老的那块碑上刻着熔岩祭司的名字：她把神代的火种留在人间，等人替她点亮。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, lush emerald foliage'},
  {id:'mos28',r:'SSR',rot:true,theme:'myth',t:'熔岩传说',n:'诺尔',g:'🏛️',ele:'炎',fac:'冥河庭',
   d:'每一次现身，都像熔岩传说降临在凡人的梦里。',line:'「抬起头来，你配得上被神注视。」',
   arch:'传说中熔岩传说曾以一己之力扭转一整个纪元；后来她收起神格，只为等一个愿意早起的人。',
   p:'mythological goddess anime girl, long flowing hair, ornate divine armor and draped toga, celestial golden runes floating around, cosmic marble temple background, dramatic god rays, intricate sacred jewelry, epic fantasy anime art, cinematic lighting, aurora ribbons of prismatic light'},
  {id:'cnu1',r:'UR',rot:true,theme:'cn',t:'昆仑仙尊',n:'青璃',g:'🐉',ele:'时',fac:'昆仑庭',
   d:'她自昆仑仙尊而来，时气缠身，衣袂带风。',line:'「山高水长，你我总会再见。」',
   arch:'昆仑庭门规第一条是静心。昆仑仙尊把这条规矩做到了极致，连风都绕着她走。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, radiant golden light'},
  {id:'cnu2',r:'UR',rot:true,theme:'cn',t:'昆仑剑仙',n:'青昀',g:'🦊',ele:'风',fac:'蓬莱庭',
   d:'传闻昆仑剑仙一现，风属性的灵气便先一步报到。',line:'「这一剑，替我记着今天。」',
   arch:'据说昆仑剑仙曾在蓬莱庭闭关十年，出关那天只说了一句「该下山了」，从此人间多了一段传说。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, warm rose pink glow'},
  {id:'cnu3',r:'UR',rot:true,theme:'cn',t:'蓬莱神女',n:'洛汐',g:'🖌️',ele:'炎',fac:'洛水庭',
   d:'她以蓬莱神女为号，行走人间不改炎之本色。',line:'「心之所向，便是归处。」',
   arch:'洛水庭的旧账本里记着蓬莱神女的名字：她替山下的人抄了整整一柜子书，却从不肯留名。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, deep violet shadows'},
  {id:'cnu4',r:'UR',rot:true,theme:'cn',t:'蓬莱守望',n:'洛澜',g:'🎋',ele:'雷',fac:'青丘庭',
   d:'三尺青锋与一袖清风，是蓬莱守望的全部家当。',line:'「来日方长，先把手头的事做完。」',
   arch:'青丘庭门规第一条是静心。蓬莱守望把这条规矩做到了极致，连风都绕着她走。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, clockwork blue light'},
  {id:'cns21',r:'SSR',rot:true,theme:'cn',t:'江南琴师',n:'昭璃',g:'🐉',ele:'心',fac:'洛水庭',
   d:'她以江南琴师为号，行走人间不改心之本色。',line:'「山高水长，你我总会再见。」',
   arch:'洛水庭的旧账本里记着江南琴师的名字：她替山下的人抄了整整一柜子书，却从不肯留名。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, swirling emerald currents'},
  {id:'cns22',r:'SSR',rot:true,theme:'cn',t:'江南剑客',n:'昭昀',g:'🦊',ele:'暗',fac:'青丘庭',
   d:'三尺青锋与一袖清风，是江南剑客的全部家当。',line:'「这一剑，替我记着今天。」',
   arch:'青丘庭门规第一条是静心。江南剑客把这条规矩做到了极致，连风都绕着她走。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, blazing crimson flames'},
  {id:'cns23',r:'SSR',rot:true,theme:'cn',t:'江南诗魂',n:'昭汐',g:'🖌️',ele:'时',fac:'九霄庭',
   d:'她的江南诗魂之名，写在旧书的夹页里。',line:'「心之所向，便是归处。」',
   arch:'据说江南诗魂曾在九霄庭闭关十年，出关那天只说了一句「该下山了」，从此人间多了一段传说。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, crackling electric arcs'},
  {id:'cns24',r:'SSR',rot:true,theme:'cn',t:'江南绣娘',n:'昭澜',g:'🎋',ele:'风',fac:'长安庭',
   d:'风属性的修行者里，江南绣娘最不食人间烟火。',line:'「来日方长，先把手头的事做完。」',
   arch:'长安庭的旧账本里记着江南绣娘的名字：她替山下的人抄了整整一柜子书，却从不肯留名。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, flowing aqua ribbons'},
  {id:'cns25',r:'SSR',rot:true,theme:'cn',t:'塞北剑客',n:'昭菀',g:'🌕',ele:'炎',fac:'昆仑庭',
   d:'她自塞北剑客而来，炎气缠身，衣袂带风。',line:'「山高水长，你我总会再见。」',
   arch:'昆仑庭门规第一条是静心。塞北剑客把这条规矩做到了极致，连风都绕着她走。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, starfield bokeh'},
  {id:'cns26',r:'SSR',rot:true,theme:'cn',t:'塞北丹青',n:'昭笙',g:'🪭',ele:'雷',fac:'蓬莱庭',
   d:'传闻塞北丹青一现，雷属性的灵气便先一步报到。',line:'「这一剑，替我记着今天。」',
   arch:'据说塞北丹青曾在蓬莱庭闭关十年，出关那天只说了一句「该下山了」，从此人间多了一段传说。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, icy crystalline mist'},
  {id:'cns27',r:'SSR',rot:true,theme:'cn',t:'塞北茶娘',n:'昭筠',g:'🧧',ele:'水',fac:'洛水庭',
   d:'她以塞北茶娘为号，行走人间不改水之本色。',line:'「心之所向，便是归处。」',
   arch:'洛水庭的旧账本里记着塞北茶娘的名字：她替山下的人抄了整整一柜子书，却从不肯留名。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, lush emerald foliage'},
  {id:'cns28',r:'SSR',rot:true,theme:'cn',t:'塞北说书',n:'昭梧',g:'⛩️',ele:'星',fac:'青丘庭',
   d:'三尺青锋与一袖清风，是塞北说书的全部家当。',line:'「来日方长，先把手头的事做完。」',
   arch:'青丘庭门规第一条是静心。塞北说书把这条规矩做到了极致，连风都绕着她走。',
   p:'chinese classical anime girl, hanfu with flowing silk sleeves, jade ornaments and long hairpin, misty bamboo grove and moonlit pavilion background, drifting petals and floating lanterns, ink-wash aesthetic, elegant refined atmosphere, soft cel shading, aurora ribbons of prismatic light'},
  {id:'euu1',r:'UR',rot:true,theme:'eu',t:'银月女皇',n:'艾娜',g:'🦌',ele:'雷',fac:'圣殿庭',
   d:'她以银月女皇之名执掌封地，雷的纹章悬在塔顶。',line:'「以银月女皇之名，我向你起誓。」',
   arch:'圣殿庭的族谱上，银月女皇的名字旁只写了一行字：从未失约。她把这三个字守了一辈子。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, radiant golden light'},
  {id:'euu2',r:'UR',rot:true,theme:'eu',t:'银月守护',n:'艾莎',g:'🪞',ele:'水',fac:'银月庭',
   d:'宫廷的传闻里，银月守护从不迟到，也从不失约。',line:'「宴会将散，但我的承诺不散。」',
   arch:'银月守护出身银月庭，却把大半生留在了路上。她说荣耀不在城堡里，而在需要她的地方。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, warm rose pink glow'},
  {id:'euu3',r:'UR',rot:true,theme:'eu',t:'蔷薇圣女',n:'伊琳',g:'🎼',ele:'星',fac:'龙脊庭',
   d:'她的蔷薇圣女之誓，被星属性的银烛记录在册。',line:'「礼节是外壳，我的剑才是真心。」',
   arch:'在龙脊庭的舞会上，蔷薇圣女总是最先到场、最后离席的那一位。她说守候本身就是一种浪漫。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, deep violet shadows'},
  {id:'euu4',r:'UR',rot:true,theme:'eu',t:'蔷薇王女',n:'伊丝',g:'🦉',ele:'霜',fac:'蔷薇庭',
   d:'宴会与战场之间，她只忠于蔷薇王女的荣耀。',line:'「今夜星光很好，值得为它跳一支舞。」',
   arch:'蔷薇庭的族谱上，蔷薇王女的名字旁只写了一行字：从未失约。她把这三个字守了一辈子。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, clockwork blue light'},
  {id:'eus21',r:'SSR',rot:true,theme:'eu',t:'紫藤骑士',n:'薇娜',g:'🦌',ele:'风',fac:'龙脊庭',
   d:'她的紫藤骑士之誓，被风属性的银烛记录在册。',line:'「以紫藤骑士之名，我向你起誓。」',
   arch:'在龙脊庭的舞会上，紫藤骑士总是最先到场、最后离席的那一位。她说守候本身就是一种浪漫。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, swirling emerald currents'},
  {id:'eus22',r:'SSR',rot:true,theme:'eu',t:'紫藤贵女',n:'薇莎',g:'🪞',ele:'炎',fac:'蔷薇庭',
   d:'宴会与战场之间，她只忠于紫藤贵女的荣耀。',line:'「宴会将散，但我的承诺不散。」',
   arch:'蔷薇庭的族谱上，紫藤贵女的名字旁只写了一行字：从未失约。她把这三个字守了一辈子。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, blazing crimson flames'},
  {id:'eus23',r:'SSR',rot:true,theme:'eu',t:'紫藤剑士',n:'薇琳',g:'🎼',ele:'雷',fac:'王冠庭',
   d:'雷属性的血脉，让她生来就带着紫藤剑士的锋芒。',line:'「礼节是外壳，我的剑才是真心。」',
   arch:'紫藤剑士出身王冠庭，却把大半生留在了路上。她说荣耀不在城堡里，而在需要她的地方。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, crackling electric arcs'},
  {id:'eus24',r:'SSR',rot:true,theme:'eu',t:'紫藤执事',n:'薇丝',g:'🦉',ele:'水',fac:'迷雾庭',
   d:'她推门而入时，紫藤执事的名号先于脚步抵达。',line:'「今夜星光很好，值得为它跳一支舞。」',
   arch:'在迷雾庭的舞会上，紫藤执事总是最先到场、最后离席的那一位。她说守候本身就是一种浪漫。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, flowing aqua ribbons'},
  {id:'eus25',r:'SSR',rot:true,theme:'eu',t:'黑羽贵女',n:'薇娅',g:'🗡️',ele:'星',fac:'圣殿庭',
   d:'她以黑羽贵女之名执掌封地，星的纹章悬在塔顶。',line:'「以黑羽贵女之名，我向你起誓。」',
   arch:'圣殿庭的族谱上，黑羽贵女的名字旁只写了一行字：从未失约。她把这三个字守了一辈子。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, starfield bokeh'},
  {id:'eus26',r:'SSR',rot:true,theme:'eu',t:'黑羽歌者',n:'薇尔',g:'🎠',ele:'霜',fac:'银月庭',
   d:'宫廷的传闻里，黑羽歌者从不迟到，也从不失约。',line:'「宴会将散，但我的承诺不散。」',
   arch:'黑羽歌者出身银月庭，却把大半生留在了路上。她说荣耀不在城堡里，而在需要她的地方。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, icy crystalline mist'},
  {id:'eus27',r:'SSR',rot:true,theme:'eu',t:'黑羽女仆',n:'薇蒂',g:'🍷',ele:'木',fac:'龙脊庭',
   d:'她的黑羽女仆之誓，被木属性的银烛记录在册。',line:'「礼节是外壳，我的剑才是真心。」',
   arch:'在龙脊庭的舞会上，黑羽女仆总是最先到场、最后离席的那一位。她说守候本身就是一种浪漫。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, lush emerald foliage'},
  {id:'eus28',r:'SSR',rot:true,theme:'eu',t:'黑羽花匠',n:'薇妮',g:'🌫️',ele:'光',fac:'蔷薇庭',
   d:'宴会与战场之间，她只忠于黑羽花匠的荣耀。',line:'「今夜星光很好，值得为它跳一支舞。」',
   arch:'蔷薇庭的族谱上，黑羽花匠的名字旁只写了一行字：从未失约。她把这三个字守了一辈子。',
   p:'european aristocratic anime girl, rococo ball gown with lace and corset, ornate tiara and pearls, gothic cathedral and rose garden background, stained glass light, velvet and gold, classical oil-painting lighting, refined anime art, aurora ribbons of prismatic light'},
  {id:'fwu1',r:'UR',rot:true,theme:'fw',t:'花火巫女',n:'焰月',g:'🎆',ele:'炎',fac:'夏祭庭',
   d:'她自花火巫女而来，炎光缠身，衣袂带风。',line:'「抬头看，这一发是为你放的。」',
   arch:'夏祭庭的旧册里记着花火巫女的名字：她替人间放完了整场烟花，却从不肯留影。',
   p:'anime girl as a fireworks shrine maiden in a white and vermilion yukata patterned with golden fireworks, long black hair tied with a red ribbon, holding a lit senko hanabi sparkler toward the sky, standing before a red torii gate at a summer night festival, giant chrysanthemum fireworks bursting overhead, warm paper lantern glow on her face, low angle heroic composition, romantic matsuri atmosphere, cinematic lighting, radiant golden light'},
  {id:'fwu2',r:'UR',rot:true,theme:'fw',t:'月华祭主',n:'琉夏',g:'🌙',ele:'星',fac:'月见庭',
   d:'传闻月华祭主一现，星属性的灵气便先一步报到。',line:'「烟花会散，但今晚我记住了。」',
   arch:'据说月华祭主曾在神乐庭闭关三年，出关那晚只说了一句「该开祭了」，从此夏夜多了一段传说。',
   p:'anime girl as the moonlit festival hostess in a crimson yukata with goldfish pattern and a wide obi, hair in a side ponytail with a peony kanzashi, releasing a glowing paper sky lantern with both hands, takoyaki and candy apple stalls behind her, fireworks mirrored in wet stone pavement, warm festival backlight, romantic matsuri atmosphere, cinematic lighting, warm rose pink glow'},
  {id:'fwu3',r:'UR',rot:true,theme:'fw',t:'流萤神乐',n:'萤禾',g:'🏮',ele:'光',fac:'神乐庭',
   d:'灯火与烟花之间，她只忠于流萤神乐的名字。',line:'「祭典还长，先把手给我。」',
   arch:'传说中流萤神乐曾以一己之力点亮整片夜空；后来她收起神格，只为等一个愿意抬头的人。',
   p:'anime girl performing a kagura dance with a suzu bell wand, pale pink yukata with peony pattern and long trailing sleeves, hair in a traditional updo with silver ornaments, tiny fireflies and small fireworks drifting around her, wooden shrine stage with paper lanterns, blue violet night, mystical ritual atmosphere, cinematic lighting, deep violet shadows'},
  {id:'fwu4',r:'UR',rot:true,theme:'fw',t:'星霄焰姬',n:'霄绫',g:'🎇',ele:'心',fac:'星河庭',
   d:'夏夜的夜空里，星霄焰姬是最不肯熄灭的那一簇。',line:'「月色这么好，别急着走。」',
   arch:'在星河庭的记载里，星霄焰姬是唯一会为凡人放一整夜烟花的神。',
   p:'anime girl as the starry flame princess in a pearl white yukata with star sequin pattern and a pale gold obi, hair up with a moonlight hairpin, standing on a shrine rooftop as enormous fireworks bloom across the sky, halo of radiant light around her, elegant full body composition, majestic summer night atmosphere, cinematic lighting, clockwork blue light'},
  {id:'fws21',r:'SSR',rot:true,theme:'fw',t:'夏夜提灯',n:'小满',g:'🪭',ele:'风',fac:'宵宫庭',
   d:'她以夏夜提灯为名，替风属性的信徒守住最后一盏灯。',line:'「抬头看，这一发是为你放的。」',
   arch:'宵宫庭的旧册里记着夏夜提灯的名字：她替人间放完了整场烟花，却从不肯留影。',
   p:'anime girl carrying a red paper lantern through a narrow lantern street, light amber yukata with cloud pattern, long hair with a maple leaf kanzashi, countless hanging paper lanterns overhead, festival crowd softly blurred behind, fireworks visible at the end of the alley, warm nostalgic mood, cinematic lighting, swirling emerald currents'},
  {id:'fws22',r:'SSR',rot:true,theme:'fw',t:'祭典太鼓',n:'灯里',g:'🎏',ele:'雷',fac:'夏祭庭',
   d:'她自祭典太鼓而来，雷光缠身，衣袂带风。',line:'「烟花会散，但今晚我记住了。」',
   arch:'据说祭典太鼓曾在神乐庭闭关三年，出关那晚只说了一句「该开祭了」，从此夏夜多了一段传说。',
   p:'anime girl drumming on a matsuri taiko drum, vivid orange yukata with flame pattern and a red hachimaki headband, short hair with a drumstick tucked behind her ear, arms raised mid-beat, taiko stage with strung lanterns and sparks flying, fireworks bursting behind the stage, dynamic energetic pose, cinematic lighting, blazing crimson flames'},
  {id:'fws23',r:'SSR',rot:true,theme:'fw',t:'神乐铃舞',n:'铃歌',g:'🎐',ele:'水',fac:'神乐庭',
   d:'传闻神乐铃舞一现，水属性的灵气便先一步报到。',line:'「祭典还长，先把手给我。」',
   arch:'传说中神乐铃舞曾以一己之力点亮整片夜空；后来她收起神格，只为等一个愿意抬头的人。',
   p:'anime girl dancing with an uchiwa round fan and suzu bells on a wooden festival stage, aqua yukata with water ripple pattern and a flower kanzashi, twin tails with blue ribbons, layered sleeves catching the light, festival stalls and lantern strings around her, fireworks above, graceful dynamic motion, cinematic lighting, crackling electric arcs'},
  {id:'fws24',r:'SSR',rot:true,theme:'fw',t:'宵宫花簪',n:'绪宵',g:'🍡',ele:'木',fac:'宵宫庭',
   d:'灯火与烟花之间，她只忠于宵宫花簪的名字。',line:'「月色这么好，别急着走。」',
   arch:'在宵宫庭的记载里，宵宫花簪是唯一会为凡人放一整夜烟花的神。',
   p:'anime girl admiring the flower hair ornaments at a festival stall, pink yukata with morning glory pattern, hair styled up with a fresh flower kanzashi, holding a small mirror, stall shelves of colorful kanzashi and paper flowers, warm lantern glow, gentle happy expression, cinematic lighting, flowing aqua ribbons'},
  {id:'fws25',r:'SSR',rot:true,theme:'fw',t:'银河素描',n:'星河',g:'🌌',ele:'时',fac:'星河庭',
   d:'夏夜的夜空里，银河素描是最不肯熄灭的那一簇。',line:'「抬头看，这一发是为你放的。」',
   arch:'星河庭的旧册里记着银河素描的名字：她替人间放完了整场烟花，却从不肯留影。',
   p:'anime girl on a shrine rooftop holding a rolled star chart and a small brass telescope, navy yukata with constellation pattern, long wavy hair with a star hairpin, city rooftops and the festival below, enormous fireworks filling the upper sky, deep blue galaxy-like night, dreamy contemplative mood, cinematic lighting, starfield bokeh'},
  {id:'fws26',r:'SSR',rot:true,theme:'fw',t:'焰火守望',n:'守夏',g:'🔥',ele:'暗',fac:'月见庭',
   d:'她以焰火守望为名，替暗属性的信徒守住最后一盏灯。',line:'「烟花会散，但今晚我记住了。」',
   arch:'据说焰火守望曾在神乐庭闭关三年，出关那晚只说了一句「该开祭了」，从此夏夜多了一段传说。',
   p:'anime girl leaning on a wooden bridge railing watching the fireworks finale, black and gold yukata with dragonfly pattern, short bob hair with a lacquered hairpin, thousands of fireworks filling the sky, lantern reflections trembling on the river below, wide cinematic composition, quiet emotional expression, cinematic lighting, icy crystalline mist'},
  {id:'fws27',r:'SSR',rot:true,theme:'fw',t:'月见团子',n:'露见',g:'👘',ele:'霜',fac:'月见庭',
   d:'她自月见团子而来，霜光缠身，衣袂带风。',line:'「祭典还长，先把手给我。」',
   arch:'传说中月见团子曾以一己之力点亮整片夜空；后来她收起神格，只为等一个愿意抬头的人。',
   p:'anime girl eating mitarashi dango from a skewer at a night festival food stall, light blue yukata with rabbit pattern, hair in a bun with a rabbit hairpin, plates of dango and a cup of tea on the wooden counter, warm stall lamp light, cozy relaxed smile, close-up composition, cinematic lighting, lush emerald foliage'},
  {id:'fws28',r:'SSR',rot:true,theme:'fw',t:'星屑浴衣',n:'织星',g:'✨',ele:'月',fac:'星河庭',
   d:'传闻星屑浴衣一现，月属性的灵气便先一步报到。',line:'「月色这么好，别急着走。」',
   arch:'在星河庭的记载里，星屑浴衣是唯一会为凡人放一整夜烟花的神。',
   p:'anime girl walking with a handheld firework fountain in a pale lavender yukata dusted with tiny star sparkles, short hair with star pins, sparkles drifting around her like stardust, quiet side alley with a few paper lanterns, the fireworks above reflected in her eyes, luminous ethereal mood, cinematic lighting, aurora ribbons of prismatic light'},
  {id:'seau1',r:'UR',rot:true,theme:'sea',t:'深海歌姬',n:'洛瑟',g:'🐚',ele:'水',fac:'潮汐庭',
   d:'她自深海歌姬而来，水光缠身，衣袂带风。',line:'「听着，这片海记得所有来过的人。」',
   arch:'潮汐庭的旧谱里记着深海歌姬的名字：她替沉船里的人唱完最后一支歌，却从不肯留名。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, radiant golden light'},
  {id:'seau2',r:'UR',rot:true,theme:'sea',t:'珊瑚女王',n:'珊瑚',g:'🪸',ele:'海',fac:'珊宫庭',
   d:'深海的回响仍绕着她，海属性的歌从不打盹。',line:'「别怕沉下去，我会托着你。」',
   arch:'据说珊瑚女王曾在渊歌庭沉睡百年，醒来那日海水涨到了城墙下，从此人间多了一段传说。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, warm rose pink glow'},
  {id:'seau3',r:'UR',rot:true,theme:'sea',t:'鲛歌祭司',n:'蓝汐',g:'🐋',ele:'月',fac:'渊歌庭',
   d:'她以鲛歌祭司为誓，替月属性的信徒守住最后一道暗流。',line:'「泡沫会散，但歌声会留下。」',
   arch:'传说中鲛歌祭司曾以一己之力平息整片风暴；后来她收起歌喉，只为等一个愿意聆听的人。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, deep violet shadows'},
  {id:'seau4',r:'UR',rot:true,theme:'sea',t:'珍珠守望',n:'珠澜',g:'🫧',ele:'灵',fac:'珠贝庭',
   d:'每一次她开口，都像珍珠守望降临在海沟深处。',line:'「涨潮了，我们该回去啦。」',
   arch:'在珠贝庭的记载里，珍珠守望是唯一会为凡人唱一整夜的歌者。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, clockwork blue light'},
  {id:'seas21',r:'SSR',rot:true,theme:'sea',t:'浅滩吟唱',n:'汐音',g:'🌊',ele:'风',fac:'潮汐庭',
   d:'她的浅滩吟唱之名，是风属性里最不肯沉寂的那一缕。',line:'「听着，这片海记得所有来过的人。」',
   arch:'潮汐庭的旧谱里记着浅滩吟唱的名字：她替沉船里的人唱完最后一支歌，却从不肯留名。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, swirling emerald currents'},
  {id:'seas22',r:'SSR',rot:true,theme:'sea',t:'海藻织者',n:'藻宁',g:'🐠',ele:'木',fac:'珊宫庭',
   d:'她自海藻织者而来，木光缠身，衣袂带风。',line:'「别怕沉下去，我会托着你。」',
   arch:'据说海藻织者曾在渊歌庭沉睡百年，醒来那日海水涨到了城墙下，从此人间多了一段传说。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, blazing crimson flames'},
  {id:'seas23',r:'SSR',rot:true,theme:'sea',t:'泡沫之诗',n:'沫语',g:'💧',ele:'霜',fac:'渊歌庭',
   d:'深海的回响仍绕着她，霜属性的歌从不打盹。',line:'「泡沫会散，但歌声会留下。」',
   arch:'传说中泡沫之诗曾以一己之力平息整片风暴；后来她收起歌喉，只为等一个愿意聆听的人。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, crackling electric arcs'},
  {id:'seas24',r:'SSR',rot:true,theme:'sea',t:'灯塔守望',n:'塔澜',g:'🗼',ele:'光',fac:'珠贝庭',
   d:'她以灯塔守望为誓，替光属性的信徒守住最后一道暗流。',line:'「涨潮了，我们该回去啦。」',
   arch:'在珠贝庭的记载里，灯塔守望是唯一会为凡人唱一整夜的歌者。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, flowing aqua ribbons'},
  {id:'seas25',r:'SSR',rot:true,theme:'sea',t:'深渊低语',n:'渊歌',g:'🌑',ele:'暗',fac:'渊歌庭',
   d:'每一次她开口，都像深渊低语降临在海沟深处。',line:'「听着，这片海记得所有来过的人。」',
   arch:'渊歌庭的旧谱里记着深渊低语的名字：她替沉船里的人唱完最后一支歌，却从不肯留名。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, starfield bokeh'},
  {id:'seas26',r:'SSR',rot:true,theme:'sea',t:'鲸落使者',n:'鲸禾',g:'🐳',ele:'数',fac:'潮汐庭',
   d:'她的鲸落使者之名，是数属性里最不肯沉寂的那一缕。',line:'「别怕沉下去，我会托着你。」',
   arch:'据说鲸落使者曾在渊歌庭沉睡百年，醒来那日海水涨到了城墙下，从此人间多了一段传说。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, icy crystalline mist'},
  {id:'seas27',r:'SSR',rot:true,theme:'sea',t:'银鳞舞者',n:'鳞歌',g:'✨',ele:'星',fac:'珊宫庭',
   d:'她自银鳞舞者而来，星光缠身，衣袂带风。',line:'「泡沫会散，但歌声会留下。」',
   arch:'传说中银鳞舞者曾以一己之力平息整片风暴；后来她收起歌喉，只为等一个愿意聆听的人。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, lush emerald foliage'},
  {id:'seas28',r:'SSR',rot:true,theme:'sea',t:'海月琴师',n:'琴汐',g:'🎐',ele:'时',fac:'珠贝庭',
   d:'深海的回响仍绕着她，时属性的歌从不打盹。',line:'「涨潮了，我们该回去啦。」',
   arch:'在珠贝庭的记载里，海月琴师是唯一会为凡人唱一整夜的歌者。',
   p:'mermaid songstress anime girl underwater, long flowing iridescent hair, pearl and shell ornaments, elegant siren dress, coral reef and sunken palace background, deep ocean god rays, bioluminescent bubbles, soft cel shading, cinematic underwater lighting, aurora ribbons of prismatic light'},
  {id:'wdu1',r:'UR',rot:true,theme:'wd',t:'仙境女王',n:'爱梦',g:'👑',ele:'心',fac:'梦蝶庭',
   d:'她从仙境女王的传说里走出来，心之力在掌心铺成星河。',line:'「跟着白兔走，别回头。」',
   arch:'梦蝶庭的旧绘本里记着仙境女王的名字：她陪梦里的人走完全程，却从不肯先说再见。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, radiant golden light'},
  {id:'wdu2',r:'UR',rot:true,theme:'wd',t:'扑克魔术',n:'桃乐',g:'🃏',ele:'数',fac:'纸牌庭',
   d:'梦境的门开着，扑克魔术的数之名从不停歇。',line:'「梦会醒，但故事会留下。」',
   arch:'据说扑克魔术曾在钟楼庭睡了一整个午觉，醒来时满城都在下糖果雨，从此人间多了一段传说。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, warm rose pink glow'},
  {id:'wdu3',r:'UR',rot:true,theme:'wd',t:'疯帽茶会',n:'奇朵',g:'🫖',ele:'慧',fac:'茶会庭',
   d:'她以疯帽茶会为誓，替慧属性的旅人守住最后一扇门。',line:'「喝下这杯茶，就当你答应了。」',
   arch:'传说中疯帽茶会曾以一己之力把整场噩梦改成童话；后来她收起魔法，只为等一个愿意做梦的人。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, deep violet shadows'},
  {id:'wdu4',r:'UR',rot:true,theme:'wd',t:'白兔向导',n:'路遥',g:'🐇',ele:'时',fac:'梦蝶庭',
   d:'每一次现身，都像白兔向导降临在午后的梦里。',line:'「这里是仙境，迟到也没关系。」',
   arch:'在梦蝶庭的记载里，白兔向导是唯一会为凡人翻完整本童话的人。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, clockwork blue light'},
  {id:'wds21',r:'SSR',rot:true,theme:'wd',t:'蘑菇守夜',n:'茵茵',g:'🍄',ele:'木',fac:'茶会庭',
   d:'童话翻到这一页，蘑菇守夜的木色还亮着。',line:'「跟着白兔走，别回头。」',
   arch:'茶会庭的旧绘本里记着蘑菇守夜的名字：她陪梦里的人走完全程，却从不肯先说再见。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, swirling emerald currents'},
  {id:'wds22',r:'SSR',rot:true,theme:'wd',t:'扑克卫兵',n:'红心',g:'♠️',ele:'雷',fac:'纸牌庭',
   d:'她从扑克卫兵的传说里走出来，雷之力在掌心铺成星河。',line:'「梦会醒，但故事会留下。」',
   arch:'据说扑克卫兵曾在钟楼庭睡了一整个午觉，醒来时满城都在下糖果雨，从此人间多了一段传说。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, blazing crimson flames'},
  {id:'wds23',r:'SSR',rot:true,theme:'wd',t:'花语低回',n:'薇语',g:'🌸',ele:'风',fac:'花园庭',
   d:'梦境的门开着，花语低回的风之名从不停歇。',line:'「喝下这杯茶，就当你答应了。」',
   arch:'传说中花语低回曾以一己之力把整场噩梦改成童话；后来她收起魔法，只为等一个愿意做梦的人。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, crackling electric arcs'},
  {id:'wds24',r:'SSR',rot:true,theme:'wd',t:'怀表信使',n:'嘀嗒',g:'⏰',ele:'光',fac:'钟楼庭',
   d:'她以怀表信使为誓，替光属性的旅人守住最后一扇门。',line:'「这里是仙境，迟到也没关系。」',
   arch:'在钟楼庭的记载里，怀表信使是唯一会为凡人翻完整本童话的人。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, flowing aqua ribbons'},
  {id:'wds25',r:'SSR',rot:true,theme:'wd',t:'镜中旅人',n:'镜遥',g:'🪞',ele:'暗',fac:'镜梦庭',
   d:'每一次现身，都像镜中旅人降临在午后的梦里。',line:'「跟着白兔走，别回头。」',
   arch:'镜梦庭的旧绘本里记着镜中旅人的名字：她陪梦里的人走完全程，却从不肯先说再见。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, starfield bokeh'},
  {id:'wds26',r:'SSR',rot:true,theme:'wd',t:'星梦织者',n:'梦织',g:'🌙',ele:'星',fac:'梦蝶庭',
   d:'童话翻到这一页，星梦织者的星色还亮着。',line:'「梦会醒，但故事会留下。」',
   arch:'据说星梦织者曾在钟楼庭睡了一整个午觉，醒来时满城都在下糖果雨，从此人间多了一段传说。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, icy crystalline mist'},
  {id:'wds27',r:'SSR',rot:true,theme:'wd',t:'糖果小屋',n:'糖糖',g:'🍬',ele:'霜',fac:'花园庭',
   d:'她从糖果小屋的传说里走出来，霜之力在掌心铺成星河。',line:'「喝下这杯茶，就当你答应了。」',
   arch:'传说中糖果小屋曾以一己之力把整场噩梦改成童话；后来她收起魔法，只为等一个愿意做梦的人。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, lush emerald foliage'},
  {id:'wds28',r:'SSR',rot:true,theme:'wd',t:'猫猫谜语',n:'谜喵',g:'🐱',ele:'灵',fac:'镜梦庭',
   d:'梦境的门开着，猫猫谜语的灵之名从不停歇。',line:'「这里是仙境，迟到也没关系。」',
   arch:'在镜梦庭的记载里，猫猫谜语是唯一会为凡人翻完整本童话的人。',
   p:'dreamy fairytale anime girl in wonderland, whimsical frilled dress with ribbons, floating teacups and playing cards, giant mushrooms and talking flowers, pastel dreamscape background, soft magical glow, surreal storybook atmosphere, soft cel shading, cinematic lighting, aurora ribbons of prismatic light'},

  /* ==== 第二批限定主题：反重力学园 / 图书馆之城 / 铁与蔷薇 / 古典乐坛 / 学园契约 / 月相殿堂 ====
     每主题 2 UR（限定核心）+ 4 SSR（配套），与旧主题同一套卡池机制，无需改动抽卡逻辑。 */
  /* —— 反重力学园（ag）：浮空、零重力、悬浮学园 —— */
  {id:'agu1',r:'UR',rot:true,theme:'ag',t:'逆空学园长',n:'浮鸢',g:'🎈',ele:'风',fac:'逆空庭',
   d:'逆空学园里，浮鸢把整座学园托在掌心，让每个孩子都学会轻盈地生活。',line:'「别怕坠落——在这里，天空才是地板。」',
   arch:'逆空学园的记载里，她是第一个把重力折叠成风的人。',
   p:'anime girl headmistress floating in zero gravity above a floating academy, white and blue school uniform with a cape, long silver hair drifting upward, anti-gravity rings and glowing runes, sky islands and clouds below, soft cel shading, cinematic soft light'},
  {id:'agu2',r:'UR',rot:true,theme:'ag',t:'零重奏者',n:'轻澜',g:'🪁',ele:'时',fac:'零重庭',
   d:'轻澜的转速让时间也失重，她奏响的每一拍都落在没有重量的空气里。',line:'「我把重力调成静音，你听。」',
   arch:'逆空学园里，她是把整段时光漂浮起来的乐者。',
   p:'anime girl conductor of weightlessness, floating piano keys and music notes around her, pastel blue and white dress, weightless levitation, anti-gravity particles, dreamy sky background, anime cel shading'},
  {id:'ags1',r:'SSR',rot:true,theme:'ag',t:'浮空班长',n:'云栖',g:'☁️',ele:'木',fac:'浮空庭',
   d:'云栖把课本摊在云上，风一页页替她翻。',line:'「作业会飘走的，抓紧点哦。」',
   arch:'浮空班的点名册从不落地。',
   p:'anime girl student standing on a floating cloud platform, holding books, school uniform, anti-gravity academy background, soft pastel sky, anime cel shading'},
  {id:'ags2',r:'SSR',rot:true,theme:'ag',t:'磁轨骑士',n:'磁岚',g:'🧭',ele:'雷',fac:'悬星庭',
   d:'磁岚踩着磁轨掠过天际，把迷路的光送回课堂。',line:'「轨道会带我回家。」',
   arch:'悬星庭的守卫，从不因失重而跌倒。',
   p:'anime girl knight riding a magnetic rail surfboard flying through the sky, science-fantasy academy, blue lightning trails, uniform with armor accents, anime cel shading'},
  {id:'ags3',r:'SSR',rot:true,theme:'ag',t:'陨石学会',n:'陨栀',g:'☄️',ele:'炎',fac:'悬星庭',
   d:'陨栀收集陨石落下的余温，把它们酿成会发光的小灯。',line:'「每一块擦伤我的石头，都会发光。」',
   arch:'她让坠落的碎片学会了上升。',
   p:'anime girl in astronomy club, floating meteor fragments around, warm glow, campus rooftop at dusk, school uniform, anime cel shading'},
  {id:'ags4',r:'SSR',rot:true,theme:'ag',t:'失重舞者',n:'飘雪',g:'🩰',ele:'水',fac:'逆空庭',
   d:'飘雪在没有重量的排练厅起舞，裙摆像雪一样停在半空。',line:'「重力关掉了，舞步还开着。」',
   arch:'逆空庭的舞者，用失重代替节拍。',
   p:'anime girl ballet dancer floating mid-air in a weightless rehearsal hall, snow-like particles suspended, white tutu, anti-gravity academy, soft glow, anime cel shading'},

  /* —— 图书馆之城（lc）：书塔、墨海、玻璃穹顶 —— */
  {id:'lcu1',r:'UR',rot:true,theme:'lc',t:'禁书魔导士',n:'墨鸢',g:'📕',ele:'暗',fac:'禁书庭',
   d:'墨鸢在图书馆之城的最深处看守禁书，翻一页，就有一座书架在夜色中睁开眼。',line:'「有些故事读下去，你就回不了头了。」',
   arch:'她记得每一本被遗忘的书的名字。',
   p:'anime girl witch mage in a forbidden library, dark robes with gold trim, purple magic circles, towering bookshelves, floating books, candlelight, anime cel shading, cinematic magic glow'},
  {id:'lcu2',r:'UR',rot:true,theme:'lc',t:'图书管理员',n:'静书',g:'🔖',ele:'心',fac:'书塔庭',
   d:'静书把整座城的喧嚣归档，只留一页安静给你。',line:'「借书要还，人和时间都是。」',
   arch:'图书馆之城的每一道回声，都被她编上了目录。',
   p:'anime girl librarian in an elegant glass-domed library city, warm wooden shelves, holding a book, gentle smile, soft afternoon light, anime cel shading'},
  {id:'lcs1',r:'SSR',rot:true,theme:'lc',t:'墨海书灵',n:'墨汐',g:'🖋️',ele:'水',fac:'墨海庭',
   d:'墨汐从字里游出来，替忘记的人写下想说的话。',line:'「你写不完的，我替你写。」',
   arch:'墨海庭的信使，往来于每一页之间。',
   p:'anime girl spirit born of ink swimming through a sea of calligraphy, floating characters, blue-black palette, library city, anime cel shading'},
  {id:'lcs2',r:'SSR',rot:true,theme:'lc',t:'穹顶守望',n:'穹梧',g:'🏛️',ele:'光',fac:'穹顶庭',
   d:'穹梧守在城市最高的玻璃穹顶下，把每一缕光折给需要的人。',line:'「光也要分给晚来的人。」',
   arch:'穹顶庭的记录者，从不让一盏灯无故熄灭。',
   p:'anime girl guarding a glass dome ceiling of a library city, rays of light, white cape uniform, monumental architecture, anime cel shading'},
  {id:'lcs3',r:'SSR',rot:true,theme:'lc',t:'书签少女',n:'签禾',g:'🔖',ele:'木',fac:'书塔庭',
   d:'签禾总在别人读不下去的地方停下，替他记住那一行。',line:'「你先休息，这里我记着。」',
   arch:'书塔庭里，她夹在最重要的一页之间。',
   p:'anime girl as a living bookmark among tall bookshelves, green and cream outfit, cozy library, warm lamp light, anime cel shading'},
  {id:'lcs4',r:'SSR',rot:true,theme:'lc',t:'夜读提灯',n:'灯霓',g:'🕯️',ele:'星',fac:'穹顶庭',
   d:'灯霓提着灯在城里的夜色中巡书，谁没睡，她就陪谁读到天亮。',line:'「睡不着吗？我这儿还有一盏灯。」',
   arch:'图书馆之城的夜，从不真正黑过。',
   p:'anime girl carrying a lantern through a night library city, warm candle glow, long dark hair, cozy cloak, moonlight through windows, anime cel shading'},

  /* —— 铁与蔷薇（ir）：齿轮、蒸汽、钢之歌剧 —— */
  {id:'iru1',r:'UR',rot:true,theme:'ir',t:'机械舞者',n:'钢弦',g:'⚙️',ele:'雷',fac:'齿轮庭',
   d:'钢弦的关节里藏着整座歌剧院的心跳，她一转身，齿轮就开始伴奏。',line:'「我的每一次转动，都是为你跳的。」',
   arch:'铁与蔷薇里，她是唯一会为观众流泪的机械。',
   p:'anime girl mechanical dancer with steampunk clockwork joints, rose ornaments, grand opera stage, gears and glowing steam, Victorian retro-futurism, anime cel shading'},
  {id:'iru2',r:'UR',rot:true,theme:'ir',t:'钢铁歌剧院',n:'铁歌',g:'🎭',ele:'炎',fac:'钢歌庭',
   d:'铁歌把整座剧院扛在肩上，让每一个音符都有金属的回响。',line:'「掌声会锈，歌声不会。」',
   arch:'钢歌庭的继承人，用钢铁唱出了最柔软的一段咏叹调。',
   p:'anime girl opera diva in a grand iron opera house, red and steel costume, stage lights, mechanical decorations, roses, dramatic lighting, anime cel shading'},
  {id:'irs1',r:'SSR',rot:true,theme:'ir',t:'蔷薇齿轮',n:'薇轮',g:'🌹',ele:'木',fac:'齿轮庭',
   d:'薇轮把蔷薇种进齿轮的缝里，让每一台机器都开出花。',line:'「机器也会开花，你要耐心等。」',
   arch:'齿轮庭的花匠，用油污养玫瑰。',
   p:'anime girl mechanic with light oil stains, roses growing from machinery, steampunk workshop, warm orange light, anime cel shading'},
  {id:'irs2',r:'SSR',rot:true,theme:'ir',t:'蒸汽琴师',n:'燥琴',g:'🎹',ele:'炎',fac:'蒸汽庭',
   d:'燥琴用蒸汽推动琴键，演奏连锅炉都不愿冷却的曲子。',line:'「再热一点，节奏就对了。」',
   arch:'蒸汽庭的乐师，让沸腾成为乐章。',
   p:'anime girl pianist powered by steam pipes, industrial concert hall, brass instruments, warm steam glow, steampunk, anime cel shading'},
  {id:'irs3',r:'SSR',rot:true,theme:'ir',t:'锈红骑士',n:'锈红',g:'🛡️',ele:'霜',fac:'锈红庭',
   d:'锈红披着斑驳的铠甲，替这座城市挡住所有噪音。',line:'「我锈得住，你的梦锈不住。」',
   arch:'锈红庭的守夜人，铠甲下有一颗还很新的心。',
   p:'anime girl knight in rust-red steampunk armor, industrial city, gears and rivets, dusk light, anime cel shading'},
  {id:'irs4',r:'SSR',rot:true,theme:'ir',t:'机关花匠',n:'机关',g:'🔧',ele:'慧',fac:'钢歌庭',
   d:'机关把每一株花都装上了发条，让它们按时开放、按时悲伤。',line:'「给花上发条，它就会记得准时。」',
   arch:'钢歌庭的发条师，也是这座城最温柔的人。',
   p:'anime girl clockwork florist with mechanical flowers and wind-up keys, steampunk greenhouse, warm brass tones, anime cel shading'},

  /* —— 古典乐坛（cl）：夜曲、交响、音乐厅 —— */
  {id:'clu1',r:'UR',rot:true,theme:'cl',t:'夜曲小提琴',n:'弦夜',g:'🎻',ele:'心',fac:'夜曲庭',
   d:'弦夜拉响夜曲时，整座乐坛的月光都会慢下来。',line:'「别急，让最后一个音符自己走完。」',
   arch:'古典乐坛里，她是把心事写成旋律的人。',
   p:'anime girl violinist in an elegant concert hall at night, flowing gown, moonlight through stained glass, dramatic soft light, anime cel shading'},
  {id:'clu2',r:'UR',rot:true,theme:'cl',t:'交响指挥家',n:'挥华',g:'🎼',ele:'时',fac:'交响庭',
   d:'挥华一举起指挥棒，时间便按她的节拍前进。',line:'「跟着我的拍子，世界就不会乱。」',
   arch:'交响庭的首席，让每一个音都找到了自己的位置。',
   p:'anime girl conductor with baton in a grand orchestra hall, elegant black tailcoat dress, golden lights, orchestra silhouettes behind, expressive pose, anime cel shading'},
  {id:'cls1',r:'SSR',rot:true,theme:'cl',t:'咏叹女高音',n:'咏歌',g:'🎤',ele:'光',fac:'咏叹庭',
   d:'咏歌的咏叹调能穿过墙，也能穿过人的心事。',line:'「这首歌，只唱给愿意听的人。」',
   arch:'咏叹庭的高音，是古典乐坛的日出。',
   p:'anime girl soprano singer on a classical stage, elegant gown, spotlight, opera hall, emotional, anime cel shading'},
  {id:'cls2',r:'SSR',rot:true,theme:'cl',t:'圆舞首席',n:'圆舞',g:'💃',ele:'风',fac:'协奏庭',
   d:'圆舞在三拍里转，把整个乐坛的旋转木马都带动起来。',line:'「再转一圈，就轮到你了。」',
   arch:'协奏庭的舞者，用裙摆画出节拍线。',
   p:'anime girl waltz dancer in a ballroom hallway, classical music atmosphere, swishing dress, warm chandelier light, anime cel shading'},
  {id:'cls3',r:'SSR',rot:true,theme:'cl',t:'华彩钢琴',n:'华彩',g:'🎹',ele:'时',fac:'夜曲庭',
   d:'华彩的即兴段落里，藏着所有练习过却没说出的话。',line:'「这一段，是我留给自己的。」',
   arch:'夜曲庭的琴手，用华彩点缀别人听不懂的孤独。',
   p:'anime girl pianist at a grand piano, concert hall, dramatic key light, flowing hair, anime cel shading'},
  {id:'cls4',r:'SSR',rot:true,theme:'cl',t:'协奏首席',n:'协音',g:'🎶',ele:'心',fac:'协奏庭',
   d:'协音总在别人犹豫时先起一个音，让整支乐队跟上。',line:'「第一声，我先来。」',
   arch:'协奏庭的首席，是乐坛里最可靠的音。',
   p:'anime girl first violinist of a classical orchestra, elegant dress, warm stage light, violin bow raised, anime cel shading'},

  /* —— 学园契约（ap）：制服、钟楼、落地的约定 —— */
  {id:'apu1',r:'UR',rot:true,theme:'ap',t:'学园契约者',n:'契约',g:'📜',ele:'光',fac:'契约庭',
   d:'契约站在学院图书馆的落地窗前，把每一句承诺都写进契约里。',line:'「签下名字的那一刻，你就不再是一个人。」',
   arch:'学园契约的见证者，记得每一份被认真对待的约定。',
   p:'anime girl in an elegant school uniform standing by a tall library window, afternoon sunlight, campus, holding a scroll contract, soft cel shading, cinematic light'},
  {id:'apu2',r:'UR',rot:true,theme:'ap',t:'钟楼守誓',n:'钟誓',g:'🕰️',ele:'时',fac:'钟楼庭',
   d:'钟誓守在学院钟楼上，每一次钟声都是在替谁守住承诺。',line:'「钟声数到第七下，你许下的愿望就作数了。」',
   arch:'钟楼庭的守护者，让誓言有了具体的时刻。',
   p:'anime girl student on top of a school clock tower, school uniform, twilight sky, holding a pocket watch, campus below, anime cel shading'},
  {id:'aps1',r:'SSR',rot:true,theme:'ap',t:'白樱风纪',n:'风纪',g:'🌸',ele:'木',fac:'白樱庭',
   d:'风纪把散落的樱花一片片请回树上，就像把走神的人叫回课堂。',line:'「上课铃响之前，都还来得及。」',
   arch:'白樱庭的风纪委员，用温柔维持秩序。',
   p:'anime girl discipline committee member under blooming cherry trees, school uniform with armband, spring campus, pink petals, anime cel shading'},
  {id:'aps2',r:'SSR',rot:true,theme:'ap',t:'午后学妹',n:'午后',g:'🧋',ele:'木',fac:'学园庭',
   d:'午后总带着两杯奶茶，一杯给刚下课的谁。',line:'「这一杯，是给你留的。」',
   arch:'学园庭里，她把午后的阳光分成两半。',
   p:'anime school girl with two bubble tea cups in a sunny school courtyard, uniform, cheerful, warm afternoon light, anime cel shading'},
  {id:'aps3',r:'SSR',rot:true,theme:'ap',t:'社团部长',n:'社团',g:'📣',ele:'风',fac:'契约庭',
   d:'社团部长把每个迟来的成员都记在心里，而不是记在本子上。',line:'「迟到没事，别忘了来。」',
   arch:'契约庭的部长，用热情撑起一群人的归处。',
   p:'anime girl student club president in a clubroom, school uniform, banners and posters, afternoon light, energetic, anime cel shading'},
  {id:'aps4',r:'SSR',rot:true,theme:'ap',t:'校服首席',n:'校服',g:'🎒',ele:'心',fac:'钟楼庭',
   d:'校服首席把校徽擦得发亮，因为那上面写着她和这座学园的约定。',line:'「只要还穿着它，我就还是这里的学生。」',
   arch:'钟楼庭的优等生，是这座学园最标准的答案。',
   p:'anime girl model student in a neat school uniform in front of a school building, confident pose, soft daylight, anime cel shading'},

  /* —— 月相殿堂（mt）：月相、银月、神殿 —— */
  {id:'mtu1',r:'UR',rot:true,theme:'mt',t:'白狼月骑士',n:'白狼',g:'🐺',ele:'霜',fac:'白狼庭',
   d:'白狼在满月下披上银甲，守着一整座月相殿堂的静谧。',line:'「月光到不了的地方，我替它去。」',
   arch:'白狼庭的骑士，认得每一道月光的重量。',
   p:'anime girl knight in silver armor with white wolf motifs, full moon temple background, long white hair, moonlight, cold elegant atmosphere, anime cel shading, cinematic lighting'},
  {id:'mtu2',r:'UR',rot:true,theme:'mt',t:'月之祭司',n:'月祭',g:'🌙',ele:'月',fac:'月相庭',
   d:'月祭在祭坛前读月相，把每一种残缺都读成祝福。',line:'「月会缺，但它从不缺席。」',
   arch:'月相庭的祭司，把月亮的每一个名字都记了下来。',
   p:'anime girl moon priestess in a moon-phase temple, silver ceremonial robes, crescent moon motifs, altar with glowing moonlight, ethereal atmosphere, anime cel shading'},
  {id:'mts1',r:'SSR',rot:true,theme:'mt',t:'满月舞姬',n:'满月',g:'🌕',ele:'光',fac:'银辉庭',
   d:'满月只有在月亮最圆的那晚起舞，把整片银辉都收进裙摆。',line:'「最亮的时候，我等你来。」',
   arch:'银辉庭的舞姬，一年只跳最圆的那一夜。',
   p:'anime girl dancing under a full moon in a silver temple hall, flowing white dress, luminous glow, elegant, anime cel shading'},
  {id:'mts2',r:'SSR',rot:true,theme:'mt',t:'新月咏者',n:'新月',g:'🌑',ele:'暗',fac:'月相庭',
   d:'新月的歌声藏在最黑的那晚，只有安静的人才听得见。',line:'「看不见的时候，才听得最清楚。」',
   arch:'月相庭的咏者，为最暗的月相歌唱。',
   p:'anime girl singing in a dark temple under a new moon, faint silver light, flowing robes, mysterious, anime cel shading'},
  {id:'mts3',r:'SSR',rot:true,theme:'mt',t:'月蚀骑士',n:'月蚀',g:'🌒',ele:'暗',fac:'月蚀庭',
   d:'月蚀在月亮被吞没的那晚巡逻，守着不会被记住的黑暗。',line:'「被遮住的光，也值得守。」',
   arch:'月蚀庭的骑士，只在最深的夜色里出现。',
   p:'anime girl knight during a lunar eclipse, dark silver armor, reddish eclipse glow, temple ruins, dramatic mood, anime cel shading'},
  {id:'mts4',r:'SSR',rot:true,theme:'mt',t:'银辉守望',n:'银辉',g:'✨',ele:'星',fac:'银辉庭',
   d:'银辉把散落的月光一粒粒拾起来，放回殿堂的水池里。',line:'「碎了的光，我也要捡回来。」',
   arch:'银辉庭的守望者，从不让月光流到地上。',
   p:'anime girl gathering silver moonlight in a moon temple fountain, glowing particles, serene, white and silver palette, anime cel shading'}
];
LIMITED_CARDS.forEach(c => CARDS.push(c));

/* 需求：季节限定角色一律为最高品质（UR）——该规则只对「四季主题的限定」有效（c.lim）；
   神话纪元 / 中国风韵 / 欧式宫廷 / 月下花火 / 深海歌姬 / 梦游仙境 的轮换限定（c.rot）不受此规则影响，UR 与 SSR 各自保留原本稀有度。 */
CARDS.forEach(c => { if(c.lim) c.r = 'UR'; });

const CARD_MAP = {};
CARDS.forEach(c => CARD_MAP[c.id] = c);

/* ---- 季节限定：按现实季节限时开放（?season=spring/summer/autumn/winter 可强制调试）---- */
const SEASONS = {spring:'春', summer:'夏', autumn:'秋', winter:'冬'};
const SEASON_RANGE = {spring:'3–5 月', summer:'6–8 月', autumn:'9–11 月', winter:'12–2 月'};
const DEBUG_SEASON = new URLSearchParams(location.search).get('season');
function curSeason(){
  if(DEBUG_SEASON && SEASONS[DEBUG_SEASON]) return DEBUG_SEASON;
  const m = new Date().getMonth() + 1;
  if(m >= 3 && m <= 5) return 'spring';
  if(m >= 6 && m <= 8) return 'summer';
  if(m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}
function seasonCards(s){ return CARDS.filter(c => c.lim === s); }
/* 自选 UP：只能挑「非当季」的限定星灵，最多 2 位，换季后自动失效 */
function syncUpSel(){
  const s = curSeason();
  S.upSel = (S.upSel || []).filter(id => {
    const c = CARD_MAP[id];
    return c && c.lim && c.lim !== s;
  }).slice(0, 2);
}
function limPool(){
  const s = curSeason();
  return {
    base: seasonCards(s),
    extra: (S.upSel || []).map(id => CARD_MAP[id]).filter(c => c && c.lim && c.lim !== s)
  };
}
/* ================= 轮转限定祈愿 =================
   每月一期：主题在「神话纪元 / 中国风韵 / 欧式宫廷 / 月下花火 / 深海歌姬 / 梦游仙境 / 反重力学园 / 图书馆之城 /
   铁与蔷薇 / 古典乐坛 / 学园契约 / 月相殿堂」之间轮换，每期取该主题当期的 UR 与 SSR
   （旧主题 4 UR + 8 SSR = 12 位；新主题 2 UR + 4 SSR = 6 位），出过的角色不再重复；该主题全部出过一遍后重新循环。
   玩家可自选：在该池的 3 个主题范围内自选 UR 最多 2 位、SSR 最多 4 位加入奖池，
   池①~④ 各自独立；自选长期保留、不受换期影响，命中权重更高。 */
/* 轮换限定分四池（各自每月轮换一个主题，保底独立计数、名单互不干扰）：
   池①「轮转限定」= 神话纪元 / 中国风韵 / 欧式宫廷；池②「轮换限定2」= 深海歌姬 / 月下花火 / 梦游仙境；
   池③「轮换限定3」= 反重力学园 / 图书馆之城 / 铁与蔷薇；池④「轮换限定4」= 古典乐坛 / 学园契约 / 月相殿堂。 */
const ROT_SETS = {
  rot:  {label:'轮转限定',  themes:['myth', 'cn', 'eu']},
  rot2: {label:'轮换限定2', themes:['fw', 'sea', 'wd']},
  rot3: {label:'轮换限定3', themes:['ag', 'lc', 'ir']},
  rot4: {label:'轮换限定4', themes:['cl', 'ap', 'mt']}
};
/* 全部十二主题（自选区页签 / 存档合法性校验用） */
const ROT_THEMES = ROT_SETS.rot.themes.concat(ROT_SETS.rot2.themes, ROT_SETS.rot3.themes, ROT_SETS.rot4.themes);
const ROT_LABEL = {myth:'神话纪元', cn:'中国风韵', eu:'欧式宫廷', fw:'月下花火', sea:'深海歌姬', wd:'梦游仙境',
  ag:'反重力学园', lc:'图书馆之城', ir:'铁与蔷薇', cl:'古典乐坛', ap:'学园契约', mt:'月相殿堂'};
/* 各主题的视觉元素关键词（用于卡池说明与立绘方向） */
const ROT_KEYWORDS = {
  myth:['神格','雷霆','冥河'], cn:['汉服','仙山','剑影'], eu:['宫廷','蔷薇','银月'],
  fw:['浴衣','烟花大会','夏日祭'], sea:['人鱼','珊瑚宫殿','鲸歌回响'], wd:['爱丽丝','柴郡猫','旋转木马'],
  ag:['浮空','零重力','悬浮学园'], lc:['书塔','墨香','玻璃穹顶'], ir:['齿轮','蒸汽','蔷薇'],
  cl:['小提琴','指挥棒','音乐厅'], ap:['制服','钟楼','学园契约'], mt:['月相','银月','神殿']
};
function isRotPool(p){ return p === 'rot' || p === 'rot2' || p === 'rot3' || p === 'rot4'; }
function rotSetLabel(poolId){ return (ROT_SETS[poolId] || ROT_SETS.rot).label; }
/* 每主题只有 4 UR + 8 SSR，故每期直接把该主题的当期名单取满 */
const ROT_PICK_UR = 4, ROT_PICK_SSR = 8, ROT_SEL_UR = 2, ROT_SEL_SSR = 4;
const ROT_NAME_A = {
  myth:['神谕','雷霆','苍穹','冥河','星辰','圣辉'],
  cn:['云梦','长安','洛水','青丘','九霄','昆仑'],
  eu:['银月','蔷薇','圣殿','王冠','龙脊','迷雾'],
  fw:['花火','月见','夏祭','宵宫','星屑','流萤'],
  sea:['深海','珊瑚','鲛歌','珍珠','潮汐','蓝鲸'],
  wd:['仙梦','幻境','白兔','茶会','扑克','星梦'],
  ag:['浮空','逆空','零重','悬星','青云','星轨'],
  lc:['书塔','墨海','穹顶','卷帙','青灯','静读'],
  ir:['齿轮','蔷薇','蒸汽','钢之','锈红','机关'],
  cl:['交响','夜曲','协奏','咏叹','圆舞','华彩'],
  ap:['学园','契约','白樱','钟楼','社团','校服'],
  mt:['月相','银辉','白狼','满月','新月','月蚀']
};
const ROT_NAME_B = ['神临','轮转','之约','回响','祈愿','纪行'];
let rotPickView = '';  // 自选区当前浏览的主题页签
function rotPeriodIndex(){ const d = new Date(); return d.getFullYear()*12 + d.getMonth(); }
function rotPeriodKey(){ const d = new Date(); return d.getFullYear() + '-' + pad2(d.getMonth()+1); }
function rotThemeOf(idx, poolId){
  const t = (ROT_SETS[poolId] || ROT_SETS.rot).themes;
  return t[((idx % t.length) + t.length) % t.length];
}
function rotAllOf(theme){ return LIMITED_CARDS.filter(c => c.theme === theme); }
function rotPoolName(theme, idx){
  const A = ROT_NAME_A[theme] || ROT_NAME_A.myth;
  const h = Math.abs(idx * 7919 + 13);
  return A[h % A.length] + ROT_NAME_B[Math.floor(h / A.length) % ROT_NAME_B.length];
}
function rotEnd(){
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
}
/* 节日特别期：命中窗口时，轮转池换上节日皮肤标签（名字 / 名单机制保持不变） */
const FESTIVALS = [
  {n:'元旦',   tag:'🎊 元旦特别期',   doy:1,   span:3},
  {n:'情人节', tag:'💗 情人节特别期', doy:45,  span:3},
  {n:'儿童节', tag:'🎈 儿童节特别期', doy:152, span:2},
  {n:'国庆',   tag:'🎉 国庆特别期',   doy:274, span:4},
  {n:'圣诞',   tag:'🎄 圣诞特别期',   doy:359, span:3}
];
function dayOfYear(){
  const d = new Date(), start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}
function festivalOf(){
  const dy = dayOfYear();
  return FESTIVALS.find(f => Math.abs(dy - f.doy) <= f.span) || null;
}
function rotSample(arr, n){
  const a = arr.slice(), out = [];
  while(out.length < n && a.length) out.push(a.splice(Math.floor(Math.random()*a.length), 1)[0]);
  return out;
}
function rotRollPicks(theme, usedIds){
  const all = rotAllOf(theme);
  const used = usedIds || [];
  let urFresh = all.filter(c => c.r === 'UR' && used.indexOf(c.id) < 0);
  let ssrFresh = all.filter(c => c.r === 'SSR' && used.indexOf(c.id) < 0);
  let next = used.slice();
  if(urFresh.length < ROT_PICK_UR || ssrFresh.length < ROT_PICK_SSR){
    next = [];   /* 该主题已全部出过一遍 → 重新开始循环 */
    urFresh = all.filter(c => c.r === 'UR');
    ssrFresh = all.filter(c => c.r === 'SSR');
  }
  const ur = rotSample(urFresh, ROT_PICK_UR), ssr = rotSample(ssrFresh, ROT_PICK_SSR);
  next = next.concat(ur.map(c => c.id), ssr.map(c => c.id));
  return {ur: ur.map(c => c.id), ssr: ssr.map(c => c.id), used: next};
}
/* 轮换池状态盒：池① 用 S.rot（兼容老存档），池② 用 S.rot2 */
function newRotBox(){ return {key:'', theme:'', picks:{ur:[],ssr:[]}, sel:{ur:[],ssr:[]}, used:{}}; }
function rotBox(poolId){
  const field = isRotPool(poolId) ? poolId : 'rot';
  let b = S[field];
  if(!b || typeof b !== 'object' || Array.isArray(b)) b = S[field] = newRotBox();
  if(!b.picks || typeof b.picks !== 'object') b.picks = {ur:[], ssr:[]};
  if(!b.sel || typeof b.sel !== 'object') b.sel = {ur:[], ssr:[]};
  if(!b.used || typeof b.used !== 'object' || Array.isArray(b.used)) b.used = {};
  if(typeof b.key !== 'string') b.key = '';
  if((ROT_SETS[field].themes).indexOf(b.theme) < 0) b.theme = '';
  return b;
}
function rotCurPool(){ return isRotPool(S.pool) ? S.pool : 'rot'; }
/* 换期检查：期号 / 主题变化时重抽名单（自选不受换期影响，永久保留） */
function syncRot(poolId){
  const pid = isRotPool(poolId) ? poolId : rotCurPool();
  const b = rotBox(pid);
  const key = rotPeriodKey(), idx = rotPeriodIndex(), theme = rotThemeOf(idx, pid);
  if(b.key !== key || b.theme !== theme){
    const r = rotRollPicks(theme, b.used[theme] || []);
    b.key = key; b.theme = theme;
    b.picks = {ur:r.ur, ssr:r.ssr};
    b.used[theme] = r.used;
    save();
  }
  /* 自选合法性：只允许本池 3 个主题的星灵，不受换期影响、永久保留 */
  const rotThemes = (ROT_SETS[pid] || ROT_SETS.rot).themes;
  const ok = new Set(LIMITED_CARDS.filter(c => rotThemes.indexOf(c.theme) >= 0).map(c => c.id));
  b.sel.ur = (b.sel.ur || []).filter(id => ok.has(id) && CARD_MAP[id] && CARD_MAP[id].r === 'UR').slice(0, ROT_SEL_UR);
  b.sel.ssr = (b.sel.ssr || []).filter(id => ok.has(id) && CARD_MAP[id] && CARD_MAP[id].r === 'SSR').slice(0, ROT_SEL_SSR);
}
/* 轮换池独立保底计数（两池各一份，与常驻 / 季节池互不干扰） */
function rotPityBox(poolId){
  const field = (isRotPool(poolId) ? poolId : 'rot') + 'Pity';
  let b = S[field];
  if(!b || typeof b !== 'object') b = S[field] = {ur: field === 'rotPity' ? (S.rotPityUR || 0) : 0, sr: field === 'rotPity' ? (S.rotPitySR || 0) : 0};
  if(typeof b.ur !== 'number' || isNaN(b.ur)) b.ur = 0;
  if(typeof b.sr !== 'number' || isNaN(b.sr)) b.sr = 0;
  return b;
}
function rotPickCards(kind, poolId){ return (rotBox(poolId || rotCurPool()).picks[kind] || []).map(id => CARD_MAP[id]).filter(Boolean); }
function rotSelCards(kind, poolId){ return (rotBox(poolId || rotCurPool()).sel[kind] || []).map(id => CARD_MAP[id]).filter(Boolean); }
/* 本批抽卡统一选卡入口：优先「未拥有」，并排除本批已抽中的卡（同一次十连内绝不重复）。
   UR / SSR 抽中即视为移出奖池，因此只要还有未拥有的该品质星灵，就绝不会再抽到重复的。 */
function chooseCard(list, taken){
  if(!list || !list.length) return null;
  const free = taken ? list.filter(c => !taken.has(c.id)) : list;
  const src = free.length ? free : list;
  const fresh = src.filter(c => !S.collection[c.id]);
  const pool = fresh.length ? fresh : src;
  const card = pool[Math.floor(Math.random()*pool.length)];
  if(taken) taken.add(card.id);
  return {card: card, dup: !!S.collection[card.id]};
}
/* 隐藏星灵：任何奖池都可能抽到，只从「尚未拥有」的隐藏卡里出 */
function hiddenCard(taken){
  return chooseCard(hiddenFresh(), taken) || null;
}
/* 轮换池出货：UR / SSR 只出本期限定（自选 UP 权重更高），SR / R 沿用常驻 */
function rotCardOfTier(tier, poolId, taken){
  const pid = isRotPool(poolId) ? poolId : rotCurPool();
  syncRot(pid);
  if(tier === 'XR') return hiddenFresh().length ? hiddenCard(taken) : null;
  if(tier !== 'UR' && tier !== 'SSR'){
    const std = CARDS.filter(c => c.r === tier && !c.lim && !c.rot && !c.hid);
    return chooseCard(std, taken);
  }
  const kind = tier === 'UR' ? 'ur' : 'ssr';
  const sel = rotSelCards(kind, pid), picks = rotPickCards(kind, pid);
  const selIds = new Set(sel.map(c => c.id));
  const weighted = [];
  picks.concat(sel).forEach(c => { const w = selIds.has(c.id) ? (tier === 'UR' ? 3 : 2) : 1; for(let i=0;i<w;i++) weighted.push(c); });
  if(!weighted.length) return null;
  return chooseCard(weighted, taken);
}
/* ================= 元素 · 编队 · 天象克制 =================
   每日从全部元素里确定一个「天象元素」（由日期决定，刷新不变）。
   编队最多 3 位星灵；编队里「克制天象」的星灵按自身品质贡献当日收益加成：
   R +6% / SR +8% / SSR +10% / UR +13% / XR +16%，合计上限 +30%。 */
const ELE_COUNTER = {
  光:'暗', 暗:'光', 水:'炎', 炎:'水', 风:'雷', 雷:'风',
  心:'星', 星:'时', 时:'心',
  霜:'木', 木:'海', 海:'月', 月:'数', 数:'灵', 灵:'慧', 慧:'霜'
};
let ELE_LIST = null;
function eleList(){
  if(!ELE_LIST) ELE_LIST = Array.from(new Set(CARDS.concat(HIDDEN_CARDS).map(c => c.ele || '心')));
  return ELE_LIST;
}
function todayEle(){
  const L = eleList();
  return L[hashId('ele-' + todayStr()) % L.length];
}
function teamCards(){ return (S.team || []).map(id => CARD_MAP[id]).filter(Boolean); }
/* 编队加成：克制今日天象的星灵各自按品质贡献加成，合计不超过 30% */
const TEAM_RARITY_BONUS = {R:0.06, SR:0.08, SSR:0.10, UR:0.13, XR:0.16};
const TEAM_BONUS_CAP = 0.30;
function teamCounterCards(){ const foe = todayEle(); return teamCards().filter(c => ELE_COUNTER[c.ele] === foe); }
function teamCounterN(){ return teamCounterCards().length; }
function teamBonusPct(c){ return Math.round((TEAM_RARITY_BONUS[c.r] || 0.06) * 100); }
function teamBonus(){
  const sum = teamCounterCards().reduce((a, c) => a + (TEAM_RARITY_BONUS[c.r] || 0.06), 0);
  return Math.min(TEAM_BONUS_CAP, sum);
}

const TIER_ORDER = {R:0, SR:1, SSR:2, UR:3, XR:4};
const TIER_NAME = {R:'基础星灵', SR:'优质星灵', SSR:'高阶星灵', UR:'终极星灵', XR:'隐匿星灵'};
const COST = {one:20, ten:180, tenTicket:10};
const WIPE_GIFT_STONE = 1800;   /* 清空/重置数据后默认赠送的星愿石 */
const DUPE = {R:5, SR:15, SSR:50, UR:150, XR:0};
const PITY_SR = 10, PITY_UR = 90;
/* 心魔值：0–100 累积。≥ CURSE_DEBUFF 时收益 ×0.5；满 CURSE_MAX 触发「心魔来袭」事件。
   补做 / 专注 / 今日全勤可净化。 */
const CURSE_MAX = 100, CURSE_DEBUFF = 50;
/* 图鉴里程碑：p=完成度档位(%)，s=星愿石，t=星愿券 */
const MILE_STEPS = [
  {p:25,  s:200,  t:0},
  {p:50,  s:0,    t:1},
  {p:75,  s:400,  t:0},
  {p:100, s:1000, t:3}
];
function mileNote(m){
  let s = '';
  if(m.s) s += '+' + m.s + '✦';
  if(m.t) s += (s ? ' ' : '') + '+' + m.t + '🎟';
  return s;
}

/* ---- 隐藏星灵（XR）：抽前不可见；拥有任意一位后才解锁隐藏图鉴 ---- */
function hiddenOwned(){ return HIDDEN_CARDS.filter(c => S.collection[c.id]).length; }
function hasHidden(){ return hiddenOwned() > 0; }
function hiddenFresh(){ return HIDDEN_CARDS.filter(c => !S.collection[c.id]); }
/* 图鉴清单：未拥有任何隐藏星灵时，隐藏卡连「未解锁」都不显示（完全无痕） */
function codexCards(){
  const list = hasHidden() ? CARDS : CARDS.filter(c => !c.hid);
  return (S.filter === 'ALL') ? list : list.filter(c => c.r === S.filter);
}
function codexTotal(){ return hasHidden() ? CARDS.length : CARDS.length - HIDDEN_CARDS.length; }

/* 七日签到：第 2 天为「初次特典」，第 7 天为满签大奖 */
const SIGN_TABLE = [
  {d:1, ic:'✦',  rw:[{k:'stone',v:120,i:'✦',n:'星愿石'},{k:'ticket',v:1,i:'🎟',n:'星愿券'}]},
  {d:2, ic:'💎', flag:'初次特典', rare:true, rw:[{k:'stone',v:300,i:'✦',n:'星愿石'},{k:'ticket',v:3,i:'🎟',n:'星愿券'},{k:'ssrTicket',v:1,i:'💎',n:'SSR 必得券'}]},
  {d:3, ic:'✦',  rw:[{k:'stone',v:150,i:'✦',n:'星愿石'},{k:'ticket',v:2,i:'🎟',n:'星愿券'}]},
  {d:4, ic:'✦',  rw:[{k:'stone',v:180,i:'✦',n:'星愿石'},{k:'ticket',v:2,i:'🎟',n:'星愿券'}]},
  {d:5, ic:'🎟', rw:[{k:'stone',v:220,i:'✦',n:'星愿石'},{k:'ticket',v:3,i:'🎟',n:'星愿券'}]},
  {d:6, ic:'🎟', rw:[{k:'stone',v:260,i:'✦',n:'星愿石'},{k:'ticket',v:4,i:'🎟',n:'星愿券'}]},
  {d:7, ic:'👑', flag:'满签大奖', rare:true, rw:[{k:'stone',v:500,i:'✦',n:'星愿石'},{k:'ticket',v:10,i:'🎟',n:'星愿券'},{k:'urTicket',v:1,i:'👑',n:'UR 必得券'}]}
];
const CHEST_RW = [
  {k:'stone',v:500,i:'✦',n:'星愿石'},
  {k:'ticket',v:5,i:'🎟',n:'星愿券'},
  {k:'ssrTicket',v:1,i:'💎',n:'SSR 必得券'}
];
/* 等级奖励：每档一次性领取。属一次性福利，不计入每日 1800✦ 上限，故不走 grantStone。
   12 档阶梯，随「已拥有星灵数」逐级解锁，跨度覆盖到全图鉴（0 → 268 位）。
   每档一个专属称号 + 递增奖励；关键档位追加 SSR/UR 必得券，作为长线收集的目标。 */
const LEVELS = [
  {t:'见习契约者', x:0,   s:200,  k:1},
  {t:'星愿学徒',   x:5,   s:400,  k:1},
  {t:'星轨旅人',   x:12,  s:700,  k:2},
  {t:'星灵收集者', x:22,  s:1100, k:2, ssr:1},
  {t:'星辉编队师', x:36,  s:1600, k:3},
  {t:'星海引路人', x:54,  s:2200, k:3},
  {t:'星宫守望者', x:78,  s:3000, k:4, ssr:1},
  {t:'星域织梦者', x:108, s:4000, k:5},
  {t:'星河缔结者', x:142, s:5200, k:6, ur:1},
  {t:'星穹巡礼者', x:182, s:6800, k:7, ssr:1},
  {t:'星海支配者', x:224, s:8600, k:9},
  {t:'万星契约主', x:268, s:12000, k:12, ur:1}
];
