//Global variables needed by Disqus
var disqus_shortname = 'drambleon';
var disqus_identifier = null;
var disqus_url = null;
var disqus_developer = 1; // developer mode is on

(function() {
    
    var Util = {
        setupDisqus : function(pageId, pageUrl) {
            disqus_identifier = pageId;
            disqus_url = pageUrl;
        
            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        }
    };
    
    var Blog = {
        
        home : {
            init : function() {
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
                });
            }
        },
        
        posts : {
            init : function() {
                Util.setupDisqus();
            },
            
            programming : {
                init : function() {
                    
                },
                
                mustache_js_and_express : function() {
                    
                }
            },
            
            music : {
                init : function () {
                    
                }
            }
            
        },
        
        fancyposts : {
            init: function() {
                
            }
        }
    };

    return {
        init: function() {
            var area = $('body').data('area'),
                topic = $('body').data('topic'),
                page = $('body').data('page');
            if(Blog[area]) {
                if(Blog[area].init) Blog[area].init();
                if(Blog[area][topic]) {
                    if(Blog[area][topic].init) Blog[area][topic].init();
                    if(Blog[area][topic][page]) Blog[area][topic][page]();
                }
            }
        }
    };

})().init();
