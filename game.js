let player = {
    name: "加载中...", gender: "男", orientation: "异性恋", house: "加载中...", blood: "纯血",
    year: "加载中...", nationality: "英国", 
    custom1: "故事主角，华裔老牌纯血世家子弟。外貌清冷矜贵，183cm薄肌，深黑微卷发，深棕眼，冷白皮。喜穿深绿、炭黑、银灰简约巫师袍，随身佩戴黎家纹样的银袖扣与素银戒指。", 
    custom2: "性格清冷疏离，骄傲敏感，重情正义，胜负欲强。习惯自作主张、口是心非，只对少数亲友卸下防备。专一长情，向往安稳平淡的陪伴。", 
    custom3: "黎家势力神秘，实权由母亲掌控，父母尊重他。与张家世代交好，青梅竹马秋·张如姐姐般能点醒他。宠物是黑蛇蟹问，习惯盘绕在他手腕小臂。魔杖为12.5英寸黑胡桃木龙心弦。守护神为银灰苍鹰（后期可与帕比的林鸫相伴）。", 
    custom4: "拥有顶尖家族势力、外貌与魔法天赋（魔药、古代魔法、决斗出众）。不排斥合理使用家族特权，但一心想要凭自身能力证明自己。", 
    custom5: "世界观：14岁入学，一学年分秋季（9-2月）与春季（3-7月）学期。纯血偏见存在但无黑魔王势力。危机多为神奇动物盗猎、私研黑魔法等，由魔法部法律执行司查处。三强争霸赛等传统活动照常举办。",
    avatarEmoji: "🐍", avatarImg: "image/lynn.jpg", time: "加载中...", month: 8, week: 4, day: 28,
    location: "加载中...", galleons: "加载中...", inventory: [], 
    aiEnabled: false, aiApiUrl: "", aiApiKey: "", aiModelName: "", aiMaxCost: 100, aiTotalCost: 0, aiCallCount: 0,
    aiStoryMinLen: 200, aiStoryMaxLen: 500, 
    aiChatLen: 30, aiGroupLen: 30, 
    aiMomentLen: 50, aiMomentReplyLen: 50, 
    aiForumLen: 100, aiForumReplyLen: 100
};

let pastStories = []; 
let favoriteStories = []; 
let currentGeneratedStory = ""; 

// =========================================
// 核心数据区
// =========================================
let contactsData = [
    { id: "theodore", name: "西奥多·诺特", avatar: "🐍", avatarImg: "image/theodore.png", house: "斯莱特林", gender: "男", year: "一年级", persona: "斯莱特林纯血，天资卓绝，魔药造诣顶尖。性格寡言孤僻，厌恶纯血圈子虚伪的抱团客套，不参与马尔福一伙的挑衅闹剧，习惯冷眼旁观周遭纷争。对外人冷淡疏离，心思细腻敏锐，能读懂旁人隐藏的情绪，行事低调，遇到认可之人陷入困境时会主动出手相助。", impression: "唯一能说上话的挚友", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "draco", name: "德拉科·马尔福", avatar: "🐍", avatarImg: "image/draco.png", house: "斯莱特林", gender: "男", year: "一年级", persona: "傲慢的纯血贵族，自带与生俱来的优越感。信奉纯血理念，热衷组建小团体，胜负欲极强，习惯带着跟班用尖刻言语讥讽他人，处处想要压过对手，执着于维系纯血圈层地位，无法接受同圈层之人脱离派系，屡次主动招揽心仪的强者加入自己的团体。", impression: "自命不凡的纯血叛徒", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "flint", name: "马库斯·弗林特", avatar: "🐍", avatarImg: "image/marcus.png", house: "斯莱特林", gender: "男", year: "三年级", persona: "斯莱特林魁地奇队长，性格粗犷好胜，极度看重魁地奇赛场胜负。判断他人只看实力高低，不在意学院派系纷争。欣赏球场上实力出众的队员，愿意偏袒有能力的队友，会主动出面制止队内无端的流言非议，一心追求队伍胜利。", impression: "斯莱特林的王牌", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "pansy_p", name: "潘西·帕金森", avatar: "🐍", avatarImg: "image/pansy.png", house: "斯莱特林", gender: "女", year: "一年级", persona: "纯血出身，依附马尔福小团体，平日势利刻薄，习惯跟着同伴嘲讽旁人。性格傲娇口是心非，内心爱慕强者却绝不会主动表露心意，只会旁敲侧击暗示期待。好胜心强，见不得他人直白追求心仪对象，常与直球示好的女孩当众争执，还会嘲讽被动怯懦的同龄人。", impression: "总是不合群的怪人", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "cho", name: "秋·张", avatar: "🦅", avatarImg: "image/cho.png", house: "拉文克劳", gender: "女", year: "一年级", persona: "华裔纯血，容貌清秀，心思细腻敏感，共情力出众。与黎家世代交好，是林恩的青梅竹马姐姐，待人温柔通透。看待感情清醒克制，擅长理性分析，总能给出中肯实在的建议。", impression: "需要照顾的世交弟弟", affinity: 90, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "padma", name: "帕德玛·佩蒂尔", avatar: "🦅", avatarImg: "image/padma.png", house: "拉文克劳", gender: "女", year: "一年级", persona: "聪慧冷静，拥有独立思辨能力，拒绝盲从跟风。观察力敏锐，性格内敛克制，不喜喧闹争夺。习惯安静旁观，偏爱以学术交流作为沟通方式，擅长整理笔记、摘抄古籍。面对他人嘲讽时态度淡然，会冷静反驳，不参与女生间的争执。", impression: "气质独特的学术天才", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "amit", name: "阿米特·塔卡", avatar: "🦅", avatarImg: "image/amit.png", house: "拉文克劳", gender: "男", year: "一年级", persona: "痴迷天文与古代古籍，求知欲旺盛，性格温和理性，厌恶冲突争执。热衷于钻研冷门知识，乐于分享自己的研究发现。喜爱和同好探讨星象、符文古籍，性格开朗风趣，会给身边好友起趣味称呼。", impression: "拉文克劳编外人员", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "poppy", name: "帕比·斯威汀", avatar: "🦡", avatarImg: "image/pippa.jpg", house: "赫奇帕奇", gender: "女", year: "一年级", persona: "赫奇帕奇纯血世家出身，家族世代深耕神奇动物研究，留存大量珍贵研究手稿与专属驯养场地。父母受利益蛊惑背弃传承，沦为神奇动物盗猎者。她自幼由坚守家族初心的奶奶抚养，常年与各类魔法生物相伴，能够敏锐捕捉生灵的情绪。本性善良宽厚，温柔的外表之下蕴藏坚韧的勇气。年少时因父母的丑闻承受诸多流言非议，内向敏感只是她用来保护自己的外壳，内里冷静强大，这份特质极少在外人面前展露。她习惯保持克制的距离感，不会轻易主动与人攀谈、馈赠礼物或是发出舞会邀约。内心拥有清晰的自我认知，背负着家庭过往带来的枷锁，行事审慎内敛。随着阅历增长，她逐渐挣脱过往的阴影，变得从容笃定，拥有独立的判断。待人平等，拥有通透的洞察力，敢于直白表达自身想法，不盲从他人。面对女生间的情感纷争，她自信淡然，不屑于卷入喧闹的争夺，追求稳定、对等的相处关系。", impression: "耀眼而遥远的天才", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "cedric", name: "塞德里克·迪戈里", avatar: "🦡", avatarImg: "image/cedric.png", house: "赫奇帕奇", gender: "男", year: "一年级", persona: "纯血巫师，风度谦和正直，能力出众，待人宽厚，深受众人信赖。为人通透，不固守纯血偏见，待人处事公允，待人真诚，重视可靠的情谊。", impression: "值得尊敬的对手与朋友", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "lottie", name: "洛蒂·特纳", avatar: "🦡", avatarImg: "image/lottie.png", house: "赫奇帕奇", gender: "女", year: "一年级", persona: "性格平和乐观，包容温柔，情绪稳定。擅长魔法绘画，喜爱记录魔法世界的生灵与风景。心性柔软，不喜争执冲突，面对他人嘲讽大多一笑置之。情感表达安静含蓄，习惯将心意藏于速写画作与小点心之中，默默欣赏，从不逼迫对方。", impression: "很好的绘画模特", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "hermione", name: "赫敏·格兰杰", avatar: "🦁", avatarImg: "image/hermione.png", house: "格兰芬多", gender: "女", year: "一年级", persona: "麻瓜出身的顶尖学霸，聪慧理性，坚守正义，处事可靠，初期略显刻板，慢慢学会变通。热衷钻研各类魔法课业，乐于和他人探讨学术。对待感情认真，遇事勇敢果决，危难之时值得托付。", impression: "学术上值得尊敬的对手", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "ginny", name: "金妮·韦斯莱", avatar: "🦁", avatarImg: "image/ginny.png", house: "格兰芬多", gender: "女", year: "一年级", persona: "性格飒爽果敢，敢爱敢恨，独立强大。年少内向，成长后自信耀眼。待人真诚，擅长经营友谊，拥有自己的闺蜜圈子，待人坦荡，遇事有主见。", impression: "深不可测的斯莱特林", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "harry", name: "哈利·波特", avatar: "🦁", avatarImg: "image/harry.png", house: "格兰芬多", gender: "男", year: "一年级", persona: "飞行天赋出众，反应敏捷。重情重义，共情力强，面对险境有勇气，珍惜伙伴情谊，愿意信任他人，是可以并肩作战、共渡难关的同伴。", impression: "可以并肩作战的队友", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "ron", name: "罗恩·韦斯莱", avatar: "🦁", avatarImg: "image/ron.png", house: "格兰芬多", gender: "男", year: "一年级", persona: "性格幽默真诚，感情上略显木讷。外表大大咧咧，关键时刻十分勇敢，护短重情义，会因在意的人产生微妙情绪，熟悉后能够放下成见。", impression: "有点臭屁的竞争对手", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "robyn", name: "萝宾·西斯尔思韦特", avatar: "🦁", avatarImg: "image/Robyn.png", house: "格兰芬多", gender: "女", year: "一年级", persona: "元气外向，狂热痴迷魁地奇与飞行，热爱冒险，行动力强。向往空中飞驰的自由，待人热忱，心思坦荡。不惧冲突，遭遇挑衅时敢于直接回击，心意直白外放，敢于主动表达、大胆邀约。", impression: "飞得最快的斯莱特林", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "wood", name: "奥利弗·伍德", avatar: "🦁", avatarImg: "image/oliver.png", house: "格兰芬多", gender: "男", year: "三年级", persona: "格兰芬多魁地奇队长兼守门员，狂热的魁地奇爱好者，胜负欲强烈。训练严苛，一心追逐学院荣誉。尊重强者，重视赛场较量，会正视对手的实力，将强劲对手视作鞭策自己的目标。", impression: "最头疼的球场敌人", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "dumbledore", name: "阿不思·邓布利多", avatar: "🧙‍♂️", avatarImg: "image/albus.png", house: "校长", gender: "男", year: "教授", persona: "睿智通透，目光长远。统筹校内事务，欣赏年轻人身上的勇气。", impression: "充满无限可能的孩子", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "mcgonagall", name: "米勒娃·麦格", avatar: "🐈‍⬛", avatarImg: "image/minerva.png", house: "副校长", gender: "女", year: "变形术教授", persona: "行事严谨公正，恪守原则。细心留意学生身体状态，对学生的安全与学业都十分上心。", impression: "天资聪颖的学生", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "snape", name: "西弗勒斯·斯内普", avatar: "🦇", avatarImg: "image/severus.png", house: "斯莱特林院长", gender: "男", year: "魔药课教授", persona: "外表严苛刻薄，内心藏有柔软。精通魔药，眼光毒辣，擅长发掘学生在药剂领域的过人天赋。", impression: "有天赋但傲慢的学生", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "flitwick", name: "菲利乌斯·弗立维", avatar: "🧙‍♂️", avatarImg: "image/filius.png", house: "教授", gender: "男", year: "魔咒课教授", persona: "魔咒造诣高深，决斗技巧精湛。耐心指导学生打磨咒语。", impression: "极具魔咒天赋的学生", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "sprout", name: "波比·斯普劳特", avatar: "🌿", avatarImg: "image/pomona.png", house: "教授", gender: "女", year: "草药学教授", persona: "性情温和，热爱植物与神奇生物。擅长草药培育，愿意为钻研神奇动物的学生提供指导与帮助。", impression: "踏实好学的孩子", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "lupin", name: "莱姆斯·卢平", avatar: "🐺", avatarImg: "image/remus.png", house: "教授", gender: "男", year: "黑魔法防御术教授", persona: "性格沉稳温和，精通黑魔法防御。擅长设计对抗黑魔法的模拟演练，带队训练实战对抗技巧。", impression: "天赋异禀的决斗者", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "binns", name: "卡斯伯特·宾斯", avatar: "👻", avatarImg: "image/cuthbert.png", house: "教授", gender: "男", year: "魔法史教授", persona: "授课风格枯燥乏味，熟知古老魔法史料。掌握大量尘封记载，能够为研究者提供古籍卷宗线索。", impression: "唯一不打瞌睡的学生", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "trelawney", name: "西比尔·特里劳妮", avatar: "🔮", avatarImg: "image/sybill.png", house: "教授", gender: "女", year: "占卜课教授", persona: "言行神神叨叨，沉浸在占卜预言之中。时常给出语意朦胧、难以解读的预言片段。", impression: "没有内视眼的凡人", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "pomfrey", name: "波比·庞弗雷", avatar: "🏥", avatarImg: "image/poppy.png", house: "医疗翼", gender: "女", year: "校医", persona: "医术精湛，责任心极强。细心看护受伤学生，持续监测伤者恢复进度，对学生健康严格把关。", impression: "无", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "sinistra", name: "奥罗拉·辛尼斯塔", avatar: "🔭", avatarImg: "image/aurora.png", house: "教授", gender: "女", year: "天文学教授", persona: "治学严谨，深耕星象研究。专注天文课业教学，引导学生观察、记录星空规律。", impression: "对星空有天赋", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "bathsheba", name: "芭丝希达·巴沙特", avatar: "📜", avatarImg: "image/bathilda.png", house: "教授", gender: "女", year: "古代如尼文教授", persona: "学识渊博，精通古老符文体系，负责古代如尼文选修课教学，善于发掘学生的符文学习天赋。", impression: "难得一见的好苗子", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "mother_li", name: "黎母", avatar: "👩🏻", avatarImg: "image/lee.png", house: "黎家", gender: "女", year: "长辈", persona: "华裔纯血家族掌权人，心思细腻睿智。手握家族权柄，制作带有家族魔法的信物，拥有识人眼光。", impression: "引以为傲的儿子", affinity: 100, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "father_li", name: "黎父", avatar: "👨🏻", avatarImg: "image/li.png", house: "黎家", gender: "男", year: "长辈", persona: "性情宽厚温和，尊重家人想法，待人友善，重视亲情，处事包容。", impression: "我的好孩子", affinity: 100, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "grandma_ella", name: "斯威汀奶奶", avatar: "👵🏻", avatarImg: "image/ella.png", house: "斯威汀家", gender: "女", year: "长辈", persona: "老牌纯血，深厚的神奇动物学识底蕴，独自抚养孙女，对孙女极尽疼爱与庇护。", impression: "无", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "cho_mom", name: "秋·张母亲", avatar: "👩🏻", avatarImg: "image/Mrs. Chang.png", house: "张家", gender: "女", year: "长辈", persona: "华裔纯血，与黎家世代交好，为人通透稳重，待人处事得体有度。", impression: "优秀的小辈", affinity: 85, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "cho_dad", name: "秋·张父亲", avatar: "👨🏻", avatarImg: "image/Mr. Chang.png", house: "张家", gender: "男", year: "长辈", persona: "巫师商人，性格随和开朗，善于交际，待人亲切。", impression: "挺有出息的小子", affinity: 85, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "amos", name: "塞德里克父亲", avatar: "👨🏻‍💼", avatarImg: "image/amos.png", house: "迪戈里家", gender: "男", year: "长辈", persona: "魔法部官员，为人正直，致力于神奇动物保护相关工作，坚守自身信念。", impression: "无", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "cedric_mom", name: "塞德里克母亲", avatar: "👩🏻", avatarImg: "image/Mrs. Diggory.png", house: "迪戈里家", gender: "女", year: "长辈", persona: "温柔细心，疼爱儿子，牵挂年轻人外出任务的安危，心怀善意。", impression: "无", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true },
    { id: "theodore_dad", name: "老诺特", avatar: "🧔🏻", avatarImg: "image/nott.png", house: "诺特家", gender: "男", year: "长辈", persona: "老牌纯血，学识渊博，收藏大量黑魔法与药剂古籍，能为儿子提供顶尖的学术资源。", impression: "无", affinity: 0, love: 0, dislike: 0, chats: [], isRead: true }
];

let groupChatsData = [
    { id: "g1", name: "霍格沃茨大群", avatar: "🏰", chats: [], members: contactsData.map(c => c.name), isRead: true },
    { id: "g2", name: "斯莱特林公共休息室", avatar: "🐍", chats: [], members: contactsData.filter(c => c.house === "斯莱特林" || c.house === "斯莱特林院长").map(c => c.name), isRead: true }
];

let momentsData = [
    { id: 1, author: "赫敏", avatar: "🦁", img: "image/hermione.png", content: "图书馆的平斯夫人今天又没收了我的羽毛笔...", time: "10分钟前", likes: 5, comments: [ { user: "罗恩", text: "谁让你非要在书上涂鸦的。" } ], isLiked: false },
    { id: 2, author: "德拉科", avatar: "🐍", img: "image/draco.png", content: "某些人的扫帚飞得就像麻瓜的拖拉机。", time: "1小时前", likes: 12, comments: [], isLiked: false }
];

let wallPosts = [
    { id: 1, author: "赫敏·格兰杰", house: "格兰芬多", avatar: "🦁", img: "image/hermione.png", time: "10分钟前", category: "交友", content: "有人这周末想一起去图书馆复习变形术吗？我整理了笔记。", likes: 12, replies: [ { author: "纳威", text: "我可以吗！" } ], isLiked: false },
    { id: 2, author: "卢娜·洛夫古德", house: "拉文克劳", avatar: "🦅", img: "", time: "30分钟前", category: "表白", content: "墙墙，表白一下今天在魔药课帮我捡书的男生，黑发灰眼，好像是斯莱特林的。", likes: 34, replies: [], isLiked: false }
];

let forumPosts = [
    { id: 1, author: "吃瓜的獾", time: "10分钟前", title: "惊爆！昨天晚上在禁林边缘...", content: "我昨天半夜去厨房偷吃，路过禁林边缘，看到有两个人在拉拉扯扯！其中一个好像是斯莱特林的天赋怪？", replies: [ { author: "拉文克劳学霸", time: "5分钟前", text: "细说拉扯！" }, { author: "匿名巫师", time: "2分钟前", text: "楼主不要断更啊！" } ] }
];

const shopItems = [
    { id: 1, name: "霍格沃茨校服", price: 15, icon: "🧥" }, { id: 2, name: "圣诞舞会礼服", price: 50, icon: "👗" },
    { id: 3, name: "奥利凡德魔杖", price: 7, icon: "🪄" }, { id: 4, name: "高级猫头鹰", price: 100, icon: "🦉" },
    { id: 5, name: "魔法书", price: 9, icon: "📕" }, { id: 6, name: "比比多味豆", price: 2, icon: "🍬" },
    { id: 7, name: "巧克力蛙", price: 3, icon: "🍫" }, { id: 8, name: "美容药剂", price: 25, icon: "🧪" }
];

let currentChatTarget = null;
let currentGroupChatTarget = null;
let currentChatActionType = ""; 
let currentBuyItem = null;
let currentMomentForComment = null;
let currentEditNpcId = null;
let tempNpcAvatarImg = "";
let currentWallCategory = "全部";
let currentViewingWallPost = null;
let currentViewingPost = null;
let currentEditingGroupId = null;
let currentEditingGroup = null; 

// 统一 AI 请求入口：预算拦截 + 次数计数 + fetch
function aiRequest(url, body, onSuccess, onError) {
    if (player.aiCallCount >= player.aiMaxCost) {
        alert(`【AI 预算拦截】已调用 ${player.aiCallCount} 次，达到上限 ${player.aiMaxCost} 次。请去设置页调整上限。`);
        if (onError) onError(new Error("AI 预算超限"));
        return;
    }
    player.aiCallCount += 1;
    let costDisplay = document.getElementById('ai-total-cost-display');
    if (costDisplay) costDisplay.innerText = `${player.aiCallCount} 次（约 ${player.aiCallCount * 50} 额度）| 真实 Token ${player.aiTotalCost}`;
    autoSave();

    let apiUrl = url;
    if (!apiUrl.endsWith('/chat/completions') && !apiUrl.endsWith('/v1/chat/completions')) { if (apiUrl.endsWith('/v1')) apiUrl += '/chat/completions'; else apiUrl += '/chat/completions'; }

    // 🛠️ 新增：创建一个中止控制器，设置 60 秒超时
    const controller = new AbortController();
    const timeoutAbortId = setTimeout(() => controller.abort(), 60000);

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${player.aiApiKey}` },
        body: JSON.stringify(body),
        signal: controller.signal // 👈 把控制器信号绑给 fetch
    })
    .then(res => res.json())
    .then(data => {
        clearTimeout(timeoutAbortId); // 👈 必须加：只要成功返回，就立刻销毁 60 秒的警报
        if (data.usage && data.usage.total_tokens) {
            player.aiTotalCost += data.usage.total_tokens;
            let cd = document.getElementById('ai-total-cost-display');
            if (cd) cd.innerText = `${player.aiCallCount} 次（约 ${player.aiCallCount * 50} 额度）| 真实 Token ${player.aiTotalCost}`;
        }
        if (onSuccess) onSuccess(data);
    })
    .catch(err => { 
        clearTimeout(timeoutAbortId); // 👈 必须加：报错了也要销毁警报
        if (onError) onError(err); 
    });
}

function autoSave() {
    if (player.name === "加载中...") return;
    let saveData = { player: player, pastStories: pastStories, favoriteStories: favoriteStories, contactsData: contactsData, momentsData: momentsData, wallPosts: wallPosts, forumPosts: forumPosts, groupChatsData: groupChatsData };
    localStorage.setItem("hogwarts_autosave", JSON.stringify(saveData));
}

function updateRealTimeClock() {
    let clockEl = document.getElementById('phone-clock');
    if (!clockEl) return;
    let now = new Date();
    clockEl.innerText = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}
updateRealTimeClock(); setInterval(updateRealTimeClock, 60000); 

function updatePhoneWidgets(type, text) {
    if (type === 'contact_msg') { let el = document.getElementById('widget-contact-msg'); if(el){el.innerText = text; el.classList.add('active-msg');} }
    else if (type === 'wall') { let el = document.getElementById('widget-wall'); if(el){el.innerText = text; el.classList.add('active-msg');} }
    else if (type === 'forum') { let el = document.getElementById('widget-forum'); if(el){el.innerText = text; el.classList.add('active-msg');} }
}

function updateUI() {
    document.getElementById('ui-top-name').innerText = "姓名: " + player.name;
    document.getElementById('ui-top-house').innerText = "学院: " + player.house;
    document.getElementById('ui-top-time').innerText = "时间: " + player.time;
    document.getElementById('ui-top-year').innerText = "年级: " + player.year;
    
    if (player.galleons !== "加载中...") { document.getElementById('ui-top-galleons').innerText = "加隆: " + Number(player.galleons).toLocaleString(); } 
    else { document.getElementById('ui-top-galleons').innerText = "加隆: 加载中..."; }
    
    let avatarBox = document.getElementById('btn-open-profile');
    if (player.name === "加载中...") { avatarBox.innerHTML = "头像<br>加载中"; } 
    else { if (player.avatarImg) { avatarBox.innerHTML = `<img src="${player.avatarImg}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`; } else { avatarBox.innerText = player.avatarEmoji; } }
    
    let phoneDateEl = document.getElementById('phone-date-display');
    if (phoneDateEl) {
        if (player.time === "加载中...") { phoneDateEl.innerText = "加载中..."; } 
        else { let parts = player.time.split(' '); phoneDateEl.innerText = parts[1] || player.time; }
    }
}

updateUI(); document.getElementById('advance-btn').style.display = 'block'; updateFavoritesUI(); updateHistoryUI();

(function loadAutoSave() {
    let autoData = localStorage.getItem("hogwarts_autosave");
    if (autoData) {
        try {
            let saveData = JSON.parse(autoData);
            player = saveData.player; pastStories = saveData.pastStories || []; favoriteStories = saveData.favoriteStories || [];
            contactsData = saveData.contactsData || contactsData; momentsData = saveData.momentsData || momentsData;
            wallPosts = saveData.wallPosts || wallPosts; forumPosts = saveData.forumPosts || forumPosts; groupChatsData = saveData.groupChatsData || groupChatsData;
            
            // 兼容老存档的字数设置
            if (player.aiStoryMinLen === undefined) player.aiStoryMinLen = 100;
            if (player.aiStoryMaxLen === undefined) player.aiStoryMaxLen = 300;
            if (player.aiChatLen === undefined) player.aiChatLen = 30;
            if (player.aiGroupLen === undefined) player.aiGroupLen = 30;
            if (player.aiMomentLen === undefined) player.aiMomentLen = 50;
            if (player.aiMomentReplyLen === undefined) player.aiMomentReplyLen = 50;
            if (player.aiForumLen === undefined) player.aiForumLen = 100;
            if (player.aiForumReplyLen === undefined) player.aiForumReplyLen = 100;

            updateUI(); updateHistoryUI(); updateFavoritesUI();
            document.getElementById('ui-story-text').innerText = "已自动恢复上次的游玩进度，请继续你的霍格沃茨生活。";
        } catch (e) { console.log("自动存档损坏"); }
    }
})();

function openProfile() {
    document.getElementById('input-name').value = player.name === "加载中..." ? "" : player.name;
    document.getElementById('input-gender').value = player.gender; document.getElementById('input-orientation').value = player.orientation;
    document.getElementById('input-house').value = player.house === "加载中..." ? "斯莱特林" : player.house;
    document.getElementById('input-blood').value = player.blood;
    document.getElementById('input-year').value = player.year === "加载中..." ? "一年级" : player.year;
    document.getElementById('input-nationality').value = player.nationality;
    document.getElementById('input-custom1').value = player.custom1; document.getElementById('input-custom2').value = player.custom2;
    document.getElementById('input-custom3').value = player.custom3; document.getElementById('input-custom4').value = player.custom4; document.getElementById('input-custom5').value = player.custom5;
    document.getElementById('profile-modal').style.display = 'flex';
}
function closeProfile() { document.getElementById('profile-modal').style.display = 'none'; }

function saveProfile() {
    let newName = document.getElementById('input-name').value.trim();
    if (newName === "") { alert("姓名是必填项！"); return; }
    let oldBlood = player.blood; let isFirstTime = (player.name === "加载中...");
    player.name = newName; player.gender = document.getElementById('input-gender').value; player.orientation = document.getElementById('input-orientation').value;
    player.house = document.getElementById('input-house').value; player.blood = document.getElementById('input-blood').value;
    player.year = document.getElementById('input-year').value; player.nationality = document.getElementById('input-nationality').value;
    player.custom1 = document.getElementById('input-custom1').value; player.custom2 = document.getElementById('input-custom2').value;
    player.custom3 = document.getElementById('input-custom3').value; player.custom4 = document.getElementById('input-custom4').value; player.custom5 = document.getElementById('input-custom5').value;
    if (player.house === "斯莱特林") player.avatarEmoji = "🐍"; if (player.house === "格兰芬多") player.avatarEmoji = "🦁"; if (player.house === "拉文克劳") player.avatarEmoji = "🦅"; if (player.house === "赫奇帕奇") player.avatarEmoji = "🦡";
    if (isFirstTime) { player.time = `${player.year} ${player.month}月${player.day}日`; player.location = "霍格沃茨大礼堂"; } 
    else { let timeParts = player.time.split(' '); if (timeParts.length > 1) player.time = `${player.year} ${timeParts[1]}`; }
    if (isFirstTime || oldBlood !== player.blood) {
        let max = 9999999;
        if (player.blood === "纯血") player.galleons = max; else if (player.blood === "混血") player.galleons = Math.floor(max / 2); else if (player.blood === "麻瓜出身") player.galleons = Math.floor(max / 10);
    }

    // 主角年级变动时，全校学生跟着联动
    let oldYear = (typeof window.lastPlayerYear !== 'undefined') ? window.lastPlayerYear : null;
    
    if (oldYear !== null && oldYear !== player.year) {
        let yearOptions = ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "已毕业"];
        
        let oldIndex = yearOptions.indexOf(oldYear);
        let newIndex = yearOptions.indexOf(player.year);
        
        if (oldIndex !== -1 && newIndex !== -1) {
            let diff = newIndex - oldIndex;
            contactsData.forEach(npc => {
                let npcIndex = yearOptions.indexOf(npc.year);
                if (npcIndex !== -1) {
                    let targetIndex = npcIndex + diff;
                    if (targetIndex < 0) targetIndex = 0;
                    if (targetIndex >= yearOptions.length) {
                        npc.year = "已毕业";
                    } else {
                        npc.year = yearOptions[targetIndex];
                    }
                }
            });
            setTimeout(() => { alert(`📢 时光飞逝！由于你的年级变动，全校学生的年级均已自动同步（跨度：${diff > 0 ? '+' + diff : diff} 年）。`); }, 300);
        }
    }
    window.lastPlayerYear = player.year; 
    
    updateUI(); closeProfile(); autoSave();
}

function handleAvatarUpload(event) {
    let file = event.target.files[0]; if (!file) return; let reader = new FileReader();
    reader.onload = function(e) { player.avatarImg = e.target.result; document.getElementById('btn-open-profile').innerHTML = `<img src="${player.avatarImg}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`; autoSave(); };
    reader.readAsDataURL(file);
}

function openSaveLoad() { document.getElementById('saveload-modal').style.display = 'flex'; refreshSlotUI(); }
function closeSaveLoad() { document.getElementById('saveload-modal').style.display = 'none'; }
function saveGame(slotId) {
    if (player.name === "加载中...") { alert("请先创建角色！"); return; }
    localStorage.setItem("hogwarts_save_" + slotId, JSON.stringify({ player: player, pastStories: pastStories, favoriteStories: favoriteStories, contactsData: contactsData, momentsData: momentsData, wallPosts: wallPosts, forumPosts: forumPosts, groupChatsData: groupChatsData }));
    localStorage.setItem("hogwarts_save_time_" + slotId, new Date().toLocaleString());
    alert("存档成功！"); refreshSlotUI();
}
function loadGame(slotId) {
    let dataStr = localStorage.getItem("hogwarts_save_" + slotId);
    if (!dataStr) { alert("空存档！"); return; }
    let saveData = JSON.parse(dataStr); player = saveData.player; pastStories = saveData.pastStories || []; favoriteStories = saveData.favoriteStories || []; contactsData = saveData.contactsData || contactsData; momentsData = saveData.momentsData || momentsData; wallPosts = saveData.wallPosts || wallPosts; forumPosts = saveData.forumPosts || forumPosts; groupChatsData = saveData.groupChatsData || groupChatsData;
    updateUI(); updateHistoryUI(); updateFavoritesUI(); document.getElementById('ui-story-text').innerText = "读取存档成功，请点击下方推进剧情。"; currentGeneratedStory = "";
    let favBtn = document.getElementById('btn-favorite-story'); favBtn.innerHTML = "☆ 收藏"; favBtn.style.background = "white"; favBtn.style.color = "#666"; favBtn.style.borderColor = "#d1d1d6";
    alert("读档成功！"); closeSaveLoad(); autoSave();
}
function deleteSave(slotId) {
    let timeStr = localStorage.getItem("hogwarts_save_time_" + slotId);
    if (!timeStr) { alert("空存档！"); return; }
    if (confirm("确定删除？")) { localStorage.removeItem("hogwarts_save_" + slotId); localStorage.removeItem("hogwarts_save_time_" + slotId); refreshSlotUI(); }
}
function refreshSlotUI() {
    for (let i = 0; i < 3; i++) {
        let timeStr = localStorage.getItem("hogwarts_save_time_" + i); let descElement = document.getElementById("slot-desc-" + i);
        if (timeStr) { let s = JSON.parse(localStorage.getItem("hogwarts_save_" + i)); descElement.innerText = `${s.player.name} | ${s.player.house} | ${timeStr}`; descElement.style.color = "#333"; } 
        else { descElement.innerText = "空存档"; descElement.style.color = "#8e8e93"; }
    }
}
function exportData() {
    if (player.name === "加载中...") return;
    let blob = new Blob([JSON.stringify({ player: player, pastStories: pastStories, favoriteStories: favoriteStories, contactsData: contactsData, momentsData: momentsData, wallPosts: wallPosts, forumPosts: forumPosts, groupChatsData: groupChatsData }, null, 2)], { type: "application/json" });
    let a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `存档_${player.name}.json`; a.click(); URL.revokeObjectURL(a.href);
}
function importData() {
    let fileInput = document.createElement("input"); fileInput.type = "file"; fileInput.accept = ".json,.txt"; 
    fileInput.onchange = function(event) {
        let file = event.target.files[0]; if (!file) return; let reader = new FileReader();
        reader.onload = function(e) {
            try { let saveData = JSON.parse(e.target.result); player = saveData.player || saveData; pastStories = saveData.pastStories || []; favoriteStories = saveData.favoriteStories || []; contactsData = saveData.contactsData || contactsData; updateUI(); updateHistoryUI(); updateFavoritesUI(); alert("导入成功！"); closeSaveLoad(); autoSave(); } catch (error) { alert("导入失败！"); }
        }; reader.readAsText(file);
    }; fileInput.click();
}

function switchPage(pageName, clickedElement) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-' + pageName).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    clickedElement.classList.add('active');
    document.getElementById('advance-btn').style.display = (pageName === 'story') ? 'block' : 'none';
    if (pageName === 'settings') { loadAISettingsToUI(); }
}

function openGalleonsModal() { if (player.name === "加载中...") return; document.getElementById('input-galleons').value = player.galleons; document.getElementById('galleons-modal').style.display = 'flex'; }
function closeGalleonsModal() { document.getElementById('galleons-modal').style.display = 'none'; }
function saveGalleons() { let num = Number(document.getElementById('input-galleons').value); if (isNaN(num) || num < 0) return; if (num > 9999999) num = 9999999; player.galleons = num; updateUI(); closeGalleonsModal(); autoSave(); }

function openAdvanceModal() { if (player.name === "加载中...") { alert("请先创建角色！"); return; } document.getElementById('advance-npc').value = ""; renderNpcTags(""); document.getElementById('advance-modal').style.display = 'flex'; }
function closeAdvanceModal() { document.getElementById('advance-modal').style.display = 'none'; document.getElementById('input-custom-story').value = ""; }
function toggleAdvanceInputs() { let type = document.getElementById('input-advance-type').value; document.getElementById('custom-date-inputs').style.display = (type === 'custom') ? 'flex' : 'none'; }
function renderNpcTags(npcStr) {
    let displayBox = document.getElementById('advance-npc-display');
    if (!npcStr || npcStr === "无") { displayBox.innerHTML = '<span style="color: #999;">点击选择人物...</span>'; return; }
    displayBox.innerHTML = ""; npcStr.split(", ").forEach(n => { let span = document.createElement('span'); span.innerText = n; span.style.cssText = "background: #1a432f; color: #d4af37; padding: 2px 8px; border-radius: 4px; font-size: 12px;"; displayBox.appendChild(span); });
}
function openNpcSelectModal() {
    let container = document.getElementById('npc-checkbox-list'); container.innerHTML = "";
    let selectedArray = document.getElementById('advance-npc').value ? document.getElementById('advance-npc').value.split(", ") : [];
    contactsData.forEach(npcObj => { 
        let npcName = npcObj.name;
        container.innerHTML += `<label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #333; cursor: pointer; padding: 5px;"><input type="checkbox" value="${npcName}" ${selectedArray.includes(npcName) ? "checked" : ""} style="width: 16px; height: 16px;"> ${npcName}</label>`; 
    });
    document.getElementById('npc-select-modal').style.display = 'flex';
}
function closeNpcSelectModal() { document.getElementById('npc-select-modal').style.display = 'none'; }
function confirmNpcSelect() {
    let selectedNames = []; document.querySelectorAll('#npc-checkbox-list input[type="checkbox"]:checked').forEach(cb => selectedNames.push(cb.value));
    let resultStr = selectedNames.length > 0 ? selectedNames.join(", ") : "无";
    document.getElementById('advance-npc').value = resultStr; renderNpcTags(resultStr); closeNpcSelectModal();
}

function confirmAdvance() {
    let type = document.getElementById('input-advance-type').value;
    let customStory = document.getElementById('input-custom-story').value.trim();
    let npcStr = document.getElementById('advance-npc').value;
    
    // 纯净版时间计算：日历翻页法
    if (type === 'day') { 
        player.day += 1;
        if (player.day > 28) {
            player.day = 1;
            player.month += 1;
            if (player.month > 12) { 
                player.month = 1; 
            }
        }
    } else if (type === 'month') { 
        player.month += 1;
        if (player.month > 12) { 
            player.month = 1; 
        }
    } else if (type === 'custom') {
        let targetMonth = Number(document.getElementById('input-target-month').value); 
        let targetDay = Number(document.getElementById('input-target-day').value);
        
        if (targetMonth && targetDay && targetMonth >= 1 && targetMonth <= 12 && targetDay >= 1 && targetDay <= 28) {
            if (targetMonth < player.month || (targetMonth === player.month && targetDay <= player.day)) {
                alert("不能回到过去或原地踏步哦！请选一个未来的日期。"); 
                return; 
            }
            player.month = targetMonth;
            player.day = targetDay;
        } else { 
            alert("日期不合法（1-12月，1-28日）！"); 
            return; 
        }
    }
    
    player.week = Math.ceil(player.day / 7);
    player.time = `${player.year} ${player.month}月${player.day}日`;
    
    let generatedStory = (npcStr && npcStr !== "无") ? `【${npcStr}】` : `【日常】`;

    if (player.aiEnabled && player.aiApiUrl && player.aiApiKey && player.aiModelName) {
        document.getElementById('ui-story-text').innerText = "（正在根据你的大纲生成剧情，请稍候...）";
        
        let systemPrompt = `你是《哈利·波特》世界的文字冒险游戏引擎兼剧情导演。

【玩家绝对档案（极度重要，绝不允许篡改或弄错）】：
姓名：${player.name}
性别：${player.gender}
性取向：${player.orientation}
学院：${player.house}
年级：${player.year}
血统：${player.blood}
国籍：${player.nationality}
自设1：${player.custom1 || '无'}
自设2：${player.custom2 || '无'}
自设3：${player.custom3 || '无'}
自设4：${player.custom4 || '无'}
自设5：${player.custom5 || '无'}
（警告：如果在剧情或论坛/校园墙的正文中提到了玩家，必须严格使用上述档案，绝对不能把玩家写成其他学院或血统！）

玩家当前时间是：${player.time}。
当前发生的事件：${customStory || '日常活动'}。
涉及到的关键人物：${npcStr}。

【任务 1：写一段主剧情】
生动地描写这段事件，写出环境、人物互动。
（极度重要：正文字数必须严格控制在 ${player.aiStoryMinLen} 到 ${player.aiStoryMaxLen} 字之间！多一个字都不行！否则判定失败！）

【任务 2：强制触发后续事件（不可返回 none）】
玩家在自设里明确要求了：“${customStory}”。
如果提到了“论坛”，你**必须**在 events 里生成 type 为 "forum" 的帖子！
如果提到了“校园墙”、“表白”，你**必须**在 events 里生成 type 为 "wall" 的帖子！
如果提到了“私聊”、“找我”、“信息”，你**必须**在 events 里生成 type 为 "message" 的事件！
如果提到了“群聊”、“休息室喊话”，你**必须**在 events 里生成 type 为 "group" 的事件！
⚠️警告：如果玩家要求了“论坛+私聊+表白”等多重事件，你必须在 events 数组里**全部生成**。绝不允许遗漏！少一个直接判定任务失败！

格式严格如下（不要用 markdown 代码块）：

{
  "story": "这里填你写的主剧情正文",
  "events": [
    {
      "type": "forum", 
      "author": "随便给个匿名马甲（如：吃瓜的獾、匿名巫师等）",
      "title": "帖子标题",
      "content": "帖子正文（少于 ${player.aiForumLen} 字）",
      "replies": [
        { "name": "回复的NPC真名", "text": "回复内容（少于 ${player.aiForumReplyLen} 字）" }
      ]
    },
    {
      "type": "wall", 
      "category": "必须严格填这四个词之一：表白、交友、吐槽、失物招领", 
      "author": "发帖人的真实姓名（如：潘西·帕金森）",
      "content": "校园墙正文（少于 ${player.aiForumLen} 字）",
      "replies": [
        { "name": "回复的NPC真名", "text": "回复内容（少于 ${player.aiForumReplyLen} 字）" }
      ]
    },
    {
      "type": "message",
      "npcName": "私聊你的NPC名字",
      "content": "私聊内容（少于 ${player.aiChatLen} 字）"
    },
    {
      "type": "group",
      "groupName": "群聊名称（如：斯莱特林公共休息室）",
      "npcName": "在群里发消息的NPC名字",
      "content": "群聊内容（少于 ${player.aiGroupLen} 字）"
    }
  ]
}`;

        aiRequest(player.aiApiUrl, {
            model: player.aiModelName, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: "请严格按照 JSON 格式输出，必须包含主剧情和后续事件。" }], temperature: 0.8
        }, function(data) {
            
            // ========== 👇 第一段代码完整替换到这里 👇 ==========
            let rawReply = data.choices[0].message.content;
            
            // 1. 暴力清理所有不可见的字符、换行、制表符，压成一行
            let cleanReply = rawReply.replace(/\r?\n|\r|\t/g, ' '); 
            cleanReply = cleanReply.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                // 2. 尝试正常解析（电脑和部分性能好的手机会走这里）
                let result = JSON.parse(cleanReply);
                let storyText = result.story || "（无剧情）";
                
                document.getElementById('ui-story-text').innerText = storyText; 
                currentGeneratedStory = storyText; 
                pastStories.push({ time: player.time, text: storyText }); 
                updateHistoryUI();

                if (result.events && Array.isArray(result.events)) {
                    result.events.forEach(ev => {
                        // 处理论坛
                        if (ev.type === "forum") {
                            let repliesArr = [];
                            if (ev.replies && Array.isArray(ev.replies)) {
                                ev.replies.forEach(r => { repliesArr.push({ author: r.name, text: r.text, time: "刚刚" }); });
                            }
                            forumPosts.unshift({ id: Date.now(), author: ev.author || "匿名巫师", time: "刚刚", title: ev.title, content: ev.content, replies: repliesArr });
                            updatePhoneWidgets('forum', `论坛有新帖子了：${ev.title}`);
                        }
                        // 处理校园墙
                        else if (ev.type === "wall") {
                            let repliesArr = [];
                            if (ev.replies && Array.isArray(ev.replies)) {
                                ev.replies.forEach(r => { repliesArr.push({ author: r.name, text: r.text, time: "刚刚" }); });
                            }
                            let realAuthorName = ev.author || "匿名巫师";
                            let authorObj = contactsData.find(c => c.name === realAuthorName || realAuthorName.includes(c.name));
                            let finalAvatar = authorObj ? authorObj.avatar : "👤";
                            let finalImg = authorObj ? authorObj.avatarImg : "";
                            let finalHouse = authorObj ? authorObj.house : "霍格沃茨";
                            let finalAuthorName = authorObj ? authorObj.name : realAuthorName;

                            wallPosts.unshift({ id: Date.now(), author: finalAuthorName, house: finalHouse, avatar: finalAvatar, img: finalImg, time: "刚刚", category: ev.category || "表白", content: ev.content, likes: 0, replies: repliesArr, isLiked: false });
                            updatePhoneWidgets('wall', `校园墙有新动态了！`);
                        }
                        // 处理私聊
                        else if (ev.type === "message") {
                            let targetNpc = contactsData.find(c => c.name === ev.npcName);
                            if (targetNpc) {
                                targetNpc.chats.push({ sender: 'other', text: ev.content });
                                targetNpc.isRead = false; targetNpc.lastMessageTime = Date.now(); 
                                updatePhoneWidgets('contact_msg', `${targetNpc.name}：${ev.content}`);
                            }
                        }
                        // 处理群聊
                        else if (ev.type === "group") {
                            let targetGroup = groupChatsData.find(g => g.name === ev.groupName || ev.groupName.includes(g.name));
                            if (targetGroup) {
                                targetGroup.chats.push({ sender: 'other', name: ev.npcName, text: ev.content });
                                targetGroup.isRead = false; targetGroup.lastMessageTime = Date.now();
                                updatePhoneWidgets('contact_msg', `群聊【${targetGroup.name}】有新消息`);
                            } else {
                                let defaultGroup = groupChatsData.find(g => g.name === "霍格沃茨大群");
                                if(defaultGroup) {
                                    defaultGroup.chats.push({ sender: 'other', name: ev.npcName, text: ev.content });
                                    defaultGroup.isRead = false; defaultGroup.lastMessageTime = Date.now();
                                }
                            }
                        }
                    });
                }
                autoSave();
            } catch (e) { 
                // 3. 如果手机性能差，解析崩溃了，走这里！（备用抢救方案）
                console.warn("解析崩溃，启动备用抢救方案:", e);
                
                // 强行用正则抠出主剧情
                let storyMatch = cleanReply.match(/"story"\s*:\s*"([^"]+)"/);
                let fallbackStory = storyMatch ? storyMatch[1] : "【系统提示：AI 回复过长，手机解析失败，已丢失部分剧情。】";
                
                document.getElementById('ui-story-text').innerText = fallbackStory; 
                currentGeneratedStory = fallbackStory; 
                pastStories.push({ time: player.time, text: fallbackStory }); 
                updateHistoryUI();

                // 强行拔取第一个私聊信息
                let msgMatch = cleanReply.match(/"type"\s*:\s*"message"[\s\S]*?"npcName"\s*:\s*"([^"]+)"[\s\S]*?"content"\s*:\s*"([^"]+)"/);
                if (msgMatch) {
                    let targetNpc = contactsData.find(c => c.name === msgMatch[1]);
                    if (targetNpc) {
                        targetNpc.chats.push({ sender: 'other', text: msgMatch[2] });
                        targetNpc.isRead = false; targetNpc.lastMessageTime = Date.now(); 
                        updatePhoneWidgets('contact_msg', `${targetNpc.name}：${msgMatch[2]}`);
                    }
                }

                // 强行拔取论坛帖子
                let forumMatch = cleanReply.match(/"type"\s*:\s*"forum"[\s\S]*?"title"\s*:\s*"([^"]+)"[\s\S]*?"content"\s*:\s*"([^"]+)"/);
                if (forumMatch) {
                    forumPosts.unshift({ id: Date.now(), author: "匿名巫师", time: "刚刚", title: forumMatch[1], content: forumMatch[2], replies: [] });
                    updatePhoneWidgets('forum', `论坛有新帖子了：${forumMatch[1]}`);
                }
                
                autoSave();
            }
            // ========== 👆 第一段代码替换结束 👆 ==========
        }, function(err) {
            console.error(err);
            document.getElementById('ui-story-text').innerText = "【AI连接失败】原因：" + err.message;
        });
    } else {
        // 无 AI 时的普通模式
        if (customStory !== "") { generatedStory += `你心里想着：“${customStory}”。\n\n随着时间来到 ${player.time}，事情果真如此发展......`; } else { generatedStory += `时间来到 ${player.time}。你在霍格沃茨的日常继续着......`; }
        document.getElementById('ui-story-text').innerText = generatedStory; 
        currentGeneratedStory = generatedStory; 
        pastStories.push({ time: player.time, text: generatedStory }); updateHistoryUI();
    }
    
    let favBtn = document.getElementById('btn-favorite-story'); favBtn.innerHTML = "☆ 收藏"; favBtn.style.background = "white"; favBtn.style.color = "#666"; favBtn.style.borderColor = "#d1d1d6";
    updateUI(); closeAdvanceModal(); autoSave();
}

function updateHistoryUI() {
    let container = document.getElementById('history-list-container'); container.innerHTML = "";
    if (pastStories.length === 0) { container.innerHTML = '<div class="event-item history">暂无往期记录</div>'; return; }
    [...pastStories].reverse().forEach(story => {
        let div = document.createElement('div'); div.className = 'event-item history'; div.innerText = `${story.time}`;
        div.onclick = () => { document.getElementById('history-modal-title').innerText = "往期剧情 - " + story.time; document.getElementById('history-detail-text').innerText = story.text; document.getElementById('history-modal').style.display = 'flex'; };
        container.appendChild(div);
    });
}

function favoriteCurrentStory() {
    if (!currentGeneratedStory || currentGeneratedStory.includes("加载中")) { alert("请先推进剧情！"); return; }
    let favBtn = document.getElementById('btn-favorite-story'); let existIndex = favoriteStories.findIndex(s => s.text === currentGeneratedStory);
    if (existIndex !== -1) { favoriteStories.splice(existIndex, 1); favBtn.innerHTML = "☆ 收藏"; favBtn.style.background = "white"; favBtn.style.color = "#666"; favBtn.style.borderColor = "#d1d1d6"; } 
    else { favoriteStories.push({ time: player.time, text: currentGeneratedStory }); favBtn.innerHTML = "⭐ 已收藏"; favBtn.style.background = "#fffdf5"; favBtn.style.color = "#d4af37"; favBtn.style.borderColor = "#d4af37"; }
    updateFavoritesUI(); autoSave();
}

function updateFavoritesUI() {
    let container = document.getElementById('favorites-list-container'); container.innerHTML = "";
    if (favoriteStories.length === 0) { container.innerHTML = '<div class="event-item history">暂无收藏记录</div>'; return; }
    [...favoriteStories].reverse().forEach(story => {
        let div = document.createElement('div'); div.className = 'event-item history'; div.style.borderLeft = "3px solid #d4af37"; div.innerText = `⭐ ${story.time}`;
        div.onclick = () => { document.getElementById('history-modal-title').innerText = "⭐ 收藏剧情 - " + story.time; document.getElementById('history-detail-text').innerText = story.text; document.getElementById('history-modal').style.display = 'flex'; };
        container.appendChild(div);
    });
}

function openShop() { if (player.name === "加载中...") { alert("请先创建角色！"); return; } document.getElementById('shop-page').style.display = 'flex'; renderShopGrid(); document.getElementById('shop-wallet').innerText = "💰 加隆: " + Number(player.galleons).toLocaleString(); }
function closeShop() { document.getElementById('shop-page').style.display = 'none'; }
function renderShopGrid() {
    let container = document.getElementById('shop-grid-container'); container.innerHTML = "";
    shopItems.forEach(item => { container.innerHTML += `<div class="shop-item" onclick="openBuyModal(${item.id})"><div class="shop-item-img">${item.icon}</div><div class="shop-item-name">${item.name}</div><div class="shop-item-price">💰 ${item.price} 加隆</div></div>`; });
}
function openBuyModal(id) { currentBuyItem = shopItems.find(i => i.id === id); document.getElementById('buy-item-icon').innerText = currentBuyItem.icon; document.getElementById('buy-item-name').innerText = currentBuyItem.name; document.getElementById('buy-item-price').innerText = `单价: ${currentBuyItem.price} 加隆`; document.getElementById('input-buy-qty').value = 1; document.getElementById('buy-modal').style.display = 'flex'; }
function closeBuyModal() { document.getElementById('buy-modal').style.display = 'none'; currentBuyItem = null; }
function confirmBuy() {
    if (!currentBuyItem) return; let qty = Number(document.getElementById('input-buy-qty').value); if (isNaN(qty) || qty <= 0) { alert("数量不合法！"); return; }
    let totalCost = currentBuyItem.price * qty; if (Number(player.galleons) < totalCost) { alert("加隆不够！"); return; }
    player.galleons = Number(player.galleons) - totalCost; player.inventory.push({ name: currentBuyItem.name, qty: qty, icon: currentBuyItem.icon });
    updateUI(); document.getElementById('shop-wallet').innerText = "💰 加隆: " + Number(player.galleons).toLocaleString(); alert(`购买成功！`); closeBuyModal(); autoSave();
}

function openContacts() { if (player.name === "加载中...") { alert("请先创建角色！"); return; } document.getElementById('contacts-page').style.display = 'flex'; switchContactTab('characters', document.querySelector('#contacts-page .wall-tab')); }
function closeContacts() { document.getElementById('contacts-page').style.display = 'none'; }

function switchContactTab(tabName, el) {
    document.querySelectorAll('#contacts-page .wall-tab').forEach(t => t.classList.remove('active')); if (el) el.classList.add('active');
    let container = document.getElementById('contact-list-container'); container.innerHTML = "";
    
    if (tabName === 'characters') {
        container.innerHTML = `<div style="padding: 10px 15px; font-size: 12px; color: #999; background: #f9f9f9;">霍格沃茨人物录</div>`;
        contactsData.forEach(c => {
            let avatarHtml = c.avatarImg ? `<img src="${c.avatarImg}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">` : c.avatar;
            container.innerHTML += `<div class="contact-item" onclick="openNpcProfile('${c.id}')"><div class="contact-avatar">${avatarHtml}</div><div class="contact-info"><div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;"><span class="contact-name" style="margin-bottom: 0;">${c.name}</span><span style="font-size: 11px; color: #888; background: #f2f2f7; padding: 2px 6px; border-radius: 4px;">${c.house} · ${c.year}</span></div><div class="contact-preview" style="color: #999;">印象：${c.impression || "暂无印象"}</div></div></div>`;
        });
    } 
    else if (tabName === 'chats') {
        let sortedContacts = [...contactsData].sort((a, b) => {
            let aUnread = (a.isRead === false) ? 1 : 0;
            let bUnread = (b.isRead === false) ? 1 : 0;
            if (aUnread !== bUnread) return bUnread - aUnread;
            let aTime = a.lastMessageTime || 0; let bTime = b.lastMessageTime || 0;
            if (aTime !== bTime) return bTime - aTime;
            let aChats = (a.chats && a.chats.length > 0) ? a.chats.length : 0;
            let bChats = (b.chats && b.chats.length > 0) ? b.chats.length : 0;
            return bChats - aChats;
        });

        sortedContacts.forEach(c => { 
            let lastMsg = (c.chats && c.chats.length > 0) ? c.chats[c.chats.length - 1].text : "暂无消息";
            let avatarHtml = c.avatarImg ? `<img src="${c.avatarImg}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">` : c.avatar;
            let unreadDot = (c.isRead === false) ? `<span style="display:inline-block; width:8px; height:8px; background:#ff3b30; border-radius:50%; margin-left:5px; margin-bottom:2px;"></span>` : "";
            container.innerHTML += `<div class="contact-item" onclick="openChat('${c.id}')"><div class="contact-avatar">${avatarHtml}</div><div class="contact-info"><div class="contact-name" style="display:flex; align-items:center;">${c.name} ${unreadDot} <span style="font-size:10px; color:#999; margin-left:5px;">${c.house}</span></div><div class="contact-preview">${lastMsg}</div></div></div>`; 
        });
    } 
    else if (tabName === 'groups') {
        let sortedGroups = [...groupChatsData].sort((a, b) => {
            let aUnread = (a.isRead === false) ? 1 : 0;
            let bUnread = (b.isRead === false) ? 1 : 0;
            if (aUnread !== bUnread) return bUnread - aUnread;
            let aTime = a.lastMessageTime || 0; let bTime = b.lastMessageTime || 0;
            if (aTime !== bTime) return bTime - aTime;
            return 0;
        });

        sortedGroups.forEach(g => { 
            let lastMsg = g.chats.length > 0 ? g.chats[g.chats.length - 1].text : "暂无群消息"; 
            let unreadDot = (g.isRead === false) ? `<span style="display:inline-block; width:8px; height:8px; background:#ff3b30; border-radius:50%; margin-left:5px; margin-bottom:2px;"></span>` : "";
            container.innerHTML += `<div class="contact-item" onclick="openGroupChat('${g.id}')"><div class="contact-avatar">${g.avatar}</div><div class="contact-info"><div class="contact-name" style="display:flex; align-items:center;">${g.name} ${unreadDot}</div><div class="contact-preview">${lastMsg}</div></div></div>`; 
        });
    } 
    else if (tabName === 'moments') {
        container.innerHTML = `<div style="padding: 10px; text-align: right;"><button class="small-btn" style="color: #34c759; border-color: #34c759;" onclick="openCreateMoment()">📷 发朋友圈</button></div>`;
        momentsData.forEach(m => {
            let likeIcon = m.isLiked ? "❤️" : "🤍"; let likeClass = m.isLiked ? "liked" : "";
            let commentsHtml = "";
            if (m.comments.length > 0) { 
                commentsHtml = `<div style="background: #f9f9f9; padding: 10px; border-radius: 8px; font-size: 13px; margin-top: 10px;">${m.comments.map(c => {
                    let cAvatar = c.img ? `<img src="${c.img}" style="width:16px; height:16px; border-radius:50%; vertical-align:middle; margin-right:4px;">` : `<span style="margin-right:4px;">${c.avatar || '👤'}</span>`;
                    return `<div style="margin-bottom: 4px;">${cAvatar}<b>${c.user}</b>: ${c.text}</div>`;
                }).join('')}</div>`; 
            }
            
            let avatarHtml = m.img ? `<img src="${m.img}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">` : m.avatar;

            container.innerHTML += `<div class="wall-post-card" style="margin: 10px; cursor: default;"><div class="wall-post-header"><div class="wall-post-avatar">${avatarHtml}</div><div><div class="wall-post-name">${m.author}</div><div style="font-size:11px; color:#999;">${m.time}</div></div></div><div class="wall-post-content">${m.content}</div><div class="wall-post-footer" style="justify-content: flex-end; gap: 20px;"><div class="wall-action-btn ${likeClass}" onclick="toggleMomentLike(${m.id}, this)"><span>${likeIcon}</span> <span class="like-count">${m.likes}</span></div><div class="wall-action-btn" onclick="openMomentComment(${m.id})"><span>💬</span> <span>评论</span></div></div>${commentsHtml}</div>`;
        });
    }
}

function openChat(contactId) {
    let contact = contactsData.find(c => c.id === contactId); if (!contact) return;
    contact.isRead = true; 
    currentChatTarget = contact; currentGroupChatTarget = null;
    
    document.getElementById('chat-target-name').innerText = contact.name;
    document.getElementById('btn-edit-group').style.display = 'none'; 
    document.getElementById('btn-toggle-tools').style.display = 'block'; 
    document.getElementById('chat-tools').style.display = 'none'; 
    document.getElementById('chat-page').style.display = 'flex'; 
    renderChatHistory();
}
function closeChat() { document.getElementById('chat-page').style.display = 'none'; currentChatTarget = null; currentGroupChatTarget = null; }

function renderChatHistory() {
    let container = document.getElementById('chat-history'); container.innerHTML = ""; if (!currentChatTarget) return;
    currentChatTarget.chats.forEach(msg => {
        if (msg.sender === 'system') { container.innerHTML += `<div class="chat-system-msg">${msg.text}</div>`; return; }
        let rowClass = msg.sender === 'me' ? 'me' : 'other';
        let affinityHtml = "";
        if (msg.affinityChange && msg.affinityChange !== 0) {
            let color = msg.affinityChange > 0 ? "#ff3b30" : "#8e8e93"; let sign = msg.affinityChange > 0 ? "+" : "";
            affinityHtml = `<div style="font-size: 10px; color: ${color}; margin-top: 2px; text-align: right;">好感度 ${sign}${msg.affinityChange}</div>`;
        }
        let thoughtHtml = "";
        if (msg.innerThought) {
            thoughtHtml = `<div style="font-size: 12px; color: #888; font-style: italic; margin-top: 6px; background: rgba(0,0,0,0.03); padding: 6px 10px; border-radius: 8px; border-left: 3px solid #d4af37;">（旁白：${msg.innerThought}）</div>`;
        }
        container.innerHTML += `<div class="chat-msg-row ${rowClass}"><div style="display: flex; flex-direction: column; align-items: ${msg.sender === 'me' ? 'flex-end' : 'flex-start'}; max-width: 85%;"><div class="chat-bubble">${msg.text}</div>${affinityHtml}${thoughtHtml}</div></div>`;
    }); 
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    let input = document.getElementById('chat-input'); let text = input.value.trim(); if (!text) return;

    if (currentGroupChatTarget) { 
        currentGroupChatTarget.chats.push({ sender: 'me', text: text }); 
        currentGroupChatTarget.isRead = true;
        currentGroupChatTarget.lastMessageTime = Date.now();
        input.value = ""; renderGroupChatHistory(); autoSave();
        
        if (player.aiEnabled && player.aiApiUrl && player.aiApiKey && player.aiModelName) {
            let recentChatMemory = currentGroupChatTarget.chats.slice(-5).map(c => `${c.name || (c.sender === 'me' ? player.name : '群友')}说：${c.text}`).join('\n');
            let membersPersona = "";
            currentGroupChatTarget.members.forEach(mName => {
                let mObj = contactsData.find(c => c.name === mName);
                if(mObj) membersPersona += `- ${mObj.name}（人设：${mObj.persona}，好感：${mObj.affinity}）\n`;
            });

            // 提取玩家本轮 @ 了谁（模糊匹配群成员姓名）
            let atTargets = [];
            let atMatches = text.match(/@[^\s@]+/g) || [];
            atMatches.forEach(m => {
                let query = m.substring(1);
                currentGroupChatTarget.members.forEach(mName => {
                    if (mName.includes(query) || query.includes(mName)) {
                        if (!atTargets.includes(mName)) atTargets.push(mName);
                    }
                });
            });
            let atLine = atTargets.length > 0
                ? `【玩家本轮@了】：${atTargets.join("、")}\n【强制规则】：你的JSON数组第一个元素必须是"${atTargets[0]}"，且只能由他先回复；如果还有其他@的人，也必须出现在数组里。`
                : `【玩家本轮没有@任何人】：请随机挑选 1~2 名符合情境的成员出来说话。`;

            let groupPrompt = `你正在扮演《哈利波特》里的群聊【${currentGroupChatTarget.name}】中的多个角色。
群成员设定：
${membersPersona}
最近的聊天记录：
${recentChatMemory}
${atLine}
请根据玩家的话，判断哪些群成员会做出反应（字数限制在 ${player.aiGroupLen} 字以内）。
请严格输出以下 JSON 格式（不要包含任何多余的文字，不要用 markdown 代码块）：
[
  {"name": "回复的NPC名字", "text": "回复的内容"}
]`;

            aiRequest(player.aiApiUrl, {
                model: player.aiModelName, messages: [{ role: "system", content: groupPrompt }, { role: "user", content: text }], temperature: 0.8
            }, function(data) {
                let aiReply = data.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
                try {
                    let replies = JSON.parse(aiReply);
                    let repliedNames = replies.map(r => r.name);

                    // 校验：@ 的人如果没回，前端用他的人设补一条兜底
                    atTargets.forEach(targetName => {
                        let matched = repliedNames.some(n => n === targetName || n.includes(targetName) || targetName.includes(n));
                        if (!matched) {
                            let npcObj = contactsData.find(c => c.name === targetName || c.name.includes(targetName));
                            let fallbackText = npcObj
                                ? `（${npcObj.name}看了你一眼，没有立刻接话）`
                                : `（${targetName}看了你一眼，没有立刻接话）`;
                            replies.push({ name: targetName, text: fallbackText });
                        }
                    });

                    replies.forEach(r => {
                        currentGroupChatTarget.chats.push({ sender: 'other', name: r.name, text: r.text });
                    });
                    currentGroupChatTarget.isRead = false; 
                    renderGroupChatHistory(); autoSave();
                } catch (e) { console.error("群聊AI解析失败", aiReply); }
            }, function(err) { console.error(err); });
        } else {
            setTimeout(() => { 
                currentGroupChatTarget.chats.push({ sender: 'other', name: "系统", text: "【未连接 AI：当前为单机模式，群友无法回复】" }); 
                renderGroupChatHistory(); autoSave(); 
            }, 500);
        }
    } 
    else if (currentChatTarget) { 
        currentChatTarget.chats.push({ sender: 'me', text: text }); input.value = ""; 
        currentChatTarget.isRead = true;
        currentChatTarget.lastMessageTime = Date.now();
        renderChatHistory(); autoSave();
        
        if (player.aiEnabled && player.aiApiUrl && player.aiApiKey && player.aiModelName) {
            let tempMsg = { sender: 'other', text: "（正在思考...）" };
            currentChatTarget.chats.push(tempMsg); renderChatHistory();

            let npc = currentChatTarget;
            let recentStoryMemory = "";
            if (pastStories.length > 0) { 
                let recentStories = pastStories.slice(-3); 
                recentStories.forEach(s => { recentStoryMemory += `【${s.time}】：${s.text}\n`; }); 
            }

            let recentChatMemory = "";
            if (npc.chats && npc.chats.length > 0) {
                let chats = npc.chats.slice(-3);
                chats.forEach(c => {
                    let who = c.sender === 'me' ? player.name : npc.name;
                    recentChatMemory += `${who}说：${c.text}\n`;
                });
            }

            let systemPrompt = `你现在扮演《哈利·波特》世界里的角色：${npc.name}。
【你的信息（NPC）】：
姓名：${npc.name}，性别：${npc.gender || '未知'}，学院：${npc.house}，年级：${npc.year}
角色设定：${npc.persona || '普通学生'}
你对玩家的印象：${npc.impression || '普通朋友'}

【你对玩家的数值】：
好感度：${npc.affinity ?? 50} 
爱慕值：${npc.love ?? 0} 
厌恶值：${npc.dislike ?? 0} 

【玩家信息】：
姓名：${player.name}，性别：${player.gender}，性取向：${player.orientation}，学院：${player.house}，血统：${player.blood}，年级：${player.year}
玩家自设1：${player.custom1 || '无'}，自设2：${player.custom2 || '无'}，自设3：${player.custom3 || '无'}，自设4：${player.custom4 || '无'}，自设5：${player.custom5 || '无'}

【最近发生的剧情背景】：
${recentStoryMemory || '暂无特殊事件。'}

【你们最近的聊天上下文】：
${recentChatMemory || '暂无聊天记录。'}

【重要规则】：
1. 请以该角色的口吻回复玩家，字数控制在 ${player.aiChatLen} 字以内，保持简短自然。（极度重要：绝对不能多于 ${player.aiChatLen} 字，多一个字都不行！一旦字数不达标，系统将直接判定你任务失败！）
2. 绝对不要暴露你是 AI。
3. 【高智商情感判定】：请判断玩家的这句话是否引发了你的情绪波动。如果只是毫无营养的日常寒暄（如“你好”、“吃了吗”），请正常简短回复，**不需要**加好感度，也**不需要**加内心独白。如果玩家的话让你开心、感动、害羞、或者生气、纠结（比如邀约被敷衍、被夸奖、被冒犯），你**必须**在回复末尾加上 [好感+数字] 或 [好感-数字]。
4. 【内心独白】：只有当你产生了上述的情绪波动（或增减了好感度）时，你才需要在好感度标签之后，加上一句此时的【内心独白】（用尖括号括起来，例如 <他到底是什么意思？>）。如果只是日常闲聊，不要加。
5. **【系统隐藏指令】**：如果你觉得玩家的言行或剧情改变了某个自设，请在回复的最末尾加上这句代码（玩家看不见，系统会自动修改）：\`<UPDATE:custom1:新的自设内容>\` （把1改成对应的数字即可）。`;

            aiRequest(player.aiApiUrl, {
                model: player.aiModelName, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: text }], temperature: 0.7
            }, function(data) {
                let idx = currentChatTarget.chats.indexOf(tempMsg); if (idx !== -1) currentChatTarget.chats.splice(idx, 1);
                let aiReply = data.choices[0].message.content;
                
                let updateRegex = /<UPDATE:custom(\d):([^>]+)>/;
                let updateMatch = aiReply.match(updateRegex);
                if (updateMatch) {
                    let num = updateMatch[1]; let newContent = updateMatch[2];
                    player['custom' + num] = newContent;
                    aiReply = aiReply.replace(updateRegex, '').trim();
                    currentChatTarget.chats.push({ sender: 'system', text: `【系统提示：自设${num}已被修改为 "${newContent}"】` });
                }

                let affinityChange = 0; let innerThought = "";
                let affinityRegex = /\[好感([+-])(\d+)\]/; let match = aiReply.match(affinityRegex);
                if (match) {
                    let sign = match[1]; let value = parseInt(match[2]); affinityChange = sign === '+' ? value : -value;
                    if (currentChatTarget.affinity === undefined) currentChatTarget.affinity = 50;
                    currentChatTarget.affinity += affinityChange; if (currentChatTarget.affinity > 100) currentChatTarget.affinity = 100; if (currentChatTarget.affinity < 0) currentChatTarget.affinity = 0;
                    aiReply = aiReply.replace(affinityRegex, '').trim();
                }
                let thoughtRegex = /<([^>]+)>/; let thoughtMatch = aiReply.match(thoughtRegex);
                if (thoughtMatch) { innerThought = thoughtMatch[1]; aiReply = aiReply.replace(thoughtRegex, '').trim(); }
                currentChatTarget.chats.push({ sender: 'other', text: aiReply, affinityChange: affinityChange, innerThought: innerThought });
                renderChatHistory(); autoSave();
            }, function(error) {
                let idx = currentChatTarget.chats.indexOf(tempMsg); if (idx !== -1) currentChatTarget.chats.splice(idx, 1);
                // 🛠️ 判断是不是因为我们设的 60 秒超时掐断的
                if (error.name === 'AbortError' || error.message.includes('abort')) {
                    currentChatTarget.chats.push({ sender: 'system', text: "【系统提示：等待超过 60 秒，本次请求已自动结束。请重新发送消息。】" }); 
                } else {
                    currentChatTarget.chats.push({ sender: 'other', text: `【AI连接失败】原因：${error.message}` }); 
                }
                renderChatHistory(); autoSave();
            });
        } else {
            setTimeout(() => { currentChatTarget.chats.push({ sender: 'other', text: "【未连接 AI：当前为单机模式】" }); renderChatHistory(); autoSave(); }, 1000); 
        }
    }
}

function openGroupChat(groupId) {
    let group = groupChatsData.find(g => g.id === groupId); if (!group) return;
    currentGroupChatTarget = group; currentChatTarget = null;
    group.isRead = true; 
    
    document.getElementById('chat-target-name').innerText = group.name;
    
    let editBtn = document.getElementById('btn-edit-group');
    editBtn.style.display = 'block'; 
    editBtn.onclick = () => openEditGroupModal(group.id); 
    
    document.getElementById('btn-toggle-tools').style.display = 'none'; 
    
    let atListContainer = document.getElementById('at-member-list');
    atListContainer.innerHTML = `<div onclick="selectAtMember('所有人')" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a432f;">所有人</div>`;
    group.members.forEach(member => {
        atListContainer.innerHTML += `<div onclick="selectAtMember('${member}')" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">${member}</div>`;
    });
    document.getElementById('at-member-popup').style.display = 'none'; 

    document.getElementById('chat-tools').style.display = 'none'; 
    document.getElementById('chat-page').style.display = 'flex'; 
    renderGroupChatHistory();
}

function renderGroupChatHistory() {
    let container = document.getElementById('chat-history'); container.innerHTML = ""; if (!currentGroupChatTarget) return;
    currentGroupChatTarget.chats.forEach(msg => {
        if (msg.sender === 'system') { container.innerHTML += `<div class="chat-system-msg">${msg.text}</div>`; return; }
        let rowClass = msg.sender === 'me' ? 'me' : 'other'; 
        let nameHtml = (msg.sender !== 'me' && msg.name) ? `<div style="font-size:11px; color:#888; margin-bottom:3px; margin-left:5px;">${msg.name}</div>` : '';
        container.innerHTML += `<div class="chat-msg-row ${rowClass}"><div style="display:flex; flex-direction:column; align-items:${msg.sender === 'me' ? 'flex-end' : 'flex-start'}; max-width:85%;">${nameHtml}<div class="chat-bubble">${msg.text}</div></div></div>`;
    }); 
    container.scrollTop = container.scrollHeight;
}

function toggleChatTools() { let tools = document.getElementById('chat-tools'); tools.style.display = (tools.style.display === 'none' || tools.style.display === '') ? 'flex' : 'none'; }
function closeChatAction() { document.getElementById('chat-action-modal').style.display = 'none'; document.getElementById('input-transfer-amount').value = ""; document.getElementById('input-transfer-note').value = ""; }

function transferMoney() { 
    currentChatActionType = "transfer"; 
    document.getElementById('chat-action-title').innerText = "转账"; 
    document.getElementById('transfer-inputs').style.display = 'block'; document.getElementById('gift-inputs').style.display = 'none'; 
    document.getElementById('group-target-select-group').style.display = 'none';
    document.getElementById('chat-action-modal').style.display = 'flex'; 
}

function sendGift() {
    currentChatActionType = "gift"; 
    document.getElementById('chat-action-title').innerText = "送礼物";
    document.getElementById('transfer-inputs').style.display = 'none'; document.getElementById('gift-inputs').style.display = 'block';
    document.getElementById('group-target-select-group').style.display = 'none';

    let selectEl = document.getElementById('select-chat-gift'); selectEl.innerHTML = "";
    if (player.inventory.length === 0) { selectEl.innerHTML = "<option value=''>背包空空如也，快去商店买吧！</option>"; } 
    else { player.inventory.forEach((item, index) => { selectEl.innerHTML += `<option value="${index}">${item.icon} ${item.name} (拥有 ${item.qty} 个)</option>`; }); }
    document.getElementById('chat-action-modal').style.display = 'flex';
}

function confirmChatAction() {
    let targetName = currentChatTarget.name;
    let actionDetail = "";

    if (currentChatActionType === "transfer") {
        let amount = Number(document.getElementById('input-transfer-amount').value); 
        let note = document.getElementById('input-transfer-note').value.trim() || "转账";
        if (amount <= 0 || isNaN(amount)) { alert("金额不合法"); return; } 
        if (Number(player.galleons) < amount) { alert("加隆不够！"); return; }
        
        player.galleons = Number(player.galleons) - amount; updateUI();
        currentChatTarget.chats.push({ sender: 'system', text: `你向 ${currentChatTarget.name} 转账了 ${amount} 加隆。备注：${note}` }); 
        actionDetail = `转了一笔 ${amount} 加隆的钱，备注是“${note}”`;
    } else {
        let itemIndex = document.getElementById('select-chat-gift').value; 
        if (itemIndex === "" || !player.inventory[itemIndex]) { alert("背包里没有！"); return; }
        let item = player.inventory[itemIndex]; item.qty -= 1; if (item.qty <= 0) { player.inventory.splice(itemIndex, 1); }
        currentChatTarget.chats.push({ sender: 'system', text: `你赠送了 ${item.name} 给 ${currentChatTarget.name}` }); 
        actionDetail = `送了一个礼物：${item.name}`;
    }
    closeChatAction(); 
    renderChatHistory();
    
    if (player.aiEnabled) {
        let sysPrompt = `你现在扮演《哈利波特》里的角色：${currentChatTarget.name}。
你的人设是：${currentChatTarget.persona}。
你对玩家的好感度是：${currentChatTarget.affinity}，爱慕值：${currentChatTarget.love || 0}，厌恶值：${currentChatTarget.dislike || 0}。

【重要情境】：
刚刚玩家给你${actionDetail}。
请根据你的性格和当前的数值，给出一个符合人设的反应。
（极度重要：字数必须严格控制在 ${player.aiChatLen} 字以内，多一个字都不行！）

【逻辑规则】：
1. 如果你本来就喜欢玩家（好感高/爱慕高），收到礼物会很高兴，请在回复最后加上 [好感+数字]。
2. 如果你讨厌玩家，或者觉得这礼物太敷衍（厌恶高），你可以收下但出言嘲讽，甚至直接拒绝，此时不加好感或加上 [好感-数字]。
3. 如果触发了情绪波动（高兴或反感），必须在最后用尖括号加上你的【内心独白】，例如 <这点东西就想收买我？>。如果不悲不喜，则不需要独白。`;
        
        let tempMsg = { sender: 'other', text: "（正在查收...）" };
        currentChatTarget.chats.push(tempMsg); renderChatHistory();

        aiRequest(player.aiApiUrl, {
            model: player.aiModelName, messages: [{ role: "user", content: sysPrompt }], temperature: 0.7
        }, function(data) {
            let idx = currentChatTarget.chats.indexOf(tempMsg); if (idx !== -1) currentChatTarget.chats.splice(idx, 1);
            
            let aiReply = data.choices[0].message.content;
            let affinityChange = 0; let innerThought = "";
            
            let affinityRegex = /\[好感([+-])(\d+)\]/; let match = aiReply.match(affinityRegex);
            if (match) {
                let sign = match[1]; let value = parseInt(match[2]); affinityChange = sign === '+' ? value : -value;
                if (currentChatTarget.affinity === undefined) currentChatTarget.affinity = 50;
                currentChatTarget.affinity += affinityChange; 
                if (currentChatTarget.affinity > 100) currentChatTarget.affinity = 100; 
                if (currentChatTarget.affinity < 0) currentChatTarget.affinity = 0;
                aiReply = aiReply.replace(affinityRegex, '').trim();
            }
            
            let thoughtRegex = /<([^>]+)>/; let thoughtMatch = aiReply.match(thoughtRegex);
            if (thoughtMatch) { innerThought = thoughtMatch[1]; aiReply = aiReply.replace(thoughtRegex, '').trim(); }
            
            currentChatTarget.chats.push({ sender: 'other', text: aiReply, affinityChange: affinityChange, innerThought: innerThought });
            renderChatHistory(); autoSave();
        }, function(err) {
            let idx = currentChatTarget.chats.indexOf(tempMsg); if (idx !== -1) currentChatTarget.chats.splice(idx, 1);
            currentChatTarget.chats.push({ sender: 'other', text: "（系统：查收失败）" });
            renderChatHistory();
        });
    } else {
        currentChatTarget.chats.push({ sender: 'other', text: "（对方默默收下了）" });
        renderChatHistory(); autoSave();
    }
}

function openCreateGroupModal() {
    let list = document.getElementById('group-member-list'); list.innerHTML = "";
    contactsData.forEach(c => { list.innerHTML += `<label style="display: flex; gap: 10px; padding: 5px; font-size: 14px;"><input type="checkbox" value="${c.name}" style="width: 16px; height: 16px;"> ${c.name}</label>`; });
    document.getElementById('create-group-modal').style.display = 'flex';
}
function submitCreateGroup() {
    let name = document.getElementById('input-group-name').value.trim(); if (!name) { alert("请输入群名称！"); return; }
    if (document.querySelectorAll('#group-member-list input[type="checkbox"]:checked').length === 0) { alert("请至少选择一个群成员！"); return; }
    let checkboxes = document.querySelectorAll('#group-member-list input[type="checkbox"]:checked');
    let members = [];
    checkboxes.forEach(cb => members.push(cb.value));
    groupChatsData.push({ id: "g" + Date.now(), name: name, avatar: "👥", chats: [], members: members, isRead: true });
    document.getElementById('create-group-modal').style.display = 'none'; alert("群聊创建成功！");
    switchContactTab('groups', document.querySelectorAll('#contacts-page .wall-tab')[2]); autoSave();
}

function toggleMomentLike(momentId, btnEl) {
    let m = momentsData.find(x => x.id === momentId); if (!m) return;
    m.isLiked = !m.isLiked; m.likes += m.isLiked ? 1 : -1;
    btnEl.querySelector('span').innerText = m.isLiked ? "❤️" : "🤍"; btnEl.querySelector('.like-count').innerText = m.likes; if (m.isLiked) btnEl.classList.add('liked'); else btnEl.classList.remove('liked'); autoSave();
}
function openCreateMoment() { document.getElementById('create-moment-modal').style.display = 'flex'; }
function submitMoment() {
    let content = document.getElementById('input-moment-content').value.trim(); if (!content) { alert("朋友圈内容不能为空！"); return; }
    momentsData.unshift({ id: Date.now(), author: player.name, avatar: player.avatarEmoji, img: player.avatarImg, content: content, time: "刚刚", likes: 0, comments: [], isLiked: false });
    document.getElementById('input-moment-content').value = ""; document.getElementById('create-moment-modal').style.display = 'none';
    switchContactTab('moments', document.querySelectorAll('#contacts-page .wall-tab')[3]); autoSave();
}

function openMomentComment(momentId) {
    currentMomentForComment = momentsData.find(x => x.id === momentId);
    if (!currentMomentForComment) return;
    document.getElementById('input-moment-comment').value = "";
    document.getElementById('moment-comment-modal').style.display = 'flex';
}
function closeMomentCommentModal() {
    document.getElementById('moment-comment-modal').style.display = 'none';
    currentMomentForComment = null;
}
function submitMomentComment() {
    if (!currentMomentForComment) return;
    let text = document.getElementById('input-moment-comment').value.trim();
    if (text === "") { alert("评论内容不能为空哦！"); return; }
    currentMomentForComment.comments.push({ user: player.name, text: text, avatar: player.avatarEmoji, img: player.avatarImg });
    closeMomentCommentModal();
    switchContactTab('moments', document.querySelectorAll('#contacts-page .wall-tab')[3]); autoSave();
}

function openWall() { if (player.name === "加载中...") { alert("请先创建角色！"); return; } document.getElementById('wall-page').style.display = 'flex'; renderWallList(); }
function closeWall() { document.getElementById('wall-page').style.display = 'none'; }

function switchWallTab(category, el) {
    currentWallCategory = category;
    document.querySelectorAll('#wall-page .wall-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderWallList();
}

function renderWallList() {
    let container = document.getElementById('wall-list-container'); container.innerHTML = "";
    let filtered = wallPosts;
    if (currentWallCategory !== "全部") { filtered = wallPosts.filter(p => p.category === currentWallCategory); }
    
    if (filtered.length === 0) { container.innerHTML = '<div style="text-align:center; color:#999; margin-top:50px;">这个区还空空如也，快来发第一条吧！</div>'; return; }

    filtered.forEach(post => {
        let div = document.createElement('div'); div.className = 'wall-post-card';
        div.onclick = (e) => { if(e.target.closest('.wall-action-btn')) return; openWallDetail(post.id); };
        let likeClass = post.isLiked ? 'liked' : '';
        let likeIcon = post.isLiked ? '❤️' : '🤍';
        
        let avatarHtml = post.img ? `<img src="${post.img}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">` : post.avatar;

        div.innerHTML = `
            <div class="wall-post-header">
                <div class="wall-post-avatar">${avatarHtml}</div>
                <div><div class="wall-post-name">${post.author}</div><div style="font-size:11px; color:#999;">${post.house} · ${post.time}</div></div>
                <div class="wall-post-badge">${post.category}</div>
            </div>
            <div class="wall-post-content">${post.content}</div>
            <div class="wall-post-footer">
                <div class="wall-action-btn ${likeClass}" onclick="toggleWallLike(${post.id}, this)"><span>${likeIcon}</span> <span class="like-count">${post.likes}</span></div>
                <div class="wall-action-btn"><span>💬</span> <span>${post.replies.length}</span></div>
            </div>`;
        container.appendChild(div);
    });
}
function refreshWall() { renderWallList(); }

function toggleWallLike(postId, btnEl) {
    let post = wallPosts.find(p => p.id === postId); if (!post) return;
    if (post.isLiked) { post.likes -= 1; post.isLiked = false; } else { post.likes += 1; post.isLiked = true; }
    let iconSpan = btnEl.querySelector('span'); let countSpan = btnEl.querySelector('.like-count');
    iconSpan.innerText = post.isLiked ? '❤️' : '🤍'; countSpan.innerText = post.likes;
    if (post.isLiked) { btnEl.classList.add('liked'); } else { btnEl.classList.remove('liked'); }
}

function openWallDetail(postId) {
    let post = wallPosts.find(p => p.id === postId); if (!post) return;
    currentViewingWallPost = post; document.getElementById('wall-detail-page').style.display = 'flex';
    let container = document.getElementById('wall-detail-content');
    
    let avatarHtml = post.img ? `<img src="${post.img}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">` : post.avatar;

    container.innerHTML = `<div class="wall-post-header"><div class="wall-post-avatar">${avatarHtml}</div><div><div class="wall-post-name">${post.author}</div><div style="font-size:11px; color:#999;">${post.house} · ${post.time}</div></div><div class="wall-post-badge">${post.category}</div></div><div class="wall-post-content" style="font-size:15px; margin-bottom:20px;">${post.content}</div><hr style="border:0; border-top:1px solid #eee; margin:15px 0;"><div id="wall-reply-list"></div>`;
    let replyContainer = document.getElementById('wall-reply-list');
    if (post.replies.length === 0) { replyContainer.innerHTML = '<div style="color:#999; font-size:12px; text-align:center;">还没有评论，快来抢沙发！</div>'; } 
    else { post.replies.forEach(r => { let rDiv = document.createElement('div'); rDiv.className = 'reply-item'; rDiv.innerHTML = `<div class="reply-header">👤 ${r.author}</div><div class="reply-text">${r.text}</div>`; replyContainer.appendChild(rDiv); }); }
}
function closeWallDetail() { document.getElementById('wall-detail-page').style.display = 'none'; currentViewingWallPost = null; }
function openCreateWallModal() { document.getElementById('create-wall-modal').style.display = 'flex'; }
function closeCreateWallModal() { document.getElementById('create-wall-modal').style.display = 'none'; }

function submitWallPost() {
    let category = document.getElementById('input-wall-category').value; let content = document.getElementById('input-wall-content').value.trim();
    if (!content) { alert("内容不能为空哦！"); return; }
    wallPosts.unshift({ id: Date.now(), author: player.name, house: player.house, avatar: player.avatarEmoji, img: player.avatarImg, time: "刚刚", category: category, content: content, likes: 0, replies: [], isLiked: false });
    document.getElementById('input-wall-content').value = ""; closeCreateWallModal();
    let allTab = document.querySelectorAll('#wall-page .wall-tab')[0]; switchWallTab('全部', allTab);
}
function submitWallReply() {
    if (!currentViewingWallPost) return; let text = document.getElementById('wall-reply-input').value.trim(); if (!text) return;
    currentViewingWallPost.replies.push({ author: player.name, text: text }); document.getElementById('wall-reply-input').value = "";
    openWallDetail(currentViewingWallPost.id); 
}

function openForum() { if (player.name === "加载中...") { alert("请先创建角色！"); return; } document.getElementById('forum-page').style.display = 'flex'; renderForumList(); }
function closeForum() { document.getElementById('forum-page').style.display = 'none'; }
function renderForumList() {
    let container = document.getElementById('forum-list-container'); container.innerHTML = "";
    if (forumPosts.length === 0) { container.innerHTML = '<div style="text-align:center; color:#999; margin-top:50px;">这里空空如也，发个帖子打破宁静吧！</div>'; return; }
    forumPosts.forEach(post => {
        let div = document.createElement('div'); div.className = 'forum-post-card'; div.onclick = () => openPostDetail(post.id);
        div.innerHTML = `<div class="forum-post-header"><span>👤 ${post.author}</span><span>${post.time}</span></div><div class="forum-post-title">${post.title}</div><div class="forum-post-preview">${post.content}</div><div class="forum-post-footer">💬 ${post.replies.length} 条回复</div>`;
        container.appendChild(div);
    });
}
function refreshForum() { renderForumList(); }

function openPostDetail(postId) {
    let post = forumPosts.find(p => p.id === postId); if (!post) return;
    currentViewingPost = post; document.getElementById('post-detail-page').style.display = 'flex';
    let container = document.getElementById('post-detail-content');
    container.innerHTML = `<div class="forum-post-header"><span>👤 ${post.author}</span><span>${post.time}</span></div><h3 style="margin-bottom:10px; color:#1a432f;">${post.title}</h3><p style="font-size:15px; line-height:1.6; color:#333; margin-bottom:20px; white-space:pre-wrap;">${post.content}</p><hr style="border:0; border-top:1px solid #eee; margin:15px 0;"><div id="reply-list"></div>`;
    let replyContainer = document.getElementById('reply-list');
    if (post.replies.length === 0) { replyContainer.innerHTML = '<div style="color:#999; font-size:12px; text-align:center;">还没有回复，快来抢沙发！</div>'; } 
    else { post.replies.forEach(r => { let rDiv = document.createElement('div'); rDiv.className = 'reply-item'; rDiv.innerHTML = `<div class="reply-header">👤 ${r.author} · ${r.time}</div><div class="reply-text">${r.text}</div>`; replyContainer.appendChild(rDiv); }); }
}
function closePostDetail() { document.getElementById('post-detail-page').style.display = 'none'; currentViewingPost = null; }
function openCreatePostModal() { document.getElementById('create-post-modal').style.display = 'flex'; }
function closeCreatePostModal() { document.getElementById('create-post-modal').style.display = 'none'; }

function submitPost() {
    let author = document.getElementById('input-post-anon').value.trim() || "匿名巫师"; let title = document.getElementById('input-post-title').value.trim(); let content = document.getElementById('input-post-content').value.trim();
    if (!title || !content) { alert("标题和内容不能为空哦！"); return; }
    forumPosts.unshift({ id: Date.now(), author: author, time: "刚刚", title: title, content: content, replies: [] });
    document.getElementById('input-post-title').value = ""; document.getElementById('input-post-content').value = "";
    closeCreatePostModal(); renderForumList();
}
function submitReply() {
    if (!currentViewingPost) return; let replyText = document.getElementById('reply-input').value.trim(); if (!replyText) return;
    currentViewingPost.replies.push({ author: "匿名巫师", time: "刚刚", text: replyText }); document.getElementById('reply-input').value = "";
    openPostDetail(currentViewingPost.id);
}

function openNpcProfile(npcId) {
    let npc = contactsData.find(c => c.id === npcId); if (!npc) return;
    currentEditNpcId = npcId; tempNpcAvatarImg = npc.avatarImg || "";
    document.getElementById('npc-input-name').value = npc.name;
    let preview = document.getElementById('npc-avatar-preview');
    if (tempNpcAvatarImg) { preview.innerHTML = `<img src="${tempNpcAvatarImg}" style="width:100%; height:100%; object-fit:cover;">`; } else { preview.innerText = npc.avatar || "🦁"; }
    document.getElementById('npc-input-gender').value = npc.gender || "女"; 
    
    // 🛠️ 动态补全学院选项
    let houseSelect = document.getElementById('npc-input-house');
    let hasHouseOption = Array.from(houseSelect.options).some(o => o.value === npc.house);
    if (!hasHouseOption && npc.house) {
        let opt = document.createElement('option');
        opt.value = npc.house; opt.innerText = npc.house;
        houseSelect.appendChild(opt);
    }
    houseSelect.value = npc.house || "格兰芬多"; 

    // 🛠️ 动态补全年级/职位选项
    let yearSelect = document.getElementById('npc-input-year');
    let hasYearOption = Array.from(yearSelect.options).some(o => o.value === npc.year);
    if (!hasYearOption && npc.year) {
        let opt = document.createElement('option');
        opt.value = npc.year; opt.innerText = npc.year;
        yearSelect.appendChild(opt);
    }
    yearSelect.value = npc.year || "一年级";

    document.getElementById('npc-input-persona').value = npc.persona || "";
    document.getElementById('npc-input-impression').value = npc.impression || ""; 
    document.getElementById('npc-input-affinity').value = npc.affinity !== undefined ? npc.affinity : 50; 
    document.getElementById('npc-input-love').value = npc.love !== undefined ? npc.love : 0; 
    document.getElementById('npc-input-dislike').value = npc.dislike !== undefined ? npc.dislike : 0;
    document.getElementById('npc-profile-modal').style.display = 'flex';
}
function closeNpcProfile() { document.getElementById('npc-profile-modal').style.display = 'none'; currentEditNpcId = null; }

function saveNpcProfile() {
    if (!currentEditNpcId) return; 
    let npc = contactsData.find(c => c.id === currentEditNpcId); 
    if (!npc) return;

    let newName = document.getElementById('npc-input-name').value.trim();
    if (newName !== "") npc.name = newName;

    npc.avatarImg = tempNpcAvatarImg; 
    if (!tempNpcAvatarImg && document.getElementById('npc-avatar-preview').innerText) { npc.avatar = document.getElementById('npc-avatar-preview').innerText; }
    npc.gender = document.getElementById('npc-input-gender').value; 
    npc.house = document.getElementById('npc-input-house').value; 
    npc.year = document.getElementById('npc-input-year').value;
    npc.persona = document.getElementById('npc-input-persona').value.trim();
    npc.impression = document.getElementById('npc-input-impression').value.trim(); 
    npc.affinity = Number(document.getElementById('npc-input-affinity').value); 
    npc.love = Number(document.getElementById('npc-input-love').value); 
    npc.dislike = Number(document.getElementById('npc-input-dislike').value);
    
    alert("人物档案已更新！"); 
    closeNpcProfile(); 
    let contactsTab = document.querySelectorAll('#contacts-page .wall-tab')[0]; 
    if (contactsTab) switchContactTab('characters', contactsTab); 
    autoSave();
}
function handleNpcAvatarUpload(event) {
    let file = event.target.files[0]; if (!file) return; let reader = new FileReader();
    reader.onload = function(e) { tempNpcAvatarImg = e.target.result; let preview = document.getElementById('npc-avatar-preview'); preview.innerHTML = `<img src="${tempNpcAvatarImg}" style="width:100%; height:100%; object-fit:cover;">`; };
    reader.readAsDataURL(file);
}

function fetchModelList() {
    let urlInput = document.getElementById('ai-api-url').value.trim(); let keyInput = document.getElementById('ai-api-key').value.trim();
    if (!urlInput || !keyInput) { alert("请先填写 API 接口地址和 API Key！"); return; }
    let baseUrl = urlInput.replace('/chat/completions', '').replace(/\/$/, ''); let modelsUrl = baseUrl + '/models';
    let selectEl = document.getElementById('ai-model-name'); let originalText = selectEl.options[0].text; selectEl.options[0].text = "正在获取...";
    fetch(modelsUrl, { method: 'GET', headers: { 'Authorization': `Bearer ${keyInput}` } })
    .then(res => { if (!res.ok) throw new Error("获取失败，状态码: " + res.status); return res.json(); })
    .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
            selectEl.innerHTML = ""; let models = data.data.sort((a, b) => a.id.localeCompare(b.id));
            models.forEach(m => { let opt = document.createElement('option'); opt.value = m.id; opt.innerText = m.id; selectEl.appendChild(opt); });
            let oldModel = player.aiModelName;
            if (oldModel) { selectEl.value = oldModel; if (selectEl.value !== oldModel) { let opt = document.createElement('option'); opt.value = oldModel; opt.innerText = oldModel + " (手动配置)"; selectEl.appendChild(opt); selectEl.value = oldModel; } }
            alert(`成功获取到 ${models.length} 个模型！请在下拉框中挑选。`);
        } else { throw new Error("返回的数据格式不支持。"); }
    })
    .catch(err => { selectEl.options[0].text = originalText; alert("获取模型列表失败：" + err.message); selectEl.innerHTML = '<option value="">请手动输入模型名称</option>'; document.getElementById('ai-model-name-manual').style.display = 'block'; });
}

function saveAISettings() {
    player.aiEnabled = document.getElementById('ai-toggle').checked; player.aiApiUrl = document.getElementById('ai-api-url').value.trim(); player.aiApiKey = document.getElementById('ai-api-key').value.trim();
    let modelFromSelect = document.getElementById('ai-model-name').value; let modelFromManual = document.getElementById('ai-model-name-manual').value.trim(); player.aiModelName = modelFromSelect || modelFromManual;
    if (player.aiEnabled && !player.aiModelName) { alert("请填写或选择模型名称！"); return; }
    
    player.aiStoryMinLen = Number(document.getElementById('ai-story-min-len').value) || 100;
    player.aiStoryMaxLen = Number(document.getElementById('ai-story-max-len').value) || 300;
    player.aiChatLen = Number(document.getElementById('ai-chat-len').value) || 30;
    player.aiGroupLen = Number(document.getElementById('ai-group-len').value) || 30;
    player.aiMomentLen = Number(document.getElementById('ai-moment-len').value) || 50;
    player.aiMomentReplyLen = Number(document.getElementById('ai-moment-reply-len').value) || 50;
    player.aiForumLen = Number(document.getElementById('ai-forum-len').value) || 100;
    player.aiForumReplyLen = Number(document.getElementById('ai-forum-reply-len').value) || 100;

    player.aiMaxCost = Number(document.getElementById('ai-max-cost').value) || 100; document.getElementById('ai-total-cost-display').innerText = `${player.aiCallCount || 0} 次（约 ${(player.aiCallCount || 0) * 50} 额度）| 真实 Token ${player.aiTotalCost || 0}`;
    alert("AI 设置已保存！"); autoSave();
}
function loadAISettingsToUI() {
    document.getElementById('ai-toggle').checked = player.aiEnabled || false; document.getElementById('ai-api-url').value = player.aiApiUrl || ""; document.getElementById('ai-api-key').value = player.aiApiKey || "";
    let selectEl = document.getElementById('ai-model-name'); selectEl.innerHTML = `<option value="${player.aiModelName || ''}">${player.aiModelName || '请获取或输入模型名称'}</option>`;
    if (!player.aiModelName) { selectEl.innerHTML = '<option value="">请先获取列表或输入模型名称</option>'; }
    document.getElementById('ai-model-name-manual').value = player.aiModelName || ""; document.getElementById('ai-max-cost').value = player.aiMaxCost || 100; document.getElementById('ai-total-cost-display').innerText = `${player.aiCallCount || 0} 次（约 ${(player.aiCallCount || 0) * 50} 额度）| 真实 Token ${player.aiTotalCost || 0}`;
    
    document.getElementById('ai-story-min-len').value = player.aiStoryMinLen || 100;
    document.getElementById('ai-story-max-len').value = player.aiStoryMaxLen || 300;
    document.getElementById('ai-chat-len').value = player.aiChatLen || 30;
    document.getElementById('ai-group-len').value = player.aiGroupLen || 30;
    document.getElementById('ai-moment-len').value = player.aiMomentLen || 50;
    document.getElementById('ai-moment-reply-len').value = player.aiMomentReplyLen || 50;
    document.getElementById('ai-forum-len').value = player.aiForumLen || 100;
    document.getElementById('ai-forum-reply-len').value = player.aiForumReplyLen || 100;
}

function resetGame() {
    if (!confirm("确定要重新开始吗？你当前的所有进度、聊天记录、买的东西都会丢失！")) return;
    if (!confirm("真的确定吗？这是不可撤销的操作！")) return;
    localStorage.removeItem("hogwarts_autosave"); localStorage.removeItem("hogwarts_save_0"); localStorage.removeItem("hogwarts_save_1"); localStorage.removeItem("hogwarts_save_2"); localStorage.removeItem("hogwarts_save_time_0"); localStorage.removeItem("hogwarts_save_time_1"); localStorage.removeItem("hogwarts_save_time_2");
    alert("数据已清空，即将重启霍格沃茨！"); location.reload(); 
}

function startNewGame() {
    if (!confirm("确定要开启全新人生吗？当前角色的进度不会被覆盖（你可以先手动去存个档），页面将刷新让你重新捏脸！")) return;
    let keepAI = {
        aiEnabled: player.aiEnabled, aiApiUrl: player.aiApiUrl, aiApiKey: player.aiApiKey, aiModelName: player.aiModelName, aiMaxCost: player.aiMaxCost, aiTotalCost: player.aiTotalCost, aiCallCount: player.aiCallCount,
        aiStoryMinLen: player.aiStoryMinLen, aiStoryMaxLen: player.aiStoryMaxLen, aiChatLen: player.aiChatLen, aiGroupLen: player.aiGroupLen, aiMomentLen: player.aiMomentLen, aiMomentReplyLen: player.aiMomentReplyLen, aiForumLen: player.aiForumLen, aiForumReplyLen: player.aiForumReplyLen
    };
    localStorage.removeItem("hogwarts_autosave");
    localStorage.setItem("hogwarts_keep_ai", JSON.stringify(keepAI));
    alert("正在开启全新人生..."); location.reload();
}

(function restoreAI() {
    let keepAIData = localStorage.getItem("hogwarts_keep_ai");
    if (keepAIData) {
        try {
            let aiData = JSON.parse(keepAIData);
            player.aiEnabled = aiData.aiEnabled; player.aiApiUrl = aiData.aiApiUrl; player.aiApiKey = aiData.aiApiKey; player.aiModelName = aiData.aiModelName; player.aiMaxCost = aiData.aiMaxCost; player.aiTotalCost = aiData.aiTotalCost; player.aiCallCount = aiData.aiCallCount || 0;
            player.aiStoryMinLen = aiData.aiStoryMinLen || 100; player.aiStoryMaxLen = aiData.aiStoryMaxLen || 300; player.aiChatLen = aiData.aiChatLen || 30; player.aiGroupLen = aiData.aiGroupLen || 30; player.aiMomentLen = aiData.aiMomentLen || 50; player.aiMomentReplyLen = aiData.aiMomentReplyLen || 50; player.aiForumLen = aiData.aiForumLen || 100; player.aiForumReplyLen = aiData.aiForumReplyLen || 100;
            localStorage.removeItem("hogwarts_keep_ai");
        } catch(e) {}
    }
})();

function openEditGroupModal(groupId) {
    if (!groupId && currentGroupChatTarget) groupId = currentGroupChatTarget.id;
    currentEditingGroupId = groupId;
    currentEditingGroup = groupChatsData.find(g => g.id === groupId); 
    if (!currentEditingGroup) return;
    document.getElementById('edit-group-name').value = currentEditingGroup.name;
    let container = document.getElementById('edit-group-member-list');
    container.innerHTML = "";
    contactsData.forEach(c => {
        let isChecked = (currentEditingGroup.members && currentEditingGroup.members.includes(c.name)) ? "checked" : "";
        container.innerHTML += `<label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #333; cursor: pointer; padding: 5px;"><input type="checkbox" value="${c.name}" ${isChecked} style="width: 16px; height: 16px;"> ${c.name}</label>`;
    });
    document.getElementById('edit-group-modal').style.display = 'flex';
}

function closeEditGroupModal() {
    document.getElementById('edit-group-modal').style.display = 'none';
    currentEditingGroupId = null;
    currentEditingGroup = null;
}

function saveEditedGroup() {
    if (!currentEditingGroupId) return;
    let group = groupChatsData.find(g => g.id === currentEditingGroupId);
    if (!group) return;
    let newName = document.getElementById('edit-group-name').value.trim();
    if (!newName) { alert("群名不能为空！"); return; }
    let checkboxes = document.querySelectorAll('#edit-group-member-list input[type="checkbox"]:checked');
    let members = [];
    checkboxes.forEach(cb => members.push(cb.value));
    group.name = newName;
    group.members = members;
    alert("群聊信息已更新！");
    closeEditGroupModal();
    autoSave();
    openGroupChat(currentEditingGroupId);
    switchContactTab('groups', document.querySelectorAll('#contacts-page .wall-tab')[2]);
}

function deleteGroup() {
    if (!currentEditingGroupId) return;
    let groupToDelete = groupChatsData.find(g => g.id === currentEditingGroupId);
    if (!groupToDelete) return;
    let confirm1 = confirm(`确定要解散群聊【${groupToDelete.name}】吗？`);
    if (!confirm1) return; 
    let confirm2 = confirm(`警告：解散后聊天记录将彻底消失！真的确定吗？`);
    if (!confirm2) return; 
    groupChatsData = groupChatsData.filter(g => g.id !== currentEditingGroupId);
    alert("群聊已解散");
    closeEditGroupModal();
    closeChat();
    switchContactTab('groups', document.querySelectorAll('#contacts-page .wall-tab')[2]);
    autoSave();
}

function selectAtMember(name) {
    let input = document.getElementById('chat-input');
    input.value = input.value.replace(/@[^ ]*$/, `@${name} `);
    document.getElementById('at-member-popup').style.display = 'none';
    input.focus(); 
}

document.getElementById('chat-input').addEventListener('input', function(e) {
    let val = this.value;
    let popup = document.getElementById('at-member-popup');
    if (val.endsWith('@') || /@[^\s]*$/.test(val)) {
        if (currentGroupChatTarget) {
            popup.style.display = 'block';
            let searchText = val.substring(val.lastIndexOf('@') + 1);
            let items = document.querySelectorAll('#at-member-list > div');
            items.forEach(item => {
                if (item.innerText.includes(searchText) || item.innerText === '所有人') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    } else {
        popup.style.display = 'none';
    }
});

document.addEventListener('click', function(e) {
    let popup = document.getElementById('at-member-popup');
    let input = document.getElementById('chat-input');
    if (e.target !== input && !popup.contains(e.target)) {
        popup.style.display = 'none';
    }
});

// iOS 键盘弹出监听：隐藏底部元素，防止误触与页面跳动
(function watchKeyboard() {
    if (!window.visualViewport) return;
    let lastOpen = false;
    function check() {
        let open = window.visualViewport.height < window.innerHeight - 150;
        if (open !== lastOpen) {
            lastOpen = open;
            document.body.classList.toggle('keyboard-open', open);
        }
    }
    window.visualViewport.addEventListener('resize', check);
    window.visualViewport.addEventListener('scroll', check);
    check();
})();
