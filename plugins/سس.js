import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = m => m;

let currentCount = 1; 
let gameState = {
    active: false,
    currentQuestionIndex: -1,
    responses: {} 
};

const gameData = [
    {
      question: 'إطلاق نيل',
      answers: [ 'غاميوزا', 'جاميوزا', 'قاميوزا' ]
    },
    { question: 'إطلاق ستارك', answers: [ 'لوس لوبوس' ] },
    { question: 'إطلاق غريمجو', answers: [ 'بانترا' ] },
    { question: 'إطلاق زايلو أبورو', answers: [ 'فورنيكاراس' ] },
    { question: 'إطلاق يامي', answers: [ 'ارا' ] },
    {
      question: 'إطلاق باراغان',
      answers: [ 'اوروغانتي', 'اوروجانتي', 'اوروقانتي' ]
    },
    {
      question: 'إطلاق الكيورا',
      answers: [
        'مورشيلاجو',
        'مورشيلاغو',
        'مورشيلاقو',
        'مورشيلاغو',
        'مورشيلاجو',
        'مورشيلاقو'
      ]
    },
    { question: 'الإسبادا 3', answers: [ 'نيل' ] },
    { question: 'الإسبادا 4', answers: [ 'الكيورا' ] },
    {
      question: 'الإسبادا 2',
      answers: [ 'باراغان', 'باراجان', 'باراقان' ]
    },
    { question: 'الإسبادا 1', answers: [ 'ستارك' ] },
    { question: 'الأسد الذهبي', answers: [ 'شيكي' ] },
    { question: 'أقوى مستخدم نين', answers: [ 'نيترو' ] },
    { question: 'عين الصقر', answers: [ 'ميهوك' ] },
    {
      question: 'الناسك المنحرف',
      answers: [ 'جيرايا', 'غيرايا', 'قيرايا' ]
    },
    { question: 'قدرة كرولو', answers: [ 'السرقه', 'السرغه', 'السرجه' ] },
    {
      question: 'قدرة هيسوكا',
      answers: [
        'بانجي غام', 'بانغي غام',
        'بانقي غام', 'بانجي جام',
        'بانجي قام', 'جام',
        'غام',       'قام'
      ]
    },
    { question: 'الوميض الأصفر', answers: [ 'ميناتو' ] },
    {
      question: 'قدرة غون',
      answers: [ 'جاجانكين', 'غاجانكين', 'قاجانكين' ]
    },
    { question: 'رقم هيسوكا بالاختبار', answers: [ '44', '٤٤' ] },
    { question: 'رئيس العناكب', answers: [ 'كرولو' ] },
    { question: 'قائد تومان', answers: [ 'مايكي' ] },
    { question: 'نائب مايكي', answers: [ 'دراكن' ] },
    { question: 'القمر العلوي الأول', answers: [ 'كوكوشيبو' ] },
    { question: 'القمر العلوي الثاني', answers: [ 'دوما' ] },
    { question: 'القمر العلوي الثالث', answers: [ 'اكازا' ] },
    {
      question: 'القمر العلوي الرابع',
      answers: [ 'هانتينغو', 'هانتينجو', 'هانتينقو' ]
    },
    {
      question: 'القمر العلوي الخامس',
      answers: [ 'غيوكو', 'جيوكو', 'قيوكو' ]
    },
    { question: 'أخت تانجيرو', answers: [ 'نيزوكو' ] },
    { question: 'ابن أوسين', answers: [ 'اوهون' ] },
    { question: 'أخت ثورفين', answers: [ 'هيلغا', 'هيلجا', 'هيلقا' ] },
    { question: 'أب ثورفين', answers: [ 'ثورز' ] },
    { question: 'ابن ثورز', answers: [ 'ثورفين' ] },
    { question: 'سيف روجر', answers: [ 'ايس' ] },
    { question: 'سيف إيتاشي', answers: [ 'توتسوكا' ] },
    { question: 'سيف أودين', answers: [ 'اينما' ] },
    { question: 'سيف ميهوك', answers: [ 'يورو' ] },
    { question: 'سيف ريوما', answers: [ 'شوسوي', 'شوزوي' ] },
    { question: 'صقر الأوتشيها', answers: [ 'ساسكي' ] },
    { question: 'شبح الأوتشيها', answers: [ 'مادارا' ] },
    { question: 'ملك الظلام', answers: [ 'رايلي' ] },
    { question: 'كلب الزولديك', answers: [ 'ميكي' ] },
    { question: 'كلب الفورجر', answers: [ 'بوند' ] },
    { question: 'ملك الكوينشي', answers: [ 'يوهاباخ', 'يوها باخ' ] },
    { question: 'أخ إيتوشي ساي', answers: [ 'رين' ] },
    { question: 'أخ إيتوشي رين', answers: [ 'ساي' ] },
    { question: 'حبيبة أوكي', answers: [ 'كيو' ] },
    { question: 'أقوى مخلوق', answers: [ 'كايدو' ] },
    { question: 'شبح المعجزات', answers: [ 'كوروكو' ] },
    { question: 'رامي الثلاثيات', answers: [ 'ميدوريما' ] },
    { question: 'رامي المعجزات', answers: [ 'ميدوريما' ] },
    { question: 'أخت بوروتو', answers: [ 'هيماواري' ] },
    {
      question: 'لون عين الكوروتا',
      answers: [ 'قرمزي', 'غرمزي', 'جرمزي' ]
    },
    { question: 'ابنة كايدو', answers: [ 'ياماتو' ] },
    { question: 'اب لوفي', answers: [ 'دراغون', 'دراجون', 'دراقون' ] },
    { question: 'مربية لوفي', answers: [ 'دادان' ] },
    { question: 'بطل البحرية', answers: [ 'غارب', 'جارب', 'قارب' ] },
    {
      question: 'الدراج الأزرق',
      answers: [ 'اوكيجي', 'اوكيغي', 'اوكيقي', 'كوزان' ]
    },
    { question: 'سكين كرولو', answers: [ 'بينز' ] },
    { question: 'أحمر الشعر', answers: [ 'شانكس' ] },
    {
      question: 'سيف شانكس',
      answers: [ 'غريفين', 'جريفين', 'قريفين', 'جريفين', 'غريفين', 'قريفين' ]
    },
    {
      question: 'رمح اللحية',
      answers: [ 'موراكوموغيري', 'موراكوموجيري', 'موراكوموقيري' ]
    },
    { question: 'كيميائي الشعلة', answers: [ 'روي' ] },
    { question: 'تنين ناتسو', answers: [ 'اغنيل', 'اجنيل', 'اقنيل' ] },
    { question: 'أكسيد ناتسو', answers: [ 'هابي' ] },
    { question: 'صاحب إي إن دي', answers: [ 'زيريف' ] },
    { question: 'كتاب زيريف', answers: [ 'اي ان دي' ] },
    { question: 'ابن ناروتو', answers: [ 'بوروتو' ] },
    { question: 'أم ناروتو', answers: [ 'كوشينا' ] },
    { question: 'زوجة هاشيراما', answers: [ 'ميتو' ] },
    {
      question: 'أوميني كامل',
      answers: [ 'دايكي اوميني', 'اوميني دايكي' ]
    },
    { question: 'كيسي كامل', answers: [ 'ريوتا كيسي', 'كيسي ريوتا' ] },
    { question: 'معلم إيتشيغو', answers: [ 'كيسكي' ] },
    {
      question: 'أوراهارا كامل',
      answers: [ 'كيسكي اوراهارا', 'اوراهارا كيسكي' ]
    },
    { question: 'نائب أيزن', answers: [ 'مومو' ] },
    { question: 'نائب كايدو', answers: [ 'كينغ', 'كينج', 'كينق' ] },
    { question: 'أقوى جنرال', answers: [ 'اوكي' ] },
    { question: 'قصر أيزن', answers: [ 'لاس نوشيس' ] },
    {
      question: 'سفينة باغي',
      answers: [ 'بيغ', 'بيج', 'بيق', 'بيج توب', 'بيغ توب', 'بيق توب' ]
    },
    { question: 'سفينة شانكس', answers: [ 'ريد فورس' ] },
    { question: 'سفينة اللحية', answers: [ 'موبيديك' ] },
    {
      question: 'سفينة روجر',
      answers: [ 'اوروجاكسون', 'اوروغاكسون', 'اوروقاكسون' ]
    },
    {
      question: 'سفينة لوفي القديمة',
      answers: [ 'غوينغ ميري', 'جوينغ ميري', 'قوينغ ميري' ]
    },
    {
      question: 'سفينة لوفي الجديدة',
      answers: [ 'ساني غو', 'ساني جو', 'ساني قو' ]
    },
    { question: 'وعاء سوكونا', answers: [ 'يوجي', 'يوغي', 'يوقي' ] },
    { question: 'وعاء إيشيكي', answers: [ 'كاواكي' ] },
    { question: 'وعاء موموشيكي', answers: [ 'بوروتو' ] },
    {
      question: 'التينساي',
      answers: [ 'ساكوراجي', 'ساكوراغي', 'ساكوراقي' ]
    },
    { question: 'ابن فيجيتا', answers: [ 'ترانكس' ] },
    {
      question: 'أمير السايان',
      answers: [ 'فيجيتا', 'فيغيتا', 'فيقيتا' ]
    },
    { question: 'السايان الأسطوري', answers: [ 'برولي' ] },
    { question: 'نائب روجر', answers: [ 'رايلي' ] },
    { question: 'أخت أكاي', answers: [ 'سيرا' ] },
    { question: 'أب سيلفا زولديك', answers: [ 'زينو' ] },
    { question: 'أب زينو زولديك', answers: [ 'ماها' ] },
    {
      question: 'أب جين فريكس',
      answers: [
        'جين', 'غين',
        'قين', 'غين',
        'جين', 'قين',
        'قين', 'غين',
        'جين'
      ]
    },
    { question: 'بانكاي ياماموتو', answers: [ 'زانكا نو تاتشي' ] },
    { question: 'شيكاي كيسكي', answers: [ 'بينيهيمي' ] },
    {
      question: 'شيكاي أيزن',
      answers: [
        'كيوكا سوغيستو',
        'كيوكا سوجيستو',
        'كيوكا سوقيستو',
      ]
    },
    { question: 'ملاحة الطاقم', answers: [ 'نامي' ] },
    {
        question: 'أخت نامي',
        answers: [ 'نوجيكو', 'نوغيكو', 'نوقيكو', 'نوغيكو', 'نوجيكو', 'نوقيكو' ]
      },
      { question: 'قائد العناكب', answers: [ 'كرولو' ] },
      { question: 'قائد الثيران السوداء', answers: [ 'يامي' ] },
      { question: 'مستخدم شينرا تينسي', answers: [ 'باين' ] },
      {
        question: 'مستخدم إيدو تينسي',
        answers: [ 'اوروتشيمارو', 'كابوتو', 'توبيراما' ]
      },
      { question: 'قبضة اللهب', answers: [ 'ايس' ] },
      { question: 'جراح الموت', answers: [ 'لاو' ] },
      { question: 'أخت لاو', answers: [ 'لامي' ] },
      { question: 'خال ليفاي', answers: [ 'كيني' ] },
      { question: 'معد كاراسونو', answers: [ 'توبيو' ] },
      { question: 'نجم كاراسونو', answers: [ 'اساهي' ] },
      { question: 'معذب العناكب', answers: [ 'فيتان' ] },
      { question: 'مكنسة شيزوكو', answers: [ 'ديمي' ] }
    ];
const startGame = async (m) => {
    if (gameState.active) return m.reply('اللعبة قيد التشغيل بالفعل.');
    gameState.active = true;
    gameState.responses = {};
    nextQuestion(m);
};

const stopGame = async (m) => {
    if (!gameState.active) return m.reply('لا توجد لعبة قيد التشغيل حالياً.');
    gameState.active = false;
    
    if (Object.keys(gameState.responses).length === 0) {
        await m.reply('لم يربح أحد نقاطاً في هذه اللعبة.');
    } else {
        let result = Object.entries(gameState.responses).map(([jid, points]) => {
            return `@${jid.split('@')[0]}: ${points} نقطة`;
        }).join('\n');
        
        await m.reply(`اللعبة انتهت!\n\nالنقاط:\n${result}`, null, {
            mentions: Object.keys(gameState.responses)
        });
    }
};

const nextQuestion = async (m) => {
    gameState.currentQuestionIndex = Math.floor(Math.random() * gameData.length);
    await m.reply(`*س/${gameData[gameState.currentQuestionIndex].question}*`);
};

const checkAnswer = async (m) => {
    if (!gameState.active || gameState.currentQuestionIndex === -1) return;
    
    const normalizedAnswer = m.text.trim().toLowerCase(); // Normalize user input
    const correctAnswers = gameData[gameState.currentQuestionIndex].answers.map(answer => answer.toLowerCase()); // Normalize correct answers
    
    if (correctAnswers.includes(normalizedAnswer)) {
        gameState.responses[m.sender] = (gameState.responses[m.sender] || 0) + 1;
        nextQuestion(m);
    }
};

handler.all = async function(m) {
    if (m.text === ".مس") return startGame(m);
    if (m.text === ".سس") return stopGame(m);
    checkAnswer(m);
};

export default handler;
