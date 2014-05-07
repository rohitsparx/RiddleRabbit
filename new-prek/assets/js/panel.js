var current_panel = 'HomeScreen';
var previous_panel = null;
var settings = {"sound": true, "ordered": false};


$(function()
{
    $('a[data-show]').live('click', function(e)
    {
        e.preventDefault();
        var toshow = $(this).data('show');

        UpdateScoreBoard();
        if (toshow === "StartGameScreen")
            UpdateStartScreen();

        if (toshow === "QuestionsScreen")
            attempt_in_progress = true;

        if (toshow === "QuestionsScreen" && have_answered)          // question is answered and not clicked on review next btn
            showPanel('ReviewScreen');
        else
            showPanel(toshow);
    });

    $('a[data-rel=back]').live('click', function(e)
    {
        e.preventDefault();
        showPanel(previous_panel);
    });

});




function showPanel(ele)
{
    if (ele === "QuestionsScreen")
    {
        setTimeout(function()
        {
            var path = $('#QuestionsScreen .question').data('audio');
            playAudio(path);
        }, 300);
    }

    $('.all-panels').children().hide();
    $('#' + ele).show();
    previous_panel = current_panel;
    current_panel = ele;
    setPanelsStore();
}
