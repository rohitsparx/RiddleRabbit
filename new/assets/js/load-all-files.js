var myLoader = html5Preloader();

myLoader.addFiles('assets/images/loading-assets.GIF');
//myLoader.addFiles('assets/images/favicon.ico');
myLoader.addFiles('assets/images/begin-riddle-border.jpg');
//myLoader.addFiles('data/Applause.wav');

myLoader.addFiles('assets/images/rabbit-incorrect.png');
myLoader.addFiles('assets/images/rabbit-pointing.png');
myLoader.addFiles('assets/images/other-products.png');
myLoader.addFiles('assets/images/question-1.png');
//myLoader.addFiles('assets/images/icon-144x144.png');
myLoader.addFiles('assets/images/product-txt.png');
//myLoader.addFiles('assets/images/icon-114x114.png');
myLoader.addFiles('assets/images/volume.png');
myLoader.addFiles('assets/images/rabbit-right-answer-2.png');
myLoader.addFiles('assets/images/rabbit-right-answer-1.png');
myLoader.addFiles('assets/images/riddle-rabbit-text.png');
myLoader.addFiles('assets/images/rabbit-complete.png');
myLoader.addFiles('assets/images/radio-btns.png');
myLoader.addFiles('assets/images/complete-message-corner.png');
myLoader.addFiles('assets/images/other-product-btn.png');
//myLoader.addFiles('assets/images/icon.png');
myLoader.addFiles('assets/images/rabbit-pointing-left.png');
myLoader.addFiles('assets/images/home-btn.png');
myLoader.addFiles('assets/images/rabbit-up-3.png');
myLoader.addFiles('assets/images/complete-continue.png');
myLoader.addFiles('assets/images/begin-riddle.png');
myLoader.addFiles('assets/images/rabbit-up.png');
myLoader.addFiles('assets/images/complete-riddle-line.png');
myLoader.addFiles('assets/images/rabbit-right-answer-3.png');
myLoader.addFiles('assets/images/rabbit-up-2.png');
myLoader.addFiles('assets/images/rabbit-up-1.png');
myLoader.addFiles('assets/images/complete-riddle.png');
myLoader.addFiles('assets/images/critical-thinking-logo.png');
myLoader.addFiles('assets/images/pointing-arrow.png');
myLoader.addFiles('assets/images/rabbit-question.png');
myLoader.addFiles('assets/images/print-screen.png');
myLoader.addFiles('assets/images/next-question.png');
//myLoader.addFiles('assets/images/icon-72x72.png');

function loadQuesFiles(ques)
{
//    $.each(ques, function(ind, cur)
//    {
//        loadFile(cur.img);
//        $.each(cur.options, function(ind1, cur1)
//        {
//            loadFile(cur1.img);
//        });
//    });
}

function loadFile(path)
{
    if (path.length > 0)
        myLoader.addFiles('data/' + path);
}

var assets_num_to_load = 3;
function preloadNextAudios(ques, from)
{
    var count = 0;
    while (count < assets_num_to_load)
    {
        if (ques[(from + count)])
        {
            loadAudio(ques[from + count].audio);
            loadFile(ques[from + count].img);
            $.each(ques[from + count].options, function(ind, cur)
            {
                loadAudio(cur.audio);
                loadFile(cur.img);
            });
        }
        count++;
    }
    assets_num_to_load = 5;
}

var temp_audio;
function loadAudio(path)
{
    if (path.length > 0)
        temp_audio = AudioFX('data/' + path, {formats: ['mp3', 'ogg'], volume: 0.00001, loop: false, autoplay: true});
}

function preloadOtherData(from)
{
    preloadNextAudios(data_set.questions, from);
}