
var BASEURL = '';
var NUMBERALPHA = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
var NUMBERSUP = ['', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th'];
var STATUS = ['in Progress', 'Complete'];
var SUBJECTBYID = {'Sub1': 'Math', 'Sub2': 'Reading', 'Sub3': 'Science', 'Sub4': 'Social Studies'};
var ATTEMPTSTATUS = ['Begin', 'Resume'];
var ATTEMPS_NUM = 4;

var original_data_set = {};
var data_set = {};

var scores = [{"status": 0, "Sub1": [0, 0], "Sub2": [0, 0], "Sub3": [0, 0], "Sub4": [0, 0]}];
var cur_attempt = 0;

var current_ques = null;
var current_ques_num = 0;

var wrong_answered = [];

var attempt_in_progress = false;
var is_riddle_completed = false;

var review_ques_html = '';
var answer_review_screen_html = '';
var review_screen_html = '';

var $selected_option = null;
var have_answered = false;



$(function()
{
    $.ajax({
        url: BASEURL + 'data-set.json',
        dataType: 'json',
        async: false,
        success: function(data)
        {
            original_data_set = data;
            jQuery.extend(data_set, original_data_set);
            setTitles();
            $('.demo-id').html(data.id + ' ' + data.demo);
            initialiseStore();
            loadQuesFiles(data_set.questions);



            getQuestion(current_ques_num);
        }
    });
});

function setTitles()
{
    $('#GameTitles').html(tmpl('GameTitles_tmpl', data_set));
}

$('.options a').live('click', function(e)
{
    e.preventDefault();
    var that = $(this);
    var id = that.data('id');
    var correct = that.data('correct');

    if (correct)
    {
        scores[cur_attempt][current_ques.subject][0]++;
    }
    else
    {
        wrong_answered.push(current_ques);
//        window.alert('wrong');
    }
    scores[cur_attempt][current_ques.subject][1]++;
    current_ques_num++;

    $selected_option = $(this);
    $('#ReviewScreen').html(tmpl('Review_tmpl', $selected_option));
    review_screen_html = tmpl('Review_tmpl', $selected_option);

    UpdateAnswerReviewScreen();

    showPanel('ReviewScreen');
    UpdateStartScreen();
    have_answered = true;
});


$('#ReviewScreen .NextQuestion').live('click', function(e)
{
    e.preventDefault();
    music.stop();
    if (data_set.questions.length > current_ques_num)       // have questions in current attempt
    {
        getQuestion(current_ques_num);
        showPanel('QuestionsScreen');
    }
    else                                                    // questions are finished in current attempt
    {
        scores[cur_attempt].status = 1;
        if (cur_attempt < (ATTEMPS_NUM - 1))                       // check number of attempts limit 
        {
            if (wrong_answered.length === 0)                     // all questions answered
            {
                showPanel('CompletedRiddleScreen');
                playAudio('data/Complete');
                $('#CompleteScreen').addClass('completed-on');
                is_riddle_completed = true;
            }
            else                                                // current attempt finished but questions are left
            {
                data_set.questions = [];
                for (var i = 0; i < wrong_answered.length; i++)
                    data_set.questions.push(wrong_answered[i]);
                wrong_answered = [];
                current_ques_num = 0;
                review_ques_html = '';
                getQuestion(current_ques_num);
                scores.push({"status": 0, "Sub1": [0, 0], "Sub2": [0, 0], "Sub3": [0, 0], "Sub4": [0, 0]});
                cur_attempt++;
                showPanel('StartGameScreen');
            }
            attempt_in_progress = false;
        }
        else                                                     // Number of attempts are over
        {
            showPanel('CompletedRiddleScreen');
            playAudio('data/Complete');
            $('#CompleteScreen').addClass('completed-on');
            is_riddle_completed = true;
            console.log("Number of attempts are over");
        }
    }
    UpdateStartScreen();
    viewFirstReview();
    answer_review_screen_html = $('#AnswerReviewScreen').html();
});

$('#AnswerReviewScreen .NextQuestion').live('click', function(e)
{
    e.preventDefault();
    music.stop();
    var tot = $('#AnswerReviewScreen .review-answer').length;
    var num = $(this).closest('.review-answer').index() + 1;
    if (num < tot)                              // not last answer
    {
        $(".review-answer:visible").next().show();
        $(this).closest('.review-answer').hide();
    }
    else
    {
        showPanel('StartGameScreen');
        viewFirstReview();
    }
    answer_review_screen_html = $('#AnswerReviewScreen').html();
});

$('.review-btn').live('click', function(e)
{
    e.preventDefault();
    showPanel('AnswerReviewScreen');
});

function viewFirstReview()
{
    $('.review-answer').hide();
    $('.review-answer:first-child').show();
}


function getQuestion(ques)
{
    if (current_ques_num === 0 && !attempt_in_progress)
    {
        data_set.questions = sortBySubject(data_set.questions);
    }

    current_ques = data_set.questions[ques];
    current_ques_num = ques;

    have_answered = false;
    $('#QuestionsScreen').html(tmpl('Question_tmpl', ques));

    console.log(current_ques.subject);

    lscache.set('current_ques_num', current_ques_num);

    preloadOtherData(current_ques_num);

}

function UpdateStartScreen()
{
    $('#AttemptNum').html((cur_attempt + 1) + ' <sup>' + NUMBERSUP[cur_attempt + 1] + '</sup>');
    if (attempt_in_progress)
        $('#AttemptStatus').html(ATTEMPTSTATUS[1]);
    else
        $('#AttemptStatus').html(ATTEMPTSTATUS[0]);
    $('#ScoresSection').html(tmpl('ScoresSection_tmpl', scores));
}

function UpdateAnswerReviewScreen()
{
    review_ques_html += '<div class="review-answer">' + tmpl('Review_tmpl', $selected_option) + '</div>';
    $('#AnswerReviewScreen').html(review_ques_html);
}

function sortBySubject(ques)
{
    if (settings.ordered)
    {
        var temp = [];
        $.each(subject_priority, function(ind, curr)
        {
            $.each(ques, function(index, current)
            {
                if (curr == current.subject)
                    temp.push(current);
            });
        });
        ques = temp;
    }
    else
    {
        ques.sort(function(a, b)
        {
            return a.id - b.id;
        });
    }
    return ques;
}





