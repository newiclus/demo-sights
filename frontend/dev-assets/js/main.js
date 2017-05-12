(function() {
    "use strict";

    var app = {
        filter: document.getElementById("filter")
    };

    /**
     * Show/hide a filter block
     */
    app.toggleBlockFilter = function () {
        var toggleButtons = app.filter.querySelectorAll(".filter__toggle");

        Array.from(toggleButtons).forEach(function(button) {
            button.addEventListener('click', function(event) {
                
            });
        });
    };


    /**
     * Create gallery for Activity view
     */
    if ( app.filter ) {
        //app.toggleBlockFilter();
    }
    
})();