
function UpdateScoreBoard()
{
    var headings = $('#ScoresBoard .score-heading')[0].outerHTML;
    var score = $('<div>');
    $.each(scores, function(index, curr)
    {
        if (!(!attempt_in_progress && curr.status == 0))          // not showing attempt without starting it
        {
            var $ul = $('<ul class="scores">');

            var num = 0, tot = 0;
            for (var sub = 1; sub <= 4; sub++)
            {
                num += scores[index]["Sub" + sub][0];
                tot += scores[index]["Sub" + sub][1];
            }
            $ul.append('<li>' + NUMBERALPHA[index + 1] + '</li>');
            $ul.append('<li>' + STATUS[curr.status] + '</li>');
            $ul.append('<li>' + getOverallPercent(index) + '%</li>');
            $ul.append('<li class="red"><span>' + curr.Sub1[0] + '/' + curr.Sub1[1] + '</span><span>' + getCalculatedPercent(index, 1) + '%</span></li>');
            $ul.append('<li class="purple"><span>' + curr.Sub2[0] + '/' + curr.Sub2[1] + '</span><span>' + getCalculatedPercent(index, 2) + '%</span></li>');
            $ul.append('<li class="green"><span>' + curr.Sub3[0] + '/' + curr.Sub3[1] + '</span><span>' + getCalculatedPercent(index, 3) + '%</span></li>');
            $ul.append('<li class="blue"><span>' + curr.Sub4[0] + '/' + curr.Sub4[1] + '</span><span>' + getCalculatedPercent(index, 4) + '%</span></li>');
            $ul.append('<li>' + num + '/' + tot + '</li>');

            score.append($ul);
        }

    });

    for (var i = score.children().length; i < 6; i++)
        score.append('<ul class="scores"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>');

    $('#ScoresBoard').html(headings + score.html());
}