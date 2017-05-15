(function() {
    "use strict";

    var app = {
        help: document.getElementById("help-faq"),
        details: document.getElementById("details")
    };

    /**
    * @function makeTabs
    * @param  {string} selector  -Tabs content selector 
    */
    app.makeTabs = function (selector) {
        var anchors   = document.querySelectorAll(selector + " .tabs a"),
            tabs      = document.querySelectorAll(selector + " .tab-content article"),
            indicator = document.querySelector(".line .indicator");
            
        
        var moveIndicator = function(anchor) {
            var ind_width = anchor.clientWidth,
                posX      = anchor.getAttribute('data-px');
                
            indicator.style.cssText = "width: " + (ind_width+3) + "px; left: "+posX;
        };

        Array.from(anchors).forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {

                event.preventDefault();

                moveIndicator(this);
                
                for (var i = 0; i < tabs.length; i++) {
                    tabs[i].classList.remove("active");
                }

                for (var j = 0; j < anchors.length; j++) {
                    anchors[j].classList.remove("active");
                }

                var clicked_tab = event.target || event.srcElement;
                    clicked_tab.classList.add('active');

                var tab_to_show = clicked_tab.getAttribute('href'),
                    tab = document.getElementById(tab_to_show);

                if (tab) {
                    tab.classList.add("active");
                }
            });
        });
    };

    /**
     * Show/hide a filter block
     */
    app.toggleBlockFaq = function () {
        var toggleButtons = app.help.querySelectorAll(".help__toggle");

        Array.from(toggleButtons).forEach(function(button) {
            button.addEventListener('click', function(event) {

                var self = this,
                    block = self.nextElementSibling,
                    isExpand = block.getAttribute('data-expand');
                
                if (isExpand == "true") {
                    self.setAttribute('data-expand', false);
                    block.setAttribute('data-expand', false);
                } else {
                    self.setAttribute('data-expand', true);                    
                    block.setAttribute('data-expand', true);
                }
                
            });
        });
    };


    if ( app.help ) {
        app.toggleBlockFaq();
    }

    /**
     * Create tabs for Home view
     */
    if ( app.details ) {
        app.makeTabs('.details');
    }
    
})();