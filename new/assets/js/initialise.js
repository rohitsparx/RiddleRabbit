$(function()
{
    var $hover_ele = $('a');
    $hover_ele.live("touchstart", function(e)                            //    Hover effects on all elements
    {
        $(this).addClass('hover');
    });
    $hover_ele.live("touchend", function(e)
    {
        $(this).removeClass('hover');
    });

    if (!('ontouchstart' in window))
    {
        $hover_ele.live({
            mouseenter: function()
            {
                if (!$(this).hasClass('go-up'))
                    $(this).addClass('hover-mouse');
            },
            mouseleave: function()
            {
                $(this).removeClass('hover-mouse');
            }
        });
    }

    window.addEventListener('orientationchange', handleOrientation, false);     // orientation change scaling
    function handleOrientation() {
        if (typeof orientation !== "undefined")
        {
            if (orientation == 0 || orientation == 180)             //portraitMode
            {
                setViewport(0.78);
            }
            else if (orientation == 90 || orientation == -90)      //landscapeMode
            {
                setViewport(1.0);
            }
        }
    }
    function setViewport(num)
    {
//        $('meta[name=viewport]').attr('content', 'width=device-width , initial-scale=' + num + ' , maximum-scale=' + num + ', user-scalable=no');
    }
    handleOrientation();

});

function showLoader()
{
    $('#LoadingScreen').show();
}

function hideLoader()
{
    $('#LoadingScreen').hide();
}

$(window).load(function()
{
    hideLoader();
    scaling();
});

//
//$(window).resize(function()
//{
//    scaling();
//});

function scaling()
{
//    var screenHeight = screen.height > screen.width ? screen.width : screen.height;
//    var win = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight;
//    var ratio = (screenHeight-25) / 748;
//    if (screenHeight != 768)
//    {
//        $('.game-wrapper').css({'transform': 'scale(' + ratio + ')'});
//        $('.game-wrapper').css({'width': (((win) / ratio) - 20) + 'px'});
//    }
//    if (screenHeight >= 550 && screenHeight <= 650)
//    {
//        $('html').addClass('devicesmall');
//    }
}


//window.alert("HEIGHT : " + screen.height);
//window.alert("WIDTH : " + screen.width);


