var music = AudioFX('data/Applause', {formats: ['mp3', 'ogg']}, function() {
});

$('[data-audio]').live('click', function(e)
{
    var path = $(this).data('audio');
    if ($(this).data('correct'))
        path = 'data/Applause';
    playAudio(path);
});

function playAudio(path)
{
    music.stop();
    music = AudioFX(path, {formats: ['mp3', 'ogg']}, function() {
    });
//    music = AudioFX(path);
    if (navigator.userAgent.indexOf("Safari") >= 0)             // audio is bit delayed in Safari
    {
        if (settings.sound)
            music.play();
    }
    else
    {
        setTimeout(function()
        {
            if (settings.sound)
                music.play();
        }, 500);
    }
}

$('.home-btn').live('click', function(e)
{
    music.stop();
});

