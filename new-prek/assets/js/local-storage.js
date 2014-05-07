$(function()
{
//    initialiseStore();

    $('#ResetBtn').live('click', function()
    {
        resetAllData();
        lscache.set('haveData', true);
        setPanelsStore();
    });
});

function setPanelsStore()
{
    lscache.set('panels', {'previous_panel': previous_panel, 'current_panel': current_panel});
}

function getPanelsStore()
{
    var panel = lscache.get('panels');
    previous_panel = panel.previous_panel;
    current_panel = panel.current_panel;


    UpdateScoreBoard();
    UpdateStartScreen();

    $('#AnswerReviewScreen').html(answer_review_screen_html);

    if (current_panel === "QuestionsScreen")
        attempt_in_progress = true;

    if (current_panel === "ReviewScreen")
        $('#ReviewScreen').html(review_screen_html);

//    if (current_panel === "QuestionsScreen" && have_answered)          // question is answered and not clicked on review next btn
//        showPanel('ReviewScreen');
//    else
//        showPanel(current_panel);

    if (current_panel === "QuestionsScreen")
    {
        $(window).load(function()
        {
            setTimeout(function()
            {
                var path = $('#QuestionsScreen .question').data('audio');
                playAudio(path);
            }, 300);
        });
    }



    $('.all-panels').children().hide();
    $('#' + current_panel).show();
    setPanelsStore();
}

function initialiseStore()
{
    if (lscache.get('haveData'))
    {
        getAllDataFromMemory();
        getPanelsStore();
        getSettingsStore();
        $('#subjectOrder').html(subject_priority_html);
        $('#subjectOrder li').removeClass('active');
    }
    else
    {
        lscache.set('haveData', true);
        setAllDataInMemory();
        setPanelsStore();
        setSettingsStore();
    }
}


function setSettingsStore()
{
    lscache.set('settings', settings);
    $('.sound-settings a').addClass('off');
    $('.riddle-order-settings a').addClass('off');
    if (settings.sound)
    {
        $('#ToggleSound').removeClass('off');
        $('#SoundOn').removeClass('off');
    }
    else
    {
        $('#ToggleSound').addClass('off');
        $('#SoundOff').removeClass('off');
    }

    if (settings.ordered)
    {
        $('#OrderedOn').removeClass('off');
    }
    else
    {
        $('#OrderedOff').removeClass('off');
    }
}

function getSettingsStore()
{
    var got_setting = lscache.get('settings');
    settings.sound = got_setting.sound;
    settings.ordered = got_setting.ordered;
    setSettingsStore();
}





function resetAllData()
{
    current_panel = 'HomeScreen';
    previous_panel = null;
//    settings = {"sound": true, "ordered": false};

    jQuery.extend(data_set, original_data_set);

    scores = [{"status": 0, "Sub1": [0, 0], "Sub2": [0, 0], "Sub3": [0, 0], "Sub4": [0, 0]}];
    cur_attempt = 0;

    current_ques = null;
    current_ques_num = 0;
    $selected_option = null;

    wrong_answered = [];

    attempt_in_progress = false;
    is_riddle_completed = false;
    have_answered = false;

    review_ques_html = answer_review_screen_html = review_screen_html = '';

    $('#CompleteScreen').removeClass('completed-on');
    getQuestion(0);
}

$(document).live('click', function()
{
    setTimeout(function()
    {
        setAllDataInMemory();
    }, 400);
});

function setAllDataInMemory()
{
    lscache.set('scores', scores);
    lscache.set('cur_attempt', cur_attempt);
    lscache.set('current_ques', current_ques);
    lscache.set('current_ques_num', current_ques_num);
//    lscache.set('selected_option', $selected_option);
    lscache.set('wrong_answered', wrong_answered);
    lscache.set('attempt_in_progress', attempt_in_progress);
    lscache.set('is_riddle_completed', is_riddle_completed);
    lscache.set('review_ques_html', review_ques_html);
    lscache.set('have_answered', have_answered);
    lscache.set('answer_review_screen_html', answer_review_screen_html);
    lscache.set('original_data_set', original_data_set);
    lscache.set('data_set', data_set);
    lscache.set('review_screen_html', review_screen_html);
    lscache.set('subject_priority_html', subject_priority_html);
    lscache.set('subject_priority', subject_priority);
}

function getAllDataFromMemory()
{
    scores = lscache.get('scores');
    cur_attempt = lscache.get('cur_attempt');
    current_ques = lscache.get('current_ques');
//    $selected_option = lscache.get('selected_option');
    current_ques_num = lscache.get('current_ques_num');
    wrong_answered = lscache.get('wrong_answered');
    attempt_in_progress = lscache.get('attempt_in_progress');
    is_riddle_completed = lscache.get('is_riddle_completed');
    review_ques_html = lscache.get('review_ques_html');
    have_answered = lscache.get('have_answered');
    answer_review_screen_html = lscache.get('answer_review_screen_html');
    original_data_set = lscache.get('original_data_set');
    data_set = lscache.get('data_set');
    review_screen_html = lscache.get('review_screen_html');
    subject_priority_html = lscache.get('subject_priority_html');
    subject_priority = lscache.get('subject_priority');
}