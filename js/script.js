var s,
    wnd,
    doc,
    body,
    html,
    brandSlider,
    xChangePopup,
    howItWorksPopup,
    brandSlideCounter = 6,
    baseM = 1 / 16,
    baseWindowWidth = 1280,
    baseWindowHeight = 1080,
    baseFZ = 1.4,
    maxFZ = 1.6,
    minFZ = .7,
    newFZ;

$(function ($) {

    body = $('body');
    html = $('html');
    doc = $(document);
    wnd = $(window);

    html.addClass('loaded');

    $('.thumbSlider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        //variableWidth: true,
        //autoplay: true,
        //autoplaySpeed: 4000,
        speed: 600,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.slide',
        prevArrow: '.prevThumb',
        nextArrow: '.nextThumb',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 3,
        asNavFor: '.exampleSlider',
        touchThreshold: 10
    });

    $('.exampleSlider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        //variableWidth: true,
        //autoplay: true,
        //autoplaySpeed: 4000,
        speed: 600,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.slide',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 1,
        asNavFor: '.thumbSlider',
        touchThreshold: 10
    });

    $('.cardSlider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        //variableWidth: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 600,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.slide',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 1,
        touchThreshold: 10
    });

    brandSlider = $('.brandSlider').slick({
        dots: false,
        infinite: false,
        arrows: true,
        //variableWidth: true,
        //centerMode: false,
        prevArrow: '.prevBrand',
        nextArrow: '.nextBrand',
        //variableWidth: true,
        //autoplay: true,
        //autoplaySpeed: 2000,
        speed: 600,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.slide',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 6,
        touchThreshold: 10
    });

    $('.priceBtn').on ('click', function () {
        $('.priceBtn').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    $('.goTop').on ('click', function () {
        docScrollTo(0, 800);
        return false;
    });

    $('.faqCaption').on ('click', function () {
        $(this).toggleClass('opened').next('.faqText').slideToggle(600);
        return false;
    });

    $('.openAside').on ('click', function () {
        $($(this).attr('href')).addClass('aside_opened');
        html.addClass('aside_opened');
        return false;
    });

    $('.asideClose').on ('click', function () {
        $('.aside_opened').removeClass('aside_opened');
        return false;
    });

    $('.openWidget').on ('click', function () {
        $('#open_widget').click();
        return false;
    });

    $('.closeWidget').on ('click', function () {
        $('#open_content').click();
        return false;
    });

    $('.hoverBro').on('mouseenter', function () {
        $($(this).attr('data-hover')).addClass('hovered');
    }).on('mouseleave', function () {
        $($(this).attr('data-hover')).removeClass('hovered');
    });

    $('.tabBlock').each(function (ind) {
        var tabBlock = $(this);

        tabBlock.tabs({
            active: 0,
            tabContext: tabBlock.data('tab-context'),
            activate: function (e, u) {
                $(u.newPanel).find('.slick-initialized.slick-slider').each(function (ind) {
                    $(this).slick('setPosition');
                });
            }
        });
    });

    xChangePopup = $('#xchange_popup').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: true,
        closeText: '',
        dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1 no_scale',
        appendTo: '.wrapper',
        width: 414,
        draggable: true,
        //position: {my: "center center", at: "center center", of: window},
        open: function (event, ui) {

        },
        close: function (event, ui) {

        }
    });

    howItWorksPopup = $('#how_it_works_popup').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: true,
        closeText: '',
        dialogClass: 'dialog_close_butt_mod_1 dialog_g_size_1 no_scale',
        appendTo: '.wrapper',
        width: 1200,
        draggable: true,
        //position: {my: "center center", at: "center center", of: window},
        open: function (event, ui) {

        },
        close: function (event, ui) {

        }
    });

    $('.openXChangeDialog').on ('click', function () {

        xChangePopup.dialog('open');

        return false;
    });

    $('.openHowItWorks').on ('click', function () {

        howItWorksPopup.dialog('open');

        return false;
    });

    all_dialog_close();
    
    initSelect2();
    
    $.stellar();
    
});

$(window).resize(function () {

    recalcFZ();

    fitSlides();

}).scroll(function () {

    $('.checkScrolling').each(function (ind) {

        var blk = $(this), targetTop = doc.scrollTop() + wnd.height() * parseInt(blk.attr('data-scroll')) / 100;

        if (blk.offset().top < targetTop) {
            blk.addClass('scrolled');
        }

    });

    $('html').toggleClass('show_go_top', doc.scrollTop() > wnd.height());


}).load(function () {

    recalcFZ();
    
    fitSlides();

    $('html').addClass('loaded').toggleClass('show_go_top', doc.scrollTop() > wnd.height());

    s = skrollr.init({
        forceHeight: false
    });

});

function docScrollTo(pos, speed, callback) {

    $('html,body').animate({'scrollTop': pos}, speed, function () {
        if (typeof(callback) == 'function') {
            callback();
        }
    });
}

function initSelect2() {

    $('.select2').each(function (ind) {
        var slct = $(this);

        slct.select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $(slct.attr('data-selectbox')),
            width: '100%',
            templateResult: function (d) {
                var region = $(d.element).attr('data-region');

                if (region != void 0) {
                    console.log($(d.element).attr('data-region'));
                    return $('<div class="select_town">' + d.text + '</div><div class="select_region">' + $(d.element).attr('data-region') + '</div>');
                } else {
                    return d.text;
                }
            }
        });
    });
}

function fitSlides() {

    brandSlideCounter = (newFZ < 1.2 ? 8 : 6);

    brandSlider.slick('slickSetOption', {'slidesToShow': brandSlideCounter});

    $('.slick-initialized.slick-slider:visible').each(function (ind) {
        $(this).slick('setPosition');
    });
}

function recalcFZ() {
    var newFZw = (wnd.width() * baseFZ ) / baseWindowWidth;
    var newFZh = (wnd.height() * baseFZ ) / baseWindowHeight;

    newFZw = Math.max(minFZ, Math.min(newFZw, maxFZ));
    newFZh = Math.max(minFZ, Math.min(newFZh, maxFZ));

    newFZ = Math.min(maxFZ, newFZw, newFZh);

    body.css('font-size', newFZ + 'em');

    //console.log(newFZw, newFZh, newFZ);

}


function all_dialog_close() {
    body.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
    $(".ui-dialog-content").each(function () {
        var $this = $(this);
        if (!$this.parent().hasClass('always_open')) {
            $this.dialog("close");
        }
    });
}