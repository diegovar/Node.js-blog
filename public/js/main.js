(function() {

    var postLayout = function() {
        var isotopeOptions = {
            layoutMode: 'fitRows'
        };
        $('#posts ol').isotope($.extend({}, isotopeOptions, {
          // options
          itemSelector : '.post'
        }));
        
        $('#sections ol li').click(function() {
            var $this = $(this),
                filter = $this.data('filter');
                
            $('#sections ol li').removeClass('selected');
            $this.addClass('selected');
            $('#posts ol').isotope($.extend({}, isotopeOptions, {filter: filter}));
            $('body').removeClass();
            if(filter != '*') {
                $('body').addClass(filter.substring(1), 2000);
            }
        });
    }

    return {
        init: function() {
            postLayout();
        }
    };

})().init();
