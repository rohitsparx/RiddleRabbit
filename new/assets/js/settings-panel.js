var subject_priority = ["Sub1", "Sub2", "Sub3", "Sub4"];
var subject_priority_html = '';

$(function()
{
    $('#ToggleSound').click(function(e)
    {
        e.preventDefault();
        settings.sound = !settings.sound;
        setSettingsStore();
    });

    $('.sound-settings a').click(function(e) {
        e.preventDefault();
        settings.sound = $(this).data('sound');
        setSettingsStore();
    });

    $('.riddle-order-settings a').click(function(e) {
        e.preventDefault();
        if (current_ques_num === 0 && !attempt_in_progress)
        {
            settings.ordered = $(this).data('ordered');
            setSettingsStore();
            getQuestion(0);
        }
        else
        {
            $('#SettingsLightBox').show();
        }
    });
    subject_priority_html = $('#subjectOrder').html();
});

$('#SettingsLightBox').live('click', function()
{
    $('#SettingsLightBox').hide();
});


$('#subjectOrder li').live('click', function()
{
    var subject = $(this).data('subject');
    if ($(this).hasClass('active'))
    {
        $('#subjectOrderBtns').addClass('light');
        $('#subjectOrder li').removeClass('active');
    }
    else
    {
        if (current_ques_num === 0 && !attempt_in_progress)
        {
            $('#subjectOrderBtns').removeClass('light');
            $('#OrderedOn').click();
            $('#subjectOrder li').removeClass('active');
            $(this).addClass('active');
        }
        else
        {
            $('#SettingsLightBox').show();
        }
    }
});

$('#OrderedOff').live('click', function(e)
{
    $('#subjectOrder li').removeClass('active');
    $('#subjectOrderBtns').addClass('light');
});
$('#subjectOrderBtns a').live('click', function(e)
{
    e.preventDefault();
    if (current_ques_num === 0 && !attempt_in_progress)
    {
        var current = $('#subjectOrder li.active');
        var index = current.index();
        if ($(this).hasClass('up'))
        {
            if (index > 0)
                current.insertBefore($('#subjectOrder li').eq(index - 1));
        }
        else
            current.insertAfter($('#subjectOrder li').eq(index + 1));
        setSubjectPriorty();
    }
    else
    {
        $('#SettingsLightBox').show();
    }
});



function setSubjectPriorty()
{
    $('#subjectOrder li').each(function(ind, curr)
    {
        var str = $(this).data('subject');
        subject_priority[ind] = str;
    });
    subject_priority_html = $('#subjectOrder').html();
    getQuestion(0);
}
