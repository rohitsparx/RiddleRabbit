function getCalculatedPercent(attempt, sub)
{
    var percent = scores[attempt]["Sub" + sub][0] / scores[attempt]["Sub" + sub][1] * 100;
    if (isNaN(percent))
        return 0;
    else
        return Math.round(percent);
}

function getOverallPercent(attempt)
{
    var num = 0, tot = 0;
    for (var sub = 1; sub <= 4; sub++)
    {
        num += scores[attempt]["Sub" + sub][0];
        tot += scores[attempt]["Sub" + sub][1];
    }
    var percent = num / tot * 100;
    if (isNaN(percent))
        return 0;
    else
        return Math.round(percent);
}

function shuffle(v)
{
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x)
        ;
    return v;
}


function getRandomNum(begin, end)
{
    return Math.floor(Math.random() * (end - begin + 1)) + begin
}